import { relations } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";

import submissions from "@/db/schema/submissions";
import tasks from "@/db/schema/tasks";

const submissionTasks = pgTable("submission_tasks", {
  submissionId: text("submission_id")
    .notNull()
    .references(() => submissions.id, { onDelete: "cascade" }),
  taskId: text("task_id")
    .notNull()
    .references(() => tasks.id, { onDelete: "cascade" }),
  taskUrl: varchar("task_url", { length: 1024 }).notNull(),
});

export const submissionTasksRelations = relations(submissionTasks, ({ one }) => ({
  submission: one(submissions, {
    fields: [submissionTasks.submissionId],
    references: [submissions.id],
  }),
  task: one(tasks, {
    fields: [submissionTasks.taskId],
    references: [tasks.id],
  }),
}));

export default submissionTasks;
