// Authored Scenario data (POC). A fixed documentary timeline — content and
// outcome are authored, never simulated. Ported from the HTML POC.
// Avatar "kind" drives a colour; never a real user/persona (these accounts are
// kinds the normal app has no concept of: journalists, creators, family, etc.).

export type AvKind =
  | "journo"
  | "creator"
  | "jos"
  | "mr"
  | "news"
  | "public"
  | "official";

export type Platform = "MockTweet" | "MockTube";

export interface ScenarioPost {
  type: "post";
  name: string;
  handle: string;
  initials: string;
  av: AvKind;
  verified?: boolean;
  creator?: boolean; // MockTube creator layer accent
  text: string;
  likes: number;
  rts: number;
  platform: Platform;
  // MockTube beats render as a video card; the text becomes the description.
  videoTitle?: string;
  duration?: string;
  // MockGram / MockBook image beats.
  image?: string;
}

export interface TrendCard {
  type: "trend";
  label: string;
  hashtag: string;
  volume: string;
  context: string;
}

export interface ImpactCard {
  type: "impact";
  title: string;
  stats: { num: string; label: string }[];
}

/** The closing verdict — the documentary's conclusion (its own final slide). */
export interface VerdictCard {
  type: "verdict";
  tone: "win" | "fail" | "cautionary";
  label: string; // e.g. "The Verdict"
  heading: string;
  body: string;
}

export type Beat = ScenarioPost | TrendCard | ImpactCard | VerdictCard;

export interface ScenarioSection {
  label: string;
  gap: number; // ms between staggered reveals
  posts: Beat[];
}

export interface Scenario {
  id: string;
  badge: string;
  title: string;
  prePosts: ScenarioPost[];
  sections: ScenarioSection[];
}

