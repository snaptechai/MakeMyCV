"use server";

// import axios from "axios";
import { db } from "@/db";

// type ChatGptResponseType = {
//   career_level: string;
// };

export const getCareerLevel = async (values: any) => {
  const careerLevels = await db.query.careerLevel.findFirst({
    columns: {
      id: true,
      price: true,
      level: true,
    },
  });

  if (!careerLevels) {
    return null;
  }

  return {
    career_level: careerLevels.id,
    price: careerLevels.price,
  };
  // const chatGptResponse = await axios.post(
  //   "https://api.openai.com/v1/chat/completions",
  //   {
  //     model: "gpt-4o",
  //     messages: [
  //       {
  //         role: "system",
  //         content: `You are a helpful assistant. Respond with a JSON object in the format: {"career_level": "String"}. Always respond with a career level using only the provided career levels: ${JSON.stringify(careerLevels.flatMap((d) => d.level))}. Do not wrap the response in any code block, and do not include additional text, explanations, or symbols. Only respond with the JSON object. DO NOT HELUCINATE. ONLY USE THE PROVIDED DATA.`,
  //       },
  //       {
  //         role: "user",
  //         content: `Based on the following user data, pick the correct career level: ${JSON.stringify(values)}`,
  //       },
  //     ],
  //     temperature: 0.8,
  //   },
  //   {
  //     headers: {
  //       Authorization: `Bearer ${process.env.CHATGPT_API_TOKEN}`,
  //       "Content-Type": "application/json",
  //     },
  //   },
  // );

  // if (chatGptResponse.data.choices.length === 0) {
  //   return null;
  // }
  // try {
  //   const res: ChatGptResponseType = JSON.parse(chatGptResponse.data.choices[0].message.content);

  //   const careerLevel = careerLevels.find(
  //     (d) => d.level.toLowerCase() === res.career_level.toLowerCase(),
  //   );
  //   if (!careerLevel) {
  //     return null;
  //   }

  //   return {
  //     career_level: careerLevel.id,
  //     price: careerLevel.price,
  //   };
  // } catch (e) {
  //   console.log(e);
  //   return null;
  // }
};
