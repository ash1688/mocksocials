// Authored Scenario — Beer Juice × Richard Ham (fictional case study). Ported
// from the HTML POC. Authored, never simulated (ADR-0006). Invented brand +
// ambassador; teaches brand indecision. dualtrend -> twolesson card.
import type { Scenario } from "./red-bull";

export const BEERJUICE_SCENARIO: Scenario = {
  id: "beerjuice-richard-ham",
  badge: "Scenario",
  title: "Beer Juice × Richard Ham — A Fictional Case Study",
  prePosts: [
    { type: "post", name: "Beer Juice", handle: "@BeerJuiceOfficial", av: "brand", initials: "BJ", verified: true, text: "Friday feeling starts here. 🍺 Crack open a Beer Juice and let the weekend begin. What's everyone drinking tonight?", likes: 2100, rts: 380, platform: "MockTweet" },
    { type: "post", name: "Ad Industry Watch", handle: "@AdWatch", av: "public", initials: "AW", text: "Brands keep chasing 'edgy' influencer partnerships to seem bold and get attention. Sometimes it pays off. Sometimes you find out the hard way why due diligence exists.", likes: 940, rts: 210, platform: "MockTweet" },
  ],
  sections: [
    {
      label: "The Partnership Launches",
      gap: 1800,
      posts: [
        { type: "disclaimer", text: "FICTIONAL CASE STUDY. 'Beer Juice' and 'Richard Ham' are invented for teaching purposes. No real person, brand, or event is depicted. This scenario exists to discuss one marketing question: what happens when a brand takes a polarising stance, then refuses to commit to it?" },
        { type: "post", name: "Beer Juice", handle: "@BeerJuiceOfficial", av: "brand", initials: "BJ", verified: true, text: "Big news! 🍺 We're proud to welcome Richard Ham as our newest brand ambassador. We love working with bold thinkers who aren't afraid to see the world differently. Welcome to the family, Richard! #BeerJuice", likes: 8400, rts: 2100, platform: "MockTweet" },
        { type: "post", name: "Richard Ham", handle: "@RichardHamTruth", av: "creator", initials: "RH", verified: true, text: "Honoured to partner with @BeerJuiceOfficial. Finally a brand that supports independent thinkers. Cracking open a cold one at the edge of the world. 🌍🚫 The horizon is FLAT, folks. And so is this lovely lager. #BeerJuice", likes: 12600, rts: 6800, platform: "MockTweet" },
        { type: "post", name: "Casual Drinker", handle: "@steve_real_ale", av: "public", initials: "SD", text: "wait, Beer Juice signed RICHARD HAM? the flat earth guy? as in 'the globe is a government psyop' Richard Ham? this is going to go one of two ways and neither of them is quiet", likes: 6200, rts: 1800, platform: "MockTweet" },
      ],
    },
    {
      label: "Side A Erupts — #PourItOut",
      gap: 1500,
      posts: [
        { type: "trend", label: "Trending now", hashtag: "#PourItOut", volume: "84.2K posts", context: "Beer drinkers angry that Beer Juice partnered with a prominent flat-earther are calling for a boycott." },
        { type: "post", name: "Dr Anya Bell", handle: "@anyabell_sci", av: "journo", initials: "AB", text: "A major beer brand just handed a platform to someone whose entire brand is denying basic science. #PourItOut. I teach kids who already struggle to tell fact from fiction online. This doesn't help. Done with Beer Juice.", likes: 38400, rts: 19200, platform: "MockTweet" },
        { type: "post", name: "Marcus T", handle: "@marcust_uk", av: "public", initials: "MT", text: "#PourItOut because I'm not spending my money funding flat-earth nonsense. Plenty of other beers that didn't decide to make pseudoscience their marketing strategy. Tipping mine down the sink.", likes: 24100, rts: 9800, platform: "MockTweet" },
        { type: "post", name: "Priya S", handle: "@priyas_writes", av: "public", initials: "PS", text: "#PourItOut — it's not that deep, I just don't want the brand I drink to think 'the earth is flat' guy is a good look. Who signed off on this in the marketing meeting? Did nobody google him?", likes: 28600, rts: 11400, platform: "MockTweet" },
        { type: "post", name: "Marketing Lens", handle: "@MarketingLens", av: "journo", initials: "ML", text: "#PourItOut is trending and it's only been three hours. A big chunk of Beer Juice's core market is furious. The brand has a choice to make, and fast: stand behind the partnership, or walk it back. There is no comfortable third option. (There never is.)", likes: 18200, rts: 7600, platform: "MockTweet" },
      ],
    },
    {
      label: "Side B Erupts — #StandWithRichard",
      gap: 1500,
      posts: [
        { type: "post", name: "Free Thinker Dan", handle: "@dan_questions_all", av: "public", initials: "FD", text: "So we're cancelling a brand now because they hired someone with unpopular OPINIONS? This is exactly what's wrong with society. #StandWithRichard. Just bought a 12-pack of Beer Juice out of pure spite. 🍺", likes: 31200, rts: 14600, platform: "MockTweet" },
        { type: "post", name: "Richard Ham", handle: "@RichardHamTruth", av: "creator", initials: "RH", text: "The globeheads are trying to cancel me AND the only beer brand brave enough to stand with me. They fear the questions. Stay strong, Beer Juice. We see the truth. The edge is real and so is our friendship. #StandWithRichard 🌍🚫", likes: 22400, rts: 12800, platform: "MockTweet" },
        { type: "post", name: "Wind-Up Merchant", handle: "@chaos_gremlin99", av: "public", initials: "WM", text: "I don't even believe the earth is flat I just think it's hilarious that everyone's losing their minds over a BEER advert. #StandWithRichard. buying a crate purely to annoy the people pouring theirs out lmao", likes: 26800, rts: 11200, platform: "MockTweet" },
        { type: "post", name: "Marketing Lens", handle: "@MarketingLens", av: "journo", initials: "ML", text: "Fascinating: now BOTH sides are loud. #PourItOut wants a boycott, #StandWithRichard is panic-buying in support. For about five minutes Beer Juice might think the spite-buyers cancel out the boycotters. That is a dangerous thing to believe.", likes: 19600, rts: 8400, platform: "MockTweet" },
      ],
    },
    {
      label: "The Brand Panics — The Non-Statement",
      gap: 1600,
      posts: [
        { type: "post", name: "Beer Juice", handle: "@BeerJuiceOfficial", av: "brand", initials: "BJ", verified: true, text: "A note on recent conversations: Beer Juice is a brand for EVERYONE. We value all of our customers and the many views they hold. We never intended to take a position on any issue. We're here to bring people together over a great beer. 🍺❤️", likes: 4200, rts: 1900, platform: "MockTweet" },
        { type: "post", name: "Marketing Lens", handle: "@MarketingLens", av: "journo", initials: "ML", text: "And there it is. The non-statement. They didn't defend Richard. They didn't disown him. They said 'we never meant to take a position' — about a partnership THEY chose to launch. Watch what happens now. This is the moment it goes wrong in both directions.", likes: 28400, rts: 14200, platform: "MockTweet" },
      ],
    },
    {
      label: "Nobody's Happy — Both Sides Turn",
      gap: 1500,
      posts: [
        { type: "twolesson", title: "Both trending — against the same brand", left: { label: "#PourItOut · 112K posts", points: [
          "\"You platformed him AND won't defend it\"",
        ] }, right: { label: "#StandWithRichard · 97K posts", points: [
          "\"You hung Richard out to dry\"",
        ] }, verdict: "By trying to please everyone, Beer Juice got both hashtags trending against it at once." },
        { type: "post", name: "Priya S", handle: "@priyas_writes", av: "public", initials: "PS", text: "'We never intended to take a position'?? You signed him as an AMBASSADOR. That IS a position. Now you won't even stand by your own decision? Spineless. Still pouring it out. #PourItOut", likes: 34200, rts: 16800, platform: "MockTweet" },
        { type: "post", name: "Free Thinker Dan", handle: "@dan_questions_all", av: "public", initials: "FD", text: "Beer Juice really signed Richard, took our money for a week, then threw him under the bus the SECOND it got uncomfortable. Cowards. You don't get to use someone and then pretend you 'never took a position.' #StandWithRichard", likes: 29600, rts: 14100, platform: "MockTweet" },
        { type: "post", name: "Richard Ham", handle: "@RichardHamTruth", av: "creator", initials: "RH", text: "Well. @BeerJuiceOfficial says they 'never took a position.' Funny, the cheque cleared. They wanted my audience until my audience got loud. Lesson learned. The earth is still flat and these people are still spineless. 🌍🚫", likes: 41200, rts: 22600, platform: "MockTweet" },
        { type: "post", name: "Marketing Lens", handle: "@MarketingLens", av: "journo", initials: "ML", text: "This is the textbook outcome. By trying to please everyone, Beer Juice has both hashtags trending against them at once. Side A is angrier (they platformed him AND flip-flopped). Side B is angrier (they were used then abandoned). The middle ground pleased no one.", likes: 31400, rts: 15800, platform: "MockTweet" },
      ],
    },
    {
      label: "The Fallout & The Lesson",
      gap: 1800,
      posts: [
        { type: "news", outlet: "Marketing Week", outletColor: "#d6006e", headline: "Beer Juice's Ambassador Misfire Becomes a Case Study in Brand Indecision", sub: "After a polarising influencer partnership, the brand's attempt to avoid taking sides left it criticised by both. Analysts point to the episode as a textbook example of how a non-committal response to a controversy can satisfy no one — and do more damage than picking a lane.", url: "marketingweek.com" },
        { type: "post", name: "Marketing Lens", handle: "@MarketingLens", av: "journo", initials: "ML", text: "The lessons, in order: (1) Know your audience BEFORE you pick an ambassador. Ten minutes of research predicts this entire week. (2) If you take a stance, commit to it. (3) The worst option in a crisis is the wishy-washy middle. A non-decision is still a decision.", likes: 28600, rts: 15200, platform: "MockTweet" },
        { type: "post", name: "Dan H", handle: "@danh_ldn", av: "public", initials: "DH", text: "What's wild is the brand might have survived EITHER choice. Stand by Richard, keep Side B. Drop him and apologise clearly, win back Side A. Instead they chose 'nothing,' and nothing was the only answer that lost both. 'Please everyone' = 'satisfy no one.'", likes: 24100, rts: 12800, platform: "MockTweet" },
        { type: "post", name: "Marketing Lens", handle: "@MarketingLens", av: "journo", initials: "ML", text: "And a quieter lesson worth teaching: even a partner you regret is still a partner. Using someone's audience and then publicly distancing yourself the moment it's costly is its own reputational risk. Whatever you think of Richard, Side B noticed how he was treated.", likes: 19800, rts: 9400, platform: "MockTweet" },
        { type: "verdict", tone: "cautionary", label: "The Verdict",
          heading: "Trying to Please Everyone Satisfies No One",
          body: "A beer brand signs a polarising ambassador, one side calls for a boycott (#PourItOut), the other rallies in spite-support (#StandWithRichard) — and the brand panics with a non-statement: 'we never intended to take a position.' But signing an ambassador IS a position. The wishy-washy middle achieved the one outcome worse than either decision: both hashtags trending against them at once. Side A was angrier (they platformed him AND flip-flopped); Side B was angrier (used, then abandoned the moment it got costly). The lessons: do the due diligence before you pick a partner (ten minutes of research predicted the whole week); if you take a stance, commit; a non-decision is still a decision, and usually the worst one; spite-buyers don't neatly cancel boycotters; and even a partner you regret is still a partner — how you treat them is noticed too." },
        { type: "impact", title: "A Case Study in Brand Indecision", stats: [
          { num: "2", label: "Hashtags trending against one brand at once" },
          { num: "Both", label: "Sides ended up angrier than before" },
          { num: "0", label: "Of the controversy was resolved by the non-statement" },
          { num: "10 mins", label: "Of audience research that would have predicted it all" },
        ] },
      ],
    },
  ],
  tasks: [
    {
      type: "mcq",
      id: "bj-q1",
      prompt: "Why did Beer Juice's 'we never intended to take a position' statement fail?",
      options: [
        "It was too long",
        "Signing someone as an ambassador IS a position — claiming neutrality about your own deliberate choice rang false to everyone",
        "It defended Richard too strongly",
        "It apologised too clearly",
      ],
      correctIndex: 1,
      explanation:
        "You can't choose a polarising partner and then claim you took no position. The denial contradicted their own visible decision.",
    },
    {
      type: "mcq",
      id: "bj-q2",
      prompt: "What was the result of trying to please both sides?",
      options: [
        "Everyone calmed down",
        "Both hashtags ended up trending against the brand — the middle ground pleased no one and angered both",
        "Only one side stayed angry",
        "Sales doubled",
      ],
      correctIndex: 1,
      explanation:
        "The non-committal middle is the worst option in a polarised fight: each side feels betrayed in a different way, so you lose both.",
    },
    {
      type: "mcq",
      id: "bj-q3",
      prompt: "What's the single biggest preventative the analysts point to?",
      options: [
        "A bigger crisis-comms team",
        "Due diligence — knowing your audience and vetting a partner BEFORE signing them (ten minutes of research)",
        "Posting more often",
        "Deleting the account",
      ],
      correctIndex: 1,
      explanation:
        "The entire week was predictable from a quick check of who Richard Ham was. Vetting the partner up front avoids the crisis entirely.",
    },
    {
      type: "mcq",
      id: "bj-q4",
      prompt: "'A non-decision is still a decision.' What does this mean here?",
      options: [
        "Doing nothing has no consequences",
        "Refusing to choose is itself a choice — and here it was the only one that lost both audiences",
        "You should never decide anything",
        "Indecision always works out",
      ],
      correctIndex: 1,
      explanation:
        "Either committing to Richard or clearly dropping him could have kept one audience. Choosing 'nothing' forfeited both.",
    },
    {
      type: "mcq",
      id: "bj-q5",
      prompt: "Why is it risky to assume spite-buyers 'cancel out' the boycotters?",
      options: [
        "They don't exist",
        "It's a false comfort — the reaction is volatile and conditional, and the brand still alienated its actual core market",
        "Spite-buyers are more loyal",
        "Boycotts never matter",
      ],
      correctIndex: 1,
      explanation:
        "Counting loud temporary spite-support against committed core customers is wishful maths — and it collapsed the moment the brand wobbled.",
    },
    {
      type: "mcq",
      id: "bj-q6",
      prompt: "What's the 'even a partner you regret is still a partner' lesson?",
      options: [
        "Never end any partnership",
        "Using someone's audience then publicly distancing yourself the second it's costly is its own reputational risk — people notice how you treat them",
        "Partners don't matter",
        "Always defend everyone forever",
      ],
      correctIndex: 1,
      explanation:
        "How you exit a partnership is watched too. Being seen to use and then abandon someone damaged the brand with the very audience it had courted.",
    },
    {
      type: "written",
      id: "bj-w1",
      prompt:
        "Explain why 'trying to please everyone satisfies no one' using this case. Why is the middle option often the worst?",
      placeholder:
        "What did each side want? Why did the non-statement anger both?…",
    },
    {
      type: "written",
      id: "bj-w2",
      prompt:
        "'Signing an ambassador IS a position.' Explain why the brand's claim of neutrality wasn't credible.",
      placeholder:
        "What deliberate choice had they made? How does that clash with 'we never took a position'?…",
    },
    {
      type: "written",
      id: "bj-w3",
      prompt:
        "The analysts say the brand could have survived EITHER decision. Pick one (commit, or cleanly drop him) and explain how you'd execute it.",
      placeholder:
        "Which audience do you keep? What exactly would you say and do?…",
    },
    {
      type: "written",
      id: "bj-w4",
      prompt:
        "What does this teach about due diligence before a partnership, and how would you vet a potential ambassador?",
      placeholder:
        "What would ten minutes of research have shown? What would you check for?…",
    },
  ],
};
