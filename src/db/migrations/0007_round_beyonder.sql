ALTER TABLE "inputs" DROP CONSTRAINT "inputs_order_index_unique";--> statement-breakpoint
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_order_index_unique";--> statement-breakpoint
ALTER TABLE "inputs" DROP CONSTRAINT "inputs_test_id_tests_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inputs" ADD CONSTRAINT "inputs_test_id_tests_id_fk" FOREIGN KEY ("test_id") REFERENCES "public"."tests"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
