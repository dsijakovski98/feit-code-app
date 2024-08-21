import { createId } from '@paralleldrive/cuid2'
import { text, varchar } from 'drizzle-orm/pg-core'

export const PRIMARY_ID_LEN = 128

export const userId = (name: string = 'user_id') => {
  return text(name).notNull().primaryKey()
}

export const primaryId = (name: string = 'id') => {
  return varchar(name, { length: PRIMARY_ID_LEN }).$defaultFn(createId).unique().primaryKey()
}
