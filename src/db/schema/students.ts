import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

import { moduleType } from "@/db/schema/enums";
import studentCourses from "@/db/schema/studentCourses";
import taskGrades from "@/db/schema/taskGrades";
import { userId } from "@/db/schema/utils";

const students = pgTable("students", {
  id: userId(),
  bio: varchar("bio", { length: 512 }),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  indexNumber: integer("idx_number").notNull(),
  indexYear: integer("idx_year").notNull(),
  major: moduleType("major").notNull(),
});

export const studentRelations = relations(students, ({ many }) => ({
  courses: many(studentCourses),
  taskGrades: many(taskGrades),
}));

export default students;
