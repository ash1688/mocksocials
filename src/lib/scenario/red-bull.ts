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
  | "official"
  | "brand" // an organisation/company account (e.g. Domino's)
  | "driver"; // a competitor/athlete account (e.g. an F1 driver)

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

/** A timeline of (in)action — e.g. hours of silence during a crisis. Each row
 *  is flagged as a responded step or a silent one. */
export interface SilenceCard {
  type: "silence";
  title: string;
  rows: { time: string; event: string; responded: boolean }[];
  footer?: string;
}

/** Side-by-side contrast of a hollow PR apology vs a real one. */
export interface PrApologyCard {
  type: "prapology";
  title: string;
  bad: { label: string; points: string[] };
  good: { label: string; points: string[] };
  verdict?: string;
}

/** A pulled-out reported quote (authored documentary citation). */
export interface ReportedCard {
  type: "reported";
  source: string;
  context: string;
  quote: string;
  footer?: string;
}

/** A fact-check of a viral claim: the claim, what's actually true, a verdict. */
export interface FactCheckCard {
  type: "factcheck";
  title: string;
  claim: string;
  rows: { k: string; v: string }[];
  verdict?: string;
}

/** Two parallel ideas side by side (e.g. two traps / two lessons). Neutral —
 *  unlike PrApologyCard's bad-vs-good framing. */
export interface TwoLessonCard {
  type: "twolesson";
  title: string;
  left: { label: string; points: string[] };
  right: { label: string; points: string[] };
  verdict?: string;
}

/** A tally of real-world consequences (each with an icon, headline and detail). */
export interface ConsequencesCard {
  type: "consequences";
  title: string;
  items: { icon: string; label: string; detail: string }[];
  footer?: string;
}

/** A "live" crowd/terrace card — collective public reaction in a venue. */
export interface TerraceCard {
  type: "terrace";
  stadium: string;
  chants: string[];
  note?: string;
}

/** A TV/broadcast segment framing — show, segment, headline, standfirst, ticker. */
export interface BroadcastCard {
  type: "broadcast";
  show: string;
  segment: string;
  headline: string;
  standfirst: string;
  ticker?: string;
}

/** A podcast episode card with a named panel. */
export interface PodcastCard {
  type: "podcast";
  show: string;
  epnum: string;
  title: string;
  panel: { name: string; initials: string }[];
  tagline?: string;
}

/** Several honest perspectives on one complex issue (resist-the-binary device). */
export interface MultiLensCard {
  type: "multilens";
  title: string;
  lenses: { label: string; text: string }[];
  footer?: string;
}

/** A dated escalation timeline with a running count (e.g. complaints over time);
 *  the row flagged `final` is the headline total. */
export interface CountTimelineCard {
  type: "counttimeline";
  title: string;
  rows: { date: string; event: string; count: string; final?: boolean }[];
  footer?: string;
}

/** A posted photo. When `src` is set (a path under /public) the real image is
 *  shown; otherwise it falls back to a captioned placeholder. */
export interface PhotoCard {
  type: "photo";
  name: string;
  handle: string;
  initials: string;
  av: AvKind;
  verified?: boolean;
  caption: string;
  platform?: Platform;
  src?: string; // e.g. "/assets/scenarios/verstappen-fia.png"
}

/** A news-outlet headline card. */
export interface NewsCard {
  type: "news";
  outlet: string;
  outletColor: string;
  headline: string;
  sub: string;
  url?: string;
}

/** A teaching disclaimer (e.g. "fictional case study"). */
export interface DisclaimerCard {
  type: "disclaimer";
  text: string;
}

/** A stock-ticker card showing a climb and (optionally) a trading halt. */
export interface TickerCard {
  type: "ticker";
  label: string;
  climb: number[];
  timestamps: string[];
  haltPrice?: number;
  haltReason?: string;
}

/** The KFC-style rearranged-letters apology ("FCK"). */
export interface FckBucketCard {
  type: "fckbucket";
  letters?: string; // defaults to "FCK"
  caption: string;
}

/** An ownership / org chart (who really runs the thing). */
export interface OrgChartCard {
  type: "orgchart";
  company: string;
  source: string;
  officers: { role: string; name: string }[];
  caption?: string;
}

/** A Q&A transcript (e.g. a press conference). */
export interface TranscriptCard {
  type: "transcript";
  title: string;
  subtitle?: string;
  lines: { q: string; a: string }[];
}

/** A TV episode breakdown — show, season, title, airdate, bullet points. */
export interface EpisodeCard {
  type: "episode";
  show: string;
  season: string;
  title: string;
  airdate: string;
  bullets: string[];
  note?: string;
}

