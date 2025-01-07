import { relations } from "drizzle-orm";
import { boolean, index, integer, json, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

import { submissionStatus } from "@/db/schema/enums";
import exams from "@/db/schema/exams";
import professors from "@/db/schema/professors";
import students from "@/db/schema/students";
import { primaryId } from "@/db/schema/utils";

import { SUBMISSION_STATUS } from "@/constants/enums";
import { dbNow } from "@/utils/dates";

const submissions = pgTable(
  "submissions",
  {
    id: primaryId(),

    status: submissionStatus("status").default(SUBMISSION_STATUS.submitted),
    points: integer("points"),
    feedback: varchar("feedback", { length: 10_000 }),
    submittedAt: timestamp("submitted_at", { mode: "string" }).notNull().$defaultFn(dbNow),

    seen: boolean("seen").default(false),

    pasteCount: integer("paste_count").default(0),
    timeOff: json("time_off").$type<Record<string, number>>().default({}),

    // Gets updates when a feedback is provided by a professor/assistant
    graderId: text("grader_id").references(() => professors.id, { onDelete: "cascade" }),

    examId: text("exam_id")
      .notNull()
      .references(() => exams.id, { onDelete: "cascade" }),
    studentId: text("student_id")
      .notNull()
      .references(() => students.id, { onDelete: "cascade" }),
  },
  (table) => [index("student_idx").on(table.studentId)],
);

export const submissionsRelations = relations(submissions, ({ one }) => ({
  grader: one(professors, {
    fields: [submissions.graderId],
    references: [professors.id],
  }),

  exam: one(exams, {
    fields: [submissions.examId],
    references: [exams.id],
  }),

  student: one(students, {
    fields: [submissions.studentId],
    references: [students.id],
  }),
}));

export default submissions;
