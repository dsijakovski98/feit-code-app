import { relations } from "drizzle-orm";
import { pgTable, varchar } from "drizzle-orm/pg-core";

import courses from "@/db/schema/courses";
import { moduleType, teacherType } from "@/db/schema/enums";
import submissions from "@/db/schema/submissions";
import { userId } from "@/db/schema/utils";

const professors = pgTable("professors", {
  id: userId(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  department: moduleType("department").notNull(),
  type: teacherType("type").notNull(),
});

export const professorRelations = relations(professors, ({ many }) => ({
  courseProfessor: many(courses, { relationName: "professor" }),
  courseAssistant: many(courses, { relationName: "assistant" }),
  submissions: many(submissions),
}));

export default professors;
