/**
 * Deterministic seeded noise. Seeded pseudo-random noise derives from stable
 * inputs (post id, campaign id, keyword, step index) and NEVER from real time,
 * so re-running a simulation reproduces the numbers (ADR-0001).
 */

/** FNV-1a hash of the parts -> 32-bit unsigned int. Stable across runs. */
export function hashSeed(...parts: (string | number)[]): number {
  let h = 0x811c9dc5;
  const str = parts.join("|");
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** mulberry32 PRNG: seed -> a function yielding deterministic floats in [0, 1). */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A small organic multiplier centred on 1.0, derived deterministically from
 *  the given stable inputs. e.g. jitter(0.12, postId, campaignId). */
export function jitter(amplitude: number, ...parts: (string | number)[]): number {
  const r = seededRandom(hashSeed(...parts))();
  return 1 + (r * 2 - 1) * amplitude;
}
