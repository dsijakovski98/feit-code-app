import { relations } from "drizzle-orm";
import { pgTable, varchar } from "drizzle-orm/pg-core";

import courseCategories from "@/db/schema/courseCategories";
import { primaryId } from "@/db/schema/utils";

const categories = pgTable("categories", {
  id: primaryId(),
  label: varchar("label", { length: 256 }).notNull(),
  color: varchar("color", { length: 256 }),
});

export const categoryRelations = relations(categories, ({ many }) => ({
  courses: many(courseCategories),
}));

export default categories;
