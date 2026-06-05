/**
 * Hint chips (CONTEXT.md: Hint chip). Short qualitative tags shown on a post
 * that nudge the student toward what helped or hurt — WITHOUT revealing the
 * performance-score math. Always visible to students; the numeric score stays
 * teacher-only. Pure and deterministic.
 */
import { PLATFORM_LABELS } from "@/lib/campaign/constants";
import type { PostContent, Derived, DeriveContext } from "./derive";

export type HintTone = "good" | "bad";
export interface HintChip {
  label: string;
  tone: HintTone;
}

const MAX_CHIPS = 4;

export function buildHintChips(
  c: PostContent,
  derived: Derived,
  ctx: DeriveContext,
): HintChip[] {
  const bad: HintChip[] = [];
  const good: HintChip[] = [];
  const s = derived.subScores;

  if (derived.gates.wrongFormat) {
    bad.push({ label: `wrong format for ${PLATFORM_LABELS[c.platform]}`, tone: "bad" });
  } else if (c.hasVideo) {
    good.push({ label: "had a video", tone: "good" });
  } else if (c.hasImage) {
    good.push({ label: "had an image", tone: "good" });
  }

  if (derived.gates.hashtagSpam) {
    bad.push({ label: "too many hashtags", tone: "bad" });
  } else if (c.hashtags.length === 0) {
    bad.push({ label: "no hashtags", tone: "bad" });
  }

  if (ctx.keywords.length > 0) {
    if (s.keywords >= 0.8) good.push({ label: "used your keywords", tone: "good" });
    else if (s.keywords < 0.45) bad.push({ label: "missing your keywords", tone: "bad" });
  }

  if (s.timing >= 0.75) good.push({ label: "posted at peak time", tone: "good" });
  else if (s.timing < 0.4) bad.push({ label: "posted off-peak", tone: "bad" });

  if (c.callToAction) good.push({ label: "clear call to action", tone: "good" });
  else bad.push({ label: "no call to action", tone: "bad" });

  if (c.ageDays > 14) bad.push({ label: "getting stale", tone: "bad" });

  return [...bad, ...good].slice(0, MAX_CHIPS);
}
