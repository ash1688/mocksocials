/**
 * Media helpers for the platform renders (ADR-0005). Images hot-link from
 * seeded Picsum so the same post always shows the same image — preserving
 * ADR-0001 reproducibility (the seed is the post id; no Student data leaves).
 * MockTube has no real video: a seeded thumbnail + play overlay + MM:SS badge.
 */

const PICSUM = "https://picsum.photos/seed";

/** Deterministic image URL for a post. */
export function picsumImage(postId: string, w: number, h: number): string {
  return `${PICSUM}/${encodeURIComponent(postId)}/${w}/${h}`;
}

/** Seconds -> "M:SS" (or "MM:SS"). Returns null for missing/invalid input. */
export function formatDuration(seconds: number | null): string | null {
  if (seconds === null || !Number.isFinite(seconds) || seconds < 0) return null;
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}
