DO $$ BEGIN
 CREATE TYPE "public"."programming_language" AS ENUM('JavaScript', 'C', 'Bash', 'TypeScript', 'C++', 'Go', 'Python', 'Rust', 'PHP');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."task_status" AS ENUM('submitted', 'in-progress', 'graded');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."teacher_type" AS ENUM('professor', 'assistant');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "courses" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"description" varchar(2048),
	"professor_id" text NOT NULL,
	"assistant_id" text,
	CONSTRAINT "courses_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "exams" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"duration" timestamp NOT NULL,
	"points" integer NOT NULL,
	"programming_language" "programming_language" NOT NULL,
	"course_id" varchar NOT NULL,
	CONSTRAINT "exams_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "professors" (
	"user_id" text PRIMARY KEY NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"email" varchar(256) NOT NULL,
	"type" "teacher_type",
	CONSTRAINT "professors_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "student_courses" (
	"student_id" text NOT NULL,
	"course_id" varchar NOT NULL,
	CONSTRAINT "student_courses_student_id_course_id_pk" PRIMARY KEY("student_id","course_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "students" (
	"user_id" text PRIMARY KEY NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"email" varchar(256) NOT NULL,
	"idx_number" integer NOT NULL,
	"idx_year" integer NOT NULL,
	CONSTRAINT "students_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task_grades" (
	"grader_id" text NOT NULL,
	"status" "task_status",
	"file_url" varchar(256) NOT NULL,
	"points" integer NOT NULL,
	"feedback" varchar(10000),
	"student_id" text NOT NULL,
	"task_id" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tasks" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"order_index" integer NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" varchar(256),
	"points" integer,
	"exam_id" varchar NOT NULL,
	CONSTRAINT "tasks_id_unique" UNIQUE("id"),
	CONSTRAINT "tasks_order_index_unique" UNIQUE("order_index")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "courses" ADD CONSTRAINT "courses_professor_id_professors_user_id_fk" FOREIGN KEY ("professor_id") REFERENCES "public"."professors"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "courses" ADD CONSTRAINT "courses_assistant_id_professors_user_id_fk" FOREIGN KEY ("assistant_id") REFERENCES "public"."professors"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exams" ADD CONSTRAINT "exams_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "student_courses" ADD CONSTRAINT "student_courses_student_id_students_user_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "student_courses" ADD CONSTRAINT "student_courses_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task_grades" ADD CONSTRAINT "task_grades_grader_id_professors_user_id_fk" FOREIGN KEY ("grader_id") REFERENCES "public"."professors"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task_grades" ADD CONSTRAINT "task_grades_student_id_students_user_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task_grades" ADD CONSTRAINT "task_grades_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_exam_id_exams_id_fk" FOREIGN KEY ("exam_id") REFERENCES "public"."exams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
