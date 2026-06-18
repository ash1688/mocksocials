// Authored Scenario — "The Most Penalised Driver in F2 History" (2019), an RPM
// retrospective. Ported from the HTML POC. Authored, never simulated (ADR-0006).
// Reuses existing beat types (rpmvideo -> MockTube post; pointstracker ->
// counttimeline). The named drivers' lines are paraphrased/authored composites.
import type { Scenario } from "./red-bull";

export const RAGHUNATHAN_SCENARIO: Scenario = {
  id: "raghunathan-penalties",
  badge: "Scenario",
  title: "The Most Penalised Driver in F2 History (2019)",
  prePosts: [
    { type: "post", name: "RockerPoweredMohawk", handle: "@RPM_racing", av: "creator", initials: "RPM", verified: true, creator: true, text: "new vid today and it's one of my all-time FAVOURITE motorsport stories. a man, a season, and an absolutely heroic number of penalties. you are not ready. 🚩🔔", likes: 13200, rts: 2400, platform: "MockTweet" },
    { type: "post", name: "RPM Superfan", handle: "@mohawk_gang", av: "public", initials: "RS", text: "an RPM deep-dive on the penalty points guy?? I have been WAITING for someone to do this story justice. sat down, snacks ready 🍿🚩", likes: 1900, rts: 160, platform: "MockTweet" },
  ],
  sections: [
    {
      label: "Cold Open — The Wrong Kind of Record",
      gap: 1800,
      posts: [
        { type: "post", name: "RockerPoweredMohawk", handle: "@RPM_racing", av: "creator", initials: "RPM", verified: true, platform: "MockTube", videoTitle: "The Most PENALISED Driver in F2 History 🏁🚩", text: "Right you lot. Today: the legend of the man who collected penalty points like Pokemon. The first driver EVER banned under the superlicence system. The man who broke the rulebook so badly the FIA changed the rules. One season. Twenty-four penalty points. Buckle up, this is a JOURNEY. ▶️", likes: 1800000, rts: 0 },
        { type: "post", name: "RockerPoweredMohawk", handle: "@RPM_racing", av: "creator", initials: "RPM", creator: true, text: "Quick note before we start: this is all in good fun and it's all on the public record — these are just the penalties, which anyone can look up. The lad was a pay-driver in one of the most brutal series on earth. We're laughing WITH the chaos, not kicking a bloke while he's down. Now. Let's begin the speedrun. 🏁", likes: 38400, rts: 7600, platform: "MockTweet" },
      ],
    },
    {
      label: "Chapter 1 — One Round In...",
      gap: 1600,
      posts: [
        { type: "post", name: "RockerPoweredMohawk", handle: "@RPM_racing", av: "creator", initials: "RPM", creator: true, text: "Round 1. Bahrain. The season is mere HOURS old. And our man immediately... crosses the chequered flag TWICE. As in, did a victory-lap-style extra pass of the line he wasn't supposed to. Penalty. We are one round in and the collection has BEGUN. 🏁🚩", likes: 31200, rts: 6800, platform: "MockTweet" },
        { type: "post", name: "RockerPoweredMohawk", handle: "@RPM_racing", av: "creator", initials: "RPM", creator: true, text: "Oh and he also forgot to stop for the weigh-bridge. And a bit later in Baku, overtook someone under safety car — which is a big no-no. The stewards are getting to know him on a first-name basis and it's barely spring. 😅", likes: 24600, rts: 5200, platform: "MockTweet" },
      ],
    },
    {
      label: "Chapter 2 — Collect Them All",
      gap: 1500,
      posts: [
        { type: "post", name: "RockerPoweredMohawk", handle: "@RPM_racing", av: "creator", initials: "RPM", creator: true, text: "By now the internet has CLOCKED what's happening, and the meme is born: 'gotta collect 'em all.' Every weekend, new penalty, new points. People started keeping a TRACKER. Here's the board, because honestly it's a thing of beauty. 👇🚩", likes: 34200, rts: 8400, platform: "MockTweet" },
        { type: "counttimeline", title: "🚩 Penalty Points Tracker — 2019 (not the good kind)", rows: [
          { date: "Bahrain", event: "Crossed the chequered flag twice + missed weigh-bridge", count: "•" },
          { date: "Baku", event: "Overtook under safety car", count: "•" },
          { date: "Paul Ricard", event: "Ignored the Virtual Safety Car ×3 in ONE race", count: "+9" },
          { date: "→ TOTAL", event: "Hit 12 — FIRST EVER superlicence ban", count: "12", final: true },
          { date: "Spa / Sochi+", event: "Yellow flags, track limits, practice-start chaos", count: "+12" },
          { date: "SEASON", event: "Grand total", count: "24", final: true },
        ], footer: "Drivers normally try to avoid these. He treated it like a high score." },
        { type: "post", name: "Meme Pit Lane", handle: "@memepitlane", av: "public", initials: "MP", text: "this man is SPEEDRUNNING penalty points 😭 forgot the racing entirely and went for a different leaderboard. genuinely iconic. wrong kind of legend but a legend nonetheless 🏆🚩", likes: 28600, rts: 12400, platform: "MockTweet" },
      ],
    },
    {
      label: "Chapter 3 — Nine Points. One Race.",
      gap: 1600,
      posts: [
        { type: "post", name: "RockerPoweredMohawk", handle: "@RPM_racing", av: "creator", initials: "RPM", creator: true, text: "But the MASTERPIECE. The Sistine Chapel of this whole saga. Paul Ricard, France. In a SINGLE race, he ignores the Virtual Safety Car not once, not twice, but THREE separate times. Three points each. That's NINE penalty points. In one race. A personal best nobody asked for. 🎨🚩", likes: 36800, rts: 9600, platform: "MockTweet" },
        { type: "post", name: "RockerPoweredMohawk", handle: "@RPM_racing", av: "creator", initials: "RPM", creator: true, text: "That tipped him to 12 — and the superlicence system kicks in: 12 points = automatic ban. He became the FIRST driver EVER banned under a system that had existed since 2014. Not Verstappen, not Grosjean, not anyone in F1. Him. Missed the next round at the Red Bull Ring. History. 🏆🚩", likes: 31400, rts: 8800, platform: "MockTweet" },
      ],
    },
    {
      label: "Chapter 4 — He Does It AGAIN",
      gap: 1600,
      posts: [
        { type: "post", name: "RockerPoweredMohawk", handle: "@RPM_racing", av: "creator", initials: "RPM", creator: true, text: "Now. You serve a ban, your 12 points get wiped, you come back with a clean slate. A fresh start. A chance to chill out. Our hero looked at that clean slate and said: 'bet.' And proceeded to collect ANOTHER. TWELVE. POINTS. Yellow flags, track limits, the lot. 😭🚩", likes: 33600, rts: 9200, platform: "MockTweet" },
        { type: "post", name: "RockerPoweredMohawk", handle: "@RPM_racing", av: "creator", initials: "RPM", creator: true, text: "It got so notable that the actual PRESIDENT of the FIA, Jean Todt, started talking about extending penalty-point systems down into F4, F3 and F2 — basically pointing at this one season as the reason. Think about that. He broke the game so thoroughly they patched it. 🎮🚩", likes: 29800, rts: 10400, platform: "MockTweet" },
      ],
    },
    {
      label: "Chapter 5 — The Technicality & The Exit",
      gap: 1700,
      posts: [
        { type: "post", name: "RockerPoweredMohawk", handle: "@RPM_racing", av: "creator", initials: "RPM", creator: true, text: "Final round, Abu Dhabi. He picks up ANOTHER penalty — enough that he should be banned a SECOND time. The meme is about to get its perfect ending. Except... 🥁 the rule bans you from the FOLLOWING event. And this was the last event of the season. There WAS no following event. He escaped on a pure technicality. 😂🚩", likes: 38200, rts: 12600, platform: "MockTweet" },
        { type: "post", name: "RockerPoweredMohawk", handle: "@RPM_racing", av: "creator", initials: "RPM", creator: true, text: "Twenty-four penalty points. The only driver ever banned under the system. Saved from a second ban only because the calendar ran out. And then? That was it. He never raced in F2 again. Call it kicked out, call it 'not invited back,' call it the sport quietly closing the door — whatever you call it, the speedrun was over. 🏁", likes: 34600, rts: 11800, platform: "MockTweet" },
        { type: "post", name: "Meme Pit Lane", handle: "@memepitlane", av: "public", initials: "MP", text: "ended his F2 career with a PERFECT 24/24 penalty points and a rule change named after him basically 😭 they don't make them like this anymore. absolute folk hero. 🚩🏆", likes: 26400, rts: 9800, platform: "MockTweet" },
      ],
    },
    {
      label: "But Not Everyone Was Laughing",
      gap: 1700,
      posts: [
        { type: "post", name: "RockerPoweredMohawk", handle: "@RPM_racing", av: "creator", initials: "RPM", creator: true, text: "Now — and this is important — while the internet was having a field day, the actual paddock was NOT all laughing. Because underneath the memes, some of this stuff was genuinely dangerous, and the drivers who race wheel-to-wheel at 200mph had things to say. 🏁", likes: 28600, rts: 7200, platform: "MockTweet" },
        { type: "post", name: "Max Verstappen", handle: "@Max33Verstappen", av: "driver", initials: "MV", verified: true, text: "The blunt racer's take, paraphrased from the kind of thing Max would say: it's funny on your phone, but when you're the one out there racing next to it, it's not funny at all. Ignoring a safety car, practice starts with cars ahead — that's how someone gets hurt. Marshals are on that track too.", likes: 64200, rts: 18600, platform: "MockTweet" },
        { type: "post", name: "Sebastian Vettel", handle: "@SebVettel", av: "driver", initials: "SV", verified: true, text: "And the kind of point Seb has always made about respect for the people on track: every flag and every safety procedure exists because a marshal, a fellow driver, someone's life depends on it. You can laugh at the chaos, but the rules being broken here are the ones that keep people alive. That part isn't a joke.", likes: 58400, rts: 16200, platform: "MockTweet" },
        { type: "post", name: "Lewis Hamilton", handle: "@LewisHamilton", av: "driver", initials: "LH", verified: true, text: "The role-model angle Lewis would reach for: there are kids in karting right now watching everything we do. What does it teach them if you can drive like this all season and the headline is that you went viral? We have a responsibility to set the standard for the ones coming up behind us. 🧒🏎️", likes: 72600, rts: 21400, platform: "MockTweet" },
        { type: "post", name: "Toto Wolff", handle: "@totowolff", av: "public", initials: "TW", verified: true, text: "And the team-principal view Toto would take: this is a feeder series — its whole job is to produce the next generation safely and properly. If the lasting story of a season is a penalty-points meme, that's a problem for the sport's standards, not just one driver. The example at this level matters enormously.", likes: 48200, rts: 13800, platform: "MockTweet" },
        { type: "post", name: "Jenson Button", handle: "@JensonButton", av: "driver", initials: "JB", verified: true, text: "And Jenson, in his measured pundit way, would probably bridge it: look, it IS funny, I've laughed at the clips too. But every one of us started in karts dreaming of an F2 seat, and you'd hate for a young driver to think this is how you get noticed. Be quick AND be safe. Both. 🏁", likes: 52800, rts: 15600, platform: "MockTweet" },
        { type: "post", name: "RockerPoweredMohawk", handle: "@RPM_racing", av: "creator", initials: "RPM", creator: true, text: "And honestly? They're right. The stewards literally called one of his moves 'extremely dangerous.' This is the tension with these viral sport stories: the same thing can be a hilarious meme AND a genuine safety problem the professionals are right to take seriously. Both, at once. 🚩", likes: 26200, rts: 8800, platform: "MockTweet" },
      ],
    },
    {
      label: "Outro — Enjoy the Legend, Remember the Human",
      gap: 1800,
      posts: [
        { type: "post", name: "RockerPoweredMohawk", handle: "@RPM_racing", av: "creator", initials: "RPM", creator: true, text: "Okay, some genuinely useful things to take from all this, because there's more here than just laughs. 🧠👇", likes: 27200, rts: 8400, platform: "MockTweet" },
        { type: "post", name: "RockerPoweredMohawk", handle: "@RPM_racing", av: "creator", initials: "RPM", creator: true, text: "ONE — 'record-breaking season' is a framing trick. I literally called him 'record-breaking' at the start, and it's TRUE — most penalty points ever, first banned, etc. But 'record-breaking' makes you picture a champion. Same word, opposite meaning. Watch how a label points you somewhere before you've checked the facts. (Yeah, I did it to you on purpose.) 😏", likes: 31800, rts: 11200, platform: "MockTweet" },
        { type: "post", name: "RockerPoweredMohawk", handle: "@RPM_racing", av: "creator", initials: "RPM", creator: true, text: "TWO — a thing can be funny AND serious at the same time, and you've got to hold both. The meme is genuinely brilliant. The drivers worrying about safety and the example it sets for kids coming up are ALSO genuinely right. Maturity online is being able to laugh and still take the real bit seriously. 🏎️🚩", likes: 30200, rts: 10800, platform: "MockTweet" },
        { type: "post", name: "RockerPoweredMohawk", handle: "@RPM_racing", av: "creator", initials: "RPM", creator: true, text: "THREE — and this one matters. The meme is funny. But there was a real bloke behind it: a young driver, paying to be there, in over his head in a savage series, who's now defined FOREVER by one chaotic year. Laugh at the saga, absolutely. Just don't forget the punchline is a person. Enjoy the legend, remember the human. 💙", likes: 36400, rts: 13600, platform: "MockTweet" },
        { type: "verdict", tone: "cautionary", label: "The Verdict",
          heading: "Enjoy the Legend, Remember the Human",
          body: "One season, twenty-four penalty points, the first driver ever banned under the superlicence system, and a rule the FIA looked at changing because of him — it's a genuinely brilliant bit of internet folklore. But the saga carries three lessons worth more than the laughs. First, 'record-breaking' is a framing trick: it's literally true yet it makes you picture a champion, showing how a label steers you before you've checked the facts. Second, a thing can be funny AND serious at once — the meme is great, and the drivers worrying about safety and the example set for kids coming up are also right; maturity is holding both. Third, the punchline was a person: a young pay-driver, out of his depth, now defined forever by one chaotic year. Laugh at the legend — just remember the human." },
        { type: "impact", title: "The Most Penalised Driver in F2 History", stats: [
          { num: "24", label: "Penalty points in one season" },
          { num: "1st", label: "Driver ever banned under the superlicence system" },
          { num: "9", label: "Points in a SINGLE race (a personal best)" },
          { num: "1", label: "Human behind the meme — worth remembering" },
        ] },
      ],
    },
  ],
  tasks: [
    {
      type: "mcq",
      id: "rg-q1",
      prompt: "RPM calls the driver 'record-breaking'. Why is that a framing trick?",
      options: [
        "It's a lie — he broke no records",
        "It's literally true, but the word makes you picture a champion — a label that steers you before you check the facts",
        "It means he won the championship",
        "It only applies to F1",
      ],
      correctIndex: 1,
      explanation:
        "He did break records — for penalties and bans. But 'record-breaking' primes you to imagine success. Same words, opposite meaning: watch how a label points you somewhere before the facts arrive.",
    },
    {
      type: "mcq",
      id: "rg-q2",
      prompt: "What is the central 'hold both' lesson of the story?",
      options: [
        "The meme was the only thing that mattered",
        "Safety concerns mean you can't ever laugh",
        "A thing can be genuinely funny AND genuinely serious at the same time — you have to hold both",
        "The drivers were overreacting",
      ],
      correctIndex: 2,
      explanation:
        "The meme is brilliant and the safety worries are valid. Maturity online is being able to laugh while still taking the real risk seriously.",
    },
    {
      type: "mcq",
      id: "rg-q3",
      prompt: "What were the racing drivers (Verstappen, Vettel, Hamilton) actually worried about?",
      options: [
        "Losing the meme war",
        "Real safety — ignoring safety cars and reckless practice starts endanger marshals and fellow drivers",
        "Their own follower counts",
        "The colour of his car",
      ],
      correctIndex: 1,
      explanation:
        "Safety rules exist because lives depend on them. From inside the car the chaos isn't funny — it's how people get hurt, including the marshals on track.",
    },
    {
      type: "mcq",
      id: "rg-q4",
      prompt: "What is the 'role-model' point Hamilton raises?",
      options: [
        "Only champions deserve attention",
        "Kids in karting watch everything — and 'drive recklessly, go viral' is a bad lesson to model",
        "Young drivers should copy the penalties",
        "Role models don't matter in sport",
      ],
      correctIndex: 1,
      explanation:
        "The example set at this level matters: if chaos is what gets you noticed, that's the wrong message for the next generation coming up behind.",
    },
    {
      type: "mcq",
      id: "rg-q5",
      prompt: "How did the sport itself respond to the season?",
      options: [
        "It gave him a trophy",
        "It ignored it entirely",
        "The FIA president floated extending penalty-point systems down into the junior series — he 'broke the game so thoroughly they patched it'",
        "It banned all penalties",
      ],
      correctIndex: 2,
      explanation:
        "When one season prompts the governing body to look at changing the rules across the feeder series, that's the clearest sign the behaviour was a genuine problem, not just content.",
    },
    {
      type: "mcq",
      id: "rg-q6",
      prompt: "What does 'remember the human' mean here?",
      options: [
        "Stop finding it funny",
        "Behind the meme is a real young pay-driver now defined forever by one chaotic year — laugh at the saga, not at the person",
        "He deserved everything he got",
        "Memes are never acceptable",
      ],
      correctIndex: 1,
      explanation:
        "You can enjoy the legend while remembering the punchline is a person whose career and reputation were shaped by a single season.",
    },
    {
      type: "mcq",
      id: "rg-q7",
      prompt: "How did he avoid a second ban at the final round?",
      options: [
        "The stewards forgave him",
        "He appealed successfully",
        "On a technicality — the ban applies to the FOLLOWING event, and it was the last race of the season",
        "He paid a fine instead",
      ],
      correctIndex: 2,
      explanation:
        "The calendar ran out. There was no following event to be banned from, so the rule had nothing to bite on — a fittingly chaotic ending to the saga.",
    },
    {
      type: "mcq",
      id: "rg-q8",
      prompt: "Why does Toto argue the standards of a feeder series matter so much?",
      options: [
        "Feeder series don't matter at all",
        "Its whole job is to develop the next generation safely — so a penalty meme becoming the season's story is a standards problem, not just one driver's",
        "Only the championship winner matters",
        "Because memes boost ticket sales",
      ],
      correctIndex: 1,
      explanation:
        "A feeder series exists to produce capable, safe drivers. If its defining story is reckless chaos, that reflects on the sport's pipeline and standards.",
    },
    {
      type: "written",
      id: "rg-w1",
      prompt:
        "Explain the 'record-breaking' framing trick using this story. How can a true label still mislead?",
      placeholder:
        "What does 'record-breaking' make you picture? What was actually being broken?…",
    },
    {
      type: "written",
      id: "rg-w2",
      prompt:
        "'Funny AND serious.' Explain how a meme and a genuine safety concern can both be valid at the same time.",
      placeholder:
        "Why doesn't enjoying the meme mean dismissing the danger — and vice versa?…",
    },
    {
      type: "written",
      id: "rg-w3",
      prompt:
        "Why does 'remember the human' matter when a real person becomes an internet meme?",
      placeholder:
        "Think about permanence, proportionality, and the person behind the punchline…",
    },
    {
      type: "written",
      id: "rg-w4",
      prompt:
        "The drivers raised safety and role-model concerns. Summarise them, and say whether you find them fair.",
      placeholder:
        "What exactly is the danger? Who is watching? Is the worry proportionate?…",
    },
    {
      type: "written",
      id: "rg-w5",
      prompt:
        "You run the feeder series. How would you balance the fun and virality of a story like this against safety and the sport's standards?",
      placeholder:
        "Consider rules, messaging, the example set, and the driver as a person…",
    },
  ],
};
