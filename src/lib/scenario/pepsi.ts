// Authored Scenario — Pepsi & Kendall Jenner, the protest-ad disaster (2017).
// Ported from the HTML POC. Authored, never simulated (ADR-0006).
import type { Scenario } from "./red-bull";

export const PEPSI_SCENARIO: Scenario = {
  id: "pepsi-kendall-jenner",
  badge: "Scenario",
  title: "Pepsi & Kendall Jenner — The Protest Ad Disaster (2017)",
  prePosts: [
    { type: "post", name: "Pepsi", handle: "@pepsi", av: "brand", initials: "PE", verified: true, text: "The weekend is calling. 💙 What are your plans? Whatever they are, make sure they're refreshing. #LiveForNow", likes: 3200, rts: 680, platform: "MockTweet" },
    { type: "post", name: "AdWeek", handle: "@AdWeek", av: "journo", initials: "AW", verified: true, text: "Brands are chasing 'authenticity' harder than ever in 2017. The question nobody seems to be asking: can authenticity actually be manufactured? adweek.com", likes: 1400, rts: 320, platform: "MockTweet" },
    { type: "post", name: "Marcus J", handle: "@marcusj_writes", av: "public", initials: "MJ", text: "Big brands love the AESTHETIC of activism. The flags, the crowds, the raised fists. Just never the actual politics. Watch how often you see it now you've noticed it.", likes: 2100, rts: 540, platform: "MockTweet" },
  ],
  sections: [
    {
      label: "The Launch — Pepsi Unveils the Ad",
      gap: 1800,
      posts: [
        { type: "post", name: "Pepsi", handle: "@pepsi", av: "brand", initials: "PE", verified: true, text: "Introducing our new global campaign, 'Live For Now Moments'. A short film about coming together, finding common ground and the spirit of a new generation. Watch now. 💙 #LiveForNow #PepsiMoments", likes: 4200, rts: 1100, platform: "MockTweet" },
        { type: "post", name: "AdWeek", handle: "@AdWeek", av: "journo", initials: "AW", verified: true, text: "Pepsi has dropped a big-budget short film starring one of the most famous models on the planet, walking off a photoshoot to join a street protest. It ends with her handing a police officer a Pepsi. Bold. We'll be watching how this one lands. adweek.com", likes: 2800, rts: 640, platform: "MockTweet" },
        { type: "post", name: "Chloe W", handle: "@chloew_nyc", av: "public", initials: "CW", text: "...did Pepsi just release an ad where a model solves a protest by giving a cop a fizzy drink? I've watched it three times. It gets worse every time. What is happening 😭", likes: 18400, rts: 9200, platform: "MockTweet" },
      ],
    },
    {
      label: "The Backlash — It Lands Like a Brick",
      gap: 1500,
      posts: [
        { type: "post", name: "Marcus J", handle: "@marcusj_writes", av: "public", initials: "MJ", text: "So according to Pepsi, all those protest movements just needed was a rich celebrity to hand the police a cold drink and everything would've been sorted. Incredible. Decades of struggle. Solved. By cola. 🙄", likes: 84200, rts: 58400, platform: "MockTweet" },
        { type: "post", name: "Priya K", handle: "@priyak_uk", av: "public", initials: "PK", text: "The thing that gets me about the Pepsi ad is the sheer confidence of it. This went through MONTHS of meetings. Dozens of executives. A huge budget. Not ONE person in that entire chain said 'hey, maybe this is a bad idea'? #PepsiAd", likes: 92100, rts: 64200, platform: "MockTweet" },
        { type: "post", name: "DeShawn M", handle: "@deshawn_m", av: "public", initials: "DM", text: "People have been arrested, hurt and worse at real protests. Pepsi looked at all of that and thought it was a nice backdrop to sell soft drinks to teenagers. That's the part that's genuinely offensive. It's not clumsy. It's hollow. #PepsiAd", likes: 118000, rts: 81400, platform: "MockTweet" },
        { type: "trend", label: "Trending in United States", hashtag: "#PepsiAd", volume: "210K posts", context: "Near-universal criticism that the advert trivialises protest movements and co-opts activist imagery to sell soft drinks" },
      ],
    },
    {
      label: "The Criticism Sharpens — Why It Failed",
      gap: 1600,
      posts: [
        { type: "post", name: "Dr Aisha Bello", handle: "@draishabello", av: "public", initials: "AB", text: "As a marketing lecturer I'll be teaching this for years. The Pepsi ad is what happens when a brand wants the credibility of a social movement without any of the risk, sacrifice or meaning. You can't borrow authenticity. People can smell it instantly. #PepsiAd", likes: 64800, rts: 42100, platform: "MockTweet" },
        { type: "post", name: "Civil Rights Daughter", handle: "@crd_voices", av: "public", initials: "CR", text: "The Pepsi ad recreates a famous, powerful photograph of a real protester facing real police — but swaps the courage and the danger for a supermodel and a soft drink. Taking something that meant everything and making it mean nothing. That's why people are angry. #PepsiAd", likes: 142000, rts: 98600, platform: "MockTweet" },
        { type: "post", name: "AdWeek", handle: "@AdWeek", av: "journo", initials: "AW", verified: true, text: "Industry reaction to the Pepsi film has been brutal and close to unanimous. Creatives, strategists and clients alike are calling it one of the biggest brand misjudgements in years. The phrase 'how did this get signed off?' is everywhere today. adweek.com", likes: 38400, rts: 22600, platform: "MockTweet" },
        { type: "post", name: "Sam T", handle: "@samt_comedy", av: "public", initials: "ST", text: "BREAKING: world peace cancelled because the shop ran out of Pepsi. Only Diet Coke left. Negotiations have collapsed. 🕊️🥤 #PepsiAd", likes: 156000, rts: 112000, platform: "MockTweet" },
      ],
    },
    {
      label: "Pulled in 24 Hours — Pepsi Caves",
      gap: 1800,
      posts: [
        { type: "news", outlet: "BBC News", outletColor: "#e83030", headline: "Pepsi pulls Kendall Jenner advert after backlash", sub: "Pepsi has removed its new advert and halted the campaign barely 24 hours after release, following widespread criticism that it trivialised protest movements. The company says it missed the mark.", url: "bbc.co.uk/news/world" },
        { type: "post", name: "Pepsi", handle: "@pepsi", av: "brand", initials: "PE", verified: true, text: "Pepsi was trying to project a global message of unity, peace and understanding. Clearly we missed the mark, and we apologise. We did not intend to make light of any serious issue. We are pulling the content and halting any further rollout.", likes: 12200, rts: 8400, platform: "MockTweet" },
        { type: "post", name: "Priya K", handle: "@priyak_uk", av: "public", initials: "PK", text: "24 hours. That's how long it took to go from 'global campaign' to 'we apologise and we're pulling it'. Months to make, one day to delete. The internet remains undefeated. #PepsiAd", likes: 88400, rts: 54200, platform: "MockTweet" },
      ],
    },
    {
      label: "The Apology Misstep — Sorry to Whom?",
      gap: 1700,
      posts: [
        { type: "post", name: "AdWeek", handle: "@AdWeek", av: "journo", initials: "AW", verified: true, text: "Notable: Pepsi's statement says they apologise — and specifically adds that they apologise to Kendall Jenner for putting her in this position. Many are pointing out the apology centres the celebrity, rather than the communities the ad was accused of exploiting. adweek.com", likes: 72400, rts: 48200, platform: "MockTweet" },
        { type: "post", name: "Marcus J", handle: "@marcusj_writes", av: "public", initials: "MJ", text: "Let me get this straight. Pepsi made an ad accused of trivialising protest movements... and the person they formally apologised TO was the millionaire model? Read the room. Then read it again. #PepsiAd", likes: 134000, rts: 92800, platform: "MockTweet" },
        { type: "post", name: "Dr Aisha Bello", handle: "@draishabello", av: "public", initials: "AB", text: "Crisis comms lesson inside the crisis comms lesson: WHO you apologise to matters as much as the apology itself. Centre the people who were actually hurt. Pepsi centred the celebrity, and turned one bad news cycle into two. Textbook own goal. #PepsiAd", likes: 58200, rts: 36400, platform: "MockTweet" },
      ],
    },
    {
      label: "The Aftermath — A Permanent Case Study",
      gap: 1800,
      posts: [
        { type: "post", name: "Chloe W", handle: "@chloew_nyc", av: "public", initials: "CW", text: "Years from now people will have forgotten the campaign slogan, forgotten the song in the ad, forgotten everything — except a model handing a cop a Pepsi. That single image is now permanently welded to the brand. You can't un-ring that bell. #PepsiAd", likes: 74100, rts: 41800, platform: "MockTweet" },
        { type: "post", name: "AdWeek", handle: "@AdWeek", av: "journo", initials: "AW", verified: true, text: "The Pepsi ad is already entering university lecture slides as the definitive example of brand 'wokewashing' gone wrong — borrowing the look of a social cause without understanding or respecting its substance. A cautionary tale that will outlive everyone who signed it off. adweek.com", likes: 46800, rts: 28200, platform: "MockTweet" },
        { type: "post", name: "Dr Aisha Bello", handle: "@draishabello", av: "public", initials: "AB", text: "The real lesson of the Pepsi ad isn't 'don't reference social issues'. It's: if your brand wants to stand for something, it has to actually stand for something — consistently, and at a cost. Slapping activism onto a product as set dressing will always, always backfire. #PepsiAd", likes: 68400, rts: 44100, platform: "MockTweet" },
        { type: "verdict", tone: "fail", label: "The Verdict",
          heading: "You Can't Borrow Authenticity",
          body: "Pepsi's big-budget film had a supermodel resolve a protest by handing a police officer a can — and it was pulled within 24 hours amid near-universal criticism. The core failure: borrowing the imagery of real protest movements (the courage, the danger, a famous photograph) and draining it of meaning to sell a soft drink. You can't manufacture authenticity; audiences smell 'wokewashing' instantly. Two more lessons. First, 'how did this get signed off?' — months of meetings and a big budget are no guarantee against a bad idea if no one in the room can play the sceptic. Second, who you apologise to matters: Pepsi's statement centred the celebrity rather than the communities it was accused of exploiting, turning one bad news cycle into two. If a brand wants to stand for something, it has to actually stand for it — consistently, and at a cost." },
        { type: "impact", title: "The Protest Ad Disaster", stats: [
          { num: "24hrs", label: "From global launch to pulled" },
          { num: "210K+", label: "Posts criticising the ad" },
          { num: "2", label: "News cycles — the ad, then the apology" },
          { num: "∞", label: "Lecture slides it now appears on" },
        ] },
      ],
    },
  ],
  tasks: [
    {
      type: "mcq",
      id: "pk-q1",
      prompt: "What is the central reason the Pepsi ad failed?",
      options: [
        "The model was unpopular",
        "It borrowed the imagery of real protest movements and drained it of meaning to sell a drink — you can't manufacture authenticity",
        "The ad was too short",
        "Pepsi doesn't advertise",
      ],
      correctIndex: 1,
      explanation:
        "Co-opting the look of activism without its substance reads as hollow. Audiences detect borrowed authenticity ('wokewashing') instantly.",
    },
    {
      type: "mcq",
      id: "pk-q2",
      prompt: "What does 'how did this get signed off?' reveal?",
      options: [
        "That budgets guarantee good ideas",
        "That months of meetings and many executives are no protection against a bad idea if nobody is empowered to be the sceptic",
        "That the ad was actually fine",
        "That only one person made it",
      ],
      correctIndex: 1,
      explanation:
        "A long, expensive process can still ship a disaster when groupthink means no one stops to ask whether the core idea is sound.",
    },
    {
      type: "mcq",
      id: "pk-q3",
      prompt: "Why was Pepsi's apology criticised?",
      options: [
        "It was too long",
        "It centred the celebrity (apologising to Kendall Jenner) rather than the communities the ad was accused of exploiting",
        "It admitted no fault at all",
        "It wasn't posted publicly",
      ],
      correctIndex: 1,
      explanation:
        "Who you apologise to matters as much as the apology. Centring the millionaire model over the people hurt turned one bad cycle into two.",
    },
    {
      type: "mcq",
      id: "pk-q4",
      prompt: "What does 'you can't un-ring that bell' refer to here?",
      options: [
        "The jingle in the ad",
        "Pulling the ad didn't erase it — the single image is now permanently associated with the brand",
        "A literal bell in the advert",
        "The stock price",
      ],
      correctIndex: 1,
      explanation:
        "Deleting the content within a day didn't undo the damage; the defining image stuck to the brand as a lasting case study.",
    },
    {
      type: "mcq",
      id: "pk-q5",
      prompt: "What is the constructive takeaway (not 'never mention social issues')?",
      options: [
        "Brands should avoid all causes forever",
        "If a brand wants to stand for something it must do so consistently and at a real cost — not as set dressing",
        "Use bigger celebrities next time",
        "Apologise faster",
      ],
      correctIndex: 1,
      explanation:
        "The lesson isn't silence — it's substance. Treating a cause as decoration backfires; genuine, costly commitment is what earns credibility.",
    },
    {
      type: "mcq",
      id: "pk-q6",
      prompt: "Why was the criticism described as 'not clumsy, but hollow'?",
      options: [
        "Because the ad was technically bad",
        "Because the offence wasn't a mistake of execution but of meaning — using real struggle as a pleasant backdrop to sell soda",
        "Because the colours were wrong",
        "Because it was too political",
      ],
      correctIndex: 1,
      explanation:
        "People weren't angry at a production error; they were angry that something that meant a great deal was reduced to a sales prop.",
    },
    {
      type: "written",
      id: "pk-w1",
      prompt:
        "Explain 'you can't borrow authenticity' using this ad. How can audiences tell the difference?",
      placeholder:
        "What did the ad take, and what did it strip out? Why does that read as hollow?…",
    },
    {
      type: "written",
      id: "pk-w2",
      prompt:
        "'How did this get signed off?' What does this case show about group decision-making, and how could one person have prevented it?",
      placeholder:
        "Think about groupthink, the role of a sceptic, and who should ask 'is the core idea sound?'…",
    },
    {
      type: "written",
      id: "pk-w3",
      prompt:
        "Why does 'who you apologise to' matter? Rewrite Pepsi's apology so it centres the right people.",
      placeholder:
        "Who was hurt? Who did Pepsi centre? What would a better apology say?…",
    },
    {
      type: "written",
      id: "pk-w4",
      prompt:
        "The lesson isn't 'never mention social issues'. Explain what brands should do instead if they want to engage with a cause.",
      placeholder:
        "What does standing for something 'at a cost' look like vs set dressing?…",
    },
  ],
};
