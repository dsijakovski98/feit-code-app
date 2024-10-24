DO $$ BEGIN
 CREATE TYPE "public"."parameter_type" AS ENUM('input', 'output');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."value_type" AS ENUM('string', 'number', 'boolean', 'empty');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inputs" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"value_type" "value_type" NOT NULL,
	"value" varchar(256) NOT NULL,
	"test_id" varchar(256) NOT NULL,
	CONSTRAINT "inputs_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tests" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"output_type" "value_type" NOT NULL,
	"output" varchar(256) NOT NULL,
	"task_id" varchar(256) NOT NULL,
	CONSTRAINT "tests_id_unique" UNIQUE("id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inputs" ADD CONSTRAINT "inputs_test_id_tests_id_fk" FOREIGN KEY ("test_id") REFERENCES "public"."tests"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tests" ADD CONSTRAINT "tests_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
