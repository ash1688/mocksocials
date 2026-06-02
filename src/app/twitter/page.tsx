import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { getFeed, getTrending } from "@/lib/twitter/queries";
import { Composer } from "@/components/twitter/composer";
import { TweetCard } from "@/components/twitter/tweet-card";
import { Trending } from "@/components/twitter/trending";

// Faithful port of PHP twitter_feed().
export default async function TwitterFeedPage() {
  const me = await requireUser();
  const [feed, trends] = await Promise.all([getFeed(me.id), getTrending()]);

  return (
    <>
      <AppChrome user={me} active="twitter" />
      <main className="content">
        <div className="tw-layout">
          <div className="tw-main">
            <Composer returnTo="/twitter" />
            {feed.map((item) => (
              <TweetCard key={item.rowId} item={item} returnTo="/twitter" />
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
