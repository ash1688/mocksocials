import { requireUser } from "@/lib/auth/guards";
import { AppChrome } from "@/components/app-chrome";
import { getUserStats, STAT_KEYS, type Platform } from "@/lib/stats";
import { saveStats, applyPreset } from "./actions";

const PLATFORMS: Platform[] = ["twitter", "facebook", "instagram", "youtube"];
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const humanize = (k: string) =>
  k.split("_").map(cap).join(" ");

// Faithful port of PHP handle_stats() — per-platform manual stats + autofill.
export default async function StatsPage({
  searchParams,
}: {
  searchParams: Promise<{ platform?: string; saved?: string; preset?: string }>;
}) {
  const me = await requireUser();
  const sp = await searchParams;
  const platform: Platform = (PLATFORMS as string[]).includes(sp.platform ?? "")
    ? (sp.platform as Platform)
    : "twitter";
  const stats = await getUserStats(me.id, platform);

  const flash = sp.preset
    ? `Auto-filled "${cap(sp.preset)}" preset.`
    : sp.saved
      ? "Stats updated."
      : null;

  return (
    <>
      <AppChrome user={me} active={platform} />
      <main className="content">
        {flash ? <div className="flash">{flash}</div> : null}
        <h2>Edit stats — {cap(platform)}</h2>

        <div className="stats-tabs">
          {PLATFORMS.map((p) => (
            <a key={p} className={p === platform ? "active" : ""} href={`/stats?platform=${p}`}>
              {cap(p)}
            </a>
          ))}
        </div>

        <div className="card">
          <h3>Auto-fill preset</h3>
          <form action={applyPreset} className="inline">
            <input type="hidden" name="platform" value={platform} />
            <button name="preset" value="low" className="btn-outline">
              Low
            </button>{" "}
            <button name="preset" value="medium" className="btn-outline">
              Medium
            </button>{" "}
            <button name="preset" value="high" className="btn-outline">
              High
            </button>
          </form>
          <p className="muted small">
            Applies realistic randomised values across all stat fields for this
            platform. You can still edit individual values afterwards.
          </p>
        </div>

        <div className="card">
          <h3>Manual values</h3>
          <form action={saveStats}>
            <input type="hidden" name="platform" value={platform} />
            {STAT_KEYS[platform].map((k) => (
              <label key={k}>
                {humanize(k)}
                <input type="number" name={k} defaultValue={stats[k] ?? 0} />
              </label>
            ))}
            <button>Save</button>
          </form>
        </div>
      </main>
    </>
  );
}
