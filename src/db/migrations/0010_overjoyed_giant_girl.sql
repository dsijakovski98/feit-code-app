ALTER TABLE "submissions" ADD COLUMN "submitted_at" timestamp DEFAULT now() NOT NULL;