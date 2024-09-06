DO $$ BEGIN
 CREATE TYPE "public"."module_type" AS ENUM('KTI', 'KSIAR', 'KHIE', 'TKII');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "teacher_type" ADD VALUE 'Course Professor';--> statement-breakpoint
ALTER TYPE "teacher_type" ADD VALUE 'Teaching Assistant';--> statement-breakpoint
ALTER TABLE "professors" ALTER COLUMN "type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "professors" ADD COLUMN "department" "module_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "bio" varchar(512);--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "major" "module_type" NOT NULL;
