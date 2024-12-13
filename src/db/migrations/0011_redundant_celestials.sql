CREATE TABLE IF NOT EXISTS "exam_session_stats" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"paste_count" integer DEFAULT 0,
	"time_off" json DEFAULT '{}'::json,
	CONSTRAINT "exam_session_stats_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "submissions" ADD COLUMN "session_stats_id" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submissions" ADD CONSTRAINT "submissions_session_stats_id_exam_session_stats_id_fk" FOREIGN KEY ("session_stats_id") REFERENCES "public"."exam_session_stats"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
