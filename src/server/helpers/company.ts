"use server";

import { db } from "@/db";
import { company } from "@/db/schema";
import { like } from "drizzle-orm";

export const searchCompany = async (term: string) => {
  const res = await db.query.company.findMany({
    columns: {
      name: true,
    },
    where: like(company.name, `%${term}%`),
    limit: 20,
  });
  return res.map((c) => ({
    value: c.name,
    label: c.name,
  }));
};
