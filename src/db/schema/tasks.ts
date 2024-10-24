import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

import exams from "@/db/schema/exams";
import submissionTasks from "@/db/schema/submissionTasks";
import tests from "@/db/schema/tests";
import { primaryId } from "@/db/schema/utils";

const tasks = pgTable("tasks", {
  id: primaryId(),
  orderIndex: integer("order_index").notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }),
  points: integer("points"),
  functionName: varchar("func_name", { length: 256 }).notNull(),
  templateUrl: varchar("template_url", { length: 1024 }).notNull(),

  examId: varchar("exam_id")
    .notNull()
    .references(() => exams.id, { onDelete: "cascade" }),
});

export const taskRelations = relations(tasks, ({ one, many }) => ({
  exam: one(exams, {
    fields: [tasks.examId],
    references: [exams.id],
  }),
  tests: many(tests),
  submissions: many(submissionTasks),
}));

export default tasks;
