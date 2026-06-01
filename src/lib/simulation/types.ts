/** Shared simulation types. Kept separate so pure scoring logic has no DB deps. */

export type Platform = "mocktweet" | "mockbook" | "mockgram" | "mocktube";

export const PLATFORMS: readonly Platform[] = [
  "mocktweet",
  "mockbook",
  "mockgram",
  "mocktube",
] as const;

/** Which rich-media format a platform expects, for the wrong-format gate. */
export const PLATFORM_EXPECTS: Record<Platform, "text" | "image" | "video"> = {
  mocktweet: "text",
  mockbook: "text",
  mockgram: "image",
  mocktube: "video",
};
