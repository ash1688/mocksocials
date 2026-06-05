import { describe, it, expect } from "vitest";

import { deriveSubScores, missionTerms, type PostContent } from "./derive";

const base: PostContent = {
  platform: "twitter",
  body: "Join our autumn workshops and learn skilled trades with hands-on mentoring.",
  hasImage: false,
  hasVideo: false,
  hashtags: ["apprenticeships", "skills"],
  callToAction: true,
  postingDay: 1, // Tue
  postingMinute: 18 * 60, // 18:00
  ageDays: 0,
};

const ctx = {
  keywords: ["apprenticeships", "skills", "trades"],
  missionTerms: missionTerms(
    "A charity getting young people into skilled technical trades.",
  ),
};

describe("deriveSubScores (the teachable mappings)", () => {
  it("is deterministic", () => {
    expect(deriveSubScores(base, ctx)).toEqual(deriveSubScores(base, ctx));
  });

  it("flags wrong-format for a text-only MockTube (video) post", () => {
    const d = deriveSubScores({ ...base, platform: "youtube" }, ctx);
    expect(d.gates.wrongFormat).toBe(true);
    expect(d.subScores.format).toBeLessThan(0.3);
  });

  it("does NOT flag wrong-format for a text post on MockTweet", () => {
    expect(deriveSubScores(base, ctx).gates.wrongFormat).toBe(false);
  });

  it("an image on MockGram (image platform) scores top format", () => {
    const d = deriveSubScores({ ...base, platform: "instagram", hasImage: true }, ctx);
    expect(d.subScores.format).toBe(1);
    expect(d.gates.wrongFormat).toBe(false);
  });

  it("rewards keyword-strategy presence over its absence", () => {
    const withKw = deriveSubScores(base, ctx).subScores.keywords;
    const without = deriveSubScores(
      { ...base, body: "generic text", hashtags: [] },
      ctx,
    ).subScores.keywords;
    expect(withKw).toBeGreaterThan(without);
  });

  it("flags hashtag spam past 8 tags", () => {
    const tags = Array.from({ length: 9 }, (_, i) => `tag${i}`);
    expect(deriveSubScores({ ...base, hashtags: tags }, ctx).gates.hashtagSpam).toBe(true);
  });

  it("evening weekday timing beats 3am timing", () => {
    const evening = deriveSubScores(base, ctx).subScores.timing;
    const small = deriveSubScores({ ...base, postingMinute: 3 * 60 }, ctx).subScores.timing;
    expect(evening).toBeGreaterThan(small);
  });

  it("freshness decays as the campaign clock advances", () => {
    const fresh = deriveSubScores(base, ctx).subScores.freshness;
    const stale = deriveSubScores({ ...base, ageDays: 30 }, ctx).subScores.freshness;
    expect(fresh).toBeGreaterThan(stale);
  });

  it("call-to-action and on-mission copy lift quality", () => {
    const strong = deriveSubScores(base, ctx).subScores.quality;
    const weak = deriveSubScores(
      { ...base, callToAction: false, body: "buy now" },
      ctx,
    ).subScores.quality;
    expect(strong).toBeGreaterThan(weak);
  });
});
