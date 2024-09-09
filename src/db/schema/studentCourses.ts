import { relations } from "drizzle-orm";
import { numeric, pgTable, primaryKey, text, timestamp, varchar } from "drizzle-orm/pg-core";

import courses from "@/db/schema/courses";
import students from "@/db/schema/students";

const studentCourses = pgTable(
  "student_courses",
  {
    studentId: text("student_id")
      .notNull()
      .references(() => students.id),
    courseId: varchar("course_id")
      .notNull()
      .references(() => courses.id),

    grade: numeric("grade", { precision: 2 }),
    joinedAt: timestamp("joined_at", { mode: "string" }).notNull().defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.studentId, table.courseId] }),
  }),
);

export const studentCourseRelations = relations(studentCourses, ({ one }) => ({
  student: one(students, {
    fields: [studentCourses.studentId],
    references: [students.id],
  }),
  course: one(courses, {
    fields: [studentCourses.courseId],
    references: [courses.id],
  }),
}));

export default studentCourses;
