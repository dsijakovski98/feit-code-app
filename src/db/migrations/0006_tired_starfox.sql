ALTER TABLE "courses" DROP CONSTRAINT "courses_professor_id_professors_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "courses" ADD CONSTRAINT "courses_professor_id_professors_user_id_fk" FOREIGN KEY ("professor_id") REFERENCES "public"."professors"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
