// Authored Scenario — Ronaldo, "água", and the $4bn that wasn't (Euro 2020).
// Ported from the HTML POC. A fixed documentary timeline; authored, never
// simulated (ADR-0006). Shares the beat/task types defined in ./red-bull.
import type { Scenario } from "./red-bull";

export const RONALDO_SCENARIO: Scenario = {
  id: "ronaldo-agua",
  badge: "Scenario",
  title: "Ronaldo, 'Água', and the $4 Billion That Wasn't (Euro 2020)",
  prePosts: [
    { type: "post", name: "Euro 2020", handle: "@euro2020", av: "journo", initials: "E2", verified: true, text: "Matchday! 🏆 Portugal, the defending champions, begin their Euro 2020 campaign against Hungary in Budapest tonight. All eyes on captain Cristiano Ronaldo. ⚽", likes: 3200, rts: 680, platform: "MockTweet" },
    { type: "post", name: "Footy Fan", handle: "@matchday_mike", av: "public", initials: "FM", text: "press conferences before these big games are usually so boring. bottles of sponsor drinks on the table, same questions, same answers. nothing ever happens at them lol", likes: 540, rts: 90, platform: "MockTweet" },
  ],
  sections: [
    {
      label: "The Gesture — 'Água'",
      gap: 1800,
      posts: [
        { type: "post", name: "Footy Clips", handle: "@footyclips", av: "journo", initials: "FC", verified: true, text: "😂 Cristiano Ronaldo sits down at his Euro 2020 press conference, sees two Coca-Cola bottles in front of him, moves them OUT of shot, holds up a water bottle and goes: 'Agua.' Then mutters 'Coca-Cola' with a look of pure disgust. The man is committed. 💧", likes: 142000, rts: 68400, platform: "MockTweet" },
        { type: "post", name: "Health Kick Hannah", handle: "@hannah_wellness", av: "public", initials: "HH", text: "icon behaviour honestly. the fittest 36 year old on the planet telling millions of kids to drink water instead of fizzy pop? we love to see it. 💧🐐", likes: 38200, rts: 9400, platform: "MockTweet" },
        { type: "post", name: "Football Cynic", handle: "@footy_cynic", av: "public", initials: "FY", text: "everyone calling it a health crusade — fair, but let's be real, Coke also just isn't one of his sponsors and he's got his own water and supplement businesses 👀 a LITTLE bit of self-interest in there too. still funny though", likes: 21600, rts: 6800, platform: "MockTweet" },
      ],
    },
    {
      label: "The Stat That Took Off",
      gap: 1500,
      posts: [
        { type: "post", name: "Viral Hot Takes", handle: "@viralhottakes", av: "public", initials: "VH", text: "🚨🚨 BREAKING: Cristiano Ronaldo just WIPED $4 BILLION off Coca-Cola's market value by moving two bottles and saying 'drink water.' ONE MAN. ONE GESTURE. FOUR BILLION DOLLARS. the most powerful man in sport 😱🐐💰", likes: 218000, rts: 124000, platform: "MockTweet" },
        { type: "post", name: "Big Numbers Guy", handle: "@bignumbers", av: "public", initials: "BN", text: "$4,000,000,000. gone. because Ronaldo doesn't like Coke. let that sink in. he should charge them a fee just to NOT do it again 😂 absolute power move", likes: 96400, rts: 52200, platform: "MockTweet" },
        { type: "post", name: "Footy Clips", handle: "@footyclips", av: "journo", initials: "FC", verified: true, text: "the '$4 BILLION' headline is EVERYWHERE this morning. every paper, every account, every group chat. it's the perfect story — global icon, evil fizzy drink, an eye-watering number. it's got everything. 📈💥", likes: 44200, rts: 18600, platform: "MockTweet" },
      ],
    },
    {
      label: "Hang On — Let's Check That Number",
      gap: 1600,
      posts: [
        { type: "post", name: "Priya — Numbers Explainer", handle: "@priya_checks", av: "journo", initials: "PC", text: "Right, finance-brain time, because this '$4bn' stat is doing a LOT of heavy lifting and it falls apart the second you look at it. The share price did dip about 1.6% around then. But here's why 'Ronaldo wiped $4bn off Coke' is basically nonsense. 🧵👇", likes: 34600, rts: 16200, platform: "MockTweet" },
        { type: "factcheck", title: "Did Ronaldo wipe $4 billion off Coca-Cola?", claim: "\"Ronaldo's gesture wiped $4 BILLION off Coca-Cola's value!\"", rows: [
          { k: "What actually happened", v: "Coca-Cola shares dipped ~1.6% around that time." },
          { k: "Is 1.6% unusual?", v: "No. That's routine daily movement for a big stock — happens constantly, for all sorts of reasons." },
          { k: "The giveaway", v: "The wider market (S&P 500) was actually UP that day. If Ronaldo crashed the market, it didn't get the memo." },
          { k: "Caused by Ronaldo?", v: "No evidence. Correlation, not causation. Two things happened near each other — that's all." },
        ], verdict: "FALSE in spirit. A routine wobble got a famous face slapped on it and a giant number attached. The truth is boring, so the myth travelled instead." },
        { type: "post", name: "Priya — Numbers Explainer", handle: "@priya_checks", av: "journo", initials: "PC", text: "This is THE classic trap: correlation vs causation. Ronaldo moved a bottle AND the share price wobbled, near the same time. That does NOT mean one caused the other. Big stocks move 1-2% on a quiet Tuesday for no headline reason at all. The number was real — the STORY about it was invented.", likes: 28400, rts: 14800, platform: "MockTweet" },
      ],
    },
    {
      label: "Why the Myth Beat the Truth",
      gap: 1600,
      posts: [
        { type: "post", name: "Priya — Numbers Explainer", handle: "@priya_checks", av: "journo", initials: "PC", text: "Be honest — which would YOU retweet? 'Global icon single-handedly costs Coca-Cola FOUR BILLION DOLLARS' or 'large stock moves 1.6%, which is completely normal and means nothing'? Exactly. The exciting version wins every time, even when it's wrong. 📈", likes: 31200, rts: 13600, platform: "MockTweet" },
        { type: "post", name: "Football Cynic", handle: "@footy_cynic", av: "public", initials: "FY", text: "ok I 100% shared the $4bn thing yesterday without thinking 🙃 it just sounded SO good. didn't occur to me that stocks wobble all the time and a footballer can't actually crash a multinational by frowning at a bottle. lesson learned tbh.", likes: 24600, rts: 8200, platform: "MockTweet" },
        { type: "post", name: "Priya — Numbers Explainer", handle: "@priya_checks", av: "journo", initials: "PC", text: "And even Coca-Cola's response was basically a shrug — 'everyone's entitled to their drink preferences.' A company genuinely losing $4bn to a bottle-move does not respond with a polite shrug. The calm reaction is itself a clue the panic was invented. 🥤", likes: 19800, rts: 7400, platform: "MockTweet" },
      ],
    },
    {
      label: "The Aftershock — Then Pogba Did 'It Too'",
      gap: 1600,
      posts: [
        { type: "post", name: "Footy Clips", handle: "@footyclips", av: "journo", initials: "FC", verified: true, text: "👀 A day after Ronaldo, Paul Pogba sits down at HIS press conference and quietly moves a Heineken bottle out of the way. No comment, no speech, just slides it aside. And the internet immediately goes: 'HE'S DOING IT TOO! It's a movement! Athletes vs sponsors!' 🍺❌", likes: 88200, rts: 41600, platform: "MockTweet" },
        { type: "post", name: "Hype Account", handle: "@therealhype", av: "public", initials: "HA", text: "FIRST RONALDO NOW POGBA 🔥 the players are RISING UP against the sponsors!! this is a REVOLUTION. who's next?? Coca-Cola AND Heineken in shambles. football will never be the same 😤⚽", likes: 42400, rts: 22800, platform: "MockTweet" },
        { type: "post", name: "Priya — Numbers Explainer", handle: "@priya_checks", av: "journo", initials: "PC", text: "Except... that's not what Pogba did. He's a practising Muslim. He doesn't drink alcohol — for religious reasons. He moved a beer bottle because he personally doesn't drink, said nothing, made no protest. (It was even the 0.0% version.) It's a totally different thing to Ronaldo's sponsor dig. 🧵", likes: 36200, rts: 17400, platform: "MockTweet" },
        { type: "post", name: "Priya — Numbers Explainer", handle: "@priya_checks", av: "journo", initials: "PC", text: "But because the 'athletes vs sponsors' STORY already existed from Ronaldo, Pogba's completely separate, personal, faith-based choice got yanked into it. A man quietly observing his religion became 'episode two' of a revolution that wasn't happening. See how that works?", likes: 29800, rts: 13200, platform: "MockTweet" },
      ],
    },
    {
      label: "The Lesson — Two Traps in One Week",
      gap: 1800,
      posts: [
        { type: "post", name: "Priya — Numbers Explainer", handle: "@priya_checks", av: "journo", initials: "PC", text: "So this one week gave us TWO of the most common ways the internet fools you, back to back. Worth knowing both on sight. 🧠👇", likes: 27400, rts: 12600, platform: "MockTweet" },
        { type: "twolesson", title: "Two Traps, One Week", left: { label: "Trap 1 — the viral stat", points: [
          "A big, satisfying number ('$4 BILLION!')",
          "Correlation dressed up as causation",
          "The exciting myth outruns the boring truth",
          "Nobody checks because it FEELS right",
        ] }, right: { label: "Trap 2 — the story template", points: [
          "A narrative exists ('athletes vs sponsors')",
          "A new event gets forced to fit it",
          "Pogba's faith ≠ Ronaldo's protest",
          "Different thing, same label slapped on",
        ] }, verdict: "Ronaldo moved a bottle. A routine market wobble became a '$4bn' legend, and a man observing his religion became 'episode two.' Neither story was true as told." },
        { type: "post", name: "Priya — Numbers Explainer", handle: "@priya_checks", av: "journo", initials: "PC", text: "Your toolkit: 1) A giant number with a famous name on it? Ask 'compared to what's normal?' before you share. 2) Correlation isn't causation — two things near each other ≠ one caused the other. 3) When event B 'fits the story' a bit too perfectly, check it isn't just being forced into a template. 🧠✅", likes: 33600, rts: 16800, platform: "MockTweet" },
        { type: "post", name: "Football Cynic", handle: "@footy_cynic", av: "public", initials: "FY", text: "genuinely the most useful thing I've learned from a football story. a bloke moved a fizzy drink and I believed he crashed a billion-dollar company. the gesture was real. everything I was TOLD about it wasn't. checking before sharing from now on 💧", likes: 26200, rts: 10400, platform: "MockTweet" },
        { type: "verdict", tone: "cautionary", label: "The Verdict",
          heading: "When the Number Was Real but the Story Was Invented",
          body: "Ronaldo moved two Coca-Cola bottles and said 'água'. The gesture was real — but almost everything the internet said about it wasn't. A routine ~1.6% share dip (on a day the wider market actually rose) had a famous face and a giant '$4 billion' attached, because the exciting myth travels faster than the boring truth. Then a separate, personal act — Pogba moving a beer bottle for religious reasons — was forced into an 'athletes vs sponsors' story that didn't exist. Two classic traps in one week: correlation dressed up as causation, and a real event bent to fit a ready-made narrative. The habit that defeats both: with a big number and a famous name, ask 'compared to what's normal?' and 'did this really cause that?' before you share." },
        { type: "impact", title: "Água — The 4 Billion Dollars That Wasn't", stats: [
          { num: "1.6%", label: "The real (routine) Coca-Cola dip" },
          { num: "$4bn", label: "The number the myth attached to it" },
          { num: "↑", label: "Which way the wider market went that day" },
          { num: "2", label: "Different bottle-moves, one false 'movement'" },
        ] },
      ],
    },
  ],
  tasks: [
    {
      type: "mcq",
      id: "ra-q1",
      prompt: "What is the core flaw in the claim that Ronaldo 'wiped $4 billion off Coca-Cola'?",
      options: [
        "The share price never moved at all",
        "It treats correlation as causation — two things happened near each other, with no evidence one caused the other",
        "Coca-Cola was one of Ronaldo's sponsors",
        "Ronaldo never actually moved the bottles",
      ],
      correctIndex: 1,
      explanation:
        "The shares did dip slightly around that time, but nothing shows the gesture caused it. Two events happening close together isn't proof that one caused the other — that's the correlation-vs-causation trap.",
    },
    {
      type: "mcq",
      id: "ra-q2",
      prompt: "What actually happened to Coca-Cola's share price?",
      options: [
        "It crashed by $4 billion in minutes",
        "It dipped about 1.6% — routine movement — while the wider market that day was actually up",
        "It doubled overnight",
        "It was suspended from trading",
      ],
      correctIndex: 1,
      explanation:
        "A ~1.6% move is ordinary daily noise for a big stock. And the wider market rose that day — if Ronaldo had really crashed Coke, the rest of the market 'didn't get the memo'.",
    },
    {
      type: "mcq",
      id: "ra-q3",
      prompt: "Why did the '$4bn' myth spread faster than the accurate explanation?",
      options: [
        "Because it was published first",
        "Because a big number with a famous name is exciting and shareable, while 'a stock moved 1.6%, which is normal' is boring",
        "Because Coca-Cola promoted it",
        "Because fact-checkers confirmed it",
      ],
      correctIndex: 1,
      explanation:
        "The thrilling version ('icon costs Coke FOUR BILLION') gets shared; the accurate, dull version doesn't. Exciting falsehoods routinely outrun boring truths online.",
    },
    {
      type: "mcq",
      id: "ra-q4",
      prompt: "You see 'famous person wipes $X billion off a company'. What's the best first question?",
      options: [
        "How many people have shared it?",
        "Is the number big enough to be interesting?",
        "Compared to what's normal — is this actually an unusual movement, and did this really cause that?",
        "Which celebrity was involved?",
      ],
      correctIndex: 2,
      explanation:
        "A giant number means little without context. Asking 'compared to what's normal?' and 'is there evidence of cause?' deflates most viral-stat claims instantly.",
    },
    {
      type: "mcq",
      id: "ra-q5",
      prompt: "What did Pogba actually do, and why did it get misreported?",
      options: [
        "He led a planned protest against Heineken alongside Ronaldo",
        "He moved a beer bottle for personal/religious reasons (he doesn't drink) — but it was forced into the existing 'athletes vs sponsors' story",
        "He promoted Heineken on camera",
        "He refused to attend the press conference",
      ],
      correctIndex: 1,
      explanation:
        "Pogba, a practising Muslim, simply moved an alcohol bottle and said nothing. Because a 'movement' narrative already existed, his unrelated, personal choice was wrongly cast as 'episode two'.",
    },
    {
      type: "mcq",
      id: "ra-q6",
      prompt: "The Pogba mix-up is an example of which trap?",
      options: [
        "A fabricated quote",
        "A 'story template' — a new event bent to fit a narrative that already exists",
        "A deepfake video",
        "A hacked account",
      ],
      correctIndex: 1,
      explanation:
        "Once a storyline ('athletes vs sponsors') is established, people slot fresh events into it whether they fit or not. Pogba's faith-based choice was a different thing entirely.",
    },
    {
      type: "mcq",
      id: "ra-q7",
      prompt: "What nuance complicates the 'pure health crusade' reading of Ronaldo's gesture?",
      options: [
        "Coca-Cola was his main sponsor",
        "Coke wasn't his sponsor and he has his own water and supplement businesses — so there was self-interest too",
        "He was paid by a rival drinks company to do it",
        "He later apologised to Coca-Cola",
      ],
      correctIndex: 1,
      explanation:
        "It can be both genuine and self-interested: promoting water fits his image and his own brands, and Coke wasn't a sponsor he'd lose. Motives are rarely as clean as a viral framing suggests.",
    },
    {
      type: "mcq",
      id: "ra-q8",
      prompt: "Why was Coca-Cola's calm response ('everyone's entitled to their drink preferences') a clue?",
      options: [
        "It proved they were panicking",
        "A company genuinely losing billions wouldn't respond with a relaxed shrug — the calm reaction suggested the '$4bn panic' was overblown",
        "It showed they blamed Ronaldo",
        "It confirmed the $4 billion figure",
      ],
      correctIndex: 1,
      explanation:
        "Reactions are evidence. A measured, unbothered response is not how a business behaves after a real multi-billion-dollar hit — it signalled the crisis was invented.",
    },
    {
      type: "mcq",
      id: "ra-q9",
      prompt: "\"Correlation isn't causation\" means…",
      options: [
        "Numbers are always wrong",
        "Two things happening close together doesn't mean one caused the other",
        "Famous people can't affect markets",
        "Share prices never move",
      ],
      correctIndex: 1,
      explanation:
        "It's the central lesson: timing overlap is not proof of cause. You need actual evidence that A produced B before claiming it.",
    },
    {
      type: "mcq",
      id: "ra-q10",
      prompt: "If you ran Coca-Cola's social media, the smartest response to the moment would be…",
      options: [
        "A long, defensive statement insisting the $4bn figure is false",
        "Threaten legal action against accounts sharing it",
        "A calm, light touch that doesn't feed the story or amplify the myth",
        "Stay completely silent for two weeks",
      ],
      correctIndex: 2,
      explanation:
        "Over-reacting would amplify a myth that was already deflating on its own. A measured, good-humoured response starves the story of fuel — which is roughly what Coca-Cola did.",
    },
    {
      type: "written",
      id: "ra-w1",
      prompt:
        "Using the '$4 billion' claim, explain the difference between correlation and causation in your own words.",
      placeholder:
        "What two things happened? Why doesn't their timing prove one caused the other?…",
    },
    {
      type: "written",
      id: "ra-w2",
      prompt:
        "Why does an exciting falsehood often spread further than a boring truth online? Use this story as your example.",
      placeholder:
        "Compare the shareability of the '$4bn' headline with the accurate '1.6% is normal' version…",
    },
    {
      type: "written",
      id: "ra-w3",
      prompt:
        "Explain the 'story template' trap using the Pogba example. Why is it dangerous to bend a new event to fit an existing narrative?",
      placeholder:
        "What was the existing narrative? What did Pogba actually do? What harm does the mislabelling cause?…",
    },
    {
      type: "written",
      id: "ra-w4",
      prompt:
        "Ronaldo's gesture had mixed motives. Explain why 'health crusade' wasn't the whole picture, and why a person's motives matter when you read a viral moment.",
      placeholder:
        "Think about his own businesses, who his sponsors were, and how framing hides nuance…",
    },
    {
      type: "written",
      id: "ra-w5",
      prompt:
        "You're about to share a viral stat with a big number and a famous name attached. Walk through the checks you would do first.",
      placeholder:
        "Compared to what's normal? Is there evidence of cause? Who benefits from the framing?…",
    },
    {
      type: "written",
      id: "ra-w6",
      prompt:
        "How should a sponsor like Coca-Cola or Heineken respond to a moment like this — and what would a bad over-reaction look like, and why?",
      placeholder:
        "Think about amplification, tone, and the risk of making yourself the story…",
    },
  ],
};
