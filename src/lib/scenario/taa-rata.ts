// Authored Scenario — TAA, "Rata" and the wall that told both stories (2025).
// Ported from the HTML POC. Authored, never simulated (ADR-0006). The POC's
// framing/comparison cards map to our twolesson card; photos become captioned
// placeholders.
import type { Scenario } from "./red-bull";

export const TAA_RATA_SCENARIO: Scenario = {
  id: "taa-rata-mural",
  badge: "Scenario",
  title: "TAA — Rata and the Wall That Told Both Stories (2025)",
  prePosts: [
    { type: "post", name: "Champions League", handle: "@ChampionsLeague", av: "journo", initials: "CL", verified: true, text: "Tonight at Anfield 🏆 Liverpool vs Real Madrid — UEFA Champions League, matchday 4. A huge night in European football, and for one player in particular, a return that means more than most. #UCL", likes: 84200, rts: 22600, platform: "MockTweet" },
    { type: "post", name: "Red Forever", handle: "@red_forever_lfc", av: "public", initials: "RF", text: "can't pretend tonight is a normal game. it isn't. you know why. 🔴", likes: 6400, rts: 1200, platform: "MockTweet" },
  ],
  sections: [
    {
      label: "The Mural — A Normal Lad From Liverpool",
      gap: 1800,
      posts: [
        { type: "post", name: "The Anfield Wrap", handle: "@TheAnfieldWrap", av: "public", initials: "AW", verified: true, text: "Sybil Road, a stone's throw from Anfield. A mural celebrating a local boy who lived the dream. Six years old when he joined the academy. 354 appearances. Every major trophy. And his own words on the wall: 'I'm just a normal lad from Liverpool whose dream has just come true.' 🔴", likes: 38400, rts: 8200, platform: "MockTweet" },
        { type: "post", name: "Red Forever", handle: "@red_forever_lfc", av: "public", initials: "RF", text: "that mural meant everything when it went up. a kid from West Derby who grew up supporting us, came through our academy, and became one of the best right backs in the world in our shirt. proper Liverpool, through and through. proud of that wall. 🔴", likes: 22400, rts: 4800, platform: "MockTweet" },
      ],
    },
    {
      label: "The Departure — The Bond Breaks",
      gap: 1700,
      posts: [
        { type: "post", name: "Liverpool Echo", handle: "@LivEchoLFC", av: "journo", initials: "LE", verified: true, text: "It's confirmed. Trent Alexander-Arnold will leave Liverpool this summer for Real Madrid. Two decades on Merseyside, six years old when he joined the academy. He ran his contract down, and despite Liverpool's desperation to keep him, he is gone. The club reluctantly accepted £10m compensation to allow him to leave early. 🔴➡️⚪", likes: 64200, rts: 22800, platform: "MockTweet" },
        { type: "post", name: "Red Forever", handle: "@red_forever_lfc", av: "public", initials: "RF", text: "I'm trying to be rational about this but honestly it just hurts. not because he left — players leave — but because of HOW. running the contract down, the months of speculation killing our season, getting booed in your own ground in your final weeks. it feels like a betrayal. I can't help that.", likes: 31600, rts: 9400, platform: "MockTweet" },
        { type: "post", name: "Footy Neutral", handle: "@footyneutral_uk", av: "public", initials: "FN", text: "from the outside looking in: he has every right to move. he's 26, this might be his one chance at Real Madrid. he gave Liverpool 20 years. the contract saga was messy but he broke no rules. hard to call someone who gave you that much a rat for choosing his own future.", likes: 24800, rts: 8200, platform: "MockTweet" },
      ],
    },
    {
      label: "Adios El Rata — The Mural Defaced",
      gap: 1600,
      posts: [
        { type: "post", name: "Liverpool Echo", handle: "@LivEchoLFC", av: "journo", initials: "LE", verified: true, text: "Real Madrid are back at Anfield tonight for the Champions League — and this morning the TAA mural on Sybil Road looked like this. 👇 White paint splattered across the number 66. 'RAT' written twice. 'ADIOS EL RATA' across the bottom. The mural that once read his own words has been covered in the worst verdict the Kop could give him.", likes: 88400, rts: 36200, platform: "MockTweet" },
        { type: "photo", name: "Liverpool Echo", handle: "@LivEchoLFC", av: "journo", initials: "LE", verified: true, caption: "The Sybil Road mural this morning. 'I'm just a normal lad from Liverpool whose dream has just come true' — still readable on the right. 'RAT. ADIOS EL RATA.' — added overnight. One wall. Two completely different stories about the same man.", platform: "MockTweet" },
        { type: "post", name: "Local Resident", handle: "@sybilroad_local", av: "public", initials: "LR", text: "reminder that this is also the side wall of someone's actual home. the person who lives there has had their house vandalised — twice now — because of a footballer's transfer decision. I get the anger. I'm not sure those residents signed up to be part of it. 🏠", likes: 29600, rts: 11400, platform: "MockTweet" },
      ],
    },
    {
      label: "Two Sides — Both Real",
      gap: 1600,
      posts: [
        { type: "post", name: "Red Forever", handle: "@red_forever_lfc", av: "public", initials: "RF", text: "I don't agree with the vandalism. But I understand the anger behind it. 20 years. Every trophy. And he couldn't give us one more year to sort a proper fee? Couldn't wait until the summer? The way it played out — the silence, the saga, the booing in his own ground — felt like a slow goodbye he was never honest about.", likes: 34800, rts: 12600, platform: "MockTweet" },
        { type: "post", name: "Footy Neutral", handle: "@footyneutral_uk", av: "public", initials: "FN", text: "and equally valid: footballers are workers. they have contracts, they have rights, and they are allowed to change employer at the end of one. we don't call a teacher a rat for leaving a school to go somewhere better. the 'loyalty' expectation on players is something we only impose in football and it isn't always fair.", likes: 28200, rts: 9800, platform: "MockTweet" },
        { type: "post", name: "Arne Slot (reported)", handle: "@LFC", av: "journo", initials: "AS", verified: true, text: "Liverpool's manager, reported words: he couldn't speak for the fans but he personally would be giving Trent a warm welcome. He had only good memories of the 26-year-old from his time at Anfield. The institution's grace, separate from the crowd's raw feeling. Both real. Both Liverpool.", likes: 42600, rts: 14400, platform: "MockTweet" },
        { type: "twolesson", title: "The Same Departure — Two Honest Readings", left: { label: "The fan's read", points: [
          "20 years, academy kid, ran the contract down",
          "Club paid £10m just to get him early",
          "Months of saga disrupted the whole season",
          "Could have given us one more year — chose not to",
        ] }, right: { label: "The player's right", points: [
          "Every professional can choose where they work",
          "Real Madrid is a once-in-a-career opportunity",
          "Broke no rule, honoured his contract to its end",
          "20 years of service already given",
        ] }, verdict: "Both are true. A fan's grief is real. A player's right is real. The word 'rata' flattens all of that into one syllable." },
      ],
    },
    {
      label: "Two Murals — Same Street, Different Story",
      gap: 1700,
      posts: [
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "If you've done the Rashford mural case study, hold it next to this one. Because the comparison is the sharpest media-literacy question in both stories. Two murals, near football grounds, defaced ahead of big matches. But almost everything else is different. 🧵👇", likes: 36400, rts: 14800, platform: "MockTweet" },
        { type: "twolesson", title: "Two Murals — Same Tool, Opposite Story", left: { label: "Rashford, Withington", points: [
          "Defaced by OUTSIDERS (racists) expressing hate at someone the community loves",
          "Community covered it in hundreds of messages of love",
        ] }, right: { label: "TAA, Sybil Road", points: [
          "Defaced BY THE COMMUNITY that erected it, expressing grief at one of their own",
          "The community IS the vandal — expressing its own hurt",
        ] }, verdict: "Same tool. Same neighbourhood. But who did the defacing — and why — is completely different. That distinction is everything." },
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "The Rashford mural is hate from outside, met with love from inside. The TAA mural is grief from inside, directed at one of their own. Neither is simple. But they teach you different things — about who the community sees as an enemy, and what it does to people it feels betrayed by. 🧠", likes: 31200, rts: 13400, platform: "MockTweet" },
      ],
    },
    {
      label: "The Lesson — What a Wall Can Tell You",
      gap: 1800,
      posts: [
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "What does 'rata' actually mean, as a media-literacy object? It's one word. It flattens 20 years, a career decision, a complicated transfer saga, genuine hurt, and genuine rights into a single syllable. That's what labels do — and social media LOVES a label. The word spreads faster than the nuance ever will. 🧵", likes: 28400, rts: 12200, platform: "MockTweet" },
        { type: "post", name: "Footy Neutral", handle: "@footyneutral_uk", av: "public", initials: "FN", text: "the honest answer when someone asks 'is TAA a rat?' is: 'it's complicated, and both sides have a point.' but 'it's complicated' doesn't fit on a wall. doesn't go viral. doesn't get retweeted. 'RATA' does. that's not a Liverpool problem — that's how the internet processes everything it has strong feelings about.", likes: 24800, rts: 10400, platform: "MockTweet" },
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "Three things from the wall on Sybil Road: 1) A single word can become the public verdict on a person's whole life — 'rata' is doing a lot of work that complexity can't fit into. 2) The same act (defacing a mural) means completely different things depending on WHO is doing it and WHY. 3) Both sides of a story can be genuinely true. The fans' pain AND his right. Hold both. 💙🔴", likes: 33600, rts: 14800, platform: "MockTweet" },
        { type: "verdict", tone: "cautionary", label: "The Verdict",
          heading: "One Word That Flattened Twenty Years",
          body: "Trent Alexander-Arnold — academy kid, twenty years, every trophy — left Liverpool for Real Madrid, and his celebratory mural was painted over with 'RATA'. The story holds several truths at once. The fans' grief is real: the contract run-down, the season-long saga and the sense of a goodbye never honestly told genuinely hurt. And the player's right is real: professionals can choose their employer when a contract ends, he broke no rule, and he'd already given two decades. 'Rata' flattens all of that into one syllable — which is what labels do, and what social media rewards: 'it's complicated' doesn't go viral, 'RATA' does. Two more lessons. The same act — defacing a mural — means completely different things depending on who does it and why: outsiders' hate aimed at Rashford versus a community's grief at one of its own. And it carried collateral: the wall is someone's home, vandalised over a transfer. Hold the whole picture; resist the one-word verdict." },
        { type: "impact", title: "The Wall That Told Both Stories", stats: [
          { num: "20", label: "Years that one word tried to erase" },
          { num: "2", label: "Murals, same neighbourhood, completely different stories" },
          { num: "1", label: "Word — and all the nuance it flattened" },
          { num: "Both", label: "Sides can be true at once — that's the lesson" },
        ] },
      ],
    },
  ],
  tasks: [
    {
      type: "mcq",
      id: "tr-q1",
      prompt: "What does the word 'rata' do, as a media-literacy object?",
      options: [
        "It accurately sums up the whole situation",
        "It flattens 20 years, a career decision and genuine feeling on both sides into a single syllable",
        "It has no effect on how people see him",
        "It is a neutral description",
      ],
      correctIndex: 1,
      explanation:
        "A one-word label collapses an enormous, complicated story into something simple and shareable — losing all the nuance in the process.",
    },
    {
      type: "mcq",
      id: "tr-q2",
      prompt: "Why does 'RATA' spread while 'it's complicated' doesn't?",
      options: [
        "Because 'it's complicated' is untrue",
        "Because punchy labels are shareable and viral, while nuance is not — that's how platforms process strong feeling",
        "Because Liverpool fans are unusual",
        "Because nobody felt strongly",
      ],
      correctIndex: 1,
      explanation:
        "Nuance doesn't fit on a wall or get retweeted. The simple, emotive label travels; the honest, complicated answer doesn't.",
    },
    {
      type: "mcq",
      id: "tr-q3",
      prompt: "How should you hold the two sides of the departure?",
      options: [
        "Only the fans are right",
        "Only the player is right",
        "Both are genuinely true — the fans' grief is real AND the player's right to choose is real",
        "Neither side has a point",
      ],
      correctIndex: 2,
      explanation:
        "A fan's hurt at how it played out and a professional's right to move at contract's end can both be valid at once. The label erases that both/and.",
    },
    {
      type: "mcq",
      id: "tr-q4",
      prompt: "The TAA mural and the Rashford mural were both defaced. Why aren't they the same story?",
      options: [
        "They are identical",
        "Who defaced it and why differ completely — outsiders' hate at Rashford vs a community's grief at one of its own",
        "Both were defaced by outsiders",
        "Neither was really defaced",
      ],
      correctIndex: 1,
      explanation:
        "The same act means different things depending on the actor and motive: external hate versus internal betrayal-grief. That distinction is everything.",
    },
    {
      type: "mcq",
      id: "tr-q5",
      prompt: "What 'collateral' point does the local resident raise?",
      options: [
        "The mural improved the street",
        "The wall is someone's actual home — real people had their house vandalised over a transfer decision",
        "Nobody lives nearby",
        "The residents painted it themselves",
      ],
      correctIndex: 1,
      explanation:
        "Expressing anger by vandalising a mural hits an uninvolved household. The 'symbol' is also somebody's home — collateral the crowd didn't weigh.",
    },
    {
      type: "mcq",
      id: "tr-q6",
      prompt: "What point does Footy Neutral make about 'loyalty'?",
      options: [
        "Players should never leave a club",
        "We impose a loyalty expectation on footballers we don't apply to other workers — and it isn't always fair",
        "Loyalty doesn't exist",
        "Only fans matter",
      ],
      correctIndex: 1,
      explanation:
        "We don't call a teacher a 'rat' for moving to a better school. The unique loyalty demand placed on players is worth examining rather than assuming.",
    },
    {
      type: "mcq",
      id: "tr-q7",
      prompt: "How does Arne Slot's reported response illustrate 'both real, both Liverpool'?",
      options: [
        "He sided fully with the angry fans",
        "He offered a warm welcome and good memories — the institution's grace sitting alongside the crowd's raw hurt",
        "He demanded the mural be restored",
        "He refused to comment",
      ],
      correctIndex: 1,
      explanation:
        "The club's gracious line and the fans' anger coexist. Different parts of the same community can hold different, genuine responses at once.",
    },
    {
      type: "mcq",
      id: "tr-q8",
      prompt: "What is the core takeaway 'a wall can tell you'?",
      options: [
        "Murals should be banned",
        "A single word can become the public verdict on a person's whole life — so resist the one-word verdict and hold the full picture",
        "Vandalism is always justified",
        "Labels are always accurate",
      ],
      correctIndex: 1,
      explanation:
        "'Rata' tried to be the final word on a 20-year story. The lesson is to notice when a label is doing work that complexity can't fit into.",
    },
    {
      type: "written",
      id: "tr-w1",
      prompt:
        "Explain how the single word 'rata' flattens this story. What nuance does it erase?",
      placeholder:
        "What does the word leave out about the 20 years, the saga, and the player's rights?…",
    },
    {
      type: "written",
      id: "tr-w2",
      prompt:
        "'Both sides can be true.' Lay out the fans' read and the player's right, and explain why holding both is the honest position.",
      placeholder:
        "What's genuinely valid about each side? Why doesn't one cancel the other?…",
    },
    {
      type: "written",
      id: "tr-w3",
      prompt:
        "Compare the TAA mural with the Rashford mural. Why does 'who defaced it and why' change what the same act means?",
      placeholder:
        "Outsiders' hate vs a community's grief — what does each reveal?…",
    },
    {
      type: "written",
      id: "tr-w4",
      prompt:
        "'It's complicated doesn't go viral; RATA does.' Explain why platforms reward labels over nuance, and what that does to public debate.",
      placeholder:
        "Think about shareability, emotion, and what gets lost…",
    },
    {
      type: "written",
      id: "tr-w5",
      prompt:
        "The mural is also someone's home. Discuss the collateral of expressing anger through vandalism — who else gets caught up, and does the anger justify it?",
      placeholder:
        "Consider the residents, proportionality, and other ways to express the hurt…",
    },
  ],
};
