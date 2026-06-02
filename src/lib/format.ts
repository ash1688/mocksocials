// Faithful ports of the PHP display helpers (helpers.php).

/** pretty_number(): 1500 -> "1.5K", 2_000_000 -> "2M". */
export function prettyNumber(n: number): string {
  if (n < 1000) return String(n);
  const trim = (v: number) => String(Number(v.toFixed(1)));
  if (n < 1_000_000) return trim(n / 1000) + "K";
  if (n < 1_000_000_000) return trim(n / 1_000_000) + "M";
  return trim(n / 1_000_000_000) + "B";
}

/** relative_time(): "5s" / "3m" / "2h" / "4d" / "12 Jun". */
export function relativeTime(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

/** platform_label(): the Mock* wordmark for a platform key. */
export function platformLabel(platform: string): string {
  return (
    {
      twitter: "MockTweet",
      facebook: "MockBook",
      instagram: "MockGram",
      youtube: "MockTube",
    }[platform] ?? platform
  );
}
