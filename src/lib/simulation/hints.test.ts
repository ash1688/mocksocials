import { describe, it, expect } from "vitest";

import { deriveSubScores, missionTerms, type PostContent } from "./derive";
import { buildHintChips } from "./hints";

const ctx = {
  keywords: ["apprenticeships", "skills"],
  missionTerms: missionTerms("Skilled technical trades for young people."),
};

const strong: PostContent = {
  platform: "mocktweet",
  body: "Join our autumn workshops for apprenticeships in skilled trades — sign up today!",
  hasImage: true,
  hasVideo: false,
  hashtags: ["apprenticeships", "skills"],
  callToAction: true,
  postingDay: 1,
  postingMinute: 18 * 60,
  ageDays: 0,
};

function labels(c: PostContent) {
  return buildHintChips(c, deriveSubScores(c, ctx), ctx).map((h) => h.label);
}

describe("buildHintChips (always-visible student nudges, no score math)", () => {
  it("never exposes a numeric score", () => {
    const chips = buildHintChips(strong, deriveSubScores(strong, ctx), ctx);
    for (const c of chips) expect(c.label).not.toMatch(/\d/);
  });

  it("praises a strong post (peak time, CTA)", () => {
    const ls = labels(strong);
    expect(ls).toContain("posted at peak time");
    expect(ls).toContain("clear call to action");
  });

  it("flags a text-only post on a video platform as wrong format", () => {
    const ls = labels({ ...strong, platform: "mocktube", hasImage: false });
    expect(ls).toContain("wrong format for MockTube");
  });

  it("flags missing hashtags and missing call to action", () => {
    const ls = labels({
      ...strong,
      hashtags: [],
      callToAction: false,
    });
    expect(ls).toContain("no hashtags");
    expect(ls).toContain("no call to action");
  });

  it("flags off-peak timing", () => {
    const ls = labels({ ...strong, postingMinute: 3 * 60 });
    expect(ls).toContain("posted off-peak");
  });

  it("caps the number of chips", () => {
    const chips = buildHintChips(
      { ...strong, platform: "mocktube", hasImage: false, hashtags: [], callToAction: false, postingMinute: 3 * 60, ageDays: 40 },
      deriveSubScores(
        { ...strong, platform: "mocktube", hasImage: false, hashtags: [], callToAction: false, postingMinute: 3 * 60, ageDays: 40 },
        ctx,
      ),
      ctx,
    );
    expect(chips.length).toBeLessThanOrEqual(4);
  });
});
