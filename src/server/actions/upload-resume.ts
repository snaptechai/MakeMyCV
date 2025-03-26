"use server";
import { getTemplatesWithParams } from "@/server/helpers/template";
import { getCareerLevel } from "@/server/actions/get-career-level";
import { OpenAI } from "openai";
import { extname } from "path";

// Dates are not actually Date objects, but strings in the format "YYYY-MM-DD", make sure to parse them if you need to use them as Date objects.
type ChatGptResponseContentType = {
  is_valid_cv: boolean;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  employment_history: {
    company_name: string;
    position: string;
    description: string;
    start_date: Date;
    end_date: Date;
    currently_working: boolean;
  }[];
  educations: {
    school_name: string;
    degree: string;
    degree_completion_date: Date;
    currently_studying: boolean;
  }[];
  achievements: {
    name: string;
    date: Date;
  }[];
  certifications: {
    name: string;
    issuer: string;
    date: Date;
  }[];
  publications: {
    name: string;
    date: Date;
    link: string;
  }[];
};

const openai = new OpenAI({
  apiKey: process.env.CHATGPT_API_TOKEN,
});

async function askQuestionAboutFile(file: File, question: string) {
  try {
    const fileUpload = await openai.files.create({
      file: file,
      purpose: "assistants",
    });

    const assistant = await openai.beta.assistants.create({
      name: "CV Assistant",
      model: "gpt-4-1106-preview",
      instructions: `
                Extract the following information from the resume text: Personal Information, Employment History, Education, Achievements, Certifications, Publications.
                The response should follow this format:
                {
                "is_valid_cv": "Boolean",
                "first_name": "String",
                "last_name": "String",
                "email": "String",
                "mobile": "String (only include if it's a Sri Lankan number, format as 9 digits without any spaces or special characters. Example: 777777777. For numbers starting with +94 or 0, remove those prefixes. If not a valid Sri Lankan number, return null)",
                "employment_history": [
                {
                "company_name": "String",
                "position": "String",
                "description": "String or null (only include description if explicitly provided in resume)",
                "start_date": "YYYY-MM-DD",
                "end_date": "YYYY-MM-DD",
                "currently_working": "Boolean"
                }
                ],
                "educations": [
                {
                "school_name": "String",
                "degree": "String",
                "degree_completion_date": "YYYY-MM-DD",
                "currently_studying": "Boolean"
                }
                ],
                "achievements": [
                {
                "name": "String",
                "date": "YYYY-MM-DD"
                }
                ],
                "certifications": [
                {
                "name": "String",
                "issuer": "String",
                "date": "YYYY-MM-DD"
                }
                ],
                "publications": [
                {
                "name": "String",
                "date": "YYYY-MM-DD",
                "link": "URL"
                }
                ]
                }
                If any section is not present, return an empty array for that section. If any field is not present or cannot be determined, return that field as null. And replace "N/A" with null. Set the description field to null if no clear description/responsibilities are provided in the resume. IF YOU THINK THIS IS NOT A VALID CV/RESUME, SET is_valid_cv TO false.
      `,
      tools: [{ type: "file_search" }],
    });

    const thread = await openai.beta.threads.create();

    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: question,
      attachments: [
        {
          file_id: fileUpload.id,
          tools: [{ type: "file_search" }],
        },
      ],
    });

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id,
    });

    let completedRun;
    while (true) {
      completedRun = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      if (completedRun.status === "completed") {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    const messages = await openai.beta.threads.messages.list(thread.id);
    const response = messages.data[0].content[0];

    await openai.files.del(fileUpload.id);
    await openai.beta.assistants.del(assistant.id);

    if ("text" in response) {
      return response.text;
    }
    return null;
  } catch (error) {
    console.error("Error processing file question:", error);
    throw new Error("Failed to process file question");
  }
}

export async function uploadResume(formData: FormData) {
  const file = formData.get("resume") as File | null;

  if (!file) {
    throw new Error("Couldn't find the attached file.");
  }

  const fileType = file.type;
  const fileExtension = extname(file.name).toLowerCase();
  const supportedFileTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
  ];

  const supportedFileExtensions = [".pdf", ".docx", ".doc"];

  if (!supportedFileTypes.includes(fileType) && !supportedFileExtensions.includes(fileExtension)) {
    throw new Error("Unsupported file type.");
  }

  const question = `JSON Format:\n{"is_valid_cv": "Boolean", "first_name": null, "last_name": null, "email": null, "mobile": null, "employment_history": [],"education": [],"achievements": [],"certifications": [],"publications": []}`;
  const data = await askQuestionAboutFile(file, question);

  if (!data) {
    throw new Error("Couldn't extract information from your cv/resume.");
  }

  const jsonMatch = data.value.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Invalid response format from CV parsing.");
  }

  try {
    const extractedInformation = JSON.parse(jsonMatch[0]) as ChatGptResponseContentType;

    if (!extractedInformation.is_valid_cv) {
      throw new Error("Not A valid cv.");
    }

    const careerLevel = await getCareerLevel(extractedInformation);

    if (!careerLevel) {
      throw new Error("Couldn't extract information from your cv/resume.");
    }

    const templates = await getTemplatesWithParams({
      number_of_employment_history: extractedInformation.employment_history.length,
      number_of_educations: extractedInformation.educations.length,
      number_of_achievements: extractedInformation.achievements.length,
      number_of_certifications: extractedInformation.certifications.length,
      number_of_publications: extractedInformation.publications.length,
    });

    return {
      templates: templates,
      career_level: careerLevel.career_level,
      price: careerLevel.price,
      extracted_information: extractedInformation,
    };
  } catch (error) {
    console.error("Error parsing CV data:", error);
    throw new Error("Failed to parse CV information.");
  }
}
