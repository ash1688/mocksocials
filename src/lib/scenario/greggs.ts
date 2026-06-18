// Authored Scenario — Greggs vs Piers Morgan: the vegan sausage roll (2019).
// Ported from the HTML POC. Authored, never simulated (ADR-0006). The
// "celebrity" is kept as an archetype ("a loud TV presenter") per the POC.
import type { Scenario } from "./red-bull";

export const GREGGS_SCENARIO: Scenario = {
  id: "greggs-vegan-sausage-roll",
  badge: "Scenario",
  title: "Greggs vs Piers Morgan — The Vegan Sausage Roll (2019)",
  prePosts: [
    { type: "post", name: "Greggs", handle: "@GreggsOfficial", av: "brand", initials: "GG", verified: true, text: "Morning. ☕ Bacon roll and a coffee for £2? Go on then. Treat yourself, it's a Thursday.", likes: 3100, rts: 420, platform: "MockTweet" },
    { type: "post", name: "Hpowdo", handle: "@hannahdoyle", av: "public", initials: "HD", text: "there is no problem a steak bake cannot fix and I will not be debating this today", likes: 2600, rts: 510, platform: "MockTweet" },
    { type: "post", name: "Food News UK", handle: "@foodnewsuk", av: "journo", initials: "FN", text: "Plant-based eating continues its sharp rise in the UK, with January traditionally the biggest month as shoppers try going vegan. Brands are racing to keep up. foodnewsuk.co.uk", likes: 740, rts: 160, platform: "MockTweet" },
  ],
  sections: [
    {
      label: "The Launch — A Vegan Sausage Roll Appears",
      gap: 1700,
      posts: [
        { type: "post", name: "Greggs", handle: "@GreggsOfficial", av: "brand", initials: "GG", verified: true, text: "The wait is over. 🌱 Introducing the new Greggs Vegan Sausage Roll. The nation's favourite, now with a plant-based filling in our signature 96 layers of puff pastry. Available now. You're welcome. #VeganSausageRoll", likes: 24200, rts: 8400, platform: "MockTweet" },
        { type: "post", name: "Aisha M", handle: "@aisham_veg", av: "public", initials: "AM", text: "FINALLY a vegan option I can grab on my lunch break that isn't a sad bag of carrot sticks. Already been to Greggs twice today. TWICE. No regrets. 🌱🙌", likes: 12400, rts: 3100, platform: "MockTweet" },
        { type: "post", name: "Greg P", handle: "@gregp_uk", av: "public", initials: "GP", text: "nobody:\nliterally nobody:\nGreggs: what if the sausage roll... had no sausage 🤔\n\n(I'll still try it though obviously)", likes: 8600, rts: 2200, platform: "MockTweet" },
        { type: "post", name: "Food News UK", handle: "@foodnewsuk", av: "journo", initials: "FN", text: "Greggs kicks off the new year with a plant-based version of its best-selling product, tapping into the huge rise in flexitarian and vegan eating. Early demand is reportedly strong. Expect this one to get people talking. foodnewsuk.co.uk", likes: 4200, rts: 980, platform: "MockTweet" },
      ],
    },
    {
      label: "A Very Angry Man Discovers the Sausage Roll",
      gap: 1600,
      posts: [
        { type: "post", name: "Sophie T", handle: "@sophiet_news", av: "public", initials: "ST", text: "Well that didn't take long. A certain very loud TV presenter has seen the Greggs vegan sausage roll and is reacting like it personally insulted his entire family. Demanding Greggs apologise. To him. Over a pastry. 🍿 It's not even 9am.", likes: 38400, rts: 18600, platform: "MockTweet" },
        { type: "post", name: "Dev R", handle: "@devr_uk", av: "public", initials: "DR", text: "Imagine waking up, seeing that a bakery has released a new pastry that you are not required to eat, and deciding THIS is the hill. This is the one. This is what you'll be furious about in front of millions of people today. The vegan sausage roll. Incredible commitment to the bit.", likes: 64200, rts: 38900, platform: "MockTweet" },
        { type: "post", name: "Bea L", handle: "@beal_writes", av: "public", initials: "BL", text: "He's actually demanding an APOLOGY. From a bakery. Because they made a sausage roll he doesn't have to buy. The performance of being wounded by a snack is genuinely an art form at this point. Nobody is this upset. Nobody. It's content. 😂", likes: 72100, rts: 44200, platform: "MockTweet" },
      ],
    },
    {
      label: "The Clapback — Ice Cold",
      gap: 1500,
      posts: [
        { type: "post", name: "Greggs", handle: "@GreggsOfficial", av: "brand", initials: "GG", verified: true, text: "Oh hello Piers, we've been expecting you. 🙋‍♂️", likes: 412000, rts: 218000, platform: "MockTweet" },
        { type: "post", name: "Dev R", handle: "@devr_uk", av: "public", initials: "DR", text: "GREGGS. GREGGS HAS DONE IT. 'We've been expecting you' — they KNEW. They launched the thing knowing exactly who would throw a strop and they had the reply LOADED. This is not a bakery anymore. This is a social media assassin. 💀", likes: 184000, rts: 98400, platform: "MockTweet" },
        { type: "post", name: "Aisha M", handle: "@aisham_veg", av: "public", initials: "AM", text: "not greggs replying to a multi-millionaire tv presenter like he's a slightly annoying regular who comes in every day to complain about the sausage rolls and then buys three 😭 absolutely flattened him in nine words", likes: 156000, rts: 82100, platform: "MockTweet" },
      ],
    },
    {
      label: "The Public Picks Greggs",
      gap: 1500,
      posts: [
        { type: "trend", label: "Trending in United Kingdom", hashtag: "#VeganSausageRoll", volume: "142K posts", context: "Greggs' deadpan reply to a celebrity's outrage goes viral, with overwhelming public support for the bakery" },
        { type: "post", name: "Bea L", handle: "@beal_writes", av: "public", initials: "BL", text: "The ratio on this man is biblical. He came for a small bakery and the entire country has shown up with pitchforks made of puff pastry. You don't pick a fight with Greggs. Greggs is the people's champion. Greggs is BELOVED. He picked the one fight he could never win. 🥐", likes: 98600, rts: 54200, platform: "MockTweet" },
        { type: "post", name: "Marcus W", handle: "@marcusw_ldn", av: "public", initials: "MW", text: "What I love is Greggs didn't grovel. No 'we're sorry you feel that way', no long statement, no panic. One funny line and back to selling sausage rolls. That's the whole masterclass right there. Confidence beats an apology every single time when you've done nothing wrong.", likes: 112000, rts: 68400, platform: "MockTweet" },
        { type: "post", name: "Aisha M", handle: "@aisham_veg", av: "public", initials: "AM", text: "Off to buy another vegan sausage roll purely out of spite now. He's done more for Greggs' sales this morning than any advert ever could. Rage-marketing. He's a one-man billboard and he doesn't even realise it. 🌱😂", likes: 88400, rts: 41200, platform: "MockTweet" },
      ],
    },
    {
      label: "He Doubles Down (Which Helps Greggs Even More)",
      gap: 1600,
      posts: [
        { type: "post", name: "Sophie T", handle: "@sophiet_news", av: "public", initials: "ST", text: "Update: rather than quietly letting it go, he's now taken the fight to live television, dramatically tasting the vegan sausage roll on air and pretending to gag like a Victorian fainting onto a chaise longue. Every second of it is more free advertising for Greggs. He cannot stop helping them.", likes: 124000, rts: 71800, platform: "MockTweet" },
        { type: "post", name: "Dev R", handle: "@devr_uk", av: "public", initials: "DR", text: "The strategy of 'I will defeat this sausage roll by talking about it constantly to an audience of millions' is certainly A choice. Every time he mentions it, ten more people go and buy one to see what the fuss is about. He is the marketing department now. 📈", likes: 96200, rts: 52400, platform: "MockTweet" },
        { type: "post", name: "Greggs", handle: "@GreggsOfficial", av: "brand", initials: "GG", verified: true, text: "Sales are going well, thanks for asking. 🌱😋", likes: 268000, rts: 132000, platform: "MockTweet" },
      ],
    },
    {
      label: "The Aftermath — Rage as Free Advertising",
      gap: 1800,
      posts: [
        { type: "news", outlet: "BBC News", outletColor: "#e83030", headline: "Greggs sales soar as vegan sausage roll becomes a runaway hit", sub: "Greggs has reported a significant sales boost following the launch of its vegan sausage roll, with the product — and the high-profile online row that accompanied it — generating enormous publicity. Company shares have risen on the back of strong demand.", url: "bbc.co.uk/news/business" },
        { type: "post", name: "Marcus W", handle: "@marcusw_ldn", av: "public", initials: "MW", text: "Let's tally this up. Greggs: launched a hit product, won the internet, boosted sales, looked effortlessly cool. The angry man: spent days furious on television, sold a load of sausage rolls for a company he hates, and became the punchline. Flawless victory for the bakery. 🥐👑", likes: 108000, rts: 58600, platform: "MockTweet" },
        { type: "post", name: "Sophie T", handle: "@sophiet_news", av: "public", initials: "ST", text: "The real lesson of the Greggs saga: when someone picks a fight to get a reaction, the worst thing you can do is give them the grovelling reaction they wanted. Greggs stayed calm, stayed funny, stayed confident — and let the other guy exhaust himself. Genuinely brilliant brand management.", likes: 82400, rts: 46200, platform: "MockTweet" },
        { type: "post", name: "Bea L", handle: "@beal_writes", av: "public", initials: "BL", text: "Years later and 'Oh hello Piers, we've been expecting you' is still the gold standard of brand replies. Nine words. No apology. No essay. Just pure, unbothered confidence. Every social media manager dreams of a moment that clean. Greggs caught lightning in a sausage roll. ⚡🌱", likes: 94200, rts: 51800, platform: "MockTweet" },
        { type: "verdict", tone: "win", label: "The Verdict",
          heading: "Don't Give a Provocateur the Reaction They Came For",
          body: "Greggs launched a vegan sausage roll, a loud TV presenter demanded an apology, and the bakery replied with nine deadpan words: 'Oh hello Piers, we've been expecting you.' No grovelling, no essay, no panic — then straight back to selling. The internet sided overwhelmingly with the beloved underdog, and the louder he got, the more he advertised the product to millions, becoming an unwitting marketing department. The lessons: when someone picks a fight to harvest a reaction, the grovelling apology is the prize — denying it (with confidence and humour, when you've done nothing wrong) wins. Outrage is free advertising for whoever stays calm, and doubling down only amplifies the thing you're attacking." },
        { type: "impact", title: "The Vegan Sausage Roll — Rage as Free Advertising", stats: [
          { num: "9 words", label: "In the reply that won the whole thing" },
          { num: "142K+", label: "Posts — almost all on Greggs' side" },
          { num: "0", label: "Apologies issued by Greggs" },
          { num: "∞", label: "Free advertising from one angry man" },
        ] },
      ],
    },
  ],
  tasks: [
    {
      type: "mcq",
      id: "gv-q1",
      prompt: "Why was Greggs' nine-word reply so effective?",
      options: [
        "It was a long, formal apology",
        "It was calm, funny and confident — refusing to grovel while making clear they'd done nothing wrong",
        "It threatened legal action",
        "It deleted the product",
      ],
      correctIndex: 1,
      explanation:
        "Confidence and humour beat an apology when you've done nothing wrong. One unbothered line denied the provocateur the reaction he wanted and won the room.",
    },
    {
      type: "mcq",
      id: "gv-q2",
      prompt: "What is the core lesson about responding to someone 'picking a fight for a reaction'?",
      options: [
        "Always apologise immediately",
        "The grovelling reaction is exactly the prize they're after — denying it (calmly) is the stronger move",
        "Escalate harder than they do",
        "Delete your account",
      ],
      correctIndex: 1,
      explanation:
        "A provocation is fishing for a reaction. Giving a panicked apology rewards it; staying composed starves it.",
    },
    {
      type: "mcq",
      id: "gv-q3",
      prompt: "How did the presenter's anger affect Greggs commercially?",
      options: [
        "It crashed their sales",
        "It became free advertising — every furious mention sent more people to try the product",
        "It had no effect",
        "It got the product banned",
      ],
      correctIndex: 1,
      explanation:
        "By talking about it constantly to a huge audience, he effectively marketed it for them — 'rage as free advertising'.",
    },
    {
      type: "mcq",
      id: "gv-q4",
      prompt: "Why did the public side so heavily with Greggs?",
      options: [
        "Because Greggs paid them",
        "A beloved, down-to-earth brand vs a wealthy presenter raging at a pastry — an easy, sympathetic underdog story",
        "Because nobody likes sausage rolls",
        "Because the presenter was right",
      ],
      correctIndex: 1,
      explanation:
        "Picking a fight with a national favourite over something trivial made the presenter the villain and Greggs the people's champion.",
    },
    {
      type: "mcq",
      id: "gv-q5",
      prompt: "What did doubling down (gagging on TV) achieve?",
      options: [
        "It finally defeated the sausage roll",
        "It amplified the product further — more attention, more curiosity, more sales",
        "It made Greggs apologise",
        "It ended the story",
      ],
      correctIndex: 1,
      explanation:
        "Continuing to attack something just keeps it in front of millions. Each mention drove more curiosity and sales.",
    },
    {
      type: "mcq",
      id: "gv-q6",
      prompt: "When is the 'confident clapback' the right move (and when isn't it)?",
      options: [
        "Always, no matter what you've done",
        "When you've genuinely done nothing wrong; if there were a real fault, humour would look like dodging accountability",
        "Only for large companies",
        "Never — always apologise",
      ],
      correctIndex: 1,
      explanation:
        "The Greggs move works because there was no wrongdoing to answer for. Used to deflect a legitimate problem, the same tactic backfires.",
    },
    {
      type: "written",
      id: "gv-w1",
      prompt:
        "Explain why Greggs' refusal to grovel beat an apology here. When would that approach be the wrong call?",
      placeholder:
        "What was the provocateur fishing for? When does humour become dodging accountability?…",
    },
    {
      type: "written",
      id: "gv-w2",
      prompt:
        "'Rage as free advertising.' Explain how the angry reaction helped Greggs commercially.",
      placeholder:
        "What did each furious mention do? Who became the marketing department?…",
    },
    {
      type: "written",
      id: "gv-w3",
      prompt:
        "Why did the public side with Greggs so overwhelmingly? What made it an easy 'underdog' story?",
      placeholder:
        "Think about who the brand is, what the fight was over, and who looked unreasonable…",
    },
    {
      type: "written",
      id: "gv-w4",
      prompt:
        "You run a brand's account and a public figure attacks your new product to provoke you. Write your response and explain your reasoning.",
      placeholder:
        "Tone, length, whether to engage at all, and what reaction you're denying them…",
    },
  ],
};
