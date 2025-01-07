import { relations } from "drizzle-orm";
import { pgTable, varchar } from "drizzle-orm/pg-core";

import courses from "@/db/schema/courses";
import { moduleType, teacherType } from "@/db/schema/enums";
import submissions from "@/db/schema/submissions";
import { userId } from "@/db/schema/utils";

const professors = pgTable("professors", {
  id: userId(),

  avatarUrl: varchar("avatar_url", { length: 10_000 }),

  type: teacherType("type").notNull(),
  department: moduleType("department").notNull(),

  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
});

export const professorRelations = relations(professors, ({ many }) => ({
  courseProfessor: many(courses, { relationName: "professor" }),
  courseAssistant: many(courses, { relationName: "assistant" }),
  submissions: many(submissions, { relationName: "grader" }),
}));

export default professors;
