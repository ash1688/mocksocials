import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { getHashtagPosts, getTrending } from "@/lib/twitter/queries";
import { TweetCard } from "@/components/twitter/tweet-card";
import { Trending } from "@/components/twitter/trending";

// Faithful port of PHP twitter_hashtag().
export default async function TwitterHashtagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const me = await requireUser();
  const { tag: raw } = await params;
  const tag = decodeURIComponent(raw).toLowerCase();
  const [rows, trends] = await Promise.all([
    getHashtagPosts(tag, me.id),
    getTrending(),
  ]);
  const returnTo = `/twitter/hashtag/${encodeURIComponent(tag)}`;

  return (
    <>
      <AppChrome user={me} active="twitter" />
      <main className="content">
        <div className="tw-layout">
          <div className="tw-main">
            <h2>#{tag}</h2>
            {rows.length === 0 ? <p className="muted">No tweets yet.</p> : null}
            {rows.map((item) => (
              <TweetCard key={item.rowId} item={item} returnTo={returnTo} />
            ))}
          </div>
          <aside className="tw-side">
            <Trending trends={trends} />
          </aside>
        </div>
      </main>
    </>
  );
}
