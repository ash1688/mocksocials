// Authored Scenario — #McDStories hashtag hijack (2012). Ported from the HTML
// POC. Authored, never simulated (ADR-0006).
import type { Scenario } from "./red-bull";

export const MCDSTORIES_SCENARIO: Scenario = {
  id: "mcdstories",
  badge: "Scenario",
  title: "#McDStories — How McDonald's Broke the Internet (2012)",
  prePosts: [
    { type: "post", name: "McDonald's", handle: "@McDonalds", av: "brand", initials: "MC", verified: true, text: "Start your morning right. ☀️ Nothing beats a hot McMuffin and a coffee. What's your go-to breakfast order? Let us know below!", likes: 2840, rts: 620, platform: "MockTweet" },
    { type: "post", name: "KFC UK", handle: "@KFC_UKI", av: "brand", initials: "KF", verified: true, text: "Monday? More like FRYday if you're having our boneless bucket. 🍗 Who's treating themselves today?", likes: 3100, rts: 880, platform: "MockTweet" },
    { type: "post", name: "Greggs", handle: "@GreggsOfficial", av: "brand", initials: "GG", verified: true, text: "Sausage roll Tuesday. That is all. 🥖", likes: 5600, rts: 2200, platform: "MockTweet" },
  ],
  sections: [
    {
      label: "The Campaign Launches — #McDStories",
      gap: 1800,
      posts: [
        { type: "post", name: "McDonald's", handle: "@McDonalds", av: "brand", initials: "MC", verified: true, text: "We love hearing your #McDStories! Share a happy memory from McDonald's — whether it's a first date, a family road trip or just your favourite meal. We want to hear from you! 🍟❤️", likes: 1240, rts: 380, platform: "MockTweet" },
        { type: "post", name: "Sarah M", handle: "@sarahm_uk", av: "public", initials: "SM", text: "#McDStories My grandad used to take me every Saturday after football as a kid. Always a Big Mac and a chocolate milkshake. Miss him loads. 💛", likes: 892, rts: 210, platform: "MockTweet" },
        { type: "post", name: "Liz B", handle: "@lizb_northampton", av: "public", initials: "LB", text: "#McDStories Proposed to my wife in a McDonald's car park at midnight after prom. She said yes. We've been married 14 years. Romance is not dead.", likes: 3100, rts: 820, platform: "MockTweet" },
        { type: "post", name: "Mum of Four", handle: "@mumoffour_uk", av: "public", initials: "MF", text: "#McDStories Four kids, long motorway, everyone screaming. Pulled into services. McDonald's. Ten minutes of silence. Absolute scenes. 10/10.", likes: 4200, rts: 1100, platform: "MockTweet" },
        { type: "post", name: "KFC UK", handle: "@KFC_UKI", av: "brand", initials: "KF", verified: true, text: "Oh how lovely. McDonald's are asking customers to share their stories with a hashtag. What a wholesome idea. We might try this ourselves. Nothing could possibly go wrong with that. 🍗 #McDStories", likes: 3200, rts: 1800, platform: "MockTweet" },
      ],
    },
    {
      label: "The Hijack Begins — First Horror Stories",
      gap: 1600,
      posts: [
        { type: "post", name: "DaveNotHappy", handle: "@davenotgr8", av: "public", initials: "DN", text: "#McDStories Found a fingernail in my McChicken Sandwich in 2009. Still think about it.", likes: 4100, rts: 2800, platform: "MockTweet" },
        { type: "post", name: "ExMcDsWorker", handle: "@formerfryboy", av: "public", initials: "EX", text: "#McDStories Worked there for three years. The fryers hadn't been properly cleaned since 2007. Saw things I cannot unsee. You're welcome.", likes: 6700, rts: 4200, platform: "MockTweet" },
        { type: "post", name: "Phil N", handle: "@philnorth_uk", av: "public", initials: "PN", text: "#McDStories Last time I walked into a McDonald's I could smell the diabetes from the car park. True story.", likes: 41200, rts: 28400, platform: "MockTweet" },
        { type: "post", name: "Anon Employee", handle: "@mcdssurvivor", av: "public", initials: "AE", text: "#McDStories The beef patties arrive frozen in a grey slime. They turn brown when cooked which is what everyone thinks is the meat colour. It is not. Good luck with your lunch.", likes: 18900, rts: 13100, platform: "MockTweet" },
        { type: "post", name: "Burger King UK", handle: "@BurgerKingUK", av: "brand", initials: "BK", verified: true, text: "Genuinely considering starting our own hashtag campaign after seeing how well #McDStories is going for McDonald's. Asking customers to share their thoughts publicly. Seems like a great idea with absolutely no downside. Brb planning it now. 🍔", likes: 8400, rts: 5600, platform: "MockTweet" },
      ],
    },
    {
      label: "It Snowballs — The Hashtag is a Disaster Zone",
      gap: 1400,
      posts: [
        { type: "trend", label: "Trending in United Kingdom", hashtag: "#McDStories", volume: "72K posts", context: "McDonald's promoted hashtag campaign hijacked by horror stories, complaints and animal welfare concerns" },
        { type: "post", name: "AnimalRightsNow", handle: "@animalrightsnow", av: "public", initials: "AR", text: "#McDStories Since you're asking — 900 million animals are slaughtered annually to supply McDonald's. Happy to share that story any time you like.", likes: 14200, rts: 9800, platform: "MockTweet" },
        { type: "post", name: "McStrike", handle: "@mcstrike", av: "public", initials: "MS", text: "#McDStories The story of a McDonald's worker earning minimum wage while the CEO earned $9.5 million last year. That's the story. That's it. That's the whole story.", likes: 31400, rts: 21000, platform: "MockTweet" },
        { type: "post", name: "Karen L", handle: "@karen_l_writes", av: "public", initials: "KL", text: "#McDStories My McFlurry machine has been broken every single time I've visited for three consecutive years. This is not a story. This is a tragedy.", likes: 44800, rts: 29200, platform: "MockTweet" },
        { type: "post", name: "Disappointed Dad", handle: "@dadof3_uk", av: "public", initials: "DD", text: "#McDStories Took my kids through the drive-through. Sat in the queue for 40 minutes. Got home. Wrong order. Went back. Queue was still moving. I am 43 years old and I cried in a McDonald's car park.", likes: 67200, rts: 44100, platform: "MockTweet" },
        { type: "post", name: "NutritionFacts", handle: "@nutritionfacts_uk", av: "public", initials: "NF", text: "#McDStories A large Coca-Cola from McDonald's contains 86g of sugar. The NHS recommends 30g per day for an adult. Just leaving this here.", likes: 28400, rts: 19600, platform: "MockTweet" },
        { type: "post", name: "Steve H", handle: "@steveh_notts", av: "public", initials: "SH", text: "#McDStories The gherkin in a Big Mac has never, not once in 30 years of eating them, been in the correct position. It's always hanging off the side like it's trying to escape. I respect it.", likes: 88100, rts: 61400, platform: "MockTweet" },
        { type: "post", name: "Barry from Slough", handle: "@barryfromslough", av: "public", initials: "BS", text: "#McDStories Asked for no onions. Got extra onions. Complained. Got told the machine adds them automatically. Asked why they asked me then. Got a shrug.", likes: 71200, rts: 49800, platform: "MockTweet" },
        { type: "post", name: "Wendy's", handle: "@Wendys", av: "brand", initials: "WD", verified: true, text: "We were JUST about to launch our own customer hashtag campaign. Just reading through #McDStories for inspiration first. Taking notes. Many notes. Actually we're going to leave that one for now. Our bad.", likes: 19600, rts: 13400, platform: "MockTweet" },
      ],
    },
    {
      label: "The Media Piles In — Journalists Notice",
      gap: 1800,
      posts: [
        { type: "news", outlet: "The Guardian", outletColor: "#0a6b3d", headline: "#McDStories: McDonald's hashtag campaign hijacked by customer horror stories", sub: "A promotional Twitter campaign by McDonald's has backfired spectacularly after users hijacked the hashtag to share negative experiences, food safety concerns and worker exploitation stories.", url: "theguardian.com/media" },
        { type: "post", name: "Warren Buffett", handle: "@WarrenBuffett", av: "official", initials: "WB", verified: true, text: "I have seen some commentary regarding #McDStories. I am not concerned. I have not sold any of my shares in Maccies. I will not be selling any of my shares in Maccies. I had a Quarter Pounder for lunch. It was fine.", likes: 142000, rts: 88400, platform: "MockTweet" },
        { type: "post", name: "Greggs", handle: "@GreggsOfficial", av: "brand", initials: "GG", verified: true, text: "We had a hashtag campaign scheduled for next week. We have just cancelled it. We wish McDonald's all the best with #McDStories. We'll be watching from a safe distance with a sausage roll.", likes: 38400, rts: 24100, platform: "MockTweet" },
      ],
    },
    {
      label: "McDonald's Pulls the Campaign — After Just Two Hours",
      gap: 2000,
      posts: [
        { type: "news", outlet: "Sky News", outletColor: "#1d9bf0", headline: "McDonald's pulls #McDStories promoted tweet after two hours as campaign backfires", sub: "McDonald's has removed its promoted tweet after just two hours following a wave of negative responses. The hashtag continues to trend despite the campaign being pulled.", url: "news.sky.com/story" },
        { type: "post", name: "Rob T", handle: "@robt_lol", av: "public", initials: "RT", text: "McDonald's deleted the #McDStories promoted tweet. In case anyone's wondering, deleting the tweet has made approximately zero difference to the rate at which it's trending. Turns out the internet has a memory.", likes: 54200, rts: 38100, platform: "MockTweet" },
        { type: "post", name: "Digital Marketing Today", handle: "@DMTodayUK", av: "journo", initials: "DM", text: "The #McDStories situation is a perfect live example of the Streisand Effect — the act of trying to suppress something only draws more attention to it. McDonald's removal of the tweet has been covered by every major outlet. The campaign is now immortal.", likes: 29800, rts: 18600, platform: "MockTweet" },
        { type: "post", name: "Subway UK", handle: "@SubwayUK", av: "brand", initials: "SU", verified: true, text: "Just a heads up to any fast food brands thinking of launching a customer hashtag campaign — deleting the tweet after two hours when it goes wrong does not, in fact, make it go away. Asking for a friend. #McDStories", likes: 44100, rts: 31200, platform: "MockTweet" },
      ],
    },
    {
      label: "The Aftermath — The Hashtag Lives On",
      gap: 1800,
      posts: [
        { type: "trend", label: "Still Trending — Day 3", hashtag: "#McDStories", volume: "180K posts", context: "Three days after McDonald's pulled the campaign, the hashtag is still growing as media coverage drives new participants" },
        { type: "post", name: "McDonald's", handle: "@McDonalds", av: "brand", initials: "MC", verified: true, text: "With all social media campaigns of this type, we always expect that some people may use them to voice concerns. We value all feedback from our customers and we take it seriously. We will continue to listen.", likes: 980, rts: 440, platform: "MockTweet" },
        { type: "post", name: "Social Media Graveyard", handle: "@SMGraveyard", av: "public", initials: "SG", text: "McDonald's statement on #McDStories: 'we always expect some people may voice concerns.' They expected this? They EXPECTED this? The promoted tweet ran for two hours before they panicked and deleted it. They did not expect this.", likes: 62400, rts: 41800, platform: "MockTweet" },
        { type: "post", name: "James L", handle: "@jamesl_media", av: "public", initials: "JL", text: "#McDStories is now being taught in marketing courses as a textbook example of hashtag hijacking. In trying to build brand warmth, McDonald's accidentally built a permanent public archive of their worst customer experiences. The internet never forgets.", likes: 48200, rts: 31600, platform: "MockTweet" },
        { type: "post", name: "Burger King UK", handle: "@BurgerKingUK", av: "brand", initials: "BK", verified: true, text: "We would like to offer our sincerest condolences to McDonald's following the events of this week. #McDStories has been a genuinely moving experience for all of us. Mostly we've been moved to laughter but still. Thoughts and prayers. 🍔", likes: 88400, rts: 62100, platform: "MockTweet" },
        { type: "verdict", tone: "fail", label: "The Verdict",
          heading: "Don't Hand the Public an Open Mic You Can't Control",
          body: "McDonald's asked customers to share warm #McDStories — and the open hashtag was instantly hijacked into a public archive of complaints, food-safety claims, worker-pay anger and animal-welfare jabs. They pulled the promoted tweet within two hours, but the hashtag kept trending for days: deleting it changed nothing (the internet has a memory), and the attempt to suppress it only drew more coverage — the Streisand Effect. The lessons: an open-ended hashtag is an open mic, and a brand with critics is handing them the stage; you can't control a conversation you invite; deleting doesn't undo it; and the limp 'we always expect some concerns' non-statement fooled no one. It's now a textbook case in hashtag hijacking." },
        { type: "impact", title: "#McDStories — How to Break the Internet", stats: [
          { num: "2hrs", label: "Before McDonald's pulled the promoted tweet" },
          { num: "180K+", label: "#McDStories posts in 3 days" },
          { num: "0", label: "Positive outcomes for McDonald's" },
          { num: "∞", label: "Marketing case studies written about it" },
        ] },
      ],
    },
  ],
  tasks: [
    {
      type: "mcq",
      id: "md-q1",
      prompt: "Why did the #McDStories campaign backfire?",
      options: [
        "The hashtag was misspelled",
        "An open-ended hashtag is an open mic — a brand with critics invited them onto the stage and lost control of the conversation",
        "Nobody used it",
        "McDonald's didn't promote it enough",
      ],
      correctIndex: 1,
      explanation:
        "Inviting the public to fill a hashtag means you can't control what they fill it with. A brand with detractors hands them a megaphone.",
    },
    {
      type: "mcq",
      id: "md-q2",
      prompt: "What happened when McDonald's deleted the promoted tweet after two hours?",
      options: [
        "The hashtag instantly disappeared",
        "Nothing slowed — it kept trending for days, and the deletion itself drew more coverage (the Streisand Effect)",
        "Twitter banned the hashtag",
        "Everyone forgot about it",
      ],
      correctIndex: 1,
      explanation:
        "You can't delete a conversation other people are having. Removing the tweet didn't stop the hashtag and the attempt to suppress it became its own story.",
    },
    {
      type: "mcq",
      id: "md-q3",
      prompt: "What is the 'Streisand Effect' as it appears here?",
      options: [
        "Promoting something makes it popular",
        "Trying to suppress or remove something draws more attention to it than leaving it alone would",
        "Deleting posts always works",
        "Hashtags can't trend",
      ],
      correctIndex: 1,
      explanation:
        "Pulling the tweet signalled panic and got covered everywhere, amplifying the very thing McDonald's wanted to bury.",
    },
    {
      type: "mcq",
      id: "md-q4",
      prompt: "Why is 'the internet never forgets' relevant to this case?",
      options: [
        "Because McDonald's apologised in full",
        "Because the campaign created a permanent, searchable public archive of the brand's worst customer experiences",
        "Because nobody screenshotted anything",
        "Because the hashtag was private",
      ],
      correctIndex: 1,
      explanation:
        "In trying to build warmth, the brand accidentally built a lasting record of complaints that outlived the deletion.",
    },
    {
      type: "mcq",
      id: "md-q5",
      prompt: "What was wrong with the 'we always expect some people may voice concerns' statement?",
      options: [
        "Nothing — it was a strong apology",
        "It rang false: pulling the tweet in panic after two hours showed they clearly did NOT expect this, so the line read as spin",
        "It admitted too much fault",
        "It was too emotional",
      ],
      correctIndex: 1,
      explanation:
        "A non-statement that contradicts your visible behaviour (a panicked deletion) fools no one and can make things worse.",
    },
    {
      type: "mcq",
      id: "md-q6",
      prompt: "What should a brand consider before launching an open 'share your story' hashtag?",
      options: [
        "Nothing — just post it",
        "Whether the brand has detractors, what critics might say, and that an invited conversation can't be controlled or recalled",
        "Only the colour of the logo",
        "How to delete it quickly later",
      ],
      correctIndex: 1,
      explanation:
        "The rival brands' restraint is the tell: anyone who'd thought it through could see the risk. You must anticipate how the open mic could be used against you.",
    },
    {
      type: "written",
      id: "md-w1",
      prompt:
        "Explain why an open-ended hashtag is an 'open mic', using #McDStories. When is that risky and when might it be safe?",
      placeholder:
        "Who gets to speak? What determines whether they're kind or hostile?…",
    },
    {
      type: "written",
      id: "md-w2",
      prompt:
        "Deleting the tweet didn't help. Explain the Streisand Effect and 'the internet never forgets' using this case.",
      placeholder:
        "What did the deletion achieve? What lived on afterwards?…",
    },
    {
      type: "written",
      id: "md-w3",
      prompt:
        "Why did McDonald's 'we always expect some concerns' statement fail? Write a more honest response they could have given.",
      placeholder:
        "What did their behaviour show vs what the statement claimed?…",
    },
    {
      type: "written",
      id: "md-w4",
      prompt:
        "You're asked to run a customer hashtag campaign for a big, sometimes-criticised brand. What would you check first, and would you advise going ahead?",
      placeholder:
        "Think about critics, control, anticipation, and safer alternatives…",
    },
  ],
};
