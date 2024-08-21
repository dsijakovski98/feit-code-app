import { relations } from 'drizzle-orm'
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

import taskGrades from '@/db/schema/taskGrades'
import tests from '@/db/schema/tests'
import { primaryId } from '@/db/schema/utils'

const tasks = pgTable('tasks', {
  id: primaryId(),
  orderIndex: integer('order_index').unique().notNull(),
  title: varchar('title', { length: 256 }).notNull(),
  description: varchar('description', { length: 256 }),
  points: integer('points'),

  testId: varchar('test_id')
    .notNull()
    .references(() => tests.id),
})

export const taskRelations = relations(tasks, ({ one, many }) => ({
  test: one(tests, {
    fields: [tasks.testId],
    references: [tests.id],
  }),
  grades: many(taskGrades),
}))

export default tasks
