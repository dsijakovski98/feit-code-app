import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

import categories from "@/db/schema/categories";
import courses from "@/db/schema/courses";

const courseCategories = pgTable("course_categories", {
  courseId: text("course_id")
    .notNull()
    .references(() => courses.id),
  categoryId: text("category_id")
    .notNull()
    .references(() => categories.id),
});

export const courseCategoryRelations = relations(courseCategories, ({ one }) => ({
  course: one(courses, {
    fields: [courseCategories.courseId],
    references: [courses.id],
  }),
  category: one(categories, {
    fields: [courseCategories.categoryId],
    references: [categories.id],
  }),
}));

export default courseCategories;
