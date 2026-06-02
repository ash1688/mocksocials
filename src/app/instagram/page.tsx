import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { getFeed, getStoryBar } from "@/lib/instagram/queries";
import { post } from "@/lib/instagram/actions";
import { IgPostCard } from "@/components/instagram/ig-post-card";
import { StoryBar, IgSubnav } from "@/components/instagram/story-bar";

// Faithful port of PHP ig_feed().
export default async function InstagramFeedPage() {
  const me = await requireUser();
  const [feed, stories] = await Promise.all([getFeed(me.id), getStoryBar()]);

  return (
    <>
      <AppChrome user={me} active="instagram" />
      <main className="content">
        <IgSubnav active="/instagram" />
        <StoryBar stories={stories} />
        <div className="composer card ig-composer">
          <form action={post}>
            <input type="hidden" name="_return" value="/instagram" />
            <label>
              Image URL (required)
              <input name="image_url" required placeholder="https://picsum.photos/600/600" />
            </label>
            <label>
              Caption
              <textarea name="content" placeholder="Write a caption..." />
            </label>
            <button className="btn-instagram">Share</button>
          </form>
        </div>
        <div className="ig-feed">
          {feed.map((p) => (
            <IgPostCard key={p.id} post={p} returnTo="/instagram" />
          ))}
        </div>
      </main>
    </>
  );
}
