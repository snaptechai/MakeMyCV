"use server";

import { db } from "@/db";
import { jobPosition } from "@/db/schema";
import { like } from "drizzle-orm";

export const searchJobPositions = async (term: string) => {
  const res = await db.query.jobPosition.findMany({
    columns: {
      id: true,
      position: true,
      sinhalaPosition: true,
    },
    where: like(jobPosition.position, `%${term}%`),
    limit: 20,
  });
  return res.map((job) => ({
    value: job.position + " - " + job.sinhalaPosition,
    label: job.position + " - " + job.sinhalaPosition,
  }));
};
