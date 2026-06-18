// Authored Scenario — Elon Musk '$420 funding secured' tweet (2018). Ported from
// the HTML POC. Authored, never simulated (ADR-0006). First use of the ticker
// card. (The POC's title span was mislabelled; corrected here.)
import type { Scenario } from "./red-bull";

export const ELON_420_SCENARIO: Scenario = {
  id: "elon-420-funding-secured",
  badge: "Scenario",
  title: "Elon Musk — '$420 Funding Secured' (2018)",
  prePosts: [
    { type: "post", name: "Market Open", handle: "@MarketWatch", av: "journo", initials: "MW", verified: true, text: "Markets open steady. S&P 500 up 0.2%. Tech sector flat. Tesla trading at $312.18. It's August 7, 2018.", likes: 1200, rts: 340, platform: "MockTweet" },
    { type: "post", name: "Tech Investor", handle: "@TechVentures", av: "public", initials: "TV", text: "Another day, another earnings report. Nothing crazy expected from Tesla this week. Just a regular Tuesday afternoon.", likes: 840, rts: 220, platform: "MockTweet" },
  ],
  sections: [
    {
      label: "The Tweet — 2:42 PM ET",
      gap: 1800,
      posts: [
        { type: "post", name: "Elon Musk", handle: "@elonmusk", av: "official", initials: "EM", verified: true, text: "Am considering taking Tesla private at $420. Funding secured.", likes: 142000, rts: 89400, platform: "MockTweet" },
        { type: "post", name: "Stock Watcher", handle: "@stockwatch_ed", av: "public", initials: "SW", text: "WAIT. Did Elon Musk just announce taking Tesla private? Mid-market-day? Without warning? The stock is moving. Trading might halt.", likes: 28400, rts: 12100, platform: "MockTweet" },
        { type: "post", name: "Finance Desk", handle: "@FinanceDesk", av: "journo", initials: "FD", text: "BREAKING: Tesla stock halted for news. Elon Musk tweets he's considering taking the company private at $420/share with 'funding secured.' No prior announcement. Market scrambling for clarity.", likes: 18600, rts: 8200, platform: "MockTweet" },
        { type: "post", name: "Olivia Chen", handle: "@olivia_markets", av: "public", initials: "OC", text: "This is... how you announce a potential multi-billion-dollar deal? On Twitter? Mid-trading day? Without an official press release or SEC filing? This is insane.", likes: 34200, rts: 15800, platform: "MockTweet" },
      ],
    },
    {
      label: "The Pump — Stock Climbing, Fanboys Erupting",
      gap: 1400,
      posts: [
        { type: "ticker", label: "Tesla Stock (TSLA)", climb: [312.18, 316.42, 320.65, 324.88, 328.54], timestamps: ["2:42 PM", "2:44 PM", "2:46 PM", "2:48 PM", "2:50 PM (HALTED)"], haltPrice: 328.54, haltReason: "News pending" },
        { type: "post", name: "Tesla Hodler", handle: "@TeslaHodler2000", av: "public", initials: "TH", text: "HODL 💎🙌 THIS IS IT BOYS. $420 PRIVATE TESLA. THIS IS REAL. THIS IS HAPPENING. 🚀🚀🚀", likes: 12400, rts: 8200, platform: "MockTweet" },
        { type: "post", name: "SpaceX Believer", handle: "@SpaceX_Moon", av: "public", initials: "SB", text: "In Elon We Trust. He wouldn't tweet it if it wasn't real. Taking Tesla private is genius. Away from the shorts, away from Wall Street. This is the move. 🚀💪", likes: 18600, rts: 11200, platform: "MockTweet" },
        { type: "post", name: "Market Chaos", handle: "@MarketChaos", av: "journo", initials: "MC", text: "Tesla halted at $328.54 after climbing 5.2% in 8 minutes. Volume exploding. Retail traders going WILD. This is a $420 short squeeze narrative now. Entire market watching.", likes: 24100, rts: 13400, platform: "MockTweet" },
        { type: "post", name: "Olivia Chen", handle: "@olivia_markets", av: "public", initials: "OC", text: "Okay so: stock halted, fanboys are euphoric, nobody knows who's funding this, and the $420 price is apparently a... joke? But also serious? And it moved the market 5% in 8 minutes. This is peak 2018 internet.", likes: 48200, rts: 26400, platform: "MockTweet" },
      ],
    },
    {
      label: "The $420 Question — Genius or Reckless?",
      gap: 1600,
      posts: [
        { type: "post", name: "Finance Desk", handle: "@FinanceDesk", av: "journo", initials: "FD", text: "ANALYSIS: Is Elon's $420 price point a deliberate joke (cannabis reference), or did he pick it because it's a serious buyout price that happens to be a meme? Either way, it's sent a signal nobody was prepared for.", likes: 14800, rts: 6200, platform: "MockTweet" },
        { type: "post", name: "Wall Street Analyst", handle: "@WSAnalyst_Tom", av: "public", initials: "WS", text: "If this is real, $420 is a ~25% premium to yesterday's close. If it's a joke, he just moved a $50B company's stock on a meme. If it's a negotiation tactic, it's wildly reckless. Which is it?", likes: 22400, rts: 11600, platform: "MockTweet" },
        { type: "post", name: "Tesla Hodler", handle: "@TeslaHodler2000", av: "public", initials: "TH", text: "People saying the $420 is a joke are MISSING THE POINT. Elon KNOWS what he's doing. He's showing Wall Street he doesn't care. He's above the game. 💯", likes: 19800, rts: 9400, platform: "MockTweet" },
        { type: "post", name: "Olivia Chen", handle: "@olivia_markets", av: "public", initials: "OC", text: "Okay actual question: does it matter if it's a joke? He moved the market. He halted trading. Millions of people are making buy/sell decisions based on a tweet that might be a meme. That's the problem.", likes: 56400, rts: 32100, platform: "MockTweet" },
      ],
    },
    {
      label: "\"Funding Secured?\" — The Cracks Show",
      gap: 1600,
      posts: [
        { type: "post", name: "Finance Desk", handle: "@FinanceDesk", av: "journo", initials: "FD", text: "UPDATES: Elon says 'financing is secured' but won't name the source. No formal announcement from potential backers (Saudi PIF, others). Wall Street asking: where is this money actually coming from?", likes: 26400, rts: 12800, platform: "MockTweet" },
        { type: "post", name: "Wall Street Analyst", handle: "@WSAnalyst_Tom", av: "public", initials: "WS", text: "So Elon tweeted 'funding secured' but the sources of that funding aren't confirming anything. That's... not how deals work. Secured means committed. Not 'I'm optimistic.'", likes: 18900, rts: 8600, platform: "MockTweet" },
        { type: "post", name: "Reuters", handle: "@Reuters", av: "journo", initials: "RT", text: "Saudi Arabia's PIF, which Musk suggested was backing the deal, issues statement: 'No agreement has been reached with Tesla.' Contradicts 'funding secured' claim.", likes: 32100, rts: 18400, platform: "MockTweet" },
        { type: "post", name: "Olivia Chen", handle: "@olivia_markets", av: "public", initials: "OC", text: "So the picture now: Elon tweeted 'funding secured' but the people who are supposedly funding say they haven't agreed to anything. That's not 'secured.' That's... wishful thinking at best, misleading at worst.", likes: 44200, rts: 24600, platform: "MockTweet" },
      ],
    },
    {
      label: "The SEC Steps In — It's Now a Legal Problem",
      gap: 1700,
      posts: [
        { type: "news", outlet: "SEC", outletColor: "#003366", headline: "SEC Opens Investigation Into Tesla 'Funding Secured' Tweet", sub: "The Securities and Exchange Commission has opened a formal investigation into whether Elon Musk's August 7 tweet disclosing a potential going-private transaction was accurate and complete, or if it misled investors. SEC rules require timely, accurate disclosure of material information.", url: "sec.gov/news" },
        { type: "post", name: "Finance Desk", handle: "@FinanceDesk", av: "journo", initials: "FD", text: "This is big. The SEC doesn't investigate light offences. If they're looking at the tweet, they think it was materially misleading. Penalties could include fines, trading bans, civil charges.", likes: 18600, rts: 8200, platform: "MockTweet" },
        { type: "post", name: "Olivia Chen", handle: "@olivia_markets", av: "public", initials: "OC", text: "And this is the real lesson: you can't just tweet material financial info and then say 'just joking' or 'I was optimistic.' The regulators care about whether the statement was true. Not whether it was funny or clever.", likes: 52100, rts: 29400, platform: "MockTweet" },
      ],
    },
    {
      label: "The Settlement & The Lesson — A Post Has Consequences",
      gap: 1800,
      posts: [
        { type: "news", outlet: "Bloomberg", outletColor: "#000000", headline: "Elon Musk and Tesla Settle SEC Charges Over '$420 Funding Secured' Tweet", sub: "Musk and Tesla have agreed to settle SEC charges without admitting or denying wrongdoing. Penalties: $20 million each ($40 million total). Musk must step down as Tesla chairman for 3 years. Both must submit tweets about material info to pre-approval by a lawyer before posting.", url: "bloomberg.com/news" },
        { type: "post", name: "Wall Street Analyst", handle: "@WSAnalyst_Tom", av: "public", initials: "WS", text: "$40M in fines. Loss of chairman role. Pre-approval on tweets. The SEC basically said: you can't say 'funding secured' on Twitter and then decide it wasn't. Words matter. Markets matter. Accuracy matters.", likes: 28400, rts: 14200, platform: "MockTweet" },
        { type: "post", name: "Finance Desk", handle: "@FinanceDesk", av: "journo", initials: "FD", text: "The 'Twitter sitter' clause: from now on, Musk's tweets about Tesla's business, stock, or financial condition have to be reviewed by Tesla's lawyers before he posts. No more free-wheeling announcements.", likes: 16200, rts: 7400, platform: "MockTweet" },
        { type: "post", name: "Olivia Chen", handle: "@olivia_markets", av: "public", initials: "OC", text: "Let's tally it up: One tweet. $40M in fines. Lost the chairman role. Can't tweet freely about your own company anymore. And it all started because he didn't think about the consequences of what 'funding secured' means to regulators.", likes: 61200, rts: 34800, platform: "MockTweet" },
        { type: "verdict", tone: "cautionary", label: "The Verdict",
          heading: "A Post Has Consequences — Even If You're Joking",
          body: "Mid-trading-day, Elon Musk tweeted 'Am considering taking Tesla private at $420. Funding secured.' The stock leapt 5.2% in eight minutes and was halted; fans were euphoric; nobody knew where the money was. The catch: 'funding secured' is a specific, material claim — and the supposed backers said no agreement existed. The SEC investigated and Musk and Tesla settled for $40m, with Musk losing the chairman role for three years and a 'Twitter sitter' requiring lawyer pre-approval of material tweets. The lessons: a post can move markets and carry real legal and financial consequences; with material information, accuracy and proper disclosure matter, not whether something is funny, clever or a meme ('does it matter if it's a joke? — he moved the market' is the whole point); and 'I was optimistic' is not the same as 'secured'. Words mean things to regulators." },
        { type: "impact", title: "'$420 Funding Secured'", stats: [
          { num: "1 tweet", label: "That moved the market" },
          { num: "$40M", label: "In SEC fines (split)" },
          { num: "5.2%", label: "Stock climb in 8 minutes" },
          { num: "3 years", label: "As non-chairman, plus 'Twitter sitter' approval required" },
        ] },
      ],
    },
  ],
  tasks: [
    {
      type: "mcq",
      id: "el-q1",
      prompt: "Why was 'funding secured' the dangerous part of the tweet?",
      options: [
        "Because $420 is a meme",
        "It's a specific, material claim — and the supposed backers said no agreement existed, making it misleading to investors",
        "Because it was posted at night",
        "Because it was too short",
      ],
      correctIndex: 1,
      explanation:
        "'Secured' means committed. Stating it without it being true is exactly what regulators treat as materially misleading.",
    },
    {
      type: "mcq",
      id: "el-q2",
      prompt: "Why doesn't 'it was a joke / I was optimistic' get Musk off the hook?",
      options: [
        "Because jokes are illegal",
        "Regulators care whether a material statement was true and properly disclosed — not whether it was funny or clever",
        "Because he deleted it",
        "Because nobody read it",
      ],
      correctIndex: 1,
      explanation:
        "Intent or humour doesn't change the impact on the market. Material claims must be accurate; 'optimistic' isn't 'secured'.",
    },
    {
      type: "mcq",
      id: "el-q3",
      prompt: "Olivia asks 'does it matter if it's a joke?' What's her point?",
      options: [
        "Jokes are always fine",
        "The real-world impact is the problem — it moved the market and people traded on it, regardless of intent",
        "Only the price matters",
        "Jokes move markets the most",
      ],
      correctIndex: 1,
      explanation:
        "Whether it was meant seriously is almost beside the point: millions made decisions on it and trading halted. Impact, not intent, is what counts.",
    },
    {
      type: "mcq",
      id: "el-q4",
      prompt: "What were the actual consequences of the single tweet?",
      options: [
        "Nothing happened",
        "$40m in fines, Musk lost the chairman role for 3 years, and a 'Twitter sitter' lawyer pre-approval requirement",
        "A free Tesla for everyone",
        "The stock was delisted",
      ],
      correctIndex: 1,
      explanation:
        "One post produced major financial, professional and ongoing speech-restriction consequences — concrete proof a post can be costly.",
    },
    {
      type: "mcq",
      id: "el-q5",
      prompt: "How did the 'HODL / it's just FUD' fan response illustrate motivated reasoning?",
      options: [
        "It was rigorous analysis",
        "Fans dismissed contradicting evidence (the backers' denials) to protect the belief, rather than updating on it",
        "It was neutral reporting",
        "It proved the deal was real",
      ],
      correctIndex: 1,
      explanation:
        "When the funding claims were directly contradicted, believers reframed the evidence as 'FUD' instead of revising — a classic refusal to update.",
    },
    {
      type: "mcq",
      id: "el-q6",
      prompt: "What's the proper way material company news like this should be disclosed?",
      options: [
        "A surprise mid-day tweet",
        "Through accurate, timely formal disclosure (e.g. an SEC filing / official announcement), not an off-the-cuff post",
        "A meme",
        "It shouldn't be disclosed at all",
      ],
      correctIndex: 1,
      explanation:
        "Material information has disclosure rules precisely so all investors get accurate information fairly — not via a personal tweet that moves the market first.",
    },
    {
      type: "written",
      id: "el-w1",
      prompt:
        "Explain why 'funding secured' caused legal trouble. What does 'material information' mean and why does accuracy matter?",
      placeholder:
        "What does 'secured' claim? What did the backers say? Why do regulators care?…",
    },
    {
      type: "written",
      id: "el-w2",
      prompt:
        "'Does it matter if it's a joke?' Argue why impact can matter more than intent when a post moves markets.",
      placeholder:
        "What happened to the stock and to traders, regardless of what Musk meant?…",
    },
    {
      type: "written",
      id: "el-w3",
      prompt:
        "'A post has consequences.' Using the settlement, explain how one tweet led to real financial and professional outcomes.",
      placeholder:
        "List the consequences and trace them back to the single tweet…",
    },
    {
      type: "written",
      id: "el-w4",
      prompt:
        "The fans called every contradiction 'FUD'. What's the danger of that mindset, and how should you update when evidence contradicts a belief?",
      placeholder:
        "When does scepticism of critics become refusing to update? What would good reasoning look like?…",
    },
  ],
};
