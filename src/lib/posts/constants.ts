/** Posting day/time helpers (CONTEXT.md: Posting day/time). Day 0 = Monday. */

export const DAY_LABELS = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
] as const;

/** Minutes-since-midnight -> "HH:MM". */
export function formatMinute(minute: number): string {
  const h = Math.floor(minute / 60);
  const m = minute % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** "HH:MM" -> minutes-since-midnight, or null if malformed. */
export function parseTimeToMinute(value: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const h = Number(match[1]);
  const m = Number(match[2]);
  if (h < 0 || h > 23 || m < 0 || m > 59) return null;
  return h * 60 + m;
}

/** "M:SS" / "MM:SS" -> total seconds, or null if malformed (MockTube length). */
export function parseMmSsToSeconds(value: string): number | null {
  const v = value.trim();
  if (!v) return null;
  const match = /^(\d{1,3}):(\d{2})$/.exec(v);
  if (!match) return null;
  const m = Number(match[1]);
  const s = Number(match[2]);
  if (s > 59) return null;
  return m * 60 + s;
}

/** Parse a free-text hashtag field into clean, de-duplicated tags (no #). */
export function parseHashtags(raw: string): string[] {
  const seen = new Set<string>();
  for (const part of raw.split(/[\s,]+/)) {
    const tag = part.replace(/^#/, "").trim().toLowerCase();
    if (tag) seen.add(tag);
  }
  return [...seen];
}
