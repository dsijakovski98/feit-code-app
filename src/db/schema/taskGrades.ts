import { relations } from "drizzle-orm";
import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

import { taskStatus } from "@/db/schema/enums";
import professors from "@/db/schema/professors";
import students from "@/db/schema/students";
import tasks from "@/db/schema/tasks";

const taskGrades = pgTable("task_grades", {
  graderId: text("grader_id")
    .notNull()
    .references(() => professors.id),
  status: taskStatus("status").$default(() => "submitted"),
  fileUrl: varchar("file_url", { length: 256 }).notNull(),
  points: integer("points").notNull(),
  feedback: varchar("feedback", { length: 10_000 }),

  studentId: text("student_id")
    .notNull()
    .references(() => students.id),
  taskId: varchar("task_id")
    .notNull()
    .references(() => tasks.id),
});

export const taskGradeRelations = relations(taskGrades, ({ one }) => ({
  student: one(students, {
    fields: [taskGrades.studentId],
    references: [students.id],
  }),
  task: one(tasks, {
    fields: [taskGrades.taskId],
    references: [tasks.id],
  }),
}));

export default taskGrades;
