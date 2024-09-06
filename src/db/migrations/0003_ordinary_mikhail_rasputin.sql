DO $$ BEGIN
 CREATE TYPE "public"."teacher_type" AS ENUM('Course Professor', 'Teaching Assistant');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "professors" ADD COLUMN "type" "teacher_type" NOT NULL;