import { relations } from "drizzle-orm";
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

import courses from "@/db/schema/courses";
import { examStatus, programmingLanguage } from "@/db/schema/enums";
import tasks from "@/db/schema/tasks";
import { primaryId } from "@/db/schema/utils";

import { EXAM_STATUS } from "@/constants/enums";

const exams = pgTable("exams", {
  id: primaryId(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  duration: timestamp("duration", { mode: "string" }).notNull(),
  points: integer("points").notNull(),
  language: programmingLanguage("programming_language").notNull(),
  status: examStatus("status").notNull().default(EXAM_STATUS.new),

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
