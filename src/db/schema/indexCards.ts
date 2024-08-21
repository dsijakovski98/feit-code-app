import { integer, pgTable, text } from 'drizzle-orm/pg-core'

import students from '@/db/schema/students'
import { primaryId } from '@/db/schema/utils'

const indexCards = pgTable('index_cards', {
  id: primaryId(),
  number: integer('number').notNull(),
  year: integer('year').notNull(),

  studentId: text('student_id')
    .notNull()
    .references(() => students.id),
})

export default indexCards
