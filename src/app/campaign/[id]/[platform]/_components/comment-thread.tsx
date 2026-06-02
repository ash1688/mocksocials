import {
  toggleOrgLike,
  replyToComment,
  deleteOrgReply,
} from "@/lib/engagement/actions";
import type { Platform } from "@/lib/simulation/types";
import { Button } from "@/components/ui/button";

export interface ThreadComment {
  id: string;
  parentId: string | null;
  authorKind: "organisation" | "persona";
  body: string;
  personaName: string | null;
  personaHandle: string | null;
}

/**
 * Comment thread with Organisation engagement (ADR-0005). Persona comments
 * (received, simulation-generated) can be liked, and — on the Organisation's
 * own posts — get one Organisation reply. Threads cap at one level; personas
 * never reply back. All of this is cosmetic and never scored.
 */
export function CommentThread({
  campaignId,
  platform,
  ownPost,
  engageable,
  comments,
  likedComments,
  orgName,
}: {
  campaignId: string;
  platform: Platform;
  ownPost: boolean;
  engageable: boolean;
  comments: ThreadComment[];
  likedComments: Set<string>;
  orgName: string;
}) {
  const topLevel = comments.filter((c) => c.parentId === null);
  const replyByParent = new Map<string, ThreadComment>();
  for (const c of comments) if (c.parentId) replyByParent.set(c.parentId, c);

  if (topLevel.length === 0) {
    return (
      <p className="rounded-md border border-dashed p-4 text-center text-xs text-muted-foreground">
        No comments yet — the audience reacts when you simulate.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {topLevel.map((c) => {
        const reply = replyByParent.get(c.id);
        const isLiked = likedComments.has(c.id);
        return (
          <li key={c.id} className="rounded-md border p-3 text-sm">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">
                {c.personaName ?? "Someone"}
              </span>{" "}
              @{c.personaHandle ?? "someone"}
            </p>
            <p className="mt-1 whitespace-pre-wrap">{c.body}</p>

            {engageable ? (
              <div className="mt-2 flex items-center gap-3 text-xs">
                <form action={toggleOrgLike}>
                  <input type="hidden" name="campaignId" value={campaignId} />
                  <input type="hidden" name="platform" value={platform} />
                  <input type="hidden" name="targetType" value="comment" />
                  <input type="hidden" name="targetId" value={c.id} />
                  <button
                    type="submit"
                    className={isLiked ? "text-platform" : "text-muted-foreground hover:text-foreground"}
                  >
                    {isLiked ? "♥ Liked" : "♡ Like"}
                  </button>
                </form>
              </div>
            ) : null}

            {/* The Organisation's reply (one level, on its own posts). */}
            {reply ? (
              <div className="mt-2 ml-5 rounded-md bg-muted/50 p-2">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{orgName}</span>{" "}
                  · Organisation
                </p>
                <p className="mt-1 whitespace-pre-wrap">{reply.body}</p>
                {engageable ? (
                  <form action={deleteOrgReply} className="mt-1">
                    <input type="hidden" name="campaignId" value={campaignId} />
                    <input type="hidden" name="platform" value={platform} />
                    <input type="hidden" name="replyId" value={reply.id} />
                    <button
                      type="submit"
                      className="text-xs text-muted-foreground hover:text-destructive"
                    >
                      remove reply
                    </button>
                  </form>
                ) : null}
              </div>
            ) : ownPost && engageable ? (
              <form action={replyToComment} className="mt-2 ml-5 flex gap-2">
                <input type="hidden" name="campaignId" value={campaignId} />
                <input type="hidden" name="platform" value={platform} />
                <input type="hidden" name="parentId" value={c.id} />
                <input
                  name="body"
                  required
                  placeholder="Reply as the Organisation…"
                  className="h-8 flex-1 rounded-md border border-input bg-background px-2 text-sm"
                />
                <Button type="submit" size="sm" variant="secondary">
                  Reply
                </Button>
              </form>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
