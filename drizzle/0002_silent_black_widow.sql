CREATE TABLE "metric_snapshots" (
	"id" serial PRIMARY KEY NOT NULL,
	"campaign_id" integer NOT NULL,
	"simulation_id" integer NOT NULL,
	"platform" "platform" NOT NULL,
	"metric" "metric" NOT NULL,
	"value" integer NOT NULL,
	CONSTRAINT "metric_snapshots_unique" UNIQUE("simulation_id","platform","metric")
);
--> statement-breakpoint
CREATE TABLE "post_metrics" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_id" integer NOT NULL,
	"simulation_id" integer NOT NULL,
	"performance_score" double precision NOT NULL,
	"reach" integer DEFAULT 0 NOT NULL,
	"likes" integer DEFAULT 0 NOT NULL,
	"shares" integer DEFAULT 0 NOT NULL,
	"comments" integer DEFAULT 0 NOT NULL,
	"followers_gained" integer DEFAULT 0 NOT NULL,
	"factors_total" double precision,
	"hints" jsonb DEFAULT '[]'::jsonb NOT NULL,
	CONSTRAINT "post_metrics_unique" UNIQUE("post_id","simulation_id")
);
--> statement-breakpoint
CREATE TABLE "search_rankings" (
	"id" serial PRIMARY KEY NOT NULL,
	"campaign_id" integer NOT NULL,
	"keyword_id" integer NOT NULL,
	"simulation_id" integer NOT NULL,
	"position" integer NOT NULL,
	CONSTRAINT "search_rankings_unique" UNIQUE("keyword_id","simulation_id")
);
--> statement-breakpoint
CREATE TABLE "simulations" (
	"id" serial PRIMARY KEY NOT NULL,
	"campaign_id" integer NOT NULL,
	"step_index" integer DEFAULT 0 NOT NULL,
	"step" "sim_step" DEFAULT 'day' NOT NULL,
	"from_clock" date NOT NULL,
	"to_clock" date NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "campaign_published_on" date;--> statement-breakpoint
ALTER TABLE "metric_snapshots" ADD CONSTRAINT "metric_snapshots_campaign_id_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "metric_snapshots" ADD CONSTRAINT "metric_snapshots_simulation_id_simulations_id_fk" FOREIGN KEY ("simulation_id") REFERENCES "public"."simulations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_metrics" ADD CONSTRAINT "post_metrics_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_metrics" ADD CONSTRAINT "post_metrics_simulation_id_simulations_id_fk" FOREIGN KEY ("simulation_id") REFERENCES "public"."simulations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "search_rankings" ADD CONSTRAINT "search_rankings_campaign_id_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "search_rankings" ADD CONSTRAINT "search_rankings_keyword_id_keywords_id_fk" FOREIGN KEY ("keyword_id") REFERENCES "public"."keywords"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "search_rankings" ADD CONSTRAINT "search_rankings_simulation_id_simulations_id_fk" FOREIGN KEY ("simulation_id") REFERENCES "public"."simulations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "simulations" ADD CONSTRAINT "simulations_campaign_id_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "metric_snapshots_campaign_idx" ON "metric_snapshots" USING btree ("campaign_id");--> statement-breakpoint
CREATE INDEX "post_metrics_sim_idx" ON "post_metrics" USING btree ("simulation_id");--> statement-breakpoint
CREATE INDEX "search_rankings_campaign_idx" ON "search_rankings" USING btree ("campaign_id");--> statement-breakpoint
CREATE INDEX "simulations_campaign_idx" ON "simulations" USING btree ("campaign_id");