import { relations } from "drizzle-orm/relations";
import { careerLevel, careerLevelTemplate, template, cv } from "./schema";

export const careerLevelTemplateRelations = relations(careerLevelTemplate, ({ one }) => ({
  careerLevel: one(careerLevel, {
    fields: [careerLevelTemplate.careerLevel],
    references: [careerLevel.id],
  }),
  template: one(template, {
    fields: [careerLevelTemplate.template],
    references: [template.id],
  }),
}));

export const careerLevelRelations = relations(careerLevel, ({ many }) => ({
  careerLevelTemplates: many(careerLevelTemplate),
  cvs: many(cv),
}));

export const templateRelations = relations(template, ({ many }) => ({
  careerLevelTemplates: many(careerLevelTemplate),
}));

export const cvRelations = relations(cv, ({ one }) => ({
  careerLevel: one(careerLevel, {
    fields: [cv.careerLevel],
    references: [careerLevel.id],
  }),
}));
