ALTER TABLE "user_subscriptions" ADD COLUMN "customer_id" text;--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD COLUMN "total_amount" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD COLUMN "billing_name" text;--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_customer_id_unique" UNIQUE("customer_id");