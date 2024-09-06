DO $$ BEGIN
 CREATE TYPE "public"."professor_type" AS ENUM('Course Professor', 'Teaching Assistant');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "professors" DROP COLUMN IF EXISTS "type";