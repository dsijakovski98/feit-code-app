import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'

import indexCards from '@/db/schema/indexCards'
import studentCourses from '@/db/schema/studentCourses'
import taskGrades from '@/db/schema/taskGrades'
import { userId } from '@/db/schema/utils'

const students = pgTable('students', {
  id: userId(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 256 }).notNull().unique(),
})

export const studentRelations = relations(students, ({ one, many }) => ({
  indexCard: one(indexCards, {
    fields: [students.id],
    references: [indexCards.id],
  }),

  courses: many(studentCourses),
  taskGrades: many(taskGrades),
}))

export default students
