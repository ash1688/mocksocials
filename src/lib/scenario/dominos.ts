// Authored Scenario — Domino's "Our Pizza Was Bad" (2009). Ported from the HTML
// POC. A fixed documentary timeline; content and outcome are authored, never
// simulated (ADR-0006). Shares the beat/task types defined in ./red-bull.
import type { Scenario } from "./red-bull";

export const DOMINOS_SCENARIO: Scenario = {
  id: "dominos-pizza-turnaround",
  badge: "Scenario",
  title: "Domino's — Our Pizza Was Bad (2009)",
  prePosts: [
    { type: "post", name: "Food & Culture", handle: "@foodandculture", av: "public", initials: "FC", text: "shoutout to 2009 for being the year the internet completely changed how brands have to behave. we're going to be talking about some of the case studies from that year for decades. one of the wildest involves a pizza company. 🍕", likes: 2400, rts: 480, platform: "MockTweet" },
    { type: "post", name: "Just a Person Online", handle: "@jasonmk", av: "public", initials: "JP", text: "right so it's Easter weekend and I'm seeing something very unpleasant about Domino's going around. what is happening", likes: 320, rts: 140, platform: "MockTweet" },
  ],
  sections: [
    {
      label: "Act 1 — Easter Sunday, YouTube, Chaos",
      gap: 1800,
      posts: [
        { type: "post", name: "The Consumerist", handle: "@consumerist", av: "journo", initials: "TC", verified: true, text: "🚨 heads up: a video posted to YouTube shows two Domino's employees contaminating food during preparation. we're not linking to it but it's spreading fast. if you've ordered from Domino's today you may want to know this exists.", likes: 18400, rts: 24600, platform: "MockTweet" },
        { type: "post", name: "Just a Person Online", handle: "@jasonmk", av: "public", initials: "JP", text: "I've just watched that Domino's video and I feel genuinely sick. those are REAL orders going to REAL customers. YouTube taken it down yet? because it's absolutely everywhere right now", likes: 6200, rts: 8800, platform: "MockTweet" },
        { type: "post", name: "Food Safety Watch", handle: "@foodsafetywatch", av: "public", initials: "FW", text: "The Domino's video has now passed 750,000 views. Felony food contamination charges are likely. The two employees have been identified from exterior shots. And Domino's has said... nothing. Their silence is deafening right now. 🍕❌", likes: 9400, rts: 12200, platform: "MockTweet" },
      ],
    },
    {
      label: "48 Hours of Silence — The Wrong Move",
      gap: 1500,
      posts: [
        { type: "post", name: "PR Watch", handle: "@prwatch", av: "public", initials: "PW", text: "it has now been 48 hours since the Domino's video went viral and the company has made no public statement. the video has over a million views. every hour without a response is a new news cycle. in social media, silence is not neutral — it IS a statement. and right now it's saying 'we don't care.' 📢", likes: 14200, rts: 9800, platform: "MockTweet" },
        { type: "silence", title: "48 Hours. No Response.", rows: [
          { time: "Sun 12 Apr", event: "Video posted to YouTube on Easter Sunday", responded: false },
          { time: "Mon 13 Apr", event: "The Consumerist posts it. Views explode. Domino's informed.", responded: false },
          { time: "Tue 14 Apr", event: "Two employees fired. Over 1 million views.", responded: false },
          { time: "Wed 15 Apr", event: "Public demanding a response. International press.", responded: true },
        ], footer: "Every hour of that silence, the internet filled the gap with its own story. In the social media age, no response IS a response — and it's usually the worst one." },
        { type: "post", name: "Just a Person Online", handle: "@jasonmk", av: "public", initials: "JP", text: "day two and Domino's still hasn't said anything publicly. my mate works in PR and says they're probably trying to 'manage the story.' mate. the story IS managing YOU right now. the longer you wait the worse it gets. just SAY something 😤", likes: 11400, rts: 8200, platform: "MockTweet" },
      ],
    },
    {
      label: "The Crisis Response — Fast, Direct, Accountable",
      gap: 1600,
      posts: [
        { type: "post", name: "Domino's Pizza", handle: "@dpzinfo", av: "brand", initials: "DP", verified: true, text: "We are launching this account today to speak directly to you about what happened. Two team members have been dismissed. The store has been sanitised from top to bottom. Felony warrants are out for their arrest. We sincerely apologise. This does not represent who we are. We are listening. 🍕", likes: 28400, rts: 14200, platform: "MockTweet" },
        { type: "post", name: "Domino's Pizza", handle: "@dpzinfo", av: "brand", initials: "DP", verified: true, text: "Our president Patrick Doyle has recorded a direct video response. No script. No spin. Just him, on camera, talking to you. We know words aren't enough. But we wanted you to hear from the top. youtube.com/dpz-response [MockTube link]", likes: 22600, rts: 11400, platform: "MockTweet" },
        { type: "post", name: "PR Watch", handle: "@prwatch", av: "public", initials: "PW", text: "okay, I'll give credit where it's due: once Domino's responded, they did it right. direct, fast, no corporate-speak, the president on camera himself, felony charges confirmed. this is how you handle a viral crisis — transparent, human, immediate. two days too late but the response itself? solid. 📋✅", likes: 16800, rts: 7400, platform: "MockTweet" },
      ],
    },
    {
      label: "The Reckoning — But There Was a Bigger Problem",
      gap: 1700,
      posts: [
        { type: "post", name: "Food Critic Weekly", handle: "@foodcriticwkly", av: "public", initials: "FC", text: "Here's the uncomfortable truth the Domino's video laid bare: the contamination was horrific. But the reason so many people were sharing it with 'HA, typical Domino's' energy is that the brand was already a punchline. Their pizza had a reputation for being genuinely terrible. The video didn't CREATE their problem. It just made it impossible to keep ignoring. 🍕", likes: 22400, rts: 9800, platform: "MockTweet" },
        { type: "post", name: "Just a Person Online", handle: "@jasonmk", av: "public", initials: "JP", text: "real talk: I only ever ordered Domino's when I was desperate or at 2am and nothing else was open. even BEFORE this video their pizza was... not good. like genuinely bad. cardboard crust energy. the video is a crisis but is it a SEPARATE crisis from 'your food is already not that nice'? asking honestly", likes: 14600, rts: 5200, platform: "MockTweet" },
        { type: "post", name: "Brand Strategy Today", handle: "@brandstrategy", av: "public", initials: "BS", text: "The Domino's situation in 2009 is a classic case of a crisis revealing a pre-existing condition. You can fix the contamination story with a good response. You cannot fix 'your core product is bad' with a press release. That requires something much harder: actually changing the thing. The question is whether Domino's has the guts to do it. 🍕", likes: 19200, rts: 8600, platform: "MockTweet" },
      ],
    },
    {
      label: "Act 2 — December 2009: They Said It Out Loud",
      gap: 1500,
      posts: [
        { type: "post", name: "Ad Industry News", handle: "@adindustrynews", av: "journo", initials: "AI", verified: true, text: "🚨 Domino's has just launched what might be the most honest ad campaign in fast food history. They're showing REAL focus groups of REAL customers calling their pizza 'cardboard.' They're saying 'our pizza was bad.' They changed every single recipe. And they're offering a full refund if you don't like the new one. This is not normal. 😳🍕", likes: 42400, rts: 24600, platform: "MockTweet" },
        { type: "post", name: "Just a Person Online", handle: "@jasonmk", av: "public", initials: "JP", text: "wait. Domino's literally just put a customer on national TV saying their pizza 'tastes like cardboard' and 'is totally void of flavour'?? and then showed their CEO in an APRON?? no celebrity, no slick music, just 'yeah our food was bad, here's what we changed'?? I don't know whether to be impressed or deeply confused 😂🍕", likes: 28600, rts: 14200, platform: "MockTweet" },
        { type: "reported", source: "Domino's Pizza Turnaround campaign — documented advertising copy, 2009", context: "The opening line of the Pizza Turnaround campaign, voiced by Domino's executives in the ad itself:", quote: "Most companies hide the criticism they're getting. We actually faced it head on.", footer: "They then showed the criticism. On national television. To millions of people. That's the bit that was genuinely radical." },
        { type: "post", name: "Food Critic Weekly", handle: "@foodcriticwkly", av: "public", initials: "FC", text: "I've now tried the new Domino's recipe. And I'm annoyed to report: it's actually decent? Like genuinely improved? They changed the crust, the sauce AND the cheese. Not a gimmick — they actually did the thing they said they did. That's rare. That's really quite rare. 🍕👀", likes: 31400, rts: 12800, platform: "MockTweet" },
      ],
    },
    {
      label: "Why It Worked — Honesty as Strategy",
      gap: 1600,
      posts: [
        { type: "post", name: "Brand Strategy Today", handle: "@brandstrategy", av: "public", initials: "BS", text: "Let's be clear about what Domino's did and why it's counterintuitive. Every PR instinct says: protect the brand, don't admit fault, control the narrative. They did the opposite. They found the worst things people said about them and put them on TV. And it WORKED. Here's why. 🧵", likes: 18400, rts: 8600, platform: "MockTweet" },
        { type: "prapology", title: "PR Apology vs Real Apology", bad: { label: "The PR apology", points: [
          "\"We're sorry if anyone was offended\"",
          "\"Our standards are the highest in the industry\"",
          "\"This doesn't reflect our values\"",
          "\"We've launched a review\"",
        ] }, good: { label: "The real apology (Domino's)", points: [
          "\"Our pizza was bad. We know it. You know it.\"",
          "Real customers saying exactly that, on camera",
          "Changed the crust, the sauce AND the cheese",
          "Full refund if you don't like it. No catch.",
        ] }, verdict: "One protects the brand. One rebuilds it. Only one of them requires actually changing the thing." },
        { type: "post", name: "Brand Strategy Today", handle: "@brandstrategy", av: "public", initials: "BS", text: "The thing is: customers already KNEW the pizza was bad. Domino's pretending otherwise would have insulted them. By saying 'you're right, we know, we're fixing it' — they treated customers like adults. And customers responded by trusting them. Radical honesty + genuine change = trust. That's the formula. 🍕", likes: 24600, rts: 10400, platform: "MockTweet" },
      ],
    },
    {
      label: "The Lesson — From Crisis to Comeback",
      gap: 1800,
      posts: [
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "One year. Two stories. One company. And honestly one of the most instructive brand arcs of the social media era. A few things worth carrying from this. 🧵👇", likes: 16400, rts: 6800, platform: "MockTweet" },
        { type: "post", name: "PR Watch", handle: "@prwatch", av: "public", initials: "PW", text: "The April lesson: social media removed 'wait for it to blow over' from the corporate playbook forever. That 48-hour silence cost them enormously. In 2009, a crisis spreads at the speed of a retweet — and your reputation travels with it. You have HOURS, not days. Respond or the story writes itself. 📢", likes: 21800, rts: 9400, platform: "MockTweet" },
        { type: "post", name: "Brand Strategy Today", handle: "@brandstrategy", av: "public", initials: "BS", text: "The December lesson: the rogue video was a crisis. But it was also the forcing function for a reckoning that was already overdue. Sometimes a public disaster forces a private honesty. The companies that survive are the ones that use the crisis as the catalyst — not the ones that just survive it and go back to business as usual. 🍕", likes: 19600, rts: 8200, platform: "MockTweet" },
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "And the one that applies way beyond pizza: a real apology changes the thing that caused the problem. A PR apology protects the brand while leaving the problem intact. Audiences in 2009 — with Twitter and YouTube — could tell the difference faster than ever before. That gap between 'saying sorry' and 'being sorry' has never been harder to fake. 💙", likes: 28400, rts: 12600, platform: "MockTweet" },
        { type: "verdict", tone: "win", label: "The Verdict",
          heading: "Honesty as the Recovery Strategy",
          body: "Two mistakes nearly defined Domino's in 2009: a contamination video, and 48 hours of silence that let the internet write the story for them. What saved the brand wasn't spin — it was speed and radical honesty. They responded directly and unscripted, then went further: airing real customers calling the pizza 'cardboard', admitting it was bad, and actually changing the recipe with a money-back guarantee. The lessons: in the social-media age you have hours not days; silence is itself a statement; and a real apology changes the thing that caused the problem, where a PR apology only protects the brand while leaving it intact." },
        { type: "impact", title: "Our Pizza Was Bad — And Saying So Saved the Brand", stats: [
          { num: "48hrs", label: "Of silence that made the crisis worse" },
          { num: "1M+", label: "Views before Domino's said a word" },
          { num: "$6.87", label: "Stock price at the end of 2009, as the turnaround launched" },
          { num: "$400+", label: "Stock price by 2024 — honesty paid off" },
        ] },
      ],
    },
  ],
  tasks: [
    {
      type: "mcq",
      id: "dp-q1",
      prompt: "What was Domino's biggest early mistake when the video went viral?",
      options: [
        "Firing the two employees",
        "Staying silent for roughly 48 hours while the video spread",
        "Launching a new social media account",
        "Apologising too quickly",
      ],
      correctIndex: 1,
      explanation:
        "For about 48 hours Domino's said nothing while the video passed a million views. In social media a non-response isn't neutral — silence is itself a statement, and every hour let others write the story.",
    },
    {
      type: "mcq",
      id: "dp-q2",
      prompt: "Why was the silence so damaging?",
      options: [
        "Because the video turned out to be fake",
        "Because they had deleted customer comments",
        "Because a non-response is itself a response — it let the public fill the vacuum with its own story",
        "Because they had threatened to sue YouTube",
      ],
      correctIndex: 2,
      explanation:
        "Every hour without a statement was a fresh news cycle. With no official account of events, the crowd and the press supplied their own — and it was worse than anything Domino's would have said.",
    },
    {
      type: "mcq",
      id: "dp-q3",
      prompt: "What made Domino's eventual response effective?",
      options: [
        "A polished advert featuring a celebrity",
        "A vague \"we're sorry if anyone was offended\" statement",
        "The president speaking on camera, unscripted, with concrete actions and a clear apology",
        "Ignoring it until it blew over",
      ],
      correctIndex: 2,
      explanation:
        "Once they moved, they did it right: fast, direct, no corporate-speak, the president himself on camera, and concrete actions (staff dismissed, store sanitised, charges confirmed). Transparent and human beats polished and evasive.",
    },
    {
      type: "mcq",
      id: "dp-q4",
      prompt: "Commentators called this 'a crisis revealing a pre-existing condition'. What did they mean?",
      options: [
        "The pizza already had a poor reputation, which the crisis forced Domino's to finally confront",
        "The website was too slow",
        "The logo looked outdated",
        "The prices were too high",
      ],
      correctIndex: 0,
      explanation:
        "People shared the video with a 'typical Domino's' tone because the product was already a punchline. The video didn't create the problem — it made the existing one impossible to ignore.",
    },
    {
      type: "mcq",
      id: "dp-q5",
      prompt: "What was radical about the December 'Pizza Turnaround' campaign?",
      options: [
        "They hired a famous chef to redesign the menu",
        "They aired real customers calling the pizza 'cardboard' and openly admitted it was bad",
        "They simply lowered their prices",
        "They denied the earlier criticism",
      ],
      correctIndex: 1,
      explanation:
        "They put the worst criticism of themselves on national television, admitted the pizza was bad, changed the crust, sauce and cheese, and offered a refund if you still didn't like it.",
    },
    {
      type: "mcq",
      id: "dp-q6",
      prompt: "What is the key difference between a 'PR apology' and a 'real apology'?",
      options: [
        "A real apology is simply longer",
        "A PR apology is more sincere",
        "A real apology changes the thing that caused the problem; a PR apology protects the brand while leaving the problem intact",
        "There is no real difference",
      ],
      correctIndex: 2,
      explanation:
        "A PR apology manages perception ('sorry if offended… we've launched a review'). A real apology fixes the underlying cause — which is exactly what Domino's did by changing the recipe.",
    },
    {
      type: "mcq",
      id: "dp-q7",
      prompt: "Why did 'radical honesty' actually work for Domino's?",
      options: [
        "Because customers had forgotten the video",
        "Because customers already knew the pizza was bad, so admitting it (and genuinely changing it) earned trust",
        "Because every competitor's pizza was worse",
        "Because they gave away free pizza forever",
      ],
      correctIndex: 1,
      explanation:
        "Pretending the pizza was fine would have insulted customers who already knew otherwise. Saying 'you're right, we're fixing it' treated them as adults — honesty plus genuine change earned trust.",
    },
    {
      type: "mcq",
      id: "dp-q8",
      prompt: "What is the core speed lesson for the social-media age?",
      options: [
        "Always wait a week before responding",
        "You have hours, not days — 'wait for it to blow over' no longer works",
        "Never respond to online criticism",
        "Only ever respond through lawyers",
      ],
      correctIndex: 1,
      explanation:
        "A crisis now spreads at the speed of a retweet. Domino's 48-hour delay cost them enormously; the modern playbook is to respond within hours or the story writes itself.",
    },
    {
      type: "mcq",
      id: "dp-q9",
      prompt: "What role did the platforms (YouTube, Twitter) play in 2009?",
      options: [
        "They protected the brand from criticism",
        "They let the video and the story spread faster than the brand could control, removing the option to 'manage it quietly'",
        "They removed all the criticism automatically",
        "They had no real effect on the crisis",
      ],
      correctIndex: 1,
      explanation:
        "The platforms put distribution in the public's hands. Once a video can reach millions in hours, a company can no longer wait and quietly manage a story — the audience is already telling it.",
    },
    {
      type: "mcq",
      id: "dp-q10",
      prompt: "If you ran a local Domino's franchise during the April crisis, the best move would be to…",
      options: [
        "Publicly blame head office for the mess",
        "Stay aligned with the company's response, reassure local customers and tighten hygiene",
        "Pretend nothing had happened",
        "Attack the two employees online",
      ],
      correctIndex: 1,
      explanation:
        "Going rogue fragments the response and creates new stories. The strongest move is to reinforce the central message, demonstrate hygiene locally, and reassure your own customers.",
    },
    {
      type: "written",
      id: "dp-w1",
      prompt:
        "Explain why Domino's 48-hour silence made the crisis worse. Use the idea that 'in social media, silence is itself a statement'.",
      placeholder:
        "Think about what fills the gap when a company says nothing, and how fast a story spreads…",
    },
    {
      type: "written",
      id: "dp-w2",
      prompt:
        "In your own words, what is the difference between a 'PR apology' and a 'real apology' — and why could audiences in 2009 tell them apart so easily?",
      placeholder:
        "Consider what each one actually changes, and what Twitter/YouTube let people compare…",
    },
    {
      type: "written",
      id: "dp-w3",
      prompt:
        "The video exposed a problem (a bad product) that already existed. Explain how Domino's turned a disaster into a comeback, and why 'surviving' a crisis is not the same as 'using' it.",
      placeholder:
        "Think about the difference between going back to business as usual and actually changing the thing…",
    },
    {
      type: "written",
      id: "dp-w4",
      prompt:
        "You run social media for a brand hit by a viral video like this. What would you do in the first few hours, and what would you avoid doing?",
      placeholder:
        "Consider speed, tone, who speaks, concrete actions, and what NOT to say…",
    },
    {
      type: "written",
      id: "dp-w5",
      prompt:
        "How should rival pizza brands react to a competitor's crisis like this — what should they say or do, and what should they avoid? Consider both reputation and competitive advantage.",
      placeholder:
        "Is publicly piling on a smart move? What are the risks of gloating or staying quiet?…",
    },
    {
      type: "written",
      id: "dp-w6",
      prompt:
        "The stock fell during the crisis but soared after the honest turnaround. If you were advising the board or investors, what would you watch for to judge whether the turnaround was real rather than spin?",
      placeholder:
        "Think about evidence of genuine change vs marketing, and short-term vs long-term signals…",
    },
  ],
};
