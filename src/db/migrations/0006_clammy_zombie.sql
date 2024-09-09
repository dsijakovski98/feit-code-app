DO $$ BEGIN
 CREATE TYPE "public"."exam_status" AS ENUM('New', 'Ongoing', 'Completed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."user_type" AS ENUM('Student', 'Professor');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "task_status" ADD VALUE 'Submitted';--> statement-breakpoint
ALTER TYPE "task_status" ADD VALUE 'In Progress';--> statement-breakpoint
ALTER TYPE "task_status" ADD VALUE 'Graded';--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "academic_year" varchar(128) NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "category" varchar(256);--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "archived" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "exams" ADD COLUMN "name" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "exams" ADD COLUMN "status" "exam_status" DEFAULT 'New' NOT NULL;--> statement-breakpoint
ALTER TABLE "student_courses" ADD COLUMN "grade" numeric(2);--> statement-breakpoint
ALTER TABLE "student_courses" ADD COLUMN "joined_at" timestamp DEFAULT now() NOT NULL;
