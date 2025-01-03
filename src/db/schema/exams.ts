import { relations } from "drizzle-orm";
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

import courses from "@/db/schema/courses";
import { examStatus, programmingLanguage } from "@/db/schema/enums";
import submissions from "@/db/schema/submissions";
import tasks from "@/db/schema/tasks";
import { primaryId } from "@/db/schema/utils";

import { EXAM_STATUS } from "@/constants/enums";
import { dbNow } from "@/utils/dates";

const exams = pgTable("exams", {
  id: primaryId(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().$defaultFn(dbNow),
  startsAt: timestamp("starts_at", { mode: "string" }).notNull(),
  startedAt: timestamp("started_at", { mode: "string" }),
  durationMinutes: integer("duration_minutes").notNull(),
  points: integer("points").notNull(),
  language: programmingLanguage("programming_language").notNull(),
  status: examStatus("status").notNull().default(EXAM_STATUS.new),

  courseId: varchar("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
});

export const examRelations = relations(exams, ({ one, many }) => ({
  course: one(courses, {
    fields: [exams.courseId],
    references: [courses.id],
  }),
  tasks: many(tasks),
  submissions: many(submissions),
}));

export default exams;
