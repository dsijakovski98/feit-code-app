import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

import exams from "@/db/schema/exams";
import taskGrades from "@/db/schema/taskGrades";
import { primaryId } from "@/db/schema/utils";

const tasks = pgTable("tasks", {
  id: primaryId(),
  orderIndex: integer("order_index").unique().notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }),
  points: integer("points"),
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
  grades: many(taskGrades),
}));

export default tasks;
