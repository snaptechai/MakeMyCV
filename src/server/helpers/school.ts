"use server";

import { db } from "@/db";
import { school } from "@/db/schema";
import { like } from "drizzle-orm";

export const searchSchool = async (term: string) => {
  const res = await db.query.school.findMany({
    columns: {
      name: true,
    },
    where: like(school.name, `%${term}%`),
    limit: 20,
  });
  return res.map((c) => ({
    value: c.name,
    label: c.name,
  }));
};