export const RED_BULL_SCENARIO: Scenario = {
  id: "red-bull-power-struggle",
  badge: "Scenario",
  title: "The Red Bull Power Struggle — A Paddock Soap Opera (2024)",
  prePosts: [
    { type: "post", name: "David Croft", handle: "@CroftyF1", av: "journo", initials: "DC", verified: true, text: "Lights out and away we go for another season! Big questions on the grid this year. Can anyone stop the dominant force? Strap in. 🏎️", likes: 8400, rts: 2100, platform: "MockTweet" },
    { type: "post", name: "Ted Kravitz", handle: "@tedkravitz", av: "journo", initials: "TK", verified: true, text: "Spent the morning in the paddock notebook in hand. The garages are where the real stories are — not the press releases. More on the Ted's Notebook later. 📝", likes: 6200, rts: 1400, platform: "MockTweet" },
    { type: "post", name: "RockerPoweredMohawk", handle: "@RPM_racing", av: "creator", initials: "RP", creator: true, text: "new vid up! ranking every team's chances this season. spoiler: it's not looking close at the front... yet 👀 link below", likes: 34200, rts: 8800, platform: "MockTube", videoTitle: "Ranking EVERY Team's 2024 Chances", duration: "14:22" },
    { type: "post", name: "Bernie Collins", handle: "@berniecollins", av: "journo", initials: "BC", verified: true, text: "Strategy preview for the weekend up now. Tyre deg is going to be the story on Sunday — mark my words. The undercut will be powerful here.", likes: 5400, rts: 980, platform: "MockTweet" },
  ],
  sections: [
    {
      label: "The Rumour Breaks — Something's Happening at Red Bull",
      gap: 1800,
      posts: [
        { type: "post", name: "Craig Slater", handle: "@CraigSlaterSky", av: "journo", initials: "CS", verified: true, text: "Understand Red Bull are dealing with an internal matter involving a senior figure. An investigation is underway. The team has not commented officially. We're working to establish the facts and will report what we can stand up — not what we can't. More when we have it.", likes: 12400, rts: 6800, platform: "MockTweet" },
        { type: "post", name: "Ted Kravitz", handle: "@tedkravitz", av: "journo", initials: "TK", verified: true, text: "Whatever's going on in the Red Bull hospitality unit this morning, the body language tells you everything. Lots of closed-door meetings. People not making eye contact. The paddock can always feel a storm coming before anyone says a word. Watch this space.", likes: 18900, rts: 9200, platform: "MockTweet" },
        { type: "post", name: "RockerPoweredMohawk", handle: "@RPM_racing", av: "creator", initials: "RP", creator: true, text: "okay so something is DEFINITELY going on at Red Bull and nobody is saying what 👀 I'm seeing locked threads, deleted posts, the works. dropping a video tonight: THE HORNDOG FILES — what we actually know vs what people are guessing. spoiler: it's not much yet. STAY TUNED", likes: 44200, rts: 21800, platform: "MockTube", videoTitle: "Something's Going On At Red Bull… 👀", duration: "9:03" },
      ],
    },
    {
      label: "The Paddock Reacts — Reporting Around the Story",
      gap: 1700,
      posts: [
        { type: "post", name: "David Croft", handle: "@CroftyF1", av: "journo", initials: "DC", verified: true, text: "Lots of speculation flying around this morning. A reminder, folks: there's a big difference between what's been confirmed and what's being suggested. Right now very little has been confirmed. Be careful what you share. The truth will come out in its own time.", likes: 22100, rts: 14600, platform: "MockTweet" },
        { type: "post", name: "Bernie Collins", handle: "@berniecollins", av: "journo", initials: "BC", verified: true, text: "From a team operations point of view — an investigation like this doesn't stay contained for long. It touches everything: the strategy group, the engineering side, the way the garage functions on a Sunday. Whatever the outcome, the working environment changes the moment it begins.", likes: 16800, rts: 8400, platform: "MockTweet" },
        { type: "post", name: "Martin Brundle", handle: "@MBrundleF1", av: "journo", initials: "MB", verified: true, text: "I've seen a few of these situations across my years in the sport. The danger is always that the noise becomes the story before the facts do. Due process matters. I'd urge everyone to let the investigation run rather than convict or acquit anyone on social media this afternoon.", likes: 31200, rts: 19400, platform: "MockTweet" },
        { type: "post", name: "RockerPoweredMohawk", handle: "@RPM_racing", av: "creator", initials: "RP", creator: true, text: "THE HORNDOG FILES pt 1 is LIVE 🔥 240k views in two hours. I'm being VERY careful to separate confirmed facts (almost none) from paddock rumour (a LOT). that's the whole point — half of what's trending right now is straight up made up. link below 👇 #HorndogFiles", likes: 88400, rts: 41200, platform: "MockTube", videoTitle: "THE HORNDOG FILES Pt 1 — Facts vs Rumour", duration: "18:41" },
      ],
    },
    {
      label: "Denials & Politics — The Story Splits the Team",
      gap: 1600,
      posts: [
        { type: "post", name: "Craig Slater", handle: "@CraigSlaterSky", av: "journo", initials: "CS", verified: true, text: "Red Bull have now issued a short statement confirming an internal investigation is taking place and that the individual concerned denies the allegations. The team says it takes the matter seriously and will not comment further while the process is ongoing. So — confirmed: there IS a process. That's it.", likes: 28600, rts: 16200, platform: "MockTweet" },
        { type: "post", name: "Craig Slater", handle: "@CraigSlaterSky", av: "journo", initials: "CS", verified: true, text: "UPDATE: the internal investigation has concluded and the individual has been cleared — the grievance was dismissed. BUT: there are now calls for an independent EXTERNAL review of how that internal process was actually conducted. So we may end up with an investigation into the investigation. Stay with me here.", likes: 38900, rts: 24600, platform: "MockTweet" },
        { type: "post", name: "Ted Kravitz", handle: "@tedkravitz", av: "journo", initials: "TK", verified: true, text: "And THIS is the bit people keep missing. 'Cleared' by the internal process is not the end — because now the process itself is under the microscope. An external review of an internal review. Two separate things. The paddock is split on whether the first one can even be trusted. Messy doesn't cover it.", likes: 34800, rts: 22100, platform: "MockTweet" },
        { type: "post", name: "Bernie Collins", handle: "@berniecollins", av: "journo", initials: "BC", verified: true, text: "For clarity, because the timeline is getting muddled online: 1) an internal investigation was held, 2) it dismissed the complaint, 3) questions were raised about how it was run, 4) an external review was then sought. Two distinct processes. Conflating them is exactly how misinformation spreads.", likes: 29400, rts: 19800, platform: "MockTweet" },
        { type: "post", name: "Jos Verstappen", handle: "@JosVerstappen", av: "jos", initials: "JV", verified: true, text: "The team is in danger of being torn apart. It cannot continue in this way. There is too much tension and the focus is no longer where it should be — on the racing. If things stay as they are, I fear it will explode. Something has to change.", likes: 142000, rts: 88600, platform: "MockTweet" },
        { type: "post", name: "Bernie Collins", handle: "@berniecollins", av: "journo", initials: "BC", verified: true, text: "When a driver's family starts briefing the press publicly, you know the internal channels have broken down. This has now moved from a private matter to a public one — and once it's public, it's very, very hard to put back in the box. The paddock is choosing sides as we speak.", likes: 24100, rts: 13800, platform: "MockTweet" },
      ],
    },
    {
      label: "The Leak — The Internet Takes Over",
      gap: 1500,
      posts: [
        { type: "post", name: "David Croft", handle: "@CroftyF1", av: "journo", initials: "DC", verified: true, text: "I'm aware material has been circulating online overnight. I'd ask everyone to think very carefully before sharing unverified files. We do not know the source, the context, or whether it's even genuine. 'It's on the internet' is not the same as 'it's true'. Please be responsible.", likes: 41200, rts: 28900, platform: "MockTweet" },
        { type: "post", name: "Martin Brundle", handle: "@MBrundleF1", av: "journo", initials: "MB", verified: true, text: "A leak doesn't establish the truth of anything — it just removes the ability of a fair process to do its job quietly. Whatever your view of the people involved, trial by group chat helps nobody. I'll wait for the actual findings, thanks. I suggest others do too.", likes: 38400, rts: 24200, platform: "MockTweet" },
        { type: "trend", label: "Trending Worldwide", hashtag: "#HorndogFiles", volume: "480K posts", context: "Speculation, leaked material of unknown origin, and paddock politics dominate the conversation as the Red Bull story goes global" },
        { type: "post", name: "RockerPoweredMohawk", handle: "@RPM_racing", av: "creator", initials: "RP", creator: true, text: "right, my comments are FULL of people treating leaked screenshots as gospel. I need to say this clearly: WE DO NOT KNOW IF ANY OF THIS IS REAL. I'm not platforming unverified files on my channel. the story is real, the power struggle is real, but half this 'evidence' is cooked. do better 🙏 #HorndogFiles", likes: 96200, rts: 52400, platform: "MockTube", videoTitle: "THE HORNDOG FILES — A Word About The Leak", duration: "11:27" },
      ],
    },
    {
      label: "The Fan Layer — Nicknames & Memes Take Hold",
      gap: 1500,
      posts: [
        { type: "post", name: "RockerPoweredMohawk", handle: "@RPM_racing", av: "creator", initials: "RP", creator: true, text: "the f1 community has, of course, responded to a serious team crisis in the most f1 community way possible: by giving everyone involved a nickname. so for the newcomers, here's your cast list for THE HORNDOG FILES 👇 a thread 🧵 #HorndogFiles", likes: 112000, rts: 48200, platform: "MockTube", videoTitle: "THE HORNDOG FILES — The Cast List 🧵", duration: "23:10" },
        { type: "post", name: "RockerPoweredMohawk", handle: "@RPM_racing", av: "creator", initials: "RP", creator: true, text: "1. 'AERO DADDY' — the legendary design genius. They say he can look at a drawing, or even a real object, and literally SEE the air flowing over it in his head — no simulation needed. Fought over by every team on the grid. If he walks, the whole technical dynasty walks with him. 🛩️ #HorndogFiles", likes: 84200, rts: 31600, platform: "MockTube", videoTitle: "Cast List #1: 'Aero Daddy'", duration: "6:18" },
        { type: "post", name: "RockerPoweredMohawk", handle: "@RPM_racing", av: "creator", initials: "RP", creator: true, text: "2. 'STRATEGY MOMMY' — the pit-wall genius who has bailed out more impossible Sundays than anyone can count. People say she can run the numbers in her HEAD faster than the team's own simulation software spits them out. Einstein and Hawking rolled into one, ice in the veins. The fanbase would riot if she left. 🧠 #HorndogFiles", likes: 134000, rts: 58400, platform: "MockTube", videoTitle: "Cast List #2: 'Strategy Mommy'", duration: "7:44" },
        { type: "post", name: "RockerPoweredMohawk", handle: "@RPM_racing", av: "creator", initials: "RP", creator: true, text: "3. 'GARAGE BOSS' — runs the team on a Sunday like a military operation. The pit stops, the tyre calls, the chaos management. The kind of guy you don't notice until he's gone — and then you notice IMMEDIATELY. 🔧 #HorndogFiles", likes: 76800, rts: 28200, platform: "MockTube", videoTitle: "Cast List #3: 'Garage Boss'", duration: "5:52" },
        { type: "post", name: "RockerPoweredMohawk", handle: "@RPM_racing", av: "creator", initials: "RP", creator: true, text: "4. 'THE TALENT WHISPERER' — the veteran advisor who built the entire junior programme. They reckon he can take one look at a teenager in a go-kart — one SNIFF — and tell you if they'll be a world champion in ten years. Spotted half the grid before anyone else did. An absolute force of nature. 👀 #HorndogFiles", likes: 91400, rts: 36200, platform: "MockTube", videoTitle: "Cast List #4: 'The Talent Whisperer'", duration: "8:09" },
        { type: "post", name: "Bernie Collins", handle: "@berniecollins", av: "journo", initials: "BC", verified: true, text: "I'll admit the nicknames are funny — but spare a thought for the actual people behind them. Every one of those figures is a real professional with a family, trying to do their job while the entire internet treats their workplace like a reality TV show. It can't be easy.", likes: 52400, rts: 26800, platform: "MockTweet" },
      ],
    },
    {
      label: "The Downfall — A Dynasty Hollowed Out",
      gap: 1700,
      posts: [
        { type: "post", name: "Ted Kravitz", handle: "@tedkravitz", av: "journo", initials: "TK", verified: true, text: "Here's the thing about all of this. Whatever the investigation found or didn't find, the lasting damage isn't a verdict — it's the exodus. Once the trust goes, the people go. And at Red Bull, the people have started going. One by one. This is how dynasties end. Not with a bang.", likes: 48200, rts: 28400, platform: "MockTweet" },
        { type: "post", name: "Craig Slater", handle: "@CraigSlaterSky", av: "journo", initials: "CS", verified: true, text: "Confirmed departures from Red Bull, for the record: Adrian Newey to Aston Martin. Jonathan Wheatley gone. Rob Marshall to McLaren. Will Courtenay to McLaren. And in time, the team principal and senior leadership too. The most dominant team of its era is being dismantled from the inside.", likes: 62100, rts: 38600, platform: "MockTweet" },
        { type: "post", name: "Martin Brundle", handle: "@MBrundleF1", av: "journo", initials: "MB", verified: true, text: "People will debate the rights and wrongs of this story for years. But the racing lesson is simple: a team is not a building or a budget. It's people, and the trust between them. Lose that, and no amount of money buys it back overnight. Red Bull are learning that the hard way.", likes: 54800, rts: 31200, platform: "MockTweet" },
        { type: "post", name: "RockerPoweredMohawk", handle: "@RPM_racing", av: "creator", initials: "RP", creator: true, text: "final thought on THE HORNDOG FILES: I made content about this for months and the honest truth is most of what went viral was never confirmed. the REAL story — a great team tearing itself apart and the best people walking out the door — was sitting right there the whole time. don't let the noise bury the facts. peace ✌️ #HorndogFiles", likes: 124000, rts: 61800, platform: "MockTube", videoTitle: "THE HORNDOG FILES — Final Word", duration: "15:33" },
      ],
    },
    {
      label: "The Verdict",
      gap: 1400,
      posts: [
        { type: "verdict", tone: "cautionary", label: "The Verdict",
          heading: "When the Noise Buried the Facts",
          body: "The investigation was only the spark. The lasting damage was an exodus of talent and trust — and most of what actually went viral was never confirmed. A leak doesn't establish truth; it just stops a fair process doing its job quietly. The lesson: in a crisis, the loudest narrative is rarely the truest. Separate what's confirmed from what's merely circulating, and remember that a team isn't a building or a budget — it's people, and the trust between them." },
        { type: "impact", title: "When the Noise Buried the Facts", stats: [
          { num: "6+", label: "Senior figures who left in the fallout" },
          { num: "480K", label: "Posts about an unconfirmed leak" },
          { num: "1", label: "Investigation that exposed a deeper power struggle" },
          { num: "0", label: "Of it that helped the team go faster" },
        ] },
      ],
    },
  ],
};
