"use server";

import { db } from "@/db";
import { englishJobPosition } from "@/db/schema";
import { like } from "drizzle-orm";

export const searchEnglishJobPosition = async (term: string) => {
  const res = await db.query.englishJobPosition.findMany({
    columns: {
      name: true,
    },
    where: like(englishJobPosition.name, `%${term}%`),
    limit: 20,
  });
  return res.map((c) => ({
    value: c.name,
    label: c.name,
  }));
};
