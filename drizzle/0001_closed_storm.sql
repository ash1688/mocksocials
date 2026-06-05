CREATE TYPE "public"."metric" AS ENUM('followers', 'likes', 'shares', 'reach', 'comments');--> statement-breakpoint
CREATE TYPE "public"."sim_step" AS ENUM('day', 'week');--> statement-breakpoint
CREATE TABLE "active_platforms" (
	"campaign_id" integer NOT NULL,
	"platform" "platform" NOT NULL,
	CONSTRAINT "active_platforms_pk" UNIQUE("campaign_id","platform")
);
--> statement-breakpoint
CREATE TABLE "campaign_baselines" (
	"id" serial PRIMARY KEY NOT NULL,
	"campaign_id" integer NOT NULL,
	"platform" "platform" NOT NULL,
	"metric" "metric" NOT NULL,
	"value" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "baselines_unique" UNIQUE("campaign_id","platform","metric")
);
--> statement-breakpoint
CREATE TABLE "campaigns" (
	"id" serial PRIMARY KEY NOT NULL,
	"owner_id" integer NOT NULL,
	"name" text NOT NULL,
	"goal" text,
	"is_active" boolean DEFAULT false NOT NULL,
	"clock" date NOT NULL,
	"start_date" date NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "keywords" (
	"id" serial PRIMARY KEY NOT NULL,
	"campaign_id" integer NOT NULL,
	"term" text NOT NULL,
	CONSTRAINT "keywords_unique" UNIQUE("campaign_id","term")
);
--> statement-breakpoint
CREATE TABLE "targets" (
	"id" serial PRIMARY KEY NOT NULL,
	"campaign_id" integer NOT NULL,
	"platform" "platform",
	"metric" "metric" NOT NULL,
	"target_value" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "campaign_id" integer;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "posting_day" integer;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "posting_minute" integer;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "call_to_action" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "active_platforms" ADD CONSTRAINT "active_platforms_campaign_id_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campaign_baselines" ADD CONSTRAINT "campaign_baselines_campaign_id_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "keywords" ADD CONSTRAINT "keywords_campaign_id_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "targets" ADD CONSTRAINT "targets_campaign_id_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "campaigns_owner_idx" ON "campaigns" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "targets_campaign_idx" ON "targets" USING btree ("campaign_id");--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_campaign_id_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "posts_campaign_idx" ON "posts" USING btree ("campaign_id");