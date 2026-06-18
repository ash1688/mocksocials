// Authored Scenario — Aldi vs M&S, #FreeCuthbert the Caterpillar (2021). Ported
// from the HTML POC. Authored, never simulated (ADR-0006).
import type { Scenario } from "./red-bull";

export const FREECUTHBERT_SCENARIO: Scenario = {
  id: "free-cuthbert",
  badge: "Scenario",
  title: "Aldi vs M&S — The Battle for Cuthbert the Caterpillar (2021)",
  prePosts: [
    { type: "post", name: "M&S", handle: "@marksandspencer", av: "brand", initials: "MS", verified: true, text: "There's no celebration quite like a Colin the Caterpillar celebration. 🐛 Loved by the nation since 1990. What's your favourite Colin memory?", likes: 4200, rts: 880, platform: "MockTweet" },
    { type: "post", name: "Aldi UK", handle: "@AldiUK", av: "brand", initials: "AL", verified: true, text: "Like brands. Just cheaper. 😉 Everything you love, a fraction of the price. That's the Aldi way.", likes: 8600, rts: 2400, platform: "MockTweet" },
    { type: "post", name: "Cake Lover", handle: "@cakelover_uk", av: "public", initials: "CL", text: "controversial opinion but the supermarket caterpillar cakes are all basically the same and I will not be taking questions at this time 🐛", likes: 1200, rts: 340, platform: "MockTweet" },
  ],
  sections: [
    {
      label: "M&S Sends in the Lawyers",
      gap: 1800,
      posts: [
        { type: "news", outlet: "BBC News", outletColor: "#e83030", headline: "M&S takes legal action against Aldi over Colin the Caterpillar cake", sub: "Marks & Spencer has lodged an intellectual property claim against Aldi, arguing that Aldi's Cuthbert the Caterpillar cake infringes the trademark of its long-standing Colin the Caterpillar. M&S wants Cuthbert removed from sale.", url: "bbc.co.uk/news/business" },
        { type: "post", name: "M&S", handle: "@marksandspencer", av: "brand", initials: "MS", verified: true, text: "Colin the Caterpillar has been loved by our customers since 1990. We take protecting the products we've invested in and developed very seriously, and we believe doing so is the right thing for our customers and our brand.", likes: 2100, rts: 1800, platform: "MockTweet" },
        { type: "post", name: "Retail Gazette", handle: "@RetailGazette", av: "journo", initials: "RG", text: "M&S has filed an intellectual property claim against Aldi in the High Court, demanding the discount retailer's Cuthbert the Caterpillar be pulled from shelves. The cake wars have officially gone legal. retailgazette.co.uk", likes: 3400, rts: 1900, platform: "MockTweet" },
      ],
    },
    {
      label: "Aldi Responds — #FreeCuthbert is Born",
      gap: 1700,
      posts: [
        { type: "post", name: "Aldi UK", handle: "@AldiUK", av: "brand", initials: "AL", verified: true, text: "This is not just any court case. This is... #FreeCuthbert 🐛", likes: 248000, rts: 142000, platform: "MockTweet" },
        { type: "post", name: "Aldi UK", handle: "@AldiUK", av: "brand", initials: "AL", verified: true, text: "Hey @marksandspencer we're taking a stand against caterpillar cruelty. Can Cuthbert and Colin be besties? We're bringing Cuthbert back and finding a way to raise money for charity. We're really raisin the steaks. 🐛❤️ #FreeCuthbert", likes: 196000, rts: 98400, platform: "MockTweet" },
        { type: "post", name: "Jess B", handle: "@jessb_leeds", av: "public", initials: "JB", text: "absolutely SCREAMING at Aldi's social media team today. M&S sends in the lawyers and Aldi just replies with caterpillar puns and #FreeCuthbert. whoever runs that account deserves a raise immediately 😂😂", likes: 84200, rts: 38600, platform: "MockTweet" },
      ],
    },
    {
      label: "The Public Picks a Side — Team Cuthbert",
      gap: 1500,
      posts: [
        { type: "post", name: "Danny R", handle: "@dannyr_uk", av: "public", initials: "DR", text: "Genuinely cannot believe M&S looked at a cost of living crisis and decided their big public battle would be suing a budget supermarket over a CATERPILLAR CAKE. Read the room lads. Team Cuthbert forever. #FreeCuthbert", likes: 112000, rts: 74200, platform: "MockTweet" },
        { type: "post", name: "Hannah P", handle: "@hannahp_writes", av: "public", initials: "HP", text: "M&S really fumbled this. They're technically in the right legally but it doesn't MATTER, because Aldi has already won the only court that counts: the court of public opinion. You can't sue your way out of looking like the villain. #FreeCuthbert", likes: 96400, rts: 58200, platform: "MockTweet" },
        { type: "trend", label: "Trending in United Kingdom", hashtag: "#FreeCuthbert", volume: "165K posts", context: "The public rallies behind Aldi's Cuthbert the Caterpillar as M&S is cast as the corporate bully going after a budget favourite" },
        { type: "post", name: "Marketing Minds", handle: "@marketingminds", av: "journo", initials: "MM", text: "What we're watching with #FreeCuthbert is a textbook David vs Goliath play. Aldi can't outspend M&S, so it's out-charming them instead. The underdog who refuses to take itself seriously is almost impossible to attack. This is brand jiu-jitsu. 🐛", likes: 42100, rts: 24600, platform: "MockTweet" },
      ],
    },
    {
      label: "The Other Caterpillars Crawl Out",
      gap: 1500,
      posts: [
        { type: "post", name: "Hannah P", handle: "@hannahp_writes", av: "public", initials: "HP", text: "Reminder that M&S has Colin, Aldi has Cuthbert, Sainsbury's has Wiggles, Tesco has Curly, Asda has Clyde, Morrisons has Morris and Waitrose has Cecil. There are SEVEN caterpillar cakes. Is M&S going to sue the entire country? 🐛🐛🐛 #FreeCuthbert", likes: 138000, rts: 92400, platform: "MockTweet" },
        { type: "post", name: "Waitrose", handle: "@waitrose", av: "brand", initials: "WR", verified: true, text: "Cecil the Caterpillar is watching this situation very closely and has gone into hiding to be on the safe side. Stay strong, Cuthbert. 🐛 #FreeCuthbert", likes: 64200, rts: 31800, platform: "MockTweet" },
        { type: "post", name: "Morrisons", handle: "@Morrisons", av: "brand", initials: "MO", verified: true, text: "Morris the Caterpillar would like it on record that he has never met Colin, doesn't know Colin, and stands in full solidarity with Cuthbert during these difficult times. 🐛✊ #FreeCuthbert", likes: 71400, rts: 36200, platform: "MockTweet" },
        { type: "post", name: "Aldi UK", handle: "@AldiUK", av: "brand", initials: "AL", verified: true, text: "Free Cuthbert! Free ALL the caterpillars! This is bigger than us now. Solidarity with Cecil, Morris, Wiggles, Curly and Clyde. Caterpillars of Britain — UNITE. 🐛✊ #FreeCuthbert #CaterpillarSolidarity", likes: 184000, rts: 96800, platform: "MockTweet" },
      ],
    },
    {
      label: "Aldi Wins the Internet",
      gap: 1600,
      posts: [
        { type: "news", outlet: "Sky News", outletColor: "#1d9bf0", headline: "#FreeCuthbert: How Aldi turned being sued into a marketing triumph", sub: "Aldi's cheeky response to M&S's legal action has dominated social media for days, with the discount chain winning widespread public support and millions of pounds of free publicity in the process.", url: "news.sky.com/story" },
        { type: "post", name: "Marketing Minds", handle: "@marketingminds", av: "journo", initials: "MM", text: "The numbers on #FreeCuthbert are staggering. Aldi has generated an estimated five times more positive coverage from being sued than most brands get from a multi-million pound ad campaign. M&S handed them the underdog story on a plate. A caterpillar-shaped plate. 🐛", likes: 58400, rts: 34200, platform: "MockTweet" },
        { type: "post", name: "Aldi UK", handle: "@AldiUK", av: "brand", initials: "AL", verified: true, text: "Marks & Snitches more like 🐛 #FreeCuthbert", likes: 312000, rts: 178000, platform: "MockTweet" },
        { type: "post", name: "Tom H", handle: "@tomh_manc", av: "public", initials: "TH", text: "'Marks & Snitches' has genuinely ended M&S's entire legal team. They cannot recover from this. They are filing court documents while being called Marks & Snitches by a caterpillar. There is no winning here. #FreeCuthbert", likes: 142000, rts: 88600, platform: "MockTweet" },
      ],
    },
    {
      label: "The Resolution — Cuthbert Survives",
      gap: 1800,
      posts: [
        { type: "news", outlet: "BBC News", outletColor: "#e83030", headline: "Aldi and M&S settle Cuthbert the Caterpillar dispute", sub: "Aldi and M&S have reached a confidential settlement in their caterpillar cake dispute. Cuthbert returns to Aldi shelves. Both sides claim a positive outcome — but observers are unanimous that Aldi won the publicity battle by a landslide.", url: "bbc.co.uk/news/business" },
        { type: "post", name: "Aldi UK", handle: "@AldiUK", av: "brand", initials: "AL", verified: true, text: "Cuthbert is FREE. 🐛🎉 Thank you to everyone who stood with him in his hour of need. He's coming home, and he's bringing a charitable cause with him. We couldn't have done it without you. Now... who fancies a slice? #FreeCuthbert", likes: 268000, rts: 124000, platform: "MockTweet" },
        { type: "post", name: "Marketing Minds", handle: "@marketingminds", av: "journo", initials: "MM", text: "The #FreeCuthbert verdict is in, and it's the one lesson every brand should tattoo on their forehead: you cannot win a fight on social media by being the biggest. You win by being the most likeable. Aldi was sued and came out the hero. Astonishing work. 🐛", likes: 74200, rts: 42800, platform: "MockTweet" },
        { type: "post", name: "Jess B", handle: "@jessb_leeds", av: "public", initials: "JB", text: "Will I ever buy a Cuthbert? Probably not, I'm a Colin girl really. But will I forever remember Aldi as the funny one who beat M&S at their own game? Absolutely. And THAT is the whole point. They didn't win a cake. They won my goodwill. #FreeCuthbert", likes: 96800, rts: 48200, platform: "MockTweet" },
        { type: "verdict", tone: "win", label: "The Verdict",
          heading: "You Can't Sue Your Way Out of Being the Villain",
          body: "M&S had a legitimate trademark claim against Aldi's near-identical caterpillar cake — and may well have been legally in the right. It didn't matter. Aldi answered the lawyers not with lawyers but with charm: caterpillar puns, #FreeCuthbert, 'Marks & Snitches', and solidarity with every other supermarket's caterpillar. The public crowned Aldi the likeable underdog and M&S the corporate bully picking a fight over a cake during a cost-of-living crisis. The lessons: there are two courts — the legal one and the court of public opinion — and you can win the first while losing the second badly; on social media you win by being the most likeable, not the biggest (David-vs-Goliath 'brand jiu-jitsu'); and a heavy-handed legal move can hand your opponent a free underdog story worth more than any ad campaign." },
        { type: "impact", title: "The Battle for Cuthbert", stats: [
          { num: "1", label: "Caterpillar freed" },
          { num: "165K+", label: "#FreeCuthbert posts at the peak" },
          { num: "5x", label: "Coverage vs a paid ad campaign — from being SUED" },
          { num: "0", label: "Ways M&S could win the PR battle" },
        ] },
      ],
    },
  ],
  tasks: [
    {
      type: "mcq",
      id: "fc-q1",
      prompt: "Why did being 'legally in the right' not help M&S?",
      options: [
        "It did — they won easily",
        "There are two courts: M&S may have won the legal one but lost the court of public opinion badly",
        "M&S had no case at all",
        "Aldi also sued them",
      ],
      correctIndex: 1,
      explanation:
        "A valid legal claim doesn't protect you from looking like the villain. You can win in court and still lose the reputation battle.",
    },
    {
      type: "mcq",
      id: "fc-q2",
      prompt: "How did Aldi 'win' without being able to outspend M&S?",
      options: [
        "By hiring better lawyers",
        "By out-charming them — humour, puns and an underdog stance that's almost impossible to attack ('brand jiu-jitsu')",
        "By lowering prices",
        "By ignoring the lawsuit",
      ],
      correctIndex: 1,
      explanation:
        "The underdog who refuses to take itself seriously is hard to fight. Aldi turned a legal threat into a likeable story it controlled.",
    },
    {
      type: "mcq",
      id: "fc-q3",
      prompt: "Why was the timing of M&S's lawsuit a problem?",
      options: [
        "It was filed too late",
        "Suing a budget supermarket over a cake during a cost-of-living crisis read as out of touch — 'read the room'",
        "Caterpillar cakes were banned",
        "The court was closed",
      ],
      correctIndex: 1,
      explanation:
        "Context shapes perception. A big retailer attacking a cheap favourite at a tough economic moment cast M&S as the bully.",
    },
    {
      type: "mcq",
      id: "fc-q4",
      prompt: "What's the core social-media lesson the commentators draw?",
      options: [
        "You win by being the biggest",
        "You win by being the most likeable — Aldi was sued and came out the hero",
        "Never respond to legal action",
        "Always settle immediately",
      ],
      correctIndex: 1,
      explanation:
        "Size and budget don't win the public; likeability does. Aldi converted a disadvantage into the strongest position.",
    },
    {
      type: "mcq",
      id: "fc-q5",
      prompt: "What did Jess B's 'I'm a Colin girl really' comment show?",
      options: [
        "Nobody changed their mind",
        "Even people who prefer Colin came away with goodwill toward Aldi — the win was reputation, not cake sales",
        "Aldi lost customers",
        "M&S won her over",
      ],
      correctIndex: 1,
      explanation:
        "Aldi didn't need to convert her cake preference. It earned lasting goodwill — 'they didn't win a cake, they won my goodwill.'",
    },
    {
      type: "mcq",
      id: "fc-q6",
      prompt: "How could M&S have handled the trademark issue better?",
      options: [
        "Sue even harder and faster",
        "Pursue it quietly/privately rather than a public demand to pull the cake — avoiding the bully framing",
        "Sue all seven supermarkets",
        "Delete their account",
      ],
      correctIndex: 1,
      explanation:
        "A legitimate concern can be handled without a public spectacle. The misstep was the optics of the move, not necessarily the claim.",
    },
    {
      type: "written",
      id: "fc-w1",
      prompt:
        "Explain 'the court of public opinion' vs the legal court using this case. How can you win one and lose the other?",
      placeholder:
        "Who was legally right? Who did the public side with? Why didn't the law protect M&S's image?…",
    },
    {
      type: "written",
      id: "fc-w2",
      prompt:
        "Explain 'brand jiu-jitsu' / David vs Goliath here. How did Aldi turn a disadvantage into a win?",
      placeholder:
        "What did Aldi do instead of fighting power with power? Why is the self-deprecating underdog hard to attack?…",
    },
    {
      type: "written",
      id: "fc-w3",
      prompt:
        "Why did the timing and 'read the room' matter so much to how M&S was perceived?",
      placeholder:
        "What was the wider context? How did it shape who looked like the villain?…",
    },
    {
      type: "written",
      id: "fc-w4",
      prompt:
        "You advise M&S, which has a genuine trademark concern. How would you pursue it without becoming '#FreeCuthbert's villain'?",
      placeholder:
        "Public vs private action, tone, timing, and the optics of a big brand vs a budget one…",
    },
  ],
};