/** A track record over time: who challenged, what they did, what happened. */
export interface TrackRecordCard {
  type: "trackrecord";
  title: string;
  rows: { year: string; challenger: string; move: string; result: string }[];
  footer?: string;
}

/** A football-style scoreline card. */
export interface MatchCard {
  type: "matchcard";
  competition: string;
  venue?: string;
  home: { name: string; score: number; flag?: string };
  away: { name: string; score: number; flag?: string };
  status?: string;
  scorers?: string;
  note?: string;
}

export type Beat =
  | ScenarioPost
  | TrendCard
  | ImpactCard
  | VerdictCard
  | SilenceCard
  | PrApologyCard
  | ReportedCard
  | FactCheckCard
  | TwoLessonCard
  | ConsequencesCard
  | TerraceCard
  | BroadcastCard
  | PodcastCard
  | MultiLensCard
  | CountTimelineCard
  | PhotoCard
  | EpisodeCard
  | TrackRecordCard
  | MatchCard
  | NewsCard
  | DisclaimerCard
  | TickerCard
  | FckBucketCard
  | OrgChartCard
  | TranscriptCard;

export interface ScenarioSection {
  label: string;
  gap: number; // ms between staggered reveals
  posts: Beat[];
}

/** A multiple-choice task. Correct answer + explanation are revealed only after
 *  the student submits the whole task set — never per-question. */
