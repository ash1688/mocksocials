import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { YtSubnav } from "@/components/youtube/yt-subnav";
import { upload } from "@/lib/youtube/actions";

// Faithful port of PHP yt_upload_form().
export default async function YoutubeUploadPage() {
  const me = await requireUser();

  return (
    <>
      <AppChrome user={me} active="youtube" />
      <main className="content">
        <YtSubnav active="/youtube/upload" />
        <div className="card upload-form">
          <h2>Upload a video</h2>
          <form action={upload}>
            <label>
              Video title
              <input name="title" required maxLength={255} />
            </label>
            <label>
              Description
              <textarea name="content" rows={4} />
            </label>
            <label>
              Thumbnail URL
              <input
                name="thumbnail_url"
                placeholder="https://picsum.photos/640/360 (leave blank for random)"
              />
            </label>
            <label>
              Duration label
              <input name="duration" placeholder="e.g. 10:24" defaultValue="10:00" />
            </label>
            <label>
              Stats profile
              <select name="stats_profile" defaultValue="moderate">
                <option value="low">Low — 200–800 views, +5 to +20 subs</option>
                <option value="moderate">
                  Moderate — 5k–25k views, +50 to +300 subs
                </option>
                <option value="high">High — 100k–500k views, +2k to +10k subs</option>
                <option value="hyped">Hyped — 1M–5M views, +20k to +100k subs</option>
                <option value="viral">Viral — 10M–80M views, +100k to +2M subs</option>
              </select>
            </label>
            <button className="btn-youtube">Publish</button>
          </form>
        </div>
      </main>
    </>
  );
}
