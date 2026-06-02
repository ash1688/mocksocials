/**
 * Seed the faithful-port DB: 50 personas, demo logins, and a deterministic pool
 * of persona-authored posts + engagement so every platform feed has content.
 *
 * Run: npm run db:seed   (idempotent — clears seeded content + accounts first)
 */
import "dotenv/config";
import { sql } from "drizzle-orm";

import { db } from "./index";
import {
  users,
  fakeUsers,
  posts,
  likes,
  comments,
  youtubeMeta,
} from "./schema";
import { hashPassword } from "@/lib/auth/password";
import { PERSONAS } from "./personas-data";

type Platform = "twitter" | "facebook" | "instagram" | "youtube";

// Tiny deterministic PRNG (mulberry32) so reseeds produce identical content.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rng = mulberry32(20260602);
const pick = <T>(arr: T[]): T => arr[Math.floor(rng() * arr.length)]!;
const randInt = (lo: number, hi: number) => lo + Math.floor(rng() * (hi - lo + 1));

// Deterministic MockTube seed metrics per stats profile (mirrors youtube_seed).
const YT_PROFILES = ["low", "moderate", "high", "hyped", "viral"] as const;
const YT_RANGES: Record<(typeof YT_PROFILES)[number], [number, number][]> = {
  low: [[200, 800], [10, 40], [2, 8], [5, 20]],
  moderate: [[5000, 25000], [300, 1500], [50, 200], [50, 300]],
  high: [[100000, 500000], [8000, 40000], [1000, 5000], [2000, 10000]],
  hyped: [[1000000, 5000000], [80000, 400000], [10000, 50000], [20000, 100000]],
  viral: [[10000000, 80000000], [500000, 5000000], [50000, 500000], [100000, 2000000]],
};
function ytMetrics(profile: (typeof YT_PROFILES)[number]) {
  const r = YT_RANGES[profile];
  return {
    views: randInt(r[0]![0], r[0]![1]),
    likes: randInt(r[1]![0], r[1]![1]),
    comments: randInt(r[2]![0], r[2]![1]),
    subBoost: randInt(r[3]![0], r[3]![1]),
  };
}

// --- Content pools (ported / adapted from sql/seed_*.sql) ---------------------
const POOLS: Record<Platform, string[]> = {
  twitter: [
    "#Marketing tip: ship the campaign before perfect.",
    "Brands keep asking for \"viral\" like it's a deliverable. #Marketing",
    "Hot take: your funnel is fine, your copy is the problem. #CopyWriting",
    "If your brand voice changes every quarter you don't have one. #Branding",
    "Reminder that \"engagement\" without conversion is just applause. #DigitalMarketing",
    "Hot take: hashtags are punctuation now.",
    "Unpopular opinion: email is still the best channel. #Email",
    "Coffee count: 4. Productivity: questionable.",
    "Mondays should be illegal but here we are.",
    "#Photography is just patience plus light.",
    "It's not AI if it's an if-statement. #AI",
    "Read the docs. Then read them again. #Coding",
  ],
  facebook: [
    "Lovely walk by the river this morning. Highly recommend.",
    "Big thank you to everyone who came to the fundraiser! 🎉",
    "Anyone got recommendations for a good plumber locally?",
    "Throwback to last summer. Where did the time go?",
    "Proud of the team today. Hard work pays off.",
    "Sunday roast sorted. Who's coming round?",
    "Local cafe has a new menu and honestly? Chef's kiss.",
    "Reminder: village hall meeting Thursday at 7.",
    "New chapter starting next week. Wish me luck!",
    "Garden's finally coming together after months of effort.",
    "Found my old school photos. We were so young!",
    "Community litter pick this weekend — all welcome.",
  ],
  instagram: [
    "golden hour never misses ✨ #photography",
    "brunch but make it aesthetic 🥑",
    "new kit, who dis 📸",
    "weekend reset 🌿 #selfcare",
    "city lights hit different 🌃",
    "homemade pasta night 🍝 swipe for chaos",
    "trail vibes 🥾 #getoutside",
    "coffee + a good book = perfect morning ☕📖",
    "studio day 🎨 wip",
    "sunsets on sunsets 🌅",
    "fit check ✔️ #ootd",
    "little corner of calm 🕯️",
  ],
  youtube: [
    "I tried the viral 5am routine for 30 days (honest results)",
    "Beginner's guide to film photography — everything I wish I knew",
    "Cooking a 3-course meal on a £10 budget",
    "Why your marketing isn't working (and how to fix it)",
    "Building a desk setup from scratch | full tour",
    "Reacting to your worst CVs (and rewriting them)",
    "24 hours in the city that never sleeps",
    "The truth about productivity apps",
    "How I edit my photos — full Lightroom workflow",
    "Trying every coffee method so you don't have to",
    "What £50k actually gets you in different cities",
    "I learned to code in 100 days — here's what happened",
  ],
};