export interface ScenarioMCQ {
  type: "mcq";
  id: string; // stable per-scenario slug; the DB key (e.g. "rb-q1")
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

/** An open written-response task — reflective, no auto-grade. */
export interface ScenarioWritten {
  type: "written";
  id: string;
  prompt: string;
  placeholder?: string;
}

export type ScenarioTask = ScenarioMCQ | ScenarioWritten;

/** Client-safe MCQ — the correct answer + explanation are stripped so they are
 *  never sent to the browser before the student submits (revealed by the server
 *  action). */
export type ClientMCQ = Omit<ScenarioMCQ, "correctIndex" | "explanation">;
export type ClientTask = ClientMCQ | ScenarioWritten;

/** Project authored tasks to their client-safe form (drops MCQ answers). */
export function toClientTasks(tasks: ScenarioTask[]): ClientTask[] {
  return tasks.map((t) =>
    t.type === "mcq"
      ? { type: "mcq", id: t.id, prompt: t.prompt, options: t.options }
      : t,
  );
}

export interface Scenario {
  id: string;
  badge: string;
  title: string;
  prePosts: ScenarioPost[];
  sections: ScenarioSection[];
  /** Authored end-of-scenario quiz, shown as a final step after the Verdict. */
  tasks?: ScenarioTask[];
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
  // Authored Q&A — comprehensive, multi-aspect (ADR-0006). MCQ (A–L) cover
  // comprehension/analysis of the story; the stakeholder set (I–L) plus several
  // written tasks ask students to APPLY the lessons to actors the documentary
  // never showed (rival teams, FOM/F1, the FIA, sponsors). Ids are stable keys.
  tasks: [
    // --- A. Confirmed vs rumour ---------------------------------------------
    {
      type: "mcq",
      id: "rb-q1",
      prompt:
        "When the story first broke, what had actually been confirmed by the journalists?",
      options: [
        "That a senior figure was guilty of the allegations",
        "Only that an internal investigation was underway — nothing more",
        "That the team principal would be sacked",
        "That the leaked files were genuine",
      ],
      correctIndex: 1,
      explanation:
        "The reporters (Slater, Croft, Brundle) were careful to separate the one confirmed fact — that a process existed — from the flood of speculation. 'Confirmed' and 'suggested' are not the same thing.",
    },
    // --- B. The two processes ------------------------------------------------
    {
      type: "mcq",
      id: "rb-q2",
      prompt:
        "The internal investigation cleared the individual. Why didn't that settle the story?",
      options: [
        "Because the allegations were re-filed the next day",
        "Because questions were then raised about how the internal process itself was run, prompting calls for an external review",
        "Because the FIA overturned the result",
        "Because the individual admitted fault afterwards",
      ],
      correctIndex: 1,
      explanation:
        "Two distinct processes got conflated online: the internal investigation (which dismissed the complaint) and a separate external review of how that investigation was conducted. Confusing the two is exactly how misinformation spread.",
    },
    // --- C. The real damage --------------------------------------------------
    {
      type: "mcq",
      id: "rb-q3",
      prompt:
        "According to the documentary's verdict, what caused the lasting damage to the team?",
      options: [
        "A points deduction from the investigation",
        "The viral leak being proven true",
        "The exodus of senior talent and the loss of trust — not any verdict",
        "A sponsor pulling its funding",
      ],
      correctIndex: 2,
      explanation:
        "The investigation was only the spark. The real cost was people walking out the door (Newey, Wheatley, Marshall, Courtenay…). A team is its people and the trust between them — lose that and money can't buy it back.",
    },
    // --- D. The leak / "it's on the internet" --------------------------------
    {
      type: "mcq",
      id: "rb-q4",
      prompt:
        "Overnight, leaked material began circulating. What did journalists like David Croft and Martin Brundle argue about it?",
      options: [
        "The leak finally proved who was guilty",
        "Everyone had a duty to share it as widely as possible",
        "'It's on the internet' is not the same as 'it's true' — and a leak only stops a fair process doing its job quietly",
        "It was obviously fabricated and could be safely ignored",
      ],
      correctIndex: 2,
      explanation:
        "Croft asked people to think before sharing unverified files of unknown origin; Brundle noted a leak doesn't establish the truth of anything — it just removes a fair process's ability to work quietly. Source, context and authenticity were all unknown.",
    },
    // --- E. A creator's responsibility --------------------------------------
    {
      type: "mcq",
      id: "rb-q5",
      prompt:
        "How did the viral creator RockerPoweredMohawk handle the unverified leak on his channel?",
      options: [
        "He posted the leaked files to chase views",
        "He refused to platform the unverified files and kept separating confirmed facts from rumour",
        "He ignored the story completely",
        "He insisted all the leaked material was genuine",
      ],
      correctIndex: 1,
      explanation:
        "Despite building months of viral content on the story, he drew a clear line: the power struggle was real, but he would not platform unverified files, and he repeatedly told viewers most of the 'evidence' was unconfirmed. Even a viral creator can model responsibility.",
    },
    // --- F. When the family went public -------------------------------------
    {
      type: "mcq",
      id: "rb-q6",
      prompt:
        "When a driver's family began briefing the press publicly, what did Bernie Collins say it signalled?",
      options: [
        "That the matter had been resolved",
        "That internal channels had broken down — a private matter had become public and would be very hard to contain",
        "That the team was about to win the championship",
        "That nothing of importance was happening",
      ],
      correctIndex: 1,
      explanation:
        "Bernie noted that when a driver's family starts briefing the press, the internal channels have failed. Once a private matter becomes public it's very hard to put back in the box — and the paddock starts choosing sides.",
    },
    // --- G. The human cost of the memes -------------------------------------
    {
      type: "mcq",
      id: "rb-q7",
      prompt:
        "The fan community gave everyone involved nicknames. What point did Bernie Collins make about this?",
      options: [
        "The nicknames were harmless fun with no downside",
        "The memes actually helped the truth come out",
        "Behind every nickname is a real professional with a family, being treated as if their workplace were a reality-TV show",
        "Joking about the people involved should be a criminal offence",
      ],
      correctIndex: 2,
      explanation:
        "Bernie admitted the nicknames were funny but asked people to remember the real people behind them — professionals with families trying to do their jobs while the internet treated their workplace like entertainment.",
    },
    // --- H. The core lesson --------------------------------------------------
    {
      type: "mcq",
      id: "rb-q8",
      prompt:
        "What is the documentary's central lesson about information during a crisis?",
      options: [
        "Trending topics are a reliable guide to the truth",
        "Leaks are the fastest way to uncover what really happened",
        "The loudest narrative is rarely the truest — separate what's confirmed from what's merely circulating",
        "Memes are the best way to follow a breaking story",
      ],
      correctIndex: 2,
      explanation:
        "The verdict: in a crisis the loudest narrative is rarely the truest. Most of what went viral was never confirmed, while the real story — a great team losing its people and its trust — was in plain sight the whole time.",
    },
    // --- I. Rival teams (apply the lesson) ----------------------------------
    {
      type: "mcq",
      id: "rb-q9",
      prompt:
        "A rival team principal is asked about the Red Bull situation in a press conference. What is the most professional response?",
      options: [
        "Publicly mock the rival to gain a competitive edge",
        "Speculate about who is probably guilty",
        "Decline to comment on another team's internal matter and keep the focus on the racing",
        "Announce on camera that they're already trying to sign the departing staff",
      ],
      correctIndex: 2,
      explanation:
        "Commenting on a rival's unresolved internal matter invites blowback, prejudges a live process and can drag your own team into the story. The professional move is to decline and keep the focus on performance — any recruitment is handled quietly, not as a press-conference soundbite.",
    },
    // --- J. FOM / F1 ---------------------------------------------------------
    {
      type: "mcq",
      id: "rb-q10",
      prompt:
        "As the sport's commercial and brand custodian, how should F1/FOM publicly handle an ongoing investigation at one of its teams?",
      options: [
        "Publicly take the family's side",
        "Issue a measured statement that it respects due process and won't prejudge, while protecting the integrity of the sport",
        "Declare the individual guilty to reassure sponsors",
        "Leak its own information to control the story",
      ],
      correctIndex: 1,
      explanation:
        "FOM/F1 has to protect the sport's image without prejudicing a live process. A measured 'we respect due process and won't prejudge' line does that; taking sides, declaring guilt, or briefing against people would make F1 part of the problem.",
    },
    // --- K. FIA / Ben Sulayem -----------------------------------------------
    {
      type: "mcq",
      id: "rb-q11",
      prompt:
        "The matter is an internal team/employment process, yet the FIA president comments publicly. Which is the most defensible FIA position?",
      options: [
        "Declare guilt and threaten sanctions based on unconfirmed claims",
        "Stay completely silent even as the sport's reputation is damaged",
        "Acknowledge it is aware and respects due process without prejudging — while noting that any proven conduct bringing the sport into disrepute would be taken seriously",
        "Personally pick a side in the dispute",
      ],
      correctIndex: 2,
      explanation:
        "The FIA is dragged in by association and can point to the 'disrepute' provisions — but only proven conduct justifies action. The defensible line is to acknowledge, respect due process and reserve judgement; declaring guilt or taking sides on unconfirmed claims is overreach that itself harms the sport.",
    },
    // --- L. Sponsors ---------------------------------------------------------
    {
      type: "mcq",
      id: "rb-q12",
      prompt:
        "A major team sponsor fears reputational damage from the story. What is the most measured first step?",
      options: [
        "Immediately and publicly terminate the deal over unconfirmed claims",
        "Publicly defend the accused individual",
        "Amplify the leaked files to show transparency",
        "Privately seek assurances and wait for the verified findings before any public action",
      ],
      correctIndex: 3,
      explanation:
        "Knee-jerk public action on unconfirmed claims creates legal and reputational risk in every direction. The measured first step is private: seek assurances, understand the facts, and wait for verified findings before deciding whether any public response is warranted.",
    },
    // --- Written responses ---------------------------------------------------
    {
      type: "written",
      id: "rb-w1",
      prompt:
        "Several journalists urged people not to share the leaked files. In your own words, explain why 'it's on the internet' is not the same as 'it's true', using an example from this story.",
      placeholder:
        "Think about the source, the context, and whether anything had been verified…",
    },
    {
      type: "written",
      id: "rb-w2",
      prompt:
        "If you were running the social-media response for a team facing a crisis like this, what is ONE thing you would do differently from how the online crowd behaved? Why?",
      placeholder: "Consider tone, timing, facts vs rumour, and the people involved…",
    },
    {
      type: "written",
      id: "rb-w3",
      prompt:
        "Compare how the verified journalists behaved with how the online crowd behaved. What made the journalists' approach more trustworthy?",
      placeholder:
        "Think about sourcing, caution, separating fact from rumour, and respect for the people involved…",
    },
    {
      type: "written",
      id: "rb-w4",
      prompt:
        "In your own words, explain the difference between the internal investigation and the external review — and why conflating the two helped misinformation spread.",
      placeholder:
        "What was each process for? What did 'cleared' actually mean, and what was still unresolved?…",
    },
    {
      type: "written",
      id: "rb-w5",
      prompt:
        "What should rival teams say — or deliberately NOT say — and do during a crisis like this? Consider both reputation and competitive advantage.",
      placeholder:
        "Think about press-conference answers, public vs private comments, and how poaching staff is handled…",
    },
    {
      type: "written",
      id: "rb-w6",
      prompt:
        "You handle communications for F1/FOM. What would you say publicly, what would you do behind the scenes, and what would you avoid — and why?",
      placeholder:
        "Balance protecting the sport's image against respecting a live process…",
    },
    {
      type: "written",
      id: "rb-w7",
      prompt:
        "The FIA could argue the scandal brings the sport into disrepute, giving it grounds to get involved — but this is an internal employment process. Should the FIA, or its president personally, comment publicly? Weigh the disrepute/reputation argument against the risks of prejudging a live process and overstepping jurisdiction.",
      placeholder:
        "When does 'protecting the sport' tip over into overreach? What are the risks either way?…",
    },
    {
      type: "written",
      id: "rb-w8",
      prompt:
        "How might a team's sponsors react to a story like this? Describe a responsible approach versus a knee-jerk one, and the risks of each.",
      placeholder:
        "Think about morality clauses, public vs private pressure, and acting before the facts are known…",
    },
  ],
};
