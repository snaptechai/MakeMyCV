"use server";
import axios from "axios";
import fs from "fs";
import moment from "moment";
import mammoth from "mammoth";
import { PdfReader } from "pdfreader";
import { extname, join } from "path";
import { getTemplatesWithParams } from "@/server/helpers/template";
import { stat, mkdir, writeFile, unlink } from "fs/promises";
import { getCareerLevel } from "@/server/actions/get-career-level";

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

type ChatGptResponseType = {
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
      refusal: string | null;
    };
    logprobs: null;
    finish_reason: string;
  }[];
};

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

  const buffer = Buffer.from(await file.arrayBuffer());

  const pathDist: string = join(process.cwd(), "/private/documents");
  const relativeUploadDir = moment().format("YYYY-MM-DD-DD");
  const uploadDir = join(pathDist, relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error("Error while trying to create directory when uploading a file\n", e);
      throw new Error("Something went wrong.");
    }
  }
  try {
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const fileExtension = extname(file.name);
    const originalFilename = file.name.replace(/\.[^/.]+$/, "");
    const sanitizedFilename = originalFilename.replace(/[^a-zA-Z0-9_\u0600-\u06FF.]/g, "_");
    const filename = `${sanitizedFilename}_${uniqueSuffix}${fileExtension}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);

    const finalFilePath = `${uploadDir}/${filename}`;
    const fileType = file.type;

    const resumeText = await parseResume(finalFilePath, fileType);

    const chatGptResponse = await axios.post<ChatGptResponseType>(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `Extract the following information from the resume text: Personal Information, Employment History, Education, Achievements, Certifications, Publications.
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
                If any section is not present, return an empty array for that section. If any field is not present or cannot be determined, return that field as null. And replace "N/A" with null. Set the description field to null if no clear description/responsibilities are provided in the resume. IF YOU THINK THIS IS NOT A VALID CV/RESUME, SET is_valid_cv TO false.`,
          },
          {
            role: "user",
            content: `Resume Text:\n${resumeText}\n\nJSON Format:\n{"is_valid_cv": "Boolean", "first_name": null, "last_name": null, "email": null, "mobile": null, "employment_history": [],"education": [],"achievements": [],"certifications": [],"publications": []}`,
          },
        ],
        temperature: 0.8,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CHATGPT_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (chatGptResponse.data.choices.length === 0) {
      await unlink(finalFilePath);
      throw new Error("Couldn't extract information from your cv/resume.");
    }

    const extractedInformation = JSON.parse(
      chatGptResponse.data.choices[0].message.content,
    ) as ChatGptResponseContentType;

    if (!extractedInformation.is_valid_cv) {
      await unlink(finalFilePath);

      throw new Error("Not A valid cv.");
    }

    const careerLevel = await getCareerLevel(extractedInformation);

    if (!careerLevel) {
      await unlink(finalFilePath);

      throw new Error("Couldn't extract information from your cv/resume.");
    }

    const templates = await getTemplatesWithParams({
      number_of_employment_history: extractedInformation.employment_history.length,
      number_of_educations: extractedInformation.educations.length,
      number_of_achievements: extractedInformation.achievements.length,
      number_of_certifications: extractedInformation.certifications.length,
      number_of_publications: extractedInformation.publications.length,
    });

    await unlink(finalFilePath);

    return {
      templates: templates,
      career_level: careerLevel.career_level,
      price: careerLevel.price,
      extracted_information: extractedInformation,
    };
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    throw new Error("Something went wrong.");
  }
}

const parseResume = async (filePath: string, fileType: string | null) => {
  if (fileType === "application/pdf") {
    return new Promise<string>((resolve, reject) => {
      const pdfReader = new PdfReader();
      let pdfText = "";

      pdfReader.parseFileItems(filePath, (err, item) => {
        if (err) {
          reject(err);
        } else if (!item) {
          resolve(pdfText);
        } else if (item.text) {
          pdfText += item.text + " ";
        }
      });
    });
  } else if (
    fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileType === "application/msword" ||
    fileType === "application/octet-stream"
  ) {
    const dataBuffer = fs.readFileSync(filePath);
    const result = await mammoth.extractRawText({ buffer: dataBuffer });
    return result.value;
  } else {
    throw new Error("Unsupported file type");
  }
};
