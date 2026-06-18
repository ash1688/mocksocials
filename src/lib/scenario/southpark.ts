// Authored Scenario — South Park vs Power (2005–2025). Ported from the HTML POC.
// Authored, never simulated (ADR-0006). Reuses existing beat types; adds episode
// + trackrecord cards. References real public figures as satire/commentary.
import type { Scenario } from "./red-bull";

export const SOUTHPARK_SCENARIO: Scenario = {
  id: "southpark-vs-power",
  badge: "Scenario",
  title: "South Park vs Power — Sue Us Then (2005–2025)",
  prePosts: [
    { type: "post", name: "South Park Fan", handle: "@spfan_forever", av: "public", initials: "SP", text: "South Park is back tonight after a two-year hiatus. Season 27. The world has changed a lot since they were last on. I have a feeling they noticed. 🏔️", likes: 3400, rts: 780, platform: "MockTweet" },
    { type: "post", name: "Media Watcher", handle: "@mediawatcher_uk", av: "public", initials: "MW", text: "before tonight's South Park premiere let's remember where we are: Colbert cancelled, 60 Minutes settled, half of media tiptoeing around the administration. Parker and Stone have never tiptoed around anything in 28 years. should be interesting.", likes: 4800, rts: 1400, platform: "MockTweet" },
  ],
  sections: [
    {
      label: "The History — South Park vs Litigious Power",
      gap: 1800,
      posts: [
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "Before we get to 2025, you need the context. Parker and Stone have spent 28 years building a show whose whole identity is: if you're powerful and litigious and you try to silence us, we poke you harder. It started properly in 2005. Let's go back. 🧵", likes: 14200, rts: 5800, platform: "MockTweet" },
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "November 2005: South Park airs 'Trapped in the Closet' — a full-on satire of Scientology, with Tom Cruise literally refusing to come out of a closet. Why? Matt Stone later explained: 'Everyone knew Scientology was so litigious. People in Hollywood were scared. That got us going.' They were specifically motivated by the THREAT of being sued. 🏛️", likes: 18400, rts: 7200, platform: "MockTweet" },
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "Tom Cruise reportedly pressured Viacom to pull the rerun. Comedy Central pulled it — same night they cited it as a tribute to Isaac Hayes departing the show. Parker and Stone's response: 'Scientology, you may have won THIS battle, but the million-year war for Earth has just begun.' The episode still streams. Nobody got sued. Same pattern every time. 🏆", likes: 22600, rts: 9400, platform: "MockTweet" },
      ],
    },
    {
      label: "The Real Isaac Hayes Story",
      gap: 1700,
      posts: [
        { type: "post", name: "Just Found Out", handle: "@justfoundout", av: "public", initials: "JF", text: "The Isaac Hayes story is one of the most heartbreaking in TV history and not enough people know the truth. Hayes voiced Chef for 10 seasons. When Trapped in the Closet aired, a press release went out in his name saying he was quitting over the show's 'religious intolerance.' That statement was NOT written by him. 🧵", likes: 28400, rts: 14200, platform: "MockTweet" },
        { type: "reported", source: "Isaac Hayes III — statement, 2025", context: "Hayes's son, finally setting the record straight nearly 20 years after his father left the show:", quote: "My dad did not quit South Park. Scientology did. After the episode aired, my father suffered a stroke that left him unable to speak or make decisions on his own. Someone else within his Scientology circle made that decision and quit the show for him.", footer: "Hayes died in 2008, never having publicly spoken about it. The man who supposedly quit in protest had no voice in the decision. Literally. When institutions wield power, the people who get hurt are often the ones with the least agency." },
        { type: "post", name: "Just Found Out", handle: "@justfoundout", av: "public", initials: "JF", text: "Isaac Hayes was used by Scientology as a human shield. He couldn't speak. He couldn't quit. He couldn't say any of this. And for nearly 20 years, people thought he walked away by choice. That's what institutional power really looks like when it decides to protect itself. 💙", likes: 32600, rts: 16800, platform: "MockTweet" },
      ],
    },
    {
      label: "July 2025 — $1.5 Billion, Then This",
      gap: 1600,
      posts: [
        { type: "post", name: "Entertainment News", handle: "@entnewsdaily", av: "journo", initials: "EN", verified: true, text: "🚨 BREAKING: Matt Stone and Trey Parker sign a new five-year deal with Paramount worth a reported $1.5 BILLION for South Park streaming rights and 10 episodes a year. The context: Paramount recently settled a Trump lawsuit over 60 Minutes for $16 million and cancelled Stephen Colbert. Parker and Stone have just become Paramount's most expensive asset. July 21, 2025.", likes: 42400, rts: 16800, platform: "MockTweet" },
        { type: "post", name: "Media Watcher", handle: "@mediawatcher_uk", av: "public", initials: "MW", text: "So: Paramount bent the knee to Trump. Cancelled Colbert. Paid him $16m to go away. Then handed Parker and Stone $1.5bn. Two days later Parker and Stone make their most savage Trump episode in years. On Paramount's own channel. I don't know whether to be impressed or baffled but I am both simultaneously. 😂", likes: 38400, rts: 18200, platform: "MockTweet" },
      ],
    },
    {
      label: "July 23 — Sermon on the Mount",
      gap: 1500,
      posts: [
        { type: "post", name: "Entertainment News", handle: "@entnewsdaily", av: "journo", initials: "EN", verified: true, text: "South Park Season 27 is HERE. 'Sermon on the Mount' just aired and it is not holding back. Trump, Satan, micropenis jokes, Karoline Leavitt caricature, $5 billion lawsuit threat. Parker finished writing it three days ago. Two days after signing the $1.5bn deal. Genuinely unprecedented television. 😳🏔️", likes: 58400, rts: 28600, platform: "MockTweet" },
        { type: "episode", show: "South Park", season: "Season 27, Episode 1", title: "Sermon on the Mount", airdate: "July 23, 2025 — Comedy Central", bullets: [
          "Trump depicted in bed with Satan — replacing Saddam Hussein as hell's companion",
          "Trump shown with a micropenis in a fake official painting (based on a 2016 Rubio comment)",
          "Trump threatens to sue the whole town of South Park for $5 billion",
          "Karoline Leavitt caricature: cross necklace, pink suit, urging Trump to address angry supporters",
          "PC Principal rebranded 'Power Christian Principal' — satirising those who flip with the political wind",
          "NPR cancellation mourned by Cartman; Colbert cancellation name-dropped; Paramount itself mocked",
          "The Guardian called it 'a grand dare for Trump to sue them'",
        ], note: "Written in three days. Aired two days after the $1.5bn deal. The most social episode in South Park history." },
        { type: "post", name: "South Park Fan", handle: "@spfan_forever", av: "public", initials: "SP", text: "they signed the deal with the company that caved to Trump then used that deal's platform to absolutely torch him. this is either the most brilliant or most chaotic move in TV history and honestly it might be both 😭🏆", likes: 64200, rts: 34600, platform: "MockTweet" },
      ],
    },
    {
      label: "The White House Responds — Predictably",
      gap: 1600,
      posts: [
        { type: "post", name: "Donald J. Trump", handle: "@realDonaldTrump", av: "official", initials: "DT", verified: true, text: "The FAILING and DESPERATE South Park show, which NOBODY WATCHES ANYMORE, has put out a DISGUSTING hit piece against your favorite President (ME!). Very unfair, very nasty. A FOURTH RATE, LOW ENERGY show. My ratings are through the ROOF. Theirs are in FREE FALL. My lawyers are looking at EVERYTHING. SAD!", likes: 84200, rts: 42600, platform: "MockTweet" },
        { type: "post", name: "White House", handle: "@WhiteHouse", av: "public", initials: "WH", verified: true, text: "Statement — White House Assistant Press Secretary Taylor Rogers: 'This show hasn't been relevant for over 20 years and is hanging on by a thread with uninspired ideas in a desperate attempt for attention. The President is focused on delivering results for the American people.'", likes: 22400, rts: 18600, platform: "MockTweet" },
        { type: "post", name: "Karoline Leavitt", handle: "@karolineleavitt", av: "public", initials: "KL", verified: true, text: "I have not seen this episode and I do not intend to. The American people elected President Trump to secure the border, grow the economy and restore American greatness — not to engage with a failing cartoon show. God bless America and God bless our President. 🇺🇸✝️", likes: 18600, rts: 8400, platform: "MockTweet" },
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "The White House has just called South Park 'irrelevant' and 'desperate for attention.' At the exact moment the show breaks ratings records not seen since 1999. 5.9 million viewers. Most discussed show on television that night. Most social episode in South Park history. The Streisand Effect remains undefeated. 📈", likes: 44200, rts: 22800, platform: "MockTweet" },
      ],
    },
    {
      label: "Two Words at Comic-Con",
      gap: 1700,
      posts: [
        { type: "post", name: "Entertainment News", handle: "@entnewsdaily", av: "journo", initials: "EN", verified: true, text: "At San Diego Comic-Con the day after, Trey Parker was asked about the White House's reaction to the episode. The room went quiet. He leaned into the microphone. His entire response to the most powerful government in the world calling his show irrelevant and threatening action: 🎤👇", likes: 18400, rts: 6200, platform: "MockTweet" },
        { type: "post", name: "Trey Parker (documented response)", handle: "@SOUTHPARK", av: "public", initials: "TP", verified: true, text: "His real, documented, deadpan response to the entire White House meltdown: 'We're terribly sorry.' That was it. Two words. Then Matt Stone told the room what was coming next for the season: 'No politics. None of that sh*t.' Smirked. Both of them knew exactly what they were doing. Same as they always have.", likes: 86400, rts: 44200, platform: "MockTweet" },
        { type: "post", name: "South Park Fan", handle: "@spfan_forever", av: "public", initials: "SP", text: "Tom Cruise tried to pull the episode — it got more famous. Scientology threatened to sue — they kept running it. White House calls it fourth-rate — record ratings. Parker says 'we're terribly sorry' — $1.5bn deal intact, zero lawsuits. The scoreboard after 20 years: South Park 4, Power 0. 🏆", likes: 72400, rts: 38200, platform: "MockTweet" },
      ],
    },
    {
      label: "The Lesson — Three Things",
      gap: 1800,
      posts: [
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "Twenty years. Same pattern. Same result. Three things worth carrying from this whole saga. 🧵", likes: 22400, rts: 9600, platform: "MockTweet" },
        { type: "trackrecord", title: "South Park vs Power — 20 Years, Same Scoreboard", rows: [
          { year: "2005", challenger: "Tom Cruise / Scientology", move: "Pressure to pull the rerun", result: "Still streaming. Episode became legendary." },
          { year: "2006", challenger: "Scientology institution", move: "Quit for Isaac Hayes without his knowledge", result: "Chef killed off. Real story finally told in 2025." },
          { year: "2025", challenger: "The White House", move: "'Fourth-rate show. Desperate for attention.'", result: "Record ratings since 1999. 'We're terribly sorry.'" },
        ], footer: "Every time someone powerful tries to silence them, they get louder. That is not an accident. That is a strategy." },
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "ONE: The Streisand Effect. When powerful people react badly to satire, they amplify it. The White House calling South Park irrelevant sent millions of people who had never seen it straight to Paramount+. The worst thing you can do with a satirist is give them a bigger audience by reacting. 📈", likes: 28600, rts: 12400, platform: "MockTweet" },
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "TWO: Who really gets hurt when institutions use power to silence critics. Not Parker and Stone — they got richer and more famous. The person who got hurt was Isaac Hayes: used as a shield by an institution, unable to speak, his name attached to a decision he never made. Power protects itself. The individual pays. 💙", likes: 31200, rts: 14600, platform: "MockTweet" },
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "THREE: Satire only works as a check on power if satirists are willing to be sued, cancelled and called irrelevant. Parker and Stone's whole career is a masterclass in not caring what powerful people think of them. Two words. 'We're terribly sorry.' Best response in comedy history. 🎤", likes: 34800, rts: 16200, platform: "MockTweet" },
        { type: "verdict", tone: "win", label: "The Verdict",
          heading: "Try to Silence a Satirist and You Make Them Louder",
          body: "For twenty years the pattern has been identical: someone powerful tries to silence South Park, and the show gets louder, bigger and more famous. Tom Cruise pressured for a pull — the episode became legendary. The White House called it irrelevant — it drew record ratings. Three lessons. First, the Streisand Effect: reacting badly to satire amplifies it, sending people who'd never have watched straight to the source. Second, when institutions use power to silence critics, it's rarely the famous targets who get hurt — it's the people with the least agency, like Isaac Hayes, whose name was attached to a decision he couldn't even speak about. Third, satire only checks power if the satirist is willing to be sued, cancelled and dismissed — which is exactly why 'we're terribly sorry' was the perfect answer." },
        { type: "impact", title: "South Park vs Power — Same Scoreboard", stats: [
          { num: "20 yrs", label: "Of poking litigious institutions — still standing" },
          { num: "$1.5bn", label: "Deal signed, then immediately used to torch the company" },
          { num: "5.9M", label: "Viewers — record since 1999 — after being called irrelevant" },
          { num: "2 words", label: "'We're terribly sorry.' The perfect response." },
        ] },
      ],
    },
  ],
  tasks: [
    {
      type: "mcq",
      id: "sp-q1",
      prompt: "What is the 'Streisand Effect' as shown here?",
      options: [
        "Satire always fails",
        "Trying to suppress or loudly condemn something draws far more attention to it than ignoring it would",
        "Powerful people always win lawsuits",
        "Ratings don't matter",
      ],
      correctIndex: 1,
      explanation:
        "The White House calling the show irrelevant sent millions who'd never watched straight to it. Reacting badly to satire amplifies it — the opposite of silencing it.",
    },
    {
      type: "mcq",
      id: "sp-q2",
      prompt: "When institutions use power to silence critics, who tends to get hurt most?",
      options: [
        "The famous, wealthy targets",
        "Nobody — it's harmless",
        "The people with the least agency — like Isaac Hayes, whose 'resignation' was decided and announced without him",
        "The institution itself",
      ],
      correctIndex: 2,
      explanation:
        "Parker and Stone got richer and more famous. The real casualty was Hayes — used as a shield, unable to speak after a stroke, his name on a decision he never made.",
    },
    {
      type: "mcq",
      id: "sp-q3",
      prompt: "What does the Isaac Hayes story show about 'whose voice is in the story'?",
      options: [
        "He personally led the protest",
        "A statement went out in his name that he didn't write and couldn't contest — the person at the centre had no actual voice",
        "He wrote a detailed public account at the time",
        "He chose to quit on principle",
      ],
      correctIndex: 1,
      explanation:
        "For nearly 20 years people believed he quit by choice. In reality the decision and the press release came from others — the subject of the story was silenced within it.",
    },
    {
      type: "mcq",
      id: "sp-q4",
      prompt: "Why is the $1.5bn deal so striking in context?",
      options: [
        "It was the smallest deal in TV history",
        "They signed with the company that had just settled with Trump and cancelled Colbert — then used that platform to satirise him days later",
        "It banned them from making political episodes",
        "It was paid by the White House",
      ],
      correctIndex: 1,
      explanation:
        "The irony is the point: signing with a company seen as caving to power, then immediately using its own channel to mock that power — the show's whole identity in one move.",
    },
    {
      type: "mcq",
      id: "sp-q5",
      prompt: "Why was 'We're terribly sorry' an effective response?",
      options: [
        "It was a sincere apology that ended the row",
        "A deadpan non-reaction starves the story of fuel — it neither escalates nor gives the outrage anything to grab",
        "It admitted the show was wrong",
        "It threatened a counter-lawsuit",
      ],
      correctIndex: 1,
      explanation:
        "Refusing to feed the conflict (while clearly not meaning it) denies the other side oxygen. Over-reacting would have amplified the row further; the shrug did the opposite.",
    },
    {
      type: "mcq",
      id: "sp-q6",
      prompt: "What does the story say satire needs in order to act as a check on power?",
      options: [
        "Guaranteed protection from any consequences",
        "Satirists willing to be sued, cancelled and called irrelevant — i.e. not dependent on powerful people's approval",
        "The support of the government",
        "A small, private audience",
      ],
      correctIndex: 1,
      explanation:
        "Satire only holds power to account if the satirist can withstand the pushback. The willingness to be attacked is what makes the criticism credible and durable.",
    },
    {
      type: "mcq",
      id: "sp-q7",
      prompt: "The White House called the show 'irrelevant' just as it hit record ratings. What's the lesson?",
      options: [
        "Official statements are always accurate",
        "Claims should be checked against evidence — the 'irrelevant' framing was contradicted by the actual numbers",
        "Ratings are meaningless",
        "The show really was irrelevant",
      ],
      correctIndex: 1,
      explanation:
        "A confident dismissal isn't the same as a true one. 5.9m viewers — a record since 1999 — directly contradicted the 'nobody watches' claim.",
    },
    {
      type: "mcq",
      id: "sp-q8",
      prompt: "Across 2005, 2006 and 2025, what stays constant?",
      options: [
        "The show backs down each time",
        "Someone powerful tries to silence them, and the attempt makes the show louder — a repeated, deliberate pattern",
        "The challengers always win",
        "Nothing connects the three",
      ],
      correctIndex: 1,
      explanation:
        "Different decades, different challengers, same result. The track record shows it's a strategy, not luck: provoke, get attacked, grow.",
    },
    {
      type: "written",
      id: "sp-w1",
      prompt:
        "Explain the Streisand Effect using this story. Why can loudly condemning something backfire?",
      placeholder:
        "What did the White House's reaction actually do to the show's audience?…",
    },
    {
      type: "written",
      id: "sp-w2",
      prompt:
        "The Isaac Hayes story shows 'the individual pays' when institutions protect themselves. Explain what happened and why it matters.",
      placeholder:
        "Who made the decision? Whose name was on it? Who could actually speak?…",
    },
    {
      type: "written",
      id: "sp-w3",
      prompt:
        "Why does the story argue that satire needs satirists willing to be sued or cancelled? Do you agree?",
      placeholder:
        "What happens to satire that depends on powerful people's approval?…",
    },
    {
      type: "written",
      id: "sp-w4",
      prompt:
        "A confident official statement called the show 'irrelevant' while it broke ratings records. What does that teach you about checking claims against evidence?",
      placeholder:
        "How would you verify a confident assertion like that?…",
    },
    {
      type: "written",
      id: "sp-w5",
      prompt:
        "You advise a public figure facing satire they dislike. Knowing the Streisand Effect, what would you advise — and what would you avoid?",
      placeholder:
        "Think about reacting vs ignoring, amplification, and making yourself the story…",
    },
  ],
};
