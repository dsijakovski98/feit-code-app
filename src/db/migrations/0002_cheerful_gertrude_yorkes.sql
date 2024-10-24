ALTER TABLE "task_grades" RENAME TO "submissions";--> statement-breakpoint
ALTER TABLE "submissions" DROP CONSTRAINT "task_grades_grader_id_professors_user_id_fk";
--> statement-breakpoint
ALTER TABLE "submissions" DROP CONSTRAINT "task_grades_student_id_students_user_id_fk";
--> statement-breakpoint
ALTER TABLE "submissions" DROP CONSTRAINT "task_grades_task_id_tasks_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submissions" ADD CONSTRAINT "submissions_grader_id_professors_user_id_fk" FOREIGN KEY ("grader_id") REFERENCES "public"."professors"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submissions" ADD CONSTRAINT "submissions_student_id_students_user_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submissions" ADD CONSTRAINT "submissions_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
