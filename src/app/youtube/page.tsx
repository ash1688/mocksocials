import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { getFeed } from "@/lib/youtube/queries";
import { YtCard } from "@/components/youtube/yt-card";
import { YtSubnav } from "@/components/youtube/yt-subnav";

// Faithful port of PHP yt_feed().
export default async function YoutubeFeedPage() {
  const me = await requireUser();
  const videos = await getFeed();

  return (
    <>
      <AppChrome user={me} active="youtube" />
      <main className="content">
        <YtSubnav active="/youtube" />
        <div className="yt-grid">
          {videos.map((v) => (
            <YtCard key={v.postId} video={v} />
          ))}
        </div>
      </main>
    </>
  );
}
