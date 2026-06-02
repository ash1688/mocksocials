/**
 * Deterministic persona comments on the Organisation's posts (CONTEXT.md: the
 * audience reacts to content). The Simulation generates these — they are
 * engagement the Organisation *receives*, not Student-authored. A representative
 * SAMPLE is rendered (a post can show "12 comments" but list only a few), and
 * they are regenerated each simulation to reflect the latest snapshot (ADR-0005
 * single-snapshot rule). Threads cap at one level; personas never reply to the
 * Organisation (CONTEXT.md), so these are always top-level.
 *
 * Deterministic: persona + wording derive from (post id, step index, index),
 * never wall-clock — reproducible for screenshots (ADR-0001).
 */
import { hashSeed } from "./rng";

/** Max comment rows materialised per post (the displayed count can be higher). */
const MAX_SAMPLE = 3;

const TEMPLATES = [
  "Love this! 👏",
  "How do I sign up?",
  "This is exactly what our area needs.",
  "My nephew would be all over this.",
  "Where is this based?",
  "Brilliant work 🙌",
  "Can adults join too?",
  "Sharing with my college group!",
];

export interface GeneratedComment {
  personaId: string;
  body: string;
}

/** Build the sampled persona comments for one post. `commentCount` is the
 *  simulation's comment number for the post; the sample size is capped. */
export function buildPersonaComments(
  postId: string,
  stepIndex: number,
  commentCount: number,
  personaIds: string[],
): GeneratedComment[] {
  if (commentCount <= 0 || personaIds.length === 0) return [];
  const sample = Math.min(commentCount, MAX_SAMPLE, personaIds.length);
  // Distinct persona + wording within a post: offset from a seeded base, then
  // step by i. 3 is coprime to the 8 templates, so small samples never repeat.
  const baseP = hashSeed(postId, stepIndex, "p") % personaIds.length;
  const baseB = hashSeed(postId, stepIndex, "b") % TEMPLATES.length;
  const out: GeneratedComment[] = [];
  for (let i = 0; i < sample; i++) {
    const persona = personaIds[(baseP + i) % personaIds.length]!;
    const body = TEMPLATES[(baseB + i * 3) % TEMPLATES.length]!;
    out.push({ personaId: persona, body });
  }
  return out;
}
