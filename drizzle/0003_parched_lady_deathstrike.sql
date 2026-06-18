CREATE TABLE "scenario_responses" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"scenario_id" text NOT NULL,
	"task_id" text NOT NULL,
	"selected_index" integer,
	"is_correct" boolean,
	"response_text" text,
	"submitted_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "scenario_responses_unique" UNIQUE("user_id","scenario_id","task_id")
);
--> statement-breakpoint
ALTER TABLE "scenario_responses" ADD CONSTRAINT "scenario_responses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "scenario_responses_user_idx" ON "scenario_responses" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "scenario_responses_scenario_idx" ON "scenario_responses" USING btree ("scenario_id");