/**
 * Deterministic persona comments on the Organisation's posts (CONTEXT.md: the
 * audience reacts to content). The Simulation generates these — engagement the
 * Organisation *receives*, not Student-authored. A representative SAMPLE is
 * materialised (a post can show "12 comments" but list a few). Threads cap at
 * one level; personas never reply to the Organisation (CONTEXT.md).
 *
 * Ids are DETERMINISTIC (derived from post id + slot) and STABLE across
 * simulations, so the Organisation's replies (parentId) and comment likes
 * survive re-simulation. Re-running reproduces the same rows (ADR-0001);
 * comments are upserted, not regenerated.
 */
import { createHash } from "node:crypto";

import { hashSeed } from "./rng";

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

/** A stable UUID derived from arbitrary parts (SHA-1 → uuid layout). */
export function deterministicUuid(...parts: (string | number)[]): string {
  const h = createHash("sha1").update(parts.join("|")).digest("hex").slice(0, 32);
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20, 32)}`;
}

export interface GeneratedComment {
  id: string;
  personaId: string;
  body: string;
}

/** Build the sampled persona comments for one post. Stable ids + wording so
 *  re-simulation upserts the same rows. */
export function buildPersonaComments(
  postId: string,
  commentCount: number,
  personaIds: string[],
): GeneratedComment[] {
  if (commentCount <= 0 || personaIds.length === 0) return [];
  const sample = Math.min(commentCount, MAX_SAMPLE, personaIds.length);
  // Distinct persona + wording within a post; 3 is coprime to the 8 templates.
  const baseP = hashSeed(postId, "p") % personaIds.length;
  const baseB = hashSeed(postId, "b") % TEMPLATES.length;
  const out: GeneratedComment[] = [];
  for (let i = 0; i < sample; i++) {
    out.push({
      id: deterministicUuid(postId, "comment", i),
      personaId: personaIds[(baseP + i) % personaIds.length]!,
      body: TEMPLATES[(baseB + i * 3) % TEMPLATES.length]!,
    });
  }
  return out;
}
