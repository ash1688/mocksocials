// Authored Scenario — Snickers UK 'Hungry' teaser tweets (2018). Ported from the
// HTML POC. Authored, never simulated (ADR-0006). The "celebrities" are invented
// parodies. Core teaching point: undisclosed paid ads + the #ad rule.
import type { Scenario } from "./red-bull";

export const SNICKERS_SCENARIO: Scenario = {
  id: "snickers-hangry",
  badge: "Scenario",
  title: "Snickers UK — The 'Hungry' Teaser Tweets (2018)",
  prePosts: [
    { type: "post", name: "Reanu Keeves", handle: "@ReanuKeeves", av: "creator", initials: "RK", verified: true, text: "Great day on set today. Grateful for this job and this crew. More soon. 🎬", likes: 3200, rts: 540, platform: "MockTweet" },
    { type: "post", name: "Celeb Tweets", handle: "@CelebTweets", av: "public", initials: "CT", text: "slow news day in celebville. everyone being suspiciously normal and well-behaved today. boring tbh", likes: 860, rts: 190, platform: "MockTweet" },
  ],
  sections: [
    {
      label: "The Out-of-Character Tweets Begin",
      gap: 1600,
      posts: [
        { type: "post", name: "Reanu Keeves", handle: "@ReanuKeeves", av: "creator", initials: "RK", verified: true, text: "Honestly thinking about quitting acting and going into commercial dairy farming. The cows understand me. The cows have never let me down. 🐄", likes: 4200, rts: 1800, platform: "MockTweet" },
        { type: "post", name: "Confused Fan", handle: "@daveyboy_92", av: "public", initials: "DB", text: "errr is Reanu Keeves okay?? cows? dairy farming?? this is not the content I follow him for. someone check on him", likes: 8600, rts: 2400, platform: "MockTweet" },
        { type: "post", name: "Susan Smashmouth", handle: "@SusanSmashmouth", av: "creator", initials: "SS", verified: true, text: "Controversial take but I actually think pineapple belongs on EVERYTHING. Pizza. Toast. Steak. A nice lasagne. Fight me. I've never been more serious about anything in my life.", likes: 6100, rts: 3200, platform: "MockTweet" },
        { type: "post", name: "Howard Todds", handle: "@HowardTodds", av: "creator", initials: "HT", verified: true, text: "One of my favourite hobbies is standing on the side of the road and shouting at cars as they go past. You should try it. The Vauxhall drivers shout back. The BMW drivers never do. Tells you everything.", likes: 12800, rts: 7400, platform: "MockTweet" },
        { type: "post", name: "Foodie Watch", handle: "@foodiewatch", av: "public", initials: "FW", text: "pineapple on STEAK?? Susan Smashmouth has lost the plot. and Howard's out here SHOUTING AT TRAFFIC. unfollowing both. what is in the water today", likes: 11200, rts: 4800, platform: "MockTweet" },
        { type: "post", name: "Jay Shagsby", handle: "@JayShagsby", av: "creator", initials: "JS", verified: true, text: "I've taken it upon myself to give everyone in my local Tesco a nickname. The man at the deli counter is 'Big Cheese Barry.' The lady on the tills is 'Sandra Two-Bags.' They don't know. They will never know. But I know. And that's enough.", likes: 15400, rts: 9100, platform: "MockTweet" },
      ],
    },
    {
      label: "They Pile Up & Spread — As If Real",
      gap: 1400,
      posts: [
        { type: "post", name: "Elon Husk", handle: "@ElonHusk", av: "creator", initials: "EH", verified: true, text: "I have decided to rename all my companies after types of soup. Rocket division is now 'Minestrone Holdings.' This is final. The board has not been consulted.", likes: 18600, rts: 11200, platform: "MockTweet" },
        { type: "post", name: "Susan Smashmouth", handle: "@SusanSmashmouth", av: "creator", initials: "SS", verified: true, text: "Update: I have eaten the pineapple steak. It was a mistake. But I refuse to admit it publicly, so I am doubling down and ordering another. This is who I am now.", likes: 13400, rts: 7100, platform: "MockTweet" },
        { type: "post", name: "Screenshot Central", handle: "@ScreenshotHub", av: "public", initials: "SC", text: "okay something is going on. Reanu, Susan, Howard, Elon AND Justin all posting completely unhinged stuff today? screenshots everywhere. has everyone famous lost it at once?? 📸", likes: 24100, rts: 14800, platform: "MockTweet" },
        { type: "post", name: "Reanu Keeves", handle: "@ReanuKeeves", av: "creator", initials: "RK", verified: true, text: "Followed Howard's advice and shouted at a passing Vauxhall this morning. The driver shouted back something lovely. We are getting married in the spring. The cows will be my best men.", likes: 22600, rts: 13400, platform: "MockTweet" },
        { type: "post", name: "Jay Shagsby", handle: "@JayShagsby", av: "creator", initials: "JS", verified: true, text: "Update on the Tesco nicknames: 'Big Cheese Barry' has been promoted. He is now 'Lord Cheese Barrington.' Sandra Two-Bags remains Sandra Two-Bags. She has not earned an upgrade. She knows what she did. (She doesn't.)", likes: 19200, rts: 12400, platform: "MockTweet" },
        { type: "post", name: "Worried Mum", handle: "@traceyk_hereford", av: "public", initials: "TK", text: "I don't even follow these people but they're all over my timeline acting strange and now I'm genuinely worried about them. Is this a hack? Is everyone alright? Someone explain what is happening 😟", likes: 16800, rts: 6200, platform: "MockTweet" },
      ],
    },
    {
      label: "The Reveal — It Was an Ad All Along",
      gap: 1500,
      posts: [
        { type: "post", name: "Reanu Keeves", handle: "@ReanuKeeves", av: "creator", initials: "RK", verified: true, text: "You're not you when you're hungry. Sorry about the cows. 🍫 @SnickersUK", likes: 142000, rts: 68400, platform: "MockTweet" },
        { type: "post", name: "Howard Todds", handle: "@HowardTodds", av: "creator", initials: "HT", verified: true, text: "Had a Snickers. Stepped away from the road. Apologised to the Vauxhall. Coughed up the watch. I am myself again. You're not you when you're hungry. 🍫 @SnickersUK", likes: 84200, rts: 36800, platform: "MockTweet" },
        { type: "post", name: "Jay Shagsby", handle: "@JayShagsby", av: "creator", initials: "JS", verified: true, text: "Snickers sorted me right out. For the record, the man at the deli is called Steve. Just Steve. I'm so sorry, Steve. You were never Lord Cheese Barrington. You're not you when you're hungry. 🍫 @SnickersUK", likes: 78600, rts: 33200, platform: "MockTweet" },
        { type: "post", name: "Snickers UK", handle: "@SnickersUK", av: "brand", initials: "SN", verified: true, text: "You're not you when you're hungry. 🍫 A little something from us to a few hungry friends today. Grab a Snickers. #YoureNotYouWhenYoureHungry", likes: 86400, rts: 38600, platform: "MockTweet" },
      ],
    },
    {
      label: "The Penny Drops — Clever, or Strung Along?",
      gap: 1500,
      posts: [
        { type: "post", name: "Screenshot Central", handle: "@ScreenshotHub", av: "public", initials: "SC", text: "OH. It was a Snickers ad. All of it. Coordinated. They all played 'hungry' versions of themselves then revealed it. Okay that's... actually pretty clever, I'll admit it. Got the whole country talking. 👏", likes: 32400, rts: 12100, platform: "MockTweet" },
        { type: "post", name: "Foodie Watch", handle: "@foodiewatch", av: "public", initials: "FW", text: "hang on though. none of those first tweets said they were ads. I genuinely thought Susan had lost it. we were all reacting like it was real because there was NOTHING telling us it was paid. that's the bit that bugs me.", likes: 28600, rts: 14400, platform: "MockTweet" },
        { type: "post", name: "Marketing Lens", handle: "@MarketingLens", av: "journo", initials: "ML", text: "Smart campaign mechanically: build mystery with out-of-character posts, then pay it off with the reveal and the slogan. The catch — the teaser tweets carried no ad disclosure. People genuinely believed they were real. That's where this gets tricky.", likes: 21200, rts: 9800, platform: "MockTweet" },
        { type: "post", name: "Worried Mum", handle: "@traceyk_hereford", av: "public", initials: "TK", text: "so I spent my morning genuinely worried about people I don't even follow... because of a chocolate advert that didn't tell me it was an advert. I feel a bit daft but also — should they not have to SAY it's an ad?", likes: 26200, rts: 8400, platform: "MockTweet" },
      ],
    },
    {
      label: "The ASA Steps In — Was It a Disclosed Ad?",
      gap: 1700,
      posts: [
        { type: "news", outlet: "ASA", outletColor: "#005eb8", headline: "Advertising Watchdog Examines Snickers 'Hungry' Teaser Tweets", sub: "The Advertising Standards Authority is considering whether a series of paid promotional tweets — posted by personalities before a campaign reveal — were sufficiently identifiable as advertising. UK rules require that paid-for ads be obviously recognisable as ads to the people who see them.", url: "asa.org.uk/news" },
        { type: "post", name: "Marketing Lens", handle: "@MarketingLens", av: "journo", initials: "ML", text: "The core rule is simple: if a brand pays someone to post, the audience must be able to tell it's an ad — at the time they see it. A reveal at the end doesn't help the thousands who saw and shared the earlier tweets believing they were genuine.", likes: 22400, rts: 11600, platform: "MockTweet" },
        { type: "post", name: "Dan H", handle: "@danh_ldn", av: "public", initials: "DH", text: "This is exactly why #ad and 'paid partnership' labels exist now. You're allowed to do a clever teaser. You're NOT allowed to make people think a paid promo is someone's genuine, unpaid opinion. The label protects the audience.", likes: 31200, rts: 16800, platform: "MockTweet" },
        { type: "post", name: "Marketing Lens", handle: "@MarketingLens", av: "journo", initials: "ML", text: "The lesson for brands: build all the mystery you like — but a paid post has to be flagged as paid. 'It was a joke' or 'we revealed it at the end' doesn't undo the period where people couldn't tell ad from reality.", likes: 18600, rts: 8200, platform: "MockTweet" },
      ],
    },
    {
      label: "The Lesson — You Couldn't Tell Ad From Reality",
      gap: 1800,
      posts: [
        { type: "post", name: "Marketing Lens", handle: "@MarketingLens", av: "journo", initials: "ML", text: "Two things were true at once: it was a genuinely creative campaign, AND the unlabelled teaser tweets are exactly the kind of thing disclosure rules are designed to prevent. Both lessons matter for anyone studying media.", likes: 24100, rts: 12400, platform: "MockTweet" },
        { type: "post", name: "Dan H", handle: "@danh_ldn", av: "public", initials: "DH", text: "The digital-literacy takeaway: a screenshot travels faster than its context. Those 'unhinged' tweets spread as real long before the reveal caught up. By the time people learned it was an ad, the false impression had already done the rounds.", likes: 28400, rts: 15200, platform: "MockTweet" },
        { type: "post", name: "Foodie Watch", handle: "@foodiewatch", av: "public", initials: "FW", text: "Genuinely useful reminder: before you panic-share a wild tweet from a famous person, ask — is this real? Is it out of character? Could it be a joke, a hack, or an ad? Ten seconds of doubt saves you from being the one who fell for it. 🧠", likes: 21200, rts: 9800, platform: "MockTweet" },
        { type: "post", name: "Snickers UK", handle: "@SnickersUK", av: "brand", initials: "SN", verified: true, text: "Thanks for playing along, everyone. Lesson learned on the labels. Still — you're not you when you're hungry. 🍫", likes: 42600, rts: 14200, platform: "MockTweet" },
        { type: "verdict", tone: "cautionary", label: "The Verdict",
          heading: "Clever — but You Couldn't Tell Ad From Reality",
          body: "Snickers had famous personalities post wildly out-of-character tweets, let the country worry and screenshot them as real, then revealed the punchline: 'you're not you when you're hungry.' Mechanically it was a clever teaser-and-reveal — but the teaser tweets carried no ad disclosure, so for hours people genuinely couldn't tell paid promotion from a real meltdown (or a hack). That's exactly what UK rules and the #ad / 'paid partnership' label exist to prevent: a paid post must be identifiable as advertising at the moment someone sees it — a reveal at the end doesn't help the thousands who already shared it as genuine. Two truths at once: creative campaign, and a disclosure failure. And a digital-literacy reminder for everyone: a screenshot travels faster than its context, so pause before sharing — is it real, out of character, a joke, a hack, or an ad?" },
        { type: "impact", title: "The 'Hungry' Teaser Tweets", stats: [
          { num: "6+", label: "'Hungry' teaser tweets before any reveal" },
          { num: "0", label: "That were labelled as ads at the time" },
          { num: "Hours", label: "Screenshots spread as 'real' before the punchline" },
          { num: "#ad", label: "The two characters that would have fixed it all" },
        ] },
      ],
    },
  ],
  tasks: [
    {
      type: "mcq",
      id: "sn-q1",
      prompt: "What was the disclosure problem with the campaign?",
      options: [
        "Snickers never revealed it was an ad",
        "The teaser tweets carried no ad label, so people couldn't tell paid promotion from genuine posts at the time they saw them",
        "The reveal was too early",
        "The slogan was wrong",
      ],
      correctIndex: 1,
      explanation:
        "UK rules require a paid ad to be identifiable as an ad when seen. The unlabelled teasers were taken as real for hours before the reveal.",
    },
    {
      type: "mcq",
      id: "sn-q2",
      prompt: "Why doesn't 'we revealed it at the end' fix the issue?",
      options: [
        "It does fix it completely",
        "It doesn't help the thousands who saw and shared the earlier tweets believing they were genuine",
        "Reveals are illegal",
        "Because the reveal was also unlabelled",
      ],
      correctIndex: 1,
      explanation:
        "Disclosure has to be present when the audience encounters the post. A late reveal can't retroactively inform everyone who already acted on the false impression.",
    },
    {
      type: "mcq",
      id: "sn-q3",
      prompt: "What do #ad / 'paid partnership' labels exist to protect?",
      options: [
        "The brand's profits",
        "The audience — so people can tell a paid promotion from someone's genuine, unpaid opinion",
        "The celebrity's image",
        "The platform's revenue",
      ],
      correctIndex: 1,
      explanation:
        "The label is for the viewer's benefit: it prevents paid promotion being mistaken for authentic endorsement.",
    },
    {
      type: "mcq",
      id: "sn-q4",
      prompt: "Are 'clever campaign' and 'rule-breaking' mutually exclusive here?",
      options: [
        "Yes — if it's clever it must be fine",
        "No — both are true at once: it was genuinely creative AND a disclosure failure",
        "Yes — if it broke rules it can't be clever",
        "Neither is true",
      ],
      correctIndex: 1,
      explanation:
        "Creativity doesn't excuse a disclosure problem. Holding both judgements is the mature reading.",
    },
    {
      type: "mcq",
      id: "sn-q5",
      prompt: "What's the digital-literacy lesson for viewers?",
      options: [
        "Always believe verified accounts",
        "A screenshot travels faster than its context — pause and ask if a wild post is real, out of character, a joke, a hack, or an ad before sharing",
        "Never read tweets",
        "Share first, check later",
      ],
      correctIndex: 1,
      explanation:
        "The false impression spread before the reveal caught up. A few seconds of doubt stops you amplifying something you've misread.",
    },
    {
      type: "mcq",
      id: "sn-q6",
      prompt: "What's the rule for brands wanting to run a 'mystery' teaser?",
      options: [
        "Mystery is banned",
        "Build all the mystery you like, but any paid post must still be flagged as paid",
        "Only reveal at the end",
        "Disclosure is optional for teasers",
      ],
      correctIndex: 1,
      explanation:
        "Creativity and disclosure aren't in conflict: you can be intriguing and still label paid content so the audience isn't deceived.",
    },
    {
      type: "written",
      id: "sn-w1",
      prompt:
        "Explain why a paid post must be identifiable as an ad 'at the time you see it', using this campaign.",
      placeholder:
        "What happened before the reveal? Who couldn't tell, and what did they do?…",
    },
    {
      type: "written",
      id: "sn-w2",
      prompt:
        "'Clever AND rule-breaking.' Explain how both can be true, and why creativity doesn't excuse the disclosure problem.",
      placeholder:
        "What was clever? What rule was at stake? Why doesn't one cancel the other?…",
    },
    {
      type: "written",
      id: "sn-w3",
      prompt:
        "'A screenshot travels faster than its context.' Explain this idea using the teaser tweets.",
      placeholder:
        "When did the false impression spread vs when did the reveal arrive?…",
    },
    {
      type: "written",
      id: "sn-w4",
      prompt:
        "You're briefed to run a mystery teaser campaign with paid influencers. How would you keep it both intriguing AND compliant?",
      placeholder:
        "Where do labels go? How do you build suspense without deceiving people?…",
    },
  ],
};
