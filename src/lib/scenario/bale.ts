// Authored Scenario — "Wales. Golf. Madrid. In That Order." (2019). Ported from
// the HTML POC. Authored, never simulated (ADR-0006). framing -> twolesson card;
// photos become captioned placeholders.
import type { Scenario } from "./red-bull";

export const BALE_SCENARIO: Scenario = {
  id: "bale-wales-golf-madrid",
  badge: "Scenario",
  title: "Wales. Golf. Madrid. In That Order. (2019)",
  prePosts: [
    { type: "post", name: "World Football", handle: "@worldfootball", av: "journo", initials: "WF", verified: true, text: "Euro 2020 qualifying reaches its climax tonight. Among the big stories: Wales, with Gareth Bale and Aaron Ramsey, need a win at home to reach a second straight European Championship. 🏴", likes: 2400, rts: 520, platform: "MockTweet" },
    { type: "post", name: "Footy Neutral", handle: "@footy_neutral", av: "public", initials: "FN", text: "big night for Wales. mad to think a country that size keeps punching above its weight. proper football culture there now, the atmosphere at their games is unreal", likes: 680, rts: 120, platform: "MockTweet" },
  ],
  sections: [
    {
      label: "The Build-Up — Cymru on the Brink",
      gap: 1800,
      posts: [
        { type: "post", name: "Cymru Football", handle: "@CymruFooty", av: "public", initials: "CF", verified: true, text: "Cardiff. Tonight. Win and we're going to our SECOND Euros in a row. 🏴 The Cardiff City Stadium is already bouncing and kickoff isn't for an hour. This is everything. C'mon Cymru! 🔴", likes: 24200, rts: 5400, platform: "MockTweet" },
        { type: "post", name: "Dragon Til I Die", handle: "@dragon_dai", av: "public", initials: "DD", text: "I was there in the bad years. Decades of near-misses and heartbreak. To be on the verge of a SECOND major tournament after waiting a lifetime for the first... you have no idea what this means to us. Spine tingling already 🥹🏴", likes: 18600, rts: 3200, platform: "MockTweet" },
        { type: "post", name: "Red Wall Steve", handle: "@redwall_steve", av: "public", initials: "RS", text: "the noise in here. the flags. kids on their dads' shoulders. this isn't just a football match it's a whole nation in one stadium. whatever happens tonight I'm so proud to be Welsh 🏴🐉", likes: 14400, rts: 2800, platform: "MockTweet" },
      ],
    },
    {
      label: "Yma o Hyd — We're Still Here",
      gap: 1700,
      posts: [
        { type: "photo", name: "Cymru Football", handle: "@CymruFooty", av: "public", initials: "CF", verified: true, caption: "Goosebumps. 🏴 The whole stadium singing Yma o Hyd — 'We're Still Here' — led from the front. A song about a small nation surviving against the odds, sung by tens of thousands before a ball is even kicked. THIS is Welsh football.", platform: "MockTweet" },
        { type: "post", name: "Dragon Til I Die", handle: "@dragon_dai", av: "public", initials: "DD", text: "if you don't understand why a song matters to a country, watch a Welsh crowd sing Yma o Hyd. 'Er gwaetha pawb a phopeth, ry'n ni yma o hyd' — despite everyone and everything, we're still here. it's not about football. it's about US. 🥹🏴", likes: 22100, rts: 6800, platform: "MockTweet" },
        { type: "post", name: "Neutral Footy Fan", handle: "@groundhopper_jim", av: "public", initials: "NF", text: "I support England but I'll say it — nobody does pre-match atmosphere like the Welsh right now. that Yma o Hyd singalong gave me chills through the TV. proper hairs-on-the-back-of-the-neck stuff. fair play Cymru 👏", likes: 16800, rts: 4200, platform: "MockTweet" },
      ],
    },
    {
      label: "The Match — Cymru 2-0 Hungary",
      gap: 1600,
      posts: [
        { type: "matchcard", competition: "UEFA Euro 2020 Qualifying — Group E", venue: "Cardiff City Stadium", home: { name: "Cymru / Wales", score: 2, flag: "🏴" }, away: { name: "Hungary", score: 0, flag: "🇭🇺" }, status: "FULL TIME", scorers: "⚽ Ramsey 15', 47'", note: "Wales qualify for UEFA Euro 2020 — a second major tournament in a row." },
        { type: "post", name: "Cymru Football", handle: "@CymruFooty", av: "public", initials: "CF", verified: true, text: "FULL TIME. CYMRU 2-0 HUNGARY. WE ARE GOING TO THE EUROS. AGAIN. 🏴🔴 Aaron Ramsey with both. The Red Wall is in absolute bits. A SECOND tournament in a row for our little nation. Bawl your eyes out, it's allowed. 🥹", likes: 48600, rts: 14200, platform: "MockTweet" },
        { type: "post", name: "Red Wall Steve", handle: "@redwall_steve", av: "public", initials: "RS", text: "GROWN MEN CRYING ALL AROUND ME. strangers hugging. someone's nan is on the seats. I have never been part of anything like this in my LIFE. CYMRU AM BYTH 🏴🐉🥹", likes: 21400, rts: 4800, platform: "MockTweet" },
      ],
    },
    {
      label: "The Celebration — The Flag",
      gap: 1700,
      posts: [
        { type: "photo", name: "Cymru Football", handle: "@CymruFooty", av: "public", initials: "CF", verified: true, caption: "😂🏴 Bale and the boys celebrating with THE flag: 'Wales. Golf. Madrid. In that order.' Absolutely no notes. The lads having a laugh after the biggest night in years. What a man, what a team, what a country. 🐉", platform: "MockTweet" },
        { type: "post", name: "Dragon Til I Die", handle: "@dragon_dai", av: "public", initials: "DD", text: "the flag 😭😭 'Wales. Golf. Madrid. In that order.' iconic. legendary. framing this. he loves playing for us and he's not hiding it. a bit of cheeky fun on the best night in years. perfect. 🏴", likes: 31200, rts: 9600, platform: "MockTweet" },
        { type: "post", name: "Red Wall Steve", handle: "@redwall_steve", av: "public", initials: "RS", text: "just a group of lads on the pitch having a giggle with a flag after qualifying. nothing more to it. nobody's thinking about anyone else tonight — it's all Cymru. brilliant. 🍻🏴", likes: 14800, rts: 2400, platform: "MockTweet" },
      ],
    },
    {
      label: "The Next Day — Madrid Spits Its Drink",
      gap: 1500,
      posts: [
        { type: "photo", name: "Marca-watcher", handle: "@spanish_press_watch", av: "public", initials: "MW", caption: "Well THAT escalated overnight. 😬 The Spanish press has woken up and they are NOT laughing. Front pages dragging up the old 'Gales, Golf... y por fin el Madrid' narrative — that Bale supposedly puts Wales and golf above Real Madrid. The flag has touched a nerve.", platform: "MockTweet" },
        { type: "post", name: "Madridista Carlos", handle: "@hala_madrid_carlos", av: "public", initials: "MC", text: "This is DISRESPECTFUL to the biggest club in the world. Madrid pays his wages, makes him a global star, and he puts us THIRD?? Behind GOLF?? An insult to the badge and to every Madridista. Unforgivable. 😤⚪", likes: 28400, rts: 12200, platform: "MockTweet" },
        { type: "post", name: "Spanish Sports Radio", handle: "@radio_deportiva_es", av: "public", initials: "SR", text: "🚨 Three hours of our phone-in this morning dedicated to THE FLAG. Callers furious. 'Where is his professionalism?' 'Imagine doing this while under contract at Madrid.' The Spanish football media is in MELTDOWN over a bedsheet. 📻🔥", likes: 19600, rts: 8400, platform: "MockTweet" },
        { type: "post", name: "Madridista Carlos", handle: "@hala_madrid_carlos", av: "public", initials: "MC", text: "I have spilt my cafe con leche TWICE this morning reading about this flag. The arrogance. The disrespect. We will not forget this. 😡☕", likes: 22100, rts: 14600, platform: "MockTweet" },
      ],
    },
    {
      label: "Wales: 'Calm Down, It's Not That Deep'",
      gap: 1500,
      posts: [
        { type: "post", name: "Dragon Til I Die", handle: "@dragon_dai", av: "public", initials: "DD", text: "lads in Madrid have woken up FUMING over a flag and we're over here like... 😂 it was a bit of fun? we just qualified for the Euros? nobody in Wales was thinking about Madrid, we were thinking about CYMRU. but go off I suppose 🏴☕", likes: 42200, rts: 16800, platform: "MockTweet" },
        { type: "post", name: "Red Wall Steve", handle: "@redwall_steve", av: "public", initials: "RS", text: "honestly the funniest part is how SERIOUSLY they're taking it. it's a flag, butt. it's three words. we put 'Wales' first because, shockingly, we're WELSH and we'd just qualified. the order isn't an insult it's just... true 😂 not that deep!! enjoy your Tuesday ☕💦", likes: 36400, rts: 13200, platform: "MockTweet" },
        { type: "post", name: "Cerys", handle: "@cerys_caerdydd", av: "public", initials: "CY", text: "the more we go 'haha it's only a bit of fun, calm down' the angrier they get and honestly? that's now the best part of the whole thing. we weren't even trying to wind anyone up but we are absolutely here for the spilt drinks 😂☕🏴", likes: 29800, rts: 11400, platform: "MockTweet" },
      ],
    },
    {
      label: "The Lesson — One Flag, Two Stories",
      gap: 1800,
      posts: [
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "Brilliant little case study, this. The EXACT same flag is two completely different stories depending on where you're reading from. In Wales: harmless national pride and a laugh. In Madrid: a calculated insult to the club. Same three words. Opposite meanings. 🧵", likes: 24600, rts: 11200, platform: "MockTweet" },
        { type: "twolesson", title: "Same Flag, Two Headlines", left: { label: "🏴 The Welsh read", points: [
          "A bit of cheeky fun on the best night in years",
          "Pride in country, naturally put first",
          "Wasn't aimed at anyone — it was about Cymru",
          "'It's three words, calm down'",
        ] }, right: { label: "⚪ The Madrid read", points: [
          "A public insult to the club that pays him",
          "Proof he doesn't care enough about Madrid",
          "Disrespectful, unprofessional, arrogant",
          "'Front-page outrage for three days'",
        ] }, verdict: "Nothing about the flag changed between these two readings. Only who was looking at it — and how they chose to react." },
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "And the key bit: the 'feud' didn't exist when the flag went up. It was just Welsh celebration. The conflict was created entirely by the REACTION the next day. A huge amount of online 'drama' works exactly like this — the row is manufactured by how people choose to respond, not by the original act.", likes: 21800, rts: 9800, platform: "MockTweet" },
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "Two takeaways for spotting this in the wild: 1) The same content gets framed to fit whatever story each audience already wants to believe. 2) Outrage is often a CHOICE — and 'who benefits from me being angry about this?' is a useful question. Sometimes a flag is just a flag. 🏴", likes: 19400, rts: 8600, platform: "MockTweet" },
        { type: "verdict", tone: "win", label: "The Verdict",
          heading: "Same Flag, Two Completely Different Stories",
          body: "On the best Welsh football night in years, Bale and his teammates celebrated qualifying with a flag reading 'Wales. Golf. Madrid. In that order.' In Cardiff it was exactly what it looked like: cheeky national pride, aimed at no one. Overnight the Spanish press read the identical three words as a calculated insult to the club that pays his wages — and a three-day 'feud' was born. The key lesson: nothing about the flag changed between the two readings; only who was looking, and how they chose to react. The 'feud' didn't exist when the flag went up — it was manufactured entirely by the reaction. A huge amount of online drama works this way: the same content gets framed to fit whatever story each audience already wants to believe, and outrage is often a choice. A useful question when a row flares: who benefits from me being angry about this? Sometimes a flag is just a flag." },
        { type: "impact", title: "One Flag, Two Stories", stats: [
          { num: "3 words", label: "On a flag: 'Wales. Golf. Madrid.'" },
          { num: "2", label: "Completely opposite stories from one image" },
          { num: "0", label: "Madrid mentions until the reaction created the row" },
          { num: "☕💦", label: "Drinks spilt in Spain (approx.)" },
        ] },
      ],
    },
  ],
  tasks: [
    {
      type: "mcq",
      id: "bl-q1",
      prompt: "What is the central media-literacy lesson of the flag story?",
      options: [
        "Welsh fans were wrong to celebrate",
        "The same content can carry two completely opposite meanings depending on who's reading it",
        "Flags should be banned from stadiums",
        "Bale insulted Madrid on purpose",
      ],
      correctIndex: 1,
      explanation:
        "Identical three words read as harmless pride in Wales and as a calculated insult in Madrid. Nothing about the flag changed — only the audience and their reaction.",
    },
    {
      type: "mcq",
      id: "bl-q2",
      prompt: "When did the 'feud' actually come into existence?",
      options: [
        "The moment the flag was unveiled",
        "Not when the flag went up — it was manufactured by the Spanish press reaction the next day",
        "Weeks before the match",
        "It never happened at all",
      ],
      correctIndex: 1,
      explanation:
        "On the night it was pure Welsh celebration with no Madrid dimension. The conflict was created entirely by how people chose to respond afterwards.",
    },
    {
      type: "mcq",
      id: "bl-q3",
      prompt: "What does 'the same content gets framed to fit the story each audience already believes' mean here?",
      options: [
        "Everyone interpreted the flag identically",
        "Welsh fans saw pride because they expected pride; Spanish media saw disrespect because that narrative already existed",
        "The flag had hidden text",
        "Nobody had any prior view",
      ],
      correctIndex: 1,
      explanation:
        "Pre-existing narratives ('Bale doesn't care about Madrid') shaped how each side read the exact same image. Framing follows what people already want to believe.",
    },
    {
      type: "mcq",
      id: "bl-q4",
      prompt: "What useful question does the case suggest asking when a row flares up?",
      options: [
        "How many people are angry?",
        "Who benefits from me being angry about this?",
        "Which side has more followers?",
        "How can I add to the outrage?",
      ],
      correctIndex: 1,
      explanation:
        "Outrage is often a choice. Asking who gains from your anger (e.g. media chasing three days of headlines) helps you decide whether the row is even real.",
    },
    {
      type: "mcq",
      id: "bl-q5",
      prompt: "How did the Welsh side's 'calm down, it's not that deep' response affect things?",
      options: [
        "It instantly ended the row",
        "It arguably fuelled the Spanish anger further — and became part of the fun for the Welsh fans",
        "It made Madrid fans happy",
        "It had no effect at all",
      ],
      correctIndex: 1,
      explanation:
        "The dismissive, amused response wound the other side up more — a reminder that reactions (on both sides) keep a 'drama' alive far more than the original act.",
    },
    {
      type: "mcq",
      id: "bl-q6",
      prompt: "What role did the Spanish sports media play?",
      options: [
        "They ignored it",
        "They amplified it — front pages and hours of phone-ins turned a celebratory bedsheet into a multi-day story",
        "They defended Bale",
        "They reported only the score",
      ],
      correctIndex: 1,
      explanation:
        "Media outlets have an incentive to generate days of content. Their amplification is a big part of how a non-event became 'the feud'.",
    },
    {
      type: "mcq",
      id: "bl-q7",
      prompt: "Why does 'sometimes a flag is just a flag' matter?",
      options: [
        "Because every act hides a secret insult",
        "Because not everything is a calculated message — reading hidden hostility into a simple act can manufacture conflict that wasn't there",
        "Because flags are meaningless",
        "Because Bale never made the flag",
      ],
      correctIndex: 1,
      explanation:
        "Assuming intent and offence where there was just celebration is how rows get invented. Sometimes the simplest reading is the true one.",
    },
    {
      type: "mcq",
      id: "bl-q8",
      prompt: "Compared with the Ronaldo 'água' story, what pattern do both share?",
      options: [
        "Both were about stock prices",
        "A small, real moment is amplified and reframed into a much bigger 'story' by the reaction around it",
        "Both involved the same player",
        "Neither actually happened",
      ],
      correctIndex: 1,
      explanation:
        "As with the 'água' moment, the gesture was real but the surrounding narrative was manufactured. The reaction, not the act, made the headline.",
    },
    {
      type: "written",
      id: "bl-w1",
      prompt:
        "Explain how the exact same flag became two opposite stories. What changed between the Welsh and Madrid readings?",
      placeholder:
        "What did each audience bring to it? What about the flag itself changed?…",
    },
    {
      type: "written",
      id: "bl-w2",
      prompt:
        "'The feud was manufactured by the reaction.' Explain how a non-event became a multi-day story, and the media's role in it.",
      placeholder:
        "When did the conflict appear? Who amplified it and why?…",
    },
    {
      type: "written",
      id: "bl-w3",
      prompt:
        "'Outrage is often a choice.' Using this story, explain the question 'who benefits from me being angry?' and why it's useful.",
      placeholder:
        "Who gains from three days of flag headlines? What would change if people didn't react?…",
    },
    {
      type: "written",
      id: "bl-w4",
      prompt:
        "Why does 'the same content gets framed to fit the story each audience already believes' matter for how you read the news?",
      placeholder:
        "How do pre-existing narratives shape interpretation? How can you guard against it?…",
    },
    {
      type: "written",
      id: "bl-w5",
      prompt:
        "Compare this with the Ronaldo 'água' moment. What do both teach about the gap between a real act and the story told about it?",
      placeholder:
        "What was real in each? What was manufactured by reaction?…",
    },
  ],
};
