import Link from "next/link";

/** Faithful port of PHP twitter_trending() sidebar card. */
export function Trending({ trends }: { trends: { tag: string; count: number }[] }) {
  return (
    <div className="card">
      <h3>Trends</h3>
      {trends.length === 0 ? <p className="muted">No trends yet.</p> : null}
      {trends.map((t) => (
        <Link
          key={t.tag}
          className="trend-row"
          href={`/twitter/hashtag/${encodeURIComponent(t.tag)}`}
        >
          <div className="trend-tag">#{t.tag}</div>
          <div className="muted small">{t.count} tweets</div>
        </Link>
      ))}
    </div>
  );
}
