// Authored Scenario — The NEC Motor Show billboard, 'of its time' (reacting
// today). Ported from the HTML POC. Authored, never simulated (ADR-0006). The
// POC's billboard card is rendered via our reported card (the slogan as quote).
import type { Scenario } from "./red-bull";

export const NEC_BILLBOARD_SCENARIO: Scenario = {
  id: "nec-billboard-of-its-time",
  badge: "Scenario",
  title: "The NEC Motor Show Billboard — 'Of Its Time'",
  prePosts: [
    { type: "post", name: "Old Britain Pics", handle: "@oldbritainpics", av: "journo", initials: "OB", verified: true, text: "There's nothing the internet loves more than a 'does anyone else remember this?' post. Half of collective memory is now just people checking they didn't imagine the 90s.", likes: 3400, rts: 820, platform: "MockTweet" },
    { type: "post", name: "Midlands Memories", handle: "@midlandsmemories", av: "public", initials: "MM", text: "the NEC has hosted everything over the years — Motor Show, Clothes Show, gigs, the lot. so many Midlands childhoods ran through junction 6 of the M42.", likes: 920, rts: 240, platform: "MockTweet" },
  ],
  sections: [
    {
      label: "The Memory — Does Anyone Remember This?",
      gap: 1800,
      posts: [
        { type: "post", name: "Hereford Dave", handle: "@dave_in_HR4", av: "public", initials: "HD", text: "Random Midlands memory that just popped into my head: years ago there was a billboard for the NEC Motor Show that said 'the best way to a man's heart is up the M42, junction 6.' 😂 pretty sure it was even mentioned on Midlands Today at the time. did I dream this or does anyone else remember it??", likes: 18400, rts: 4200, platform: "MockTweet" },
        { type: "post", name: "Brummie Sue", handle: "@sue_solihull", av: "public", initials: "BS", text: "YES! I remember this!! you did not dream it. it was on the big board as you came round towards the NEC. my dad used to point at it every single year on the way to the Motor Show. proper nostalgia hit 🥹", likes: 12600, rts: 2800, platform: "MockTweet" },
        { type: "post", name: "Coventry Kid", handle: "@cov_til_i_die", av: "public", initials: "CK", text: "ahh the NEC Motor Show billboard! that's a deep cut. junction 6 of the M42, right by the NEC. that whole stretch of road IS the run-up to the show. clever bit of local wordplay tbf.", likes: 9200, rts: 1900, platform: "MockTweet" },
      ],
    },
    {
      label: "The Fondness — They Don't Make 'Em Like This",
      gap: 1700,
      posts: [
        { type: "reported", source: "Recreation of a roadside billboard, c. 1990s–2000s", context: "Junction 6 — The NEC Motor Show", quote: "The best way to a man's heart is up the M42." },
        { type: "post", name: "Retro Ads UK", handle: "@retroadsuk", av: "journo", initials: "RA", text: "A genuine classic of British roadside advertising. The whole gag works because the NEC really IS at M42 junction 6 — so the 'way to a man's heart' literally is up that motorway, to the cars. Cheeky, local, memorable. Peak old-school billboard wit.", likes: 14200, rts: 3600, platform: "MockTweet" },
        { type: "post", name: "Hereford Dave", handle: "@dave_in_HR4", av: "public", initials: "HD", text: "this is exactly it!! 😂 honestly they don't make adverts like this anymore. simple, funny, no QR codes, no influencers, just a daft pun on a massive board next to a motorway. golden era of billboards.", likes: 11800, rts: 2400, platform: "MockTweet" },
      ],
    },
    {
      label: "The Record-Scratch — Would That Fly Today?",
      gap: 1700,
      posts: [
        { type: "post", name: "Jess M", handle: "@jess_writes", av: "public", initials: "JM", text: "ok I genuinely love a bit of nostalgia and the pun IS clever... but reading it now — 'the best way to a man's heart' — would that actually get approved as an advert today? not having a go, genuine question, because it feels like it'd raise eyebrows now in a way it clearly didn't then. 🤔", likes: 16400, rts: 4800, platform: "MockTweet" },
        { type: "post", name: "Coventry Kid", handle: "@cov_til_i_die", av: "public", initials: "CK", text: "see I think it's harmless? it's wordplay. 'the way to a man's heart is through his stomach' is an old saying, they just swapped stomach for a motorway. I don't think anyone was sitting there thinking deep things about it. it's a pun on a board.", likes: 9600, rts: 2100, platform: "MockTweet" },
      ],
    },
    {
      label: "The Debate — Harmless Wit, or Dated Framing?",
      gap: 1500,
      posts: [
        { type: "post", name: "Dr Aisha Bello", handle: "@draishabello", av: "public", initials: "AB", text: "It's a clever pun — both things can be true. But look at who it's actually talking TO. 'A man's heart' makes the man the default customer. The show, the cars, the motoring — all framed as a male thing. And the woman? She's the one taking the 'way to his heart.' She's the route, not the audience. 🧵", likes: 24600, rts: 12200, platform: "MockTweet" },
        { type: "post", name: "Dr Aisha Bello", handle: "@draishabello", av: "public", initials: "AB", text: "That's the bit that reads differently now. It quietly says: cars are for men, this show is for men, and a woman's role here is to win one over. 'No girls allowed' by implication. Plenty of women love cars and went to that show! The wordplay is fun — the assumption underneath it is what dated.", likes: 21200, rts: 10400, platform: "MockTweet" },
        { type: "post", name: "Brummie Sue", handle: "@sue_solihull", av: "public", initials: "BS", text: "I do see that actually. as a woman who went every year with my dad, the advert kind of assumed I wasn't the one being spoken to. didn't bother me at the time — but I was a kid and it was just 'how adverts were.' looking back, yeah, it does say something about who they pictured as the customer.", likes: 14800, rts: 5200, platform: "MockTweet" },
        { type: "post", name: "Coventry Kid", handle: "@cov_til_i_die", av: "public", initials: "CK", text: "I'll be honest I came in thinking 'it's just a joke, lighten up' and I still think the pun's clever... but 'she's the route, not the audience' is a fair point I hadn't clocked. can it be a good gag AND a bit of its time? feels like the honest answer is yes to both.", likes: 12400, rts: 3800, platform: "MockTweet" },
      ],
    },
    {
      label: "The Explainer — The Rules Actually Changed",
      gap: 1700,
      posts: [
        { type: "post", name: "Tara — Ad Standards", handle: "@tara_explains_ads", av: "journo", initials: "TA", text: "Worth knowing the actual facts here, because this isn't just vibes. In 2019 the UK advertising regulator (the ASA) brought in a specific rule banning ads that feature 'harmful gender stereotypes.' That's a real, written standard — not just changing public mood. 🧵", likes: 19800, rts: 9400, platform: "MockTweet" },
        { type: "post", name: "Tara — Ad Standards", handle: "@tara_explains_ads", av: "journo", initials: "TA", text: "So when people ask 'would this run today?' — the honest answer is it would at least get a much harder look. An advert that frames an entire product category as for-men-only, with women as a prize, is exactly the kind of thing the modern rule was written to question. The pun isn't the problem; the assumption is.", likes: 16200, rts: 7600, platform: "MockTweet" },
        { type: "post", name: "Retro Ads UK", handle: "@retroadsuk", av: "journo", initials: "RA", text: "And this is the key thing for understanding old ads: it wasn't a 'scandal' at the time. Regional news covered it as a bit of fun, people chuckled, nobody complained. Not because everyone was worse — because the STANDARD was different. The line for 'acceptable' genuinely moved.", likes: 14600, rts: 6800, platform: "MockTweet" },
      ],
    },
    {
      label: "The Lesson — 'Of Its Time' Is a Real Thing",
      gap: 1800,
      posts: [
        { type: "post", name: "Tara — Ad Standards", handle: "@tara_explains_ads", av: "journo", initials: "TA", text: "The grown-up takeaway: two things are true at once. It was a genuinely clever, fondly-remembered bit of wit. AND it carries an assumption about who matters as a customer that wouldn't pass today. You don't have to pick one. 'I enjoyed it' and 'it's dated' can share a sentence.", likes: 22400, rts: 11200, platform: "MockTweet" },
        { type: "post", name: "Jess M", handle: "@jess_writes", av: "public", initials: "JM", text: "what I like about this thread is nobody got cancelled and nobody got told to shut up. people remembered something fondly, someone asked a fair question, and we all came out understanding WHY it reads differently now. that's how you talk about old media. nuance survived a comment section, rare W. 🙌", likes: 18600, rts: 6400, platform: "MockTweet" },
        { type: "post", name: "Dr Aisha Bello", handle: "@draishabello", av: "public", initials: "AB", text: "Exactly this. The point was never 'the past is evil.' It's 'standards evolve, and noticing how is a skill.' Being able to enjoy something and think critically about it at the same time is the entire game. The billboard's a great little case study for exactly that.", likes: 16800, rts: 7200, platform: "MockTweet" },
        { type: "verdict", tone: "win", label: "The Verdict",
          heading: "Clever AND Dated — Both Can Be True",
          body: "A fondly-remembered NEC Motor Show billboard ('the best way to a man's heart is up the M42, junction 6') is a genuinely clever local pun — and, read today, it quietly assumes the customer is a man and the woman is 'the route, not the audience'. The grown-up reading holds both at once: you can enjoy something AND notice what dated about it. This isn't 'the past is evil': it wasn't a scandal at the time because the standard was genuinely different — and the standard then changed (in 2019 the ASA introduced a rule on harmful gender stereotypes in ads). The skill the whole thread models is the real lesson: being able to appreciate old media and think critically about it in the same breath — and to have that conversation without anyone being cancelled or told to shut up." },
        { type: "impact", title: "'Of Its Time' Is a Real Thing", stats: [
          { num: "1990s", label: "When a cheeky billboard was just 'a bit of fun'" },
          { num: "2019", label: "ASA rule on harmful gender stereotypes introduced" },
          { num: "2", label: "Things that are true at once: clever AND dated" },
          { num: "0", label: "People cancelled — just a thread that ended wiser" },
        ] },
      ],
    },
  ],
  tasks: [
    {
      type: "mcq",
      id: "nb-q1",
      prompt: "What's the 'both can be true' reading of the billboard?",
      options: [
        "It was either clever or sexist, never both",
        "It was a genuinely clever pun AND it carries a dated assumption about who the customer is",
        "It was meaningless",
        "It is offensive and never was funny",
      ],
      correctIndex: 1,
      explanation:
        "Enjoying the wit and noticing the dated framing aren't in conflict. 'I enjoyed it' and 'it's dated' can share a sentence.",
    },
    {
      type: "mcq",
      id: "nb-q2",
      prompt: "What is the actual problem people identify — the pun, or something else?",
      options: [
        "The pun itself",
        "The assumption underneath it — that the show and cars are 'for men', with the woman as the route, not the audience",
        "The motorway junction",
        "There is no problem at all",
      ],
      correctIndex: 1,
      explanation:
        "'The pun isn't the problem; the assumption is.' It quietly frames the man as the default customer and the woman as a means to win him over.",
    },
    {
      type: "mcq",
      id: "nb-q3",
      prompt: "Why is 'of its time' a real thing here, not just an excuse?",
      options: [
        "Because the past is always worse",
        "Because the standard genuinely changed — in 2019 the ASA introduced a written rule on harmful gender stereotypes in ads",
        "Because nobody remembers it",
        "Because billboards are banned now",
      ],
      correctIndex: 1,
      explanation:
        "There's a concrete, written change in the rules — not just shifting mood. The line for 'acceptable' actually moved.",
    },
    {
      type: "mcq",
      id: "nb-q4",
      prompt: "Why wasn't it a 'scandal' at the time?",
      options: [
        "Because everyone back then was worse people",
        "Because the prevailing standard was different — it was covered as a bit of fun and few objected",
        "Because it was censored",
        "Because no one saw it",
      ],
      correctIndex: 1,
      explanation:
        "Standards, not people's basic decency, set what reads as acceptable. The same ad meets a different standard now.",
    },
    {
      type: "mcq",
      id: "nb-q5",
      prompt: "What core media-literacy skill does the thread model?",
      options: [
        "Cancelling anything dated",
        "Appreciating old media AND thinking critically about it at the same time",
        "Refusing to discuss the past",
        "Insisting nothing has changed",
      ],
      correctIndex: 1,
      explanation:
        "Holding enjoyment and criticism together — without 'the past is evil' or 'lighten up' — is the entire skill on display.",
    },
    {
      type: "mcq",
      id: "nb-q6",
      prompt: "Why is the way the conversation happened itself a positive example?",
      options: [
        "Someone got cancelled",
        "Nuance survived: a fond memory, a fair question, and a wiser ending — no one shut down or shouted at",
        "Everyone refused to change their mind",
        "It was deleted",
      ],
      correctIndex: 1,
      explanation:
        "The thread shows you can re-examine old media respectfully and come out understanding more, rather than fighting.",
    },
    {
      type: "written",
      id: "nb-w1",
      prompt:
        "Explain how the billboard can be 'clever AND dated' at once. Why don't you have to pick one?",
      placeholder:
        "What's clever about it? What dated about the assumption underneath?…",
    },
    {
      type: "written",
      id: "nb-w2",
      prompt:
        "'The pun isn't the problem; the assumption is.' Explain who the ad treats as the customer and who as 'the route'.",
      placeholder:
        "Who is spoken to? Who is positioned as a means to an end?…",
    },
    {
      type: "written",
      id: "nb-w3",
      prompt:
        "Why is 'of its time' a real explanation here rather than an excuse? Use the change in advertising rules.",
      placeholder:
        "What concretely changed? Why wasn't it a scandal then?…",
    },
    {
      type: "written",
      id: "nb-w4",
      prompt:
        "This thread re-examined old media without anyone being cancelled. What made the conversation work, and how would you discuss a dated ad well?",
      placeholder:
        "Think about holding enjoyment and criticism together, tone, and good faith…",
    },
  ],
};
