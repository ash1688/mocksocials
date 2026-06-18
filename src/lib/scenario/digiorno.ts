// Authored Scenario — DiGiorno #WhyIStayed (2014). Ported from the HTML POC.
// Authored, never simulated (ADR-0006). The hashtag concerns domestic abuse;
// like the POC, real survivor stories are not reproduced (template placeholders).
import type { Scenario } from "./red-bull";

export const DIGIORNO_SCENARIO: Scenario = {
  id: "digiorno-whyistayed",
  badge: "Scenario",
  title: "DiGiorno — #WhyIStayed (2014)",
  prePosts: [
    { type: "post", name: "Brand Insights", handle: "@BrandInsights", av: "journo", initials: "BI", verified: true, text: "Real-time marketing is the big trend of 2014: brands jumping on trending topics and live moments to stay relevant. Done well, it's gold. Done badly... it's a cautionary tale.", likes: 1400, rts: 380, platform: "MockTweet" },
    { type: "post", name: "Sam K", handle: "@samk_social", av: "public", initials: "SK", text: "every brand on here is desperate to be the next one to 'win' a trending hashtag. feels like a matter of time before one of them gets it badly wrong", likes: 920, rts: 260, platform: "MockTweet" },
  ],
  sections: [
    {
      label: "The Hashtag — A Serious Conversation",
      gap: 1900,
      posts: [
        { type: "post", name: "Support Network", handle: "@SupportNetworkUK", av: "official", initials: "SN", verified: true, text: "#WhyIStayed is trending as survivors share the complex, often misunderstood reasons people can't simply 'just leave' an abusive situation. It's a serious, important conversation. Please engage with care and respect. 💜", likes: 18400, rts: 12200, platform: "MockTweet" },
        { type: "post", name: "Anonymous", handle: "@user", av: "public", initials: "·", text: "#WhyIStayed I stayed for X.", likes: 0, rts: 0, platform: "MockTweet" },
        { type: "post", name: "Anonymous", handle: "@user", av: "public", initials: "·", text: "#WhyIStayed I stayed for Y.", likes: 0, rts: 0, platform: "MockTweet" },
        { type: "post", name: "Anonymous", handle: "@user", av: "public", initials: "·", text: "#WhyIStayed I stayed for Z.", likes: 0, rts: 0, platform: "MockTweet" },
        { type: "post", name: "Hannah Reed", handle: "@hannahreed_news", av: "journo", initials: "HR", text: "This hashtag is doing something rare — making visible an experience that's so often judged from the outside. Thousands are sharing. It's raw, it's important, and it deserves to be treated with care.", likes: 14200, rts: 8600, platform: "MockTweet" },
      ],
    },
    {
      label: "The Brand Jumps In",
      gap: 1700,
      posts: [
        { type: "post", name: "DiGiorno Pizza", handle: "@DiGiornoPizza", av: "brand", initials: "DG", verified: true, text: "#WhyIStayed You had pizza.", likes: 0, rts: 0, platform: "MockTweet" },
      ],
    },
    {
      label: "Instant Backlash",
      gap: 1500,
      posts: [
        { type: "post", name: "Marcus T", handle: "@marcust_uk", av: "public", initials: "MT", text: "DiGiorno. DiGiorno no. Do you have ANY idea what this hashtag is about? Did anyone read it before posting? This is a conversation about something incredibly serious and you turned up to sell PIZZA.", likes: 42100, rts: 24600, platform: "MockTweet" },
        { type: "post", name: "Priya S", handle: "@priyas_writes", av: "public", initials: "PS", text: "This is what happens when a brand sees a trending hashtag and jumps on it for engagement WITHOUT spending ten seconds reading what it's actually about. A catastrophic, tone-deaf misfire. Delete it.", likes: 38400, rts: 21200, platform: "MockTweet" },
        { type: "post", name: "Social Media Today", handle: "@SocialMediaToday", av: "journo", initials: "SM", text: "A frozen pizza brand has just inserted itself into a deeply serious trending conversation with a flippant one-liner, apparently without realising what the hashtag was about. The reaction is swift and furious.", likes: 22600, rts: 11400, platform: "MockTweet" },
        { type: "post", name: "Dan H", handle: "@danh_ldn", av: "public", initials: "DH", text: "The lesson every brand should screenshot: a trending hashtag is NOT automatically a marketing opportunity. Some conversations are not for you to join with a joke. CHECK before you post.", likes: 31200, rts: 18800, platform: "MockTweet" },
      ],
    },
    {
      label: "The Realisation & The Delete",
      gap: 1600,
      posts: [
        { type: "post", name: "Social Media Today", handle: "@SocialMediaToday", av: "journo", initials: "SM", text: "UPDATE: DiGiorno has deleted the tweet within minutes, clearly realising the scale of the mistake. But screenshots are already everywhere. On the internet, 'delete' doesn't mean 'gone.'", likes: 18900, rts: 9200, platform: "MockTweet" },
        { type: "post", name: "Priya S", handle: "@priyas_writes", av: "public", initials: "PS", text: "They deleted it fast, which is the right first move. But the real test of a brand isn't the mistake — everyone makes those. It's what they do in the next hour. Do they hide, or do they own it?", likes: 26400, rts: 13100, platform: "MockTweet" },
      ],
    },
    {
      label: "The Apology — Handled Surprisingly Well",
      gap: 1600,
      posts: [
        { type: "post", name: "DiGiorno Pizza", handle: "@DiGiornoPizza", av: "brand", initials: "DG", verified: true, text: "A million apologies. Did not read what the hashtag was about before posting. We are deeply sorry.", likes: 38200, rts: 14600, platform: "MockTweet" },
        { type: "post", name: "Hannah Reed", handle: "@hannahreed_news", av: "journo", initials: "HR", text: "Notable: instead of one corporate statement and then silence, DiGiorno is now replying individually and personally to people who called them out — apologising sincerely, one by one, not hiding behind a PR template.", likes: 28400, rts: 14200, platform: "MockTweet" },
        { type: "post", name: "DiGiorno Pizza", handle: "@DiGiornoPizza", av: "brand", initials: "DG", verified: true, text: "↳ @marcust_uk You're absolutely right, and we're so sorry. We didn't read the context before posting and we deeply regret it. No excuse. Thank you for calling us out.", likes: 12600, rts: 3200, platform: "MockTweet" },
        { type: "post", name: "DiGiorno Pizza", handle: "@DiGiornoPizza", av: "brand", initials: "DG", verified: true, text: "↳ @priyas_writes We are genuinely sorry. We made a serious mistake by not understanding the hashtag, and we apologise to everyone who was using it for what it really stood for.", likes: 14800, rts: 3900, platform: "MockTweet" },
        { type: "post", name: "Marcus T", handle: "@marcust_uk", av: "public", initials: "MT", text: "Credit where it's due — they just replied to me personally and apologised properly. No excuses, no 'sorry if anyone was offended.' Just a real apology. That's... actually how you do it after a bad mistake.", likes: 24100, rts: 9800, platform: "MockTweet" },
        { type: "post", name: "Priya S", handle: "@priyas_writes", av: "public", initials: "PS", text: "And THIS is the part that turns a disaster into a case study with a silver lining. The tweet was a disaster. The apology — sincere, personal, replying to people one by one with no defensiveness — is genuinely a model for how to recover. Two lessons in one day.", likes: 32600, rts: 16400, platform: "MockTweet" },
      ],
    },
    {
      label: "The Lesson — Check Before You Post",
      gap: 1800,
      posts: [
        { type: "news", outlet: "Marketing Week", outletColor: "#d6006e", headline: "DiGiorno's #WhyIStayed Tweet Becomes the Textbook Example of Trend-Hijacking Gone Wrong", sub: "The frozen pizza brand's flippant use of a serious trending hashtag is now taught in marketing courses worldwide as a cautionary tale: never engage with a trend before understanding what it means. The brand's sincere, personal apology is also widely cited as a model recovery.", url: "marketingweek.com" },
        { type: "post", name: "Dan H", handle: "@danh_ldn", av: "public", initials: "DH", text: "The whole thing in one sentence: a trending hashtag is not free marketing. Before any brand touches a trend, someone has to actually read the room. Ten seconds of research would have prevented all of this.", likes: 28400, rts: 15200, platform: "MockTweet" },
        { type: "post", name: "Social Media Today", handle: "@SocialMediaToday", av: "journo", initials: "SM", text: "Two takeaways for every social media manager: (1) Research a trend BEFORE you join it — trending ≠ safe. (2) If you do mess up, a fast, sincere, personal apology beats a defensive corporate statement every single time.", likes: 21200, rts: 11800, platform: "MockTweet" },
        { type: "post", name: "Support Network", handle: "@SupportNetworkUK", av: "official", initials: "SN", verified: true, text: "The hashtag itself did something valuable: it helped people understand an experience that's often judged from the outside. That's worth remembering long after the brand mishap is forgotten. 💜", likes: 19600, rts: 11200, platform: "MockTweet" },
        { type: "verdict", tone: "cautionary", label: "The Verdict",
          heading: "Trending Is Not the Same as Safe",
          body: "DiGiorno saw #WhyIStayed trending and fired off a flippant 'You had pizza' — without realising the hashtag was survivors explaining why people can't simply leave abusive situations. It's the classic trend-hijack mistake: a trending tag is not automatically a marketing opportunity, and ten seconds of reading would have prevented it. But the recovery is why this is taught as two lessons in one. They deleted fast (though screenshots are forever), then — crucially — apologised sincerely and personally, replying to people one by one with no defensiveness and no 'sorry if anyone was offended'. The takeaways: research a trend before you join it (trending ≠ safe; some conversations aren't yours to join with a joke), and when you do mess up, a fast, human, accountable apology beats a corporate template every time." },
        { type: "impact", title: "#WhyIStayed — Check Before You Post", stats: [
          { num: "5 words", label: "In a tweet that became a global lesson" },
          { num: "Minutes", label: "To delete — but screenshots are forever" },
          { num: "1 by 1", label: "Personal apologies that earned back respect" },
          { num: "10 secs", label: "Of research that would have prevented it all" },
        ] },
      ],
    },
  ],
  tasks: [
    {
      type: "mcq",
      id: "dg-q1",
      prompt: "What was DiGiorno's core mistake?",
      options: [
        "Posting too rarely",
        "Jumping on a trending hashtag for engagement without checking what it was actually about",
        "Using too many emojis",
        "Apologising too quickly",
      ],
      correctIndex: 1,
      explanation:
        "#WhyIStayed was survivors discussing abuse. Treating it as a marketing opportunity without reading it produced a flippant, tone-deaf misfire.",
    },
    {
      type: "mcq",
      id: "dg-q2",
      prompt: "What does 'trending ≠ safe' mean for brands?",
      options: [
        "All trends are good marketing",
        "A trending hashtag is not automatically a marketing opportunity — some conversations aren't yours to join, especially with a joke",
        "Brands should never post",
        "Only positive trends exist",
      ],
      correctIndex: 1,
      explanation:
        "Visibility isn't an invitation. Before touching a trend you must understand what it's about and whether a brand belongs in it at all.",
    },
    {
      type: "mcq",
      id: "dg-q3",
      prompt: "Why didn't deleting the tweet fix the problem?",
      options: [
        "It actually did fix it completely",
        "Screenshots had already spread — on the internet 'delete' doesn't mean 'gone'",
        "They couldn't delete it",
        "Deleting made it trend more",
      ],
      correctIndex: 1,
      explanation:
        "Fast deletion is the right first move but never erases something already captured and shared. The record outlives the original post.",
    },
    {
      type: "mcq",
      id: "dg-q4",
      prompt: "What made DiGiorno's recovery a model apology?",
      options: [
        "A single corporate statement, then silence",
        "Fast, sincere, personal replies one-by-one to the people who called them out — no defensiveness, no 'sorry if offended'",
        "Blaming an intern",
        "Ignoring everyone",
      ],
      correctIndex: 1,
      explanation:
        "Owning it plainly and engaging individuals as humans (not via a template) turned a disaster into a widely-cited example of how to recover.",
    },
    {
      type: "mcq",
      id: "dg-q5",
      prompt: "Why is this taught as 'two lessons in one day'?",
      options: [
        "Because they made two tweets",
        "The tweet shows how NOT to engage a trend; the apology shows how TO recover from a mistake",
        "Because pizza is involved",
        "Because nothing was learned",
      ],
      correctIndex: 1,
      explanation:
        "The same episode contains both a cautionary failure and an exemplary recovery — useful to study together.",
    },
    {
      type: "mcq",
      id: "dg-q6",
      prompt: "What's the simplest preventative the commentators point to?",
      options: [
        "A bigger marketing budget",
        "Ten seconds of reading the room — understanding a trend before joining it",
        "More frequent posting",
        "Hiring a celebrity",
      ],
      correctIndex: 1,
      explanation:
        "The whole disaster was avoidable with a moment's research. 'Read the room before you post' is the cheap, reliable safeguard.",
    },
    {
      type: "written",
      id: "dg-w1",
      prompt:
        "Explain why 'trending is not the same as safe.' What should a brand check before joining a trend?",
      placeholder:
        "What does visibility tempt brands to assume? What questions should they ask first?…",
    },
    {
      type: "written",
      id: "dg-w2",
      prompt:
        "What made DiGiorno's apology effective? Compare it with a typical defensive corporate statement.",
      placeholder:
        "Think speed, sincerity, replying personally, and avoiding 'sorry if offended'…",
    },
    {
      type: "written",
      id: "dg-w3",
      prompt:
        "'Delete doesn't mean gone.' Explain why fast deletion is right but insufficient, using this case.",
      placeholder:
        "What had already happened by the time they deleted? What does that mean for recovery?…",
    },
    {
      type: "written",
      id: "dg-w4",
      prompt:
        "You manage a brand account and spot a hashtag trending. Walk through your checklist before deciding whether (and how) to post.",
      placeholder:
        "What do you read? Who do you ask? When do you decide NOT to join at all?…",
    },
  ],
};
