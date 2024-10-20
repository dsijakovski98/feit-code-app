ALTER TABLE "inputs" ADD COLUMN "order_index" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "inputs" ADD CONSTRAINT "inputs_order_index_unique" UNIQUE("order_index");