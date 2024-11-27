ALTER TABLE "submissions" DROP CONSTRAINT "submissions_grader_id_professors_user_id_fk";
--> statement-breakpoint
ALTER TABLE "submissions" ALTER COLUMN "grader_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "submissions" ALTER COLUMN "points" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "submissions" ADD COLUMN "exam_id" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submissions" ADD CONSTRAINT "submissions_exam_id_exams_id_fk" FOREIGN KEY ("exam_id") REFERENCES "public"."exams"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submissions" ADD CONSTRAINT "submissions_grader_id_professors_user_id_fk" FOREIGN KEY ("grader_id") REFERENCES "public"."professors"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "submissions" DROP COLUMN IF EXISTS "task_urls";