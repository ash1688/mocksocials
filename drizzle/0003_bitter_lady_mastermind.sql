CREATE TABLE "org_likes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workspace_id" uuid NOT NULL,
	"campaign_id" uuid NOT NULL,
	"post_id" uuid,
	"comment_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "org_likes_post_unique" UNIQUE("workspace_id","post_id"),
	CONSTRAINT "org_likes_comment_unique" UNIQUE("workspace_id","comment_id")
);
--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "persona_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "comments" ADD COLUMN "author_kind" "author_kind" NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "duration_seconds" integer;--> statement-breakpoint
ALTER TABLE "org_likes" ADD CONSTRAINT "org_likes_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "org_likes" ADD CONSTRAINT "org_likes_campaign_id_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "org_likes" ADD CONSTRAINT "org_likes_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "org_likes" ADD CONSTRAINT "org_likes_comment_id_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "org_likes_campaign_idx" ON "org_likes" USING btree ("campaign_id");