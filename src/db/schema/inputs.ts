import { relations } from "drizzle-orm";
import { pgTable, varchar } from "drizzle-orm/pg-core";

import { valueType } from "@/db/schema/enums";
import tests from "@/db/schema/tests";
import { primaryId } from "@/db/schema/utils";

const inputs = pgTable("inputs", {
  id: primaryId(),
  name: varchar("name", { length: 256 }).notNull(),
  valueType: valueType("value_type").notNull(),
  value: varchar("value", { length: 256 }).notNull(),
  testId: varchar("test_id", { length: 256 })
    .notNull()
    .references(() => tests.id),
});

export const inputRelations = relations(inputs, ({ one }) => ({
  test: one(tests, {
    fields: [inputs.testId],
    references: [tests.id],
  }),
}));

export default inputs;
