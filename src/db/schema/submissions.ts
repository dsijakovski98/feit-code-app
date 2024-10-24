import { relations } from "drizzle-orm";
import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

import { submissionStatus } from "@/db/schema/enums";
import professors from "@/db/schema/professors";
import students from "@/db/schema/students";
import submissionTasks from "@/db/schema/submissionTasks";
import { primaryId } from "@/db/schema/utils";

import { SUBMISSION_STATUS } from "@/constants/enums";

const submissions = pgTable("submissions", {
  id: primaryId(),
  graderId: text("grader_id")
    .notNull()
    .references(() => professors.id),
  status: submissionStatus("status").$default(() => SUBMISSION_STATUS.submitted),
  task_urls: varchar("task_urls", { length: 256 }).notNull(),
  points: integer("points").notNull(),
  feedback: varchar("feedback", { length: 10_000 }),

  studentId: text("student_id")
    .notNull()
    .references(() => students.id, { onDelete: "cascade" }),
});

export const submissionsRelations = relations(submissions, ({ one, many }) => ({
  student: one(students, {
    fields: [submissions.studentId],
    references: [students.id],
  }),
  tasks: many(submissionTasks),
}));

export default submissions;
