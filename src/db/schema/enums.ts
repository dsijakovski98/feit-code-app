import { pgEnum } from 'drizzle-orm/pg-core'

export const teacherType = pgEnum('teacher_type', ['professor', 'assistant'])

export const programmingLanguage = pgEnum('programming_language', ['javascript', 'python', 'c', 'cpp', 'sh'])

export const taskStatus = pgEnum('task_status', ['submitted', 'graded'])
