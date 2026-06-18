// Authored Scenario — TrevTnT & ProSyndi, the CSGOSkinJackpot scandal
// (fictional reenactment of a real landmark case). Ported from the HTML POC.
// Authored, never simulated (ADR-0006). Uses disclaimer, orgchart, video posts
// (the apology renders the supplied puppy thumbnail via src).
import type { Scenario } from "./red-bull";

export const SKINJACKPOT_SCENARIO: Scenario = {
  id: "skinjackpot-scandal",
  badge: "Scenario",
  title: "TrevTnT & ProSyndi — The CSGOSkinJackpot Scandal (Fictional)",
  prePosts: [
    { type: "post", name: "Gaming News", handle: "@GamingNewsDaily", av: "journo", initials: "GN", verified: true, text: "Skin trading and 'skin gambling' sites are booming in the gaming community — and a huge slice of the audience for this content is under 18. Regulators are starting to pay attention.", likes: 2100, rts: 620, platform: "MockTweet" },
    { type: "post", name: "Just Here", handle: "@randomviewer", av: "public", initials: "JH", text: "every gaming youtuber suddenly promoting these 'jackpot' skin sites lately. feels like there's a new one every week. is anyone checking if these are even legit?", likes: 740, rts: 160, platform: "MockTweet" },
  ],
  sections: [
    {
      label: "The 'Discovery' — I Just Won Big!",
      gap: 1700,
      posts: [
        { type: "disclaimer", text: "FICTIONAL REENACTMENT. 'TrevTnT', 'ProSyndi' and 'CSGOSkinJackpot' are invented stand-ins for a real, landmark case. The FTC and the disclosure rules referenced are real. This exists to teach how undisclosed promotion works — and why it's especially serious when gambling is promoted to a young audience." },
        { type: "post", name: "TrevTnT", handle: "@TrevTnT", av: "creator", initials: "TT", verified: true, platform: "MockTube", videoTitle: "OMG I FOUND THIS INSANE NEW SITE!! (won $10,000 in skins?!)", text: "Guys you HAVE to check out this site I just found — CSGOSkinJackpot. You put your skins in, and I literally just won over $10,000 worth in one go?! I couldn't believe it. Link's in the description, go try it!! 🤑", likes: 2400000, rts: 0 },
        { type: "post", name: "ProSyndi", handle: "@ProSyndi", av: "creator", initials: "PS", verified: true, platform: "MockTube", videoTitle: "betting my RAREST skins on CSGOSkinJackpot... (HUGE WIN)", text: "So Trev showed me this new site and I had to try it. Threw in my knife skin, spun it, and... no way. Biggest win of my life. This site is actually nuts. Try it for yourselves, link below 👇", likes: 1900000, rts: 0 },
        { type: "post", name: "Young Fan", handle: "@xX_proGamer_2009_Xx", av: "public", initials: "YF", text: "just signed up to CSGOSkinJackpot because Trev and Syndi won so much!! used my birthday money. if they win that much I can too right?? 🤞", likes: 8400, rts: 1200, platform: "MockTweet" },
      ],
    },
    {
      label: "Something Feels Off",
      gap: 1600,
      posts: [
        { type: "post", name: "Sharp Viewer", handle: "@notbornyesterday", av: "public", initials: "SV", text: "anyone else notice Trev and Syndi win EVERY single time they film on CSGOSkinJackpot? like... every video. nobody's that lucky. and they push it SO hard. something feels off about this one. 🤔", likes: 14200, rts: 6800, platform: "MockTweet" },
        { type: "post", name: "Worried Parent", handle: "@mum_of_three_uk", av: "public", initials: "WP", text: "my 13 year old just asked to put his game skins on a 'jackpot' site because his favourite YouTubers keep winning thousands on it. half their audience are children. since when do we let kids gamble because an influencer told them to? 😡", likes: 22600, rts: 11400, platform: "MockTweet" },
        { type: "post", name: "Small Creator", handle: "@honest_gaming", av: "public", initials: "SC", text: "I tried CSGOSkinJackpot after the hype. lost my skins in about four spins. funny how the videos never show THAT part. you only ever see the wins. that's not an accident.", likes: 18900, rts: 9200, platform: "MockTweet" },
      ],
    },
    {
      label: "The Exposé — Follow the Records",
      gap: 1600,
      posts: [
        { type: "post", name: "Teazilla", handle: "@Teazilla", av: "journo", initials: "TZ", verified: true, platform: "MockTube", videoTitle: "I looked up who ACTUALLY owns CSGOSkinJackpot. You won't like it.", text: "Everyone keeps asking why Trev and Syndi win every time. So I stopped guessing and pulled the public company registration documents for CSGOSkinJackpot. What I found explains everything. Here it is, in black and white. 🧾", likes: 5800000, rts: 0 },
        { type: "orgchart", company: "CSGOSkinJackpot LLC", source: "Extract from public business registration filing", officers: [
          { role: "President / CEO", name: "Trevor M. (“TrevTnT”)" },
          { role: "Vice-President / Co-owner", name: "Tom C. (“ProSyndi”)" },
        ], caption: "The two creators promoting the site as lucky 'players'... are the registered owners of the company that runs it." },
        { type: "post", name: "Teazilla", handle: "@Teazilla", av: "journo", initials: "TZ", text: "To be completely clear about what this means: they did not 'find' this site. They OWN it. Every time they filmed themselves 'winning,' they were playing on their own company's site — and sending millions of young fans to lose real money to a business they profit from. None of it was disclosed.", likes: 84200, rts: 48600, platform: "MockTweet" },
        { type: "post", name: "Gr8Gr8", handle: "@Gr8Gr8", av: "journo", initials: "GG", text: "Let me say the quiet part loud: two adults built a gambling site, hid that they owned it, filmed fake 'I just won $10k!' reaction videos, and aimed the whole thing at children. The 'wins' weren't luck. They were the bait. This is about as bad as it gets. 🎣", likes: 92400, rts: 54200, platform: "MockTweet" },
      ],
    },
    {
      label: "The Backlash — It All Re-Reads as Bait",
      gap: 1500,
      posts: [
        { type: "post", name: "Sharp Viewer", handle: "@notbornyesterday", av: "public", initials: "SV", text: "so the 'why do they win every time' answer was: because it's THEIR site and they control the story. every 'lucky win' video was an advert for a business they own, disguised as genuine excitement. and they pointed it at kids. I feel sick rewatching those now.", likes: 38400, rts: 19800, platform: "MockTweet" },
        { type: "post", name: "Worried Parent", handle: "@mum_of_three_uk", av: "public", initials: "WP", text: "my son lost his skins to a site secretly owned by the very people who told him it was safe and fun. that's not an endorsement gone wrong. that's grown adults running a casino for children and hiding it. there have to be rules against this.", likes: 44200, rts: 24600, platform: "MockTweet" },
        { type: "post", name: "Gaming News", handle: "@GamingNewsDaily", av: "journo", initials: "GN", text: "The CSGOSkinJackpot story has exploded. Two of gaming's biggest creators stand accused of promoting a skin-gambling site to a young audience without disclosing they owned it. The 'lucky win' videos are now seen as undisclosed advertising for their own business.", likes: 28600, rts: 14200, platform: "MockTweet" },
        { type: "post", name: "TrevTnT", handle: "@TrevTnT", av: "creator", initials: "TT", verified: true, platform: "MockTube", videoTitle: "an apology... (from my heart) 💔", src: "/assets/scenarios/skinjackpot-apology.png", text: "Hey guys. I've seen the comments and I just... I need to talk to you. From the heart. I'm sitting here with my puppy because I've been going through a really hard time too. Mistakes were made. If anyone was hurt, I'm sorry that you feel that way. Please be kind. ❤️", likes: 3100000, rts: 0 },
        { type: "post", name: "Gr8Gr8", handle: "@Gr8Gr8", av: "journo", initials: "GG", text: "Right on cue: a tearful apology video, soft lighting, and — of course — a puppy on the lap. Notice what's missing though. No 'I owned the site.' No 'I'm sorry I did this,' just 'sorry you feel hurt.' This isn't accountability. It's PR trying to get ahead of the lawyers. Watch the words, not the puppy. 🐶📋", likes: 76200, rts: 41800, platform: "MockTweet" },
        { type: "post", name: "Sharp Viewer", handle: "@notbornyesterday", av: "public", initials: "SV", text: "the puppy is genuinely the funniest part. mate you ran a casino for children, a golden retriever is not going to fix that. 'mistakes were made' — by WHO? say the actual words. 'I'm sorry you feel that way' is not an apology, it's a hostage negotiation.", likes: 52400, rts: 26800, platform: "MockTweet" },
      ],
    },
    {
      label: "The FTC Steps In",
      gap: 1700,
      posts: [
        { type: "news", outlet: "FTC", outletColor: "#1a3c6e", headline: "Federal Trade Commission Acts Over Undisclosed Influencer Endorsements", sub: "The FTC has taken action in a landmark case: creators who promote a product or service must clearly disclose any 'material connection' — such as payment or ownership — to their audience. Failing to reveal that you own the thing you're recommending is a deceptive practice. The case becomes a defining moment for influencer-disclosure rules.", url: "ftc.gov/news" },
        { type: "post", name: "Tara — Law Explainer", handle: "@tara_explains_law", av: "journo", initials: "TL", text: "Why this case matters so much: it established the principle, with teeth, that an influencer's recommendation must reveal what's behind it. If you're paid, say so. If you OWN it, absolutely say so. 'I just found this cool site' when you're the CEO is textbook deception. 🧵", likes: 32400, rts: 17200, platform: "MockTweet" },
        { type: "post", name: "Tara — Law Explainer", handle: "@tara_explains_law", av: "journo", initials: "TL", text: "This is the reason you now see '#ad', 'paid promotion' and 'sponsored' labels everywhere. They're not decoration — they exist so you can tell genuine opinion from a sales pitch. (In the UK the ASA and CMA enforce the same thing.) These rules were written in blood like this case.", likes: 26800, rts: 13600, platform: "MockTweet" },
      ],
    },
    {
      label: "The Lesson — Ask What They Get Out Of It",
      gap: 1800,
      posts: [
        { type: "post", name: "Teazilla", handle: "@Teazilla", av: "journo", initials: "TZ", text: "The single most useful habit you can build online: when someone is pushing you HARD toward something, stop and ask — what do THEY get if I do this? Follow the incentive. Half the time, the answer is right there in a public record if you bother to look. 🔍", likes: 34600, rts: 18400, platform: "MockTweet" },
        { type: "post", name: "Tara — Law Explainer", handle: "@tara_explains_law", av: "journo", initials: "TL", text: "And the 'I won big!' trap: you only ever see the wins because the wins are what get filmed and posted. The thousands of losses are invisible. Any 'look how easy this is' gambling content is showing you a survivorship illusion by design. The house always films its good days.", likes: 28200, rts: 14800, platform: "MockTweet" },
        { type: "post", name: "Gr8Gr8", handle: "@Gr8Gr8", av: "journo", initials: "GG", text: "Three things to take from this: 1) A recommendation with a hidden incentive isn't a recommendation, it's an advert. 2) If it's gambling aimed at kids, no disclosure makes it okay. 3) Public records exist. Sunlight works. The people who exposed this just... read the paperwork.", likes: 31200, rts: 16200, platform: "MockTweet" },
        { type: "verdict", tone: "fail", label: "The Verdict",
          heading: "A Recommendation With a Hidden Incentive Is an Advert",
          body: "Two big creators filmed themselves 'discovering' a skin-gambling site and 'winning' thousands, sending millions of mostly young fans to spend real money — while hiding that they owned the company. Public registration documents exposed it: the 'lucky players' were the registered owners. That's the core lesson: a recommendation with a hidden incentive isn't a recommendation, it's an undisclosed advert — and 'I just found this cool site' when you're the CEO is textbook deception (exactly what FTC/ASA disclosure rules and #ad labels exist to stop). Three habits fall out of it: follow the incentive — ask 'what do they get if I do this?'; beware the survivorship illusion — you only ever see the wins because the losses don't get filmed; and remember sunlight works — the exposé was just someone reading the public paperwork. And watch the non-apology: 'mistakes were made… sorry you feel hurt' (with a puppy) dodges accountability. Watch the words, not the puppy." },
        { type: "impact", title: "The CSGOSkinJackpot Scandal", stats: [
          { num: "2", label: "Owners who posed as lucky 'players'" },
          { num: "Millions", label: "Of mostly young viewers sent to the site" },
          { num: "0", label: "Disclosures that it was their own business" },
          { num: "#ad", label: "The disclosure rules this kind of case put on the map" },
        ] },
      ],
    },
  ],
  tasks: [
    {
      type: "mcq",
      id: "sj-q1",
      prompt: "What was the central deception?",
      options: [
        "They lost money on the site",
        "They promoted a gambling site as lucky 'players' while secretly owning the company — undisclosed, with the wins as bait",
        "They charged for the videos",
        "They reviewed it negatively",
      ],
      correctIndex: 1,
      explanation:
        "They didn't 'find' the site — they owned it. Filming 'wins' to send fans to a business they profit from, without disclosing it, is the deception.",
    },
    {
      type: "mcq",
      id: "sj-q2",
      prompt: "Why is 'a recommendation with a hidden incentive' not really a recommendation?",
      options: [
        "Because recommendations are always paid",
        "Because the hidden interest makes it an advert in disguise — you can't trust it as a genuine opinion",
        "Because it was on video",
        "Because the site was new",
      ],
      correctIndex: 1,
      explanation:
        "Genuine opinion and a sales pitch are different things. Concealing payment or ownership turns 'advice' into undisclosed advertising.",
    },
    {
      type: "mcq",
      id: "sj-q3",
      prompt: "What do disclosure rules (FTC/ASA) and '#ad' labels exist to do?",
      options: [
        "Decorate posts",
        "Let the audience tell genuine opinion from a paid/owned pitch — disclose any 'material connection' like payment or ownership",
        "Promote the influencer",
        "Increase views",
      ],
      correctIndex: 1,
      explanation:
        "The label protects the viewer. 'I just found this cool site' when you're the CEO is exactly the deception these rules were written to stop.",
    },
    {
      type: "mcq",
      id: "sj-q4",
      prompt: "What is the 'survivorship illusion' in the 'I won big!' videos?",
      options: [
        "Everyone wins at gambling",
        "You only ever see the wins because losses don't get filmed — it makes winning look easy and common when it isn't",
        "The site was rigged to pay everyone",
        "The videos were fake CGI",
      ],
      correctIndex: 1,
      explanation:
        "Selective posting of wins (and never the many losses) is a designed illusion. 'The house always films its good days.'",
    },
    {
      type: "mcq",
      id: "sj-q5",
      prompt: "What's the 'follow the incentive' habit?",
      options: [
        "Always trust enthusiastic creators",
        "When someone pushes you hard toward something, ask 'what do THEY get if I do this?' — often the answer is in a public record",
        "Buy whatever is promoted",
        "Ignore all recommendations",
      ],
      correctIndex: 1,
      explanation:
        "Asking who benefits exposes hidden motives. Here, public registration documents literally answered the question for anyone who looked.",
    },
    {
      type: "mcq",
      id: "sj-q6",
      prompt: "Why was the tearful 'apology' video criticised?",
      options: [
        "It was too honest",
        "It dodged accountability — 'mistakes were made… sorry you feel hurt', a puppy and soft lighting, but no admission of owning the site",
        "It named the wrongdoing clearly",
        "It refunded everyone",
      ],
      correctIndex: 1,
      explanation:
        "'Sorry you feel that way' isn't an apology; passive 'mistakes were made' hides who did what. The puppy is PR, not accountability — 'watch the words, not the puppy.'",
    },
    {
      type: "mcq",
      id: "sj-q7",
      prompt: "What makes this case especially serious beyond non-disclosure?",
      options: [
        "The skins were ugly",
        "It was gambling aimed at a largely under-18 audience — no disclosure could make that okay",
        "The videos were long",
        "The site had a bad logo",
      ],
      correctIndex: 1,
      explanation:
        "Promoting gambling to children adds real harm on top of the deception — a key reason it became a landmark enforcement case.",
    },
    {
      type: "mcq",
      id: "sj-q8",
      prompt: "How was the scandal actually uncovered?",
      options: [
        "A leaked DM",
        "Someone read the public company registration documents — 'sunlight works'",
        "A hack",
        "The owners confessed first",
      ],
      correctIndex: 1,
      explanation:
        "No insider needed — the ownership was on the public record. The exposé was simply checking the paperwork.",
    },
    {
      type: "written",
      id: "sj-w1",
      prompt:
        "Explain why undisclosed ownership turned the 'lucky win' videos into deception. What should they have disclosed?",
      placeholder:
        "What did viewers think they were watching? What was the hidden material connection?…",
    },
    {
      type: "written",
      id: "sj-w2",
      prompt:
        "Explain the 'survivorship illusion' in gambling content and how to guard against it.",
      placeholder:
        "Why do you only see wins? What does that hide? What should you assume?…",
    },
    {
      type: "written",
      id: "sj-w3",
      prompt:
        "Break down why the apology video failed as accountability. Rewrite it as a real apology.",
      placeholder:
        "What did 'mistakes were made / sorry you feel hurt' dodge? What would owning it say?…",
    },
    {
      type: "written",
      id: "sj-w4",
      prompt:
        "'Follow the incentive.' Explain this habit and give an example of how you'd apply it next time a creator pushes a product hard.",
      placeholder:
        "What question do you ask? Where might the answer be found?…",
    },
  ],
};
