import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

import courseCategories from "@/db/schema/courseCategories";
import exams from "@/db/schema/exams";
import professors from "@/db/schema/professors";
import studentCourses from "@/db/schema/studentCourses";
import { primaryId } from "@/db/schema/utils";

const courses = pgTable("courses", {
  id: primaryId(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 2048 }),
  academicYear: varchar("academic_year", { length: 128 }).notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
  archived: boolean("archived").default(false),

  professorId: text("professor_id")
    .notNull()
    .references(() => professors.id),
  assistantId: text("assistant_id").references(() => professors.id),
});

export const courseRelations = relations(courses, ({ one, many }) => ({
  professor: one(professors, {
    fields: [courses.professorId],
    references: [professors.id],
    relationName: "professor",
  }),
  assistant: one(professors, {
    fields: [courses.assistantId],
    references: [professors.id],
    relationName: "assistant",
  }),
  exams: many(exams),
  students: many(studentCourses),
  categories: many(courseCategories),
}));

export default courses;
