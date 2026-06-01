/**
 * Deterministic seeded noise. ADR-0001: seeded pseudo-random noise must derive
 * from stable inputs (post id, campaign id, keyword) and NEVER from real time or
 * a fresh random source, or reproducibility — and the defensibility of the
 * evidence — breaks.
 */

/** FNV-1a hash of a string -> 32-bit unsigned int. Stable across runs. */
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

/**
 * A small organic-looking multiplier centred on 1.0, derived deterministically
 * from the given stable inputs. e.g. jitter(±0.12, postId, campaignId).
 */
export function jitter(amplitude: number, ...parts: (string | number)[]): number {
  const r = seededRandom(hashSeed(...parts))();
  return 1 + (r * 2 - 1) * amplitude;
}
