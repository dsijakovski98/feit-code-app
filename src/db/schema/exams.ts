import { relations } from "drizzle-orm";
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

import courses from "@/db/schema/courses";
import { programmingLanguage } from "@/db/schema/enums";
import tasks from "@/db/schema/tasks";
import { primaryId } from "@/db/schema/utils";

const exams = pgTable("exams", {
  id: primaryId(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  duration: timestamp("duration", { mode: "string" }).notNull(),
  points: integer("points").notNull(),
  language: programmingLanguage("programming_language").notNull(),

  courseId: varchar("course_id")
    .notNull()
    .references(() => courses.id),
});

export const examRelations = relations(exams, ({ one, many }) => ({
  course: one(courses, {
    fields: [exams.courseId],
    references: [courses.id],
  }),
  tasks: many(tasks),
}));

export default exams;
