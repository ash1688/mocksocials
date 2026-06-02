import type { Platform } from "@/lib/simulation/types";

/** Per-platform presentation. Mock* wordmarks only — no real logos/trademarks
 *  (ADR-0005 fidelity). Theme class sets --platform (see globals.css). */
export interface PlatformMeta {
  wordmark: string;
  themeClass: string;
  postNoun: string; // "Tweet", "Post", "Video"
  audienceNoun: string; // "Followers", "Subscribers"
  layout: "feed" | "grid" | "channel"; // render shape
}

export const PLATFORM_META: Record<Platform, PlatformMeta> = {
  mocktweet: {
    wordmark: "MockTweet",
    themeClass: "platform-mocktweet",
    postNoun: "Tweet",
    audienceNoun: "Followers",
    layout: "feed",
  },
  mockbook: {
    wordmark: "MockBook",
    themeClass: "platform-mockbook",
    postNoun: "Post",
    audienceNoun: "Followers",
    layout: "feed",
  },
  mockgram: {
    wordmark: "MockGram",
    themeClass: "platform-mockgram",
    postNoun: "Post",
    audienceNoun: "Followers",
    layout: "grid",
  },
  mocktube: {
    wordmark: "MockTube",
    themeClass: "platform-mocktube",
    postNoun: "Video",
    audienceNoun: "Subscribers",
    layout: "channel",
  },
};
