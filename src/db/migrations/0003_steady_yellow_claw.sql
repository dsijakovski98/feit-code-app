ALTER TABLE "submissions" RENAME COLUMN "file_url" TO "task_urls";--> statement-breakpoint
ALTER TABLE "submissions" DROP CONSTRAINT "submissions_task_id_tasks_id_fk";
--> statement-breakpoint
ALTER TABLE "submissions" ADD COLUMN "id" varchar(128) PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "submissions" DROP COLUMN IF EXISTS "task_id";--> statement-breakpoint
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_id_unique" UNIQUE("id");