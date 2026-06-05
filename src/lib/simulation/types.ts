/** Shared simulation types. Pure scoring logic has no DB deps. The platform
 *  keys are the faithful values (twitter/facebook/instagram/youtube). */

export type Platform = "twitter" | "facebook" | "instagram" | "youtube";

export const PLATFORMS: readonly Platform[] = [
  "twitter",
  "facebook",
  "instagram",
  "youtube",
] as const;

/** Which rich-media format a platform expects, for the wrong-format gate.
 *  MockTweet/MockBook = text-led, MockGram = image-led, MockTube = video-led. */
export const PLATFORM_EXPECTS: Record<Platform, "text" | "image" | "video"> = {
  twitter: "text",
  facebook: "text",
  instagram: "image",
  youtube: "video",
};
