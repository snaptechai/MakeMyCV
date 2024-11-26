"use server";
import { db } from "@/db";
import { template } from "@/db/schema";
import { and, gte } from "drizzle-orm";

export const getTemplatesWithParams = async ({
  number_of_employment_history,
  number_of_educations,
  number_of_achievements,
  number_of_certifications,
  number_of_publications,
}: {
  number_of_employment_history: number;
  number_of_educations: number;
  number_of_achievements: number;
  number_of_publications: number;
  number_of_certifications: number;
}) => {
  const suggestedTemplates = await db.query.template.findMany({
    where: and(
      gte(template.numberOfEmploymentHistory, number_of_employment_history),
      gte(template.numberOfEducation, number_of_educations),
      gte(template.numberOfAchievement, number_of_achievements),
      gte(template.numberOfCertifications, number_of_certifications),
      gte(template.numberOfPublication, number_of_publications),
    ),
    columns: {
      id: true,
      numberOfEmploymentHistory: true,
      numberOfEducation: true,
      numberOfAchievement: true,
      numberOfCertifications: true,
      numberOfPublication: true,
      image: true,
      title: true,
      detailsTags: true,
      tags: true,
      withOrWithoutPhoto: true,
    },
  });

  return suggestedTemplates.map((template) => {
    let tags: string[] = [];
    if (template.tags && template.tags.length !== 0) {
      tags = template.tags.split(",");
    }
    let detailed_tags: {
      tag: string;
      background_color: string;
      text_color: string;
    }[] = [];
    if (template.detailsTags && template.detailsTags.length !== 0) {
      const splitDetailedTags = template.detailsTags.split(",");
      detailed_tags = splitDetailedTags.map((tag) => {
        const tempTag = tag.split("-");
        return {
          tag: tempTag[0],
          background_color: tempTag[1],
          text_color: tempTag[2],
        };
      });
    }
    return {
      ...template,
      ...{
        tags: tags,
        detailed_tags: detailed_tags,
      },
    };
  });
};

export const getTemplates = async () => {
  const templates = await db.query.template.findMany({
    columns: {
      id: true,
      title: true,
      image: true,
      tags: true,
      detailsTags: true,
      withOrWithoutPhoto: true,
      description: true,
    },
    orderBy: (t, { asc }) => [asc(t.listPosition)],
  });

  return templates.map((template) => {
    let tags: string[] = [];
    if (template.tags && template.tags.length !== 0) {
      tags = template.tags.split(",");
    }
    let detailed_tags: {
      tag: string;
      background_color: string;
      text_color: string;
    }[] = [];
    if (template.detailsTags && template.detailsTags.length !== 0) {
      const splitDetailedTags = template.detailsTags.split(",");
      detailed_tags = splitDetailedTags.map((tag) => {
        const tempTag = tag.split("-");
        return {
          tag: tempTag[0],
          background_color: tempTag[1],
          text_color: tempTag[2],
        };
      });
    }
    return {
      ...template,
      ...{
        tags: tags,
        detailed_tags: detailed_tags,
      },
    };
  });
};