const COMMENT_POOL = [
  "Love this!",
  "So true 👏",
  "Needed to hear this today.",
  "Where was this taken?",
  "Saving this for later.",
  "Couldn't agree more.",
  "This is gold.",
  "Haha brilliant.",
  "Great point.",
  "Following for more!",
];

async function main() {
  console.log("Clearing seeded content + accounts…");
  // Order matters for FKs; TRUNCATE … CASCADE handles dependents.
  await db.execute(
    sql`TRUNCATE TABLE comment_likes, comments, community_notes, likes, posts, manual_stats, group_members, groups_tbl, stories, youtube_meta, sessions, fake_users, users RESTART IDENTITY CASCADE`,
  );

  // --- Demo logins -----------------------------------------------------------
  console.log("Creating demo accounts…");
  const staffHash = await hashPassword("staff");
  const studentDevHash = await hashPassword("student");
  const studentFixedHash = await hashPassword("Student26"); // faithful student password

  const insertedUsers = await db
    .insert(users)
    .values([
      {
        username: "staff",
        password: staffHash,
        displayName: "Hereford Staff",
        avatarUrl: "https://picsum.photos/seed/staff/200",
        isAdmin: true,
      },
      {
        username: "student",
        password: studentDevHash,
        displayName: "Demo Student",
        avatarUrl: "https://picsum.photos/seed/student/200",
        isAdmin: false,
      },
      {
        username: "19234156",
        password: studentFixedHash,
        displayName: "Student 19234156",
        avatarUrl: "https://picsum.photos/seed/19234156/200",
        isAdmin: false,
      },
    ])
    .returning({ id: users.id, username: users.username });
  console.log(`  ${insertedUsers.length} users`);

  // --- Personas --------------------------------------------------------------
  console.log("Inserting 50 personas…");
  const insertedPersonas = await db
    .insert(fakeUsers)
    .values(PERSONAS.map((p) => ({ ...p })))
    .returning({ id: fakeUsers.id });
  const personaIds = insertedPersonas.map((p) => p.id);

  // --- Persona posts + engagement -------------------------------------------
  console.log("Seeding persona posts + engagement…");
  const platforms: Platform[] = ["twitter", "facebook", "instagram", "youtube"];
  let postCount = 0;
  let likeCount = 0;
  let commentCount = 0;

  for (const platform of platforms) {
    const pool = POOLS[platform];
    for (let i = 0; i < pool.length; i++) {
      const authorId = pick(personaIds);
      const rows = await db
        .insert(posts)
        .values({
          fakeUserId: authorId,
          platform,
          // MockTube: title lives in youtube_meta; the post body is the description.
          content: platform === "youtube" ? "" : pool[i]!,
          imageUrl:
            platform === "instagram"
              ? `https://picsum.photos/seed/${platform}-${i}/600/600`
              : "",
        })
        .returning({ id: posts.id });
      const post = rows[0]!;

      // MockTube videos need a youtube_meta row (feed INNER JOINs it).
      if (platform === "youtube") {
        const profile = YT_PROFILES[i % YT_PROFILES.length]!;
        const m = ytMetrics(profile);
        await db.insert(youtubeMeta).values({
          postId: post.id,
          videoTitle: pool[i]!,
          thumbnailUrl: `https://picsum.photos/seed/yt-${i}/640/360`,
          durationDisplay: `${randInt(2, 18)}:${String(randInt(0, 59)).padStart(2, "0")}`,
          statsProfile: profile,
          premiumViewPct: randInt(25, 30),
          seedViews: m.views,
          seedLikes: m.likes,
          seedComments: m.comments,
          seedSubBoost: m.subBoost,
        });
      }

      // Likes from a deterministic subset of personas (no self-like).
      const likers = personaIds
        .filter((id) => id !== authorId)
        .filter(() => rng() < 0.4);
      if (likers.length) {
        await db
          .insert(likes)
          .values(likers.map((id) => ({ postId: post.id, fakeUserId: id })));
        likeCount += likers.length;
      }

      // A few comments.
      const nComments = randInt(0, 3);
      for (let c = 0; c < nComments; c++) {
        const commenter = pick(personaIds);
        if (commenter === authorId) continue;
        await db.insert(comments).values({
          postId: post.id,
          fakeUserId: commenter,
          content: pick(COMMENT_POOL),
        });
        commentCount++;
      }
      postCount++;
    }
  }

  console.log(
    `Done: ${postCount} posts, ${likeCount} likes, ${commentCount} comments across ${platforms.length} platforms.`,
  );
  console.log("\nDemo logins:");
  console.log("  staff / staff           (admin)");
  console.log("  student / student       (student)");
  console.log("  19234156 / Student26    (student, faithful)");

  await db.$client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
