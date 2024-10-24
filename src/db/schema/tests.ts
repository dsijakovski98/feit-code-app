import { relations } from "drizzle-orm";
import { pgTable, varchar } from "drizzle-orm/pg-core";

import { valueType } from "@/db/schema/enums";
import inputs from "@/db/schema/inputs";
import tasks from "@/db/schema/tasks";
import { primaryId } from "@/db/schema/utils";

const tests = pgTable("tests", {
  id: primaryId(),
  outputType: valueType("output_type").notNull(),
  output: varchar("output", { length: 256 }).notNull(),

  taskId: varchar("task_id", { length: 256 })
    .notNull()
    .references(() => tasks.id, { onDelete: "cascade" }),
});

export const testRelations = relations(tests, ({ one, many }) => ({
  task: one(tasks, {
    fields: [tests.taskId],
    references: [tasks.id],
  }),
  inputs: many(inputs),
}));

export default tests;
