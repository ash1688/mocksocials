// Authored Scenario — Burger King 'Women Belong in the Kitchen' (IWD 2021).
// Ported from the HTML POC. Authored, never simulated (ADR-0006).
import type { Scenario } from "./red-bull";

export const BK_IWD_SCENARIO: Scenario = {
  id: "bk-women-in-the-kitchen",
  badge: "Scenario",
  title: "Burger King — 'Women Belong in the Kitchen' (IWD 2021)",
  prePosts: [
    { type: "post", name: "Marketing Today", handle: "@marketingtoday", av: "journo", initials: "MT", text: "It's International Women's Day tomorrow. Every brand on here will have something to say. The real question is always: who's backing it with action, and who's just after the likes? 👀 #IWD", likes: 1800, rts: 420, platform: "MockTweet" },
    { type: "post", name: "Innocent Drinks", handle: "@innocent", av: "brand", initials: "IN", verified: true, text: "morning. drink your smoothie. be kind. big day tomorrow. 💚", likes: 5400, rts: 980, platform: "MockTweet" },
    { type: "post", name: "Burger King UK", handle: "@BurgerKingUK", av: "brand", initials: "BK", verified: true, text: "flame-grilled since 1954 and twice as cheeky. what are you having this weekend? 🔥", likes: 6200, rts: 1400, platform: "MockTweet" },
  ],
  sections: [
    {
      label: "International Women's Day — The Brands Post",
      gap: 1700,
      posts: [
        { type: "post", name: "Innocent Drinks", handle: "@innocent", av: "brand", initials: "IN", verified: true, text: "Happy International Women's Day to all the incredible women out there. 💚 Today and every day, we're raising a smoothie to you. Go on, you legends. #IWD #InternationalWomensDay", likes: 8400, rts: 2100, platform: "MockTweet" },
        { type: "post", name: "LEGO", handle: "@LEGO_Group", av: "brand", initials: "LG", verified: true, text: "This #InternationalWomensDay we're celebrating the girls and women who build, create and imagine without limits. The future is yours to build. 🧱💛 #IWD", likes: 12600, rts: 4200, platform: "MockTweet" },
        { type: "post", name: "Greggs", handle: "@GreggsOfficial", av: "brand", initials: "GG", verified: true, text: "Celebrating the brilliant women who power Greggs — from our shops to our bakeries to the boardroom. Happy #InternationalWomensDay to all of you. 💛", likes: 9800, rts: 2800, platform: "MockTweet" },
        { type: "post", name: "Marketing Today", handle: "@marketingtoday", av: "journo", initials: "MT", text: "The brands are out in force for #InternationalWomensDay as always. The smart ones back the words with action — funding, programmes, real change. The lazy ones just slap a slogan on it. As ever, the public can tell the difference. Watching to see who does it well today.", likes: 3200, rts: 840, platform: "MockTweet" },
        { type: "post", name: "Burger King UK", handle: "@BurgerKingUK", av: "brand", initials: "BK", verified: true, text: "Women belong in the kitchen.", likes: 4100, rts: 2200, platform: "MockTweet" },
      ],
    },
    {
      label: "The 30-Minute Window — No Context, Just Chaos",
      gap: 1400,
      posts: [
        { type: "post", name: "Rachel D", handle: "@racheld_uk", av: "public", initials: "RD", text: "Did @BurgerKingUK seriously just tweet 'women belong in the kitchen' on INTERNATIONAL WOMEN'S DAY?? I've read it ten times. There's no context. There's no follow up. It's just... sitting there. Has the account been hacked?? 😳", likes: 68400, rts: 42100, platform: "MockTweet" },
        { type: "post", name: "Dan K", handle: "@dank_writes", av: "public", initials: "DK", text: "Whoever runs the Burger King account this morning has tweeted 'women belong in the kitchen' on IWD with zero explanation and then presumably gone to make a cup of tea. The replies are a warzone. Absolute carnage. 🍿", likes: 94200, rts: 61800, platform: "MockTweet" },
        { type: "post", name: "Priya S", handle: "@priyas_ldn", av: "public", initials: "PS", text: "I don't care what the 'context' turns out to be. You do not lead with 'women belong in the kitchen' on International Women's Day and leave it hanging for half an hour. The headline IS the message. Everything after it is damage control. #InternationalWomensDay", likes: 112000, rts: 78400, platform: "MockTweet" },
        { type: "trend", label: "Trending in United Kingdom", hashtag: "#BurgerKing", volume: "98K posts", context: "Burger King UK faces a wave of backlash after tweeting 'Women belong in the kitchen' on International Women's Day with no initial context" },
      ],
    },
    {
      label: "The Context Arrives — Too Late",
      gap: 1600,
      posts: [
        { type: "post", name: "Burger King UK", handle: "@BurgerKingUK", av: "brand", initials: "BK", verified: true, text: "...if they want to, of course. Yet only 20% of professional chefs are women. We're on a mission to change the gender ratio in the restaurant industry by empowering female employees with the opportunity to pursue a culinary career. 👩‍🍳", likes: 6200, rts: 2400, platform: "MockTweet" },
        { type: "post", name: "Burger King UK", handle: "@BurgerKingUK", av: "brand", initials: "BK", verified: true, text: "We're proud to be launching a new scholarship programme to help female Burger King employees pursue their culinary dreams and become chefs. 🧑‍🍳 #InternationalWomensDay", likes: 5800, rts: 2100, platform: "MockTweet" },
        { type: "post", name: "Rachel D", handle: "@racheld_uk", av: "public", initials: "RD", text: "OH. So it was a 'clever' thread the whole time. The first tweet was the 'gotcha' hook and THEN the nice scholarship bit. Mate. MATE. You cannot put 'women belong in the kitchen' as a standalone tweet and expect everyone to wait politely for paragraph two. 🤦‍♀️", likes: 88600, rts: 52400, platform: "MockTweet" },
        { type: "post", name: "Marketing Today", handle: "@marketingtoday", av: "journo", initials: "MT", text: "Here's the problem in one line: on social media, the first tweet travels on its own. Screenshots don't include the thread. Retweets don't include the thread. They built a campaign that only works if everyone reads all of it, in order — and that is not how this platform works. At all.", likes: 64200, rts: 41800, platform: "MockTweet" },
      ],
    },
    {
      label: "Good Cause, Terrible Delivery",
      gap: 1600,
      posts: [
        { type: "post", name: "Chef Maria L", handle: "@chefmarial", av: "public", initials: "ML", text: "As a woman who's spent 15 years in professional kitchens fighting to be taken seriously — the scholarship is genuinely a good thing and the industry desperately needs it. Which is EXACTLY why it's so infuriating they wrapped it in a tired sexist joke. They had a real story and buried it.", likes: 102000, rts: 64200, platform: "MockTweet" },
        { type: "post", name: "Dr Aisha Bello", handle: "@draishabello", av: "public", initials: "AB", text: "This is the perfect teaching example of intent vs impact. The intent was good. The impact was a sexist statement seen by millions out of context. On social media, IMPACT wins every time, because the audience reacts to what they see — not to what you meant. #InternationalWomensDay", likes: 71400, rts: 44600, platform: "MockTweet" },
        { type: "post", name: "Tom B", handle: "@tomb_debates", av: "public", initials: "TB", text: "Genuinely torn on this one. Part of me thinks people should read the whole thread before getting angry. The other part knows full well that if I have to explain why my edgy headline ISN'T sexist, the headline has already failed. Provocation only works if you control the landing. They didn't.", likes: 48200, rts: 26800, platform: "MockTweet" },
      ],
    },
    {
      label: "Burger King Backs Down",
      gap: 1800,
      posts: [
        { type: "news", outlet: "BBC News", outletColor: "#e83030", headline: "Burger King deletes 'women belong in the kitchen' tweet after backlash", sub: "Burger King has removed its International Women's Day tweet following widespread criticism. The fast food chain said the post was intended to highlight the lack of women in professional kitchens and promote a new scholarship, but acknowledged it had caused offence.", url: "bbc.co.uk/news/business" },
        { type: "post", name: "Burger King UK", handle: "@BurgerKingUK", av: "brand", initials: "BK", verified: true, text: "We hear you. We got it wrong. We've deleted our original tweet. Our aim was to draw attention to the reality that only a small percentage of professional chefs are women, and to help change that with a scholarship — but we missed the mark in how we did it. We're sorry.", likes: 42100, rts: 18600, platform: "MockTweet" },
        { type: "post", name: "Priya S", handle: "@priyas_ldn", av: "public", initials: "PS", text: "Credit where it's due — that's an actual apology. No 'we're sorry if you were offended', no doubling down, no blaming the audience for not reading. They deleted it and owned it. That's the bare minimum, but you'd be amazed how many brands can't even manage the bare minimum.", likes: 58400, rts: 28200, platform: "MockTweet" },
      ],
    },
    {
      label: "The Lesson — Mind the Framing",
      gap: 1800,
      posts: [
        { type: "post", name: "Marketing Today", handle: "@marketingtoday", av: "journo", initials: "MT", text: "The Burger King IWD saga in a nutshell: a genuinely worthwhile cause, sabotaged by a hook that prioritised being clever over being clear. The scholarship was the story. Instead, the story became the apology. Never make your audience dig through sarcasm to find your good intentions.", likes: 62400, rts: 38200, platform: "MockTweet" },
        { type: "post", name: "Chef Maria L", handle: "@chefmarial", av: "public", initials: "ML", text: "The saddest part? We're now all talking about a bad tweet instead of the actual problem — that professional kitchens are still overwhelmingly male and brutal places for women to build a career. THAT was the conversation worth having. The 'joke' stole it. #InternationalWomensDay", likes: 84600, rts: 52100, platform: "MockTweet" },
        { type: "post", name: "Dr Aisha Bello", handle: "@draishabello", av: "public", initials: "AB", text: "For the students who'll study this one day: 'edgy' is a strategy with a very narrow margin for error. When it works, it's unforgettable. When it misfires, YOU become the cautionary tale. Ask yourself honestly — if the first line is read completely alone, what does it say? Then decide.", likes: 54200, rts: 32600, platform: "MockTweet" },
        { type: "verdict", tone: "cautionary", label: "The Verdict",
          heading: "The Headline Travels Alone",
          body: "Burger King had a genuinely worthwhile story — a scholarship to get more women into professional kitchens, where only a small share of chefs are women. They wrapped it in a 'gotcha' hook: a standalone tweet reading 'Women belong in the kitchen', with the context arriving half an hour later. The problem is structural to the platform: the first line travels on its own — screenshots and retweets don't carry the thread — so millions read a sexist statement with no qualifier. It's the classic intent-vs-impact gap: the intent was good, but on social media impact wins, because people react to what they see, not what you meant. To their credit, the apology was real — they deleted it and owned it, no 'sorry if offended'. The lesson: provocation only works if you control the landing, and if your first line read completely alone says something you don't mean, it has already failed." },
        { type: "impact", title: "Women Belong in the Kitchen — Mind the Framing", stats: [
          { num: "1 tweet", label: "Read by millions out of context" },
          { num: "~30 min", label: "Before the context thread landed" },
          { num: "98K+", label: "Posts about the gaffe, not the scholarship" },
          { num: "0", label: "People who saw the headline and waited for paragraph two" },
        ] },
      ],
    },
  ],
  tasks: [
    {
      type: "mcq",
      id: "bk-q1",
      prompt: "Why did the campaign backfire even though the cause was good?",
      options: [
        "The scholarship wasn't real",
        "The provocative first tweet travelled on its own — screenshots and retweets don't carry the follow-up thread",
        "Burger King doesn't sell chicken",
        "Nobody cares about IWD",
      ],
      correctIndex: 1,
      explanation:
        "On social media the first line is read alone. A standalone 'women belong in the kitchen' reached millions before the context arrived — and most never saw the rest.",
    },
    {
      type: "mcq",
      id: "bk-q2",
      prompt: "What does 'intent vs impact' mean here?",
      options: [
        "Intent always outweighs impact",
        "The intent was good, but the impact (a sexist line seen out of context) is what the audience reacted to — and impact wins on social",
        "They are the same thing",
        "Impact doesn't matter if you meant well",
      ],
      correctIndex: 1,
      explanation:
        "People respond to what they see, not what you meant. A good intention doesn't undo the impact of how it landed.",
    },
    {
      type: "mcq",
      id: "bk-q3",
      prompt: "What's the single best test the analysts suggest before posting an 'edgy' hook?",
      options: [
        "Does it have enough emojis?",
        "If the first line is read completely alone, what does it say?",
        "Will it get lots of likes?",
        "Is it shorter than 280 characters?",
      ],
      correctIndex: 1,
      explanation:
        "Because the opener travels by itself, you must judge it in isolation. If it says something you don't mean on its own, it has already failed.",
    },
    {
      type: "mcq",
      id: "bk-q4",
      prompt: "Why is 'provocation only works if you control the landing' the key craft point?",
      options: [
        "Provocation never works",
        "An edgy setup needs the payoff to arrive with it; if the audience supplies its own ending first, you've lost control of the message",
        "You should always be as shocking as possible",
        "Landings don't matter online",
      ],
      correctIndex: 1,
      explanation:
        "A provocative hook is only safe if the resolution lands at the same moment. Here the gap let the crowd write the meaning before the brand could.",
    },
    {
      type: "mcq",
      id: "bk-q5",
      prompt: "What made Burger King's apology a genuinely good one?",
      options: [
        "It blamed people for not reading the thread",
        "It deleted the tweet, admitted 'we got it wrong', and didn't hide behind 'sorry if you were offended'",
        "It doubled down on the joke",
        "It deleted the whole account",
      ],
      correctIndex: 1,
      explanation:
        "Owning the mistake plainly — delete, admit, apologise — is the bare minimum done right, which many brands still fail to manage.",
    },
    {
      type: "mcq",
      id: "bk-q6",
      prompt: "What did Chef Maria L identify as the saddest outcome?",
      options: [
        "Burger King lost money",
        "The 'joke' stole the conversation from the real issue — that professional kitchens remain overwhelmingly male and hostile to women",
        "The scholarship was cancelled",
        "Nobody apologised",
      ],
      correctIndex: 1,
      explanation:
        "Instead of discussing a real problem the scholarship addressed, everyone ended up debating a bad tweet. The delivery buried the story worth telling.",
    },
    {
      type: "mcq",
      id: "bk-q7",
      prompt: "Why is 'people should read the whole thread first' not a sufficient defence?",
      options: [
        "Because reading is overrated",
        "Because if you have to explain why your headline isn't sexist, the headline has already failed — you can't rely on everyone reading in order",
        "Because threads don't exist",
        "Because the audience is always wrong",
      ],
      correctIndex: 1,
      explanation:
        "Hoping the audience behaves ideally isn't a strategy. The platform spreads the opener alone, so the opener must stand alone.",
    },
    {
      type: "mcq",
      id: "bk-q8",
      prompt: "What's the broader takeaway for any brand 'taking a stance'?",
      options: [
        "Never mention social causes",
        "Back the words with action and make the meaning clear without requiring a full read — clarity beats cleverness",
        "Always be as edgy as possible",
        "Delete tweets immediately just in case",
      ],
      correctIndex: 1,
      explanation:
        "The smart brands pair a clear message with real action. Cleverness that depends on perfect reading conditions is a fragile strategy.",
    },
    {
      type: "written",
      id: "bk-w1",
      prompt:
        "Explain why 'the headline travels alone' on social media, using this case. What does that mean for how you write an opener?",
      placeholder:
        "What do screenshots and retweets carry — and not carry? How should that change the first line?…",
    },
    {
      type: "written",
      id: "bk-w2",
      prompt:
        "Explain 'intent vs impact'. Why does impact 'win' on social media even when the intent was good?",
      placeholder:
        "What did Burger King mean? What did people see? Which one drove the reaction?…",
    },
    {
      type: "written",
      id: "bk-w3",
      prompt:
        "Was Burger King's apology a good one? Explain what made it work (or not), compared with a typical 'sorry if you were offended' statement.",
      placeholder:
        "What did they actually do and say? What did they avoid?…",
    },
    {
      type: "written",
      id: "bk-w4",
      prompt:
        "'Provocation only works if you control the landing.' Rewrite Burger King's campaign so the good cause lands without the misfire.",
      placeholder:
        "How would you open it? Where would the scholarship message go?…",
    },
    {
      type: "written",
      id: "bk-w5",
      prompt:
        "The 'joke' stole the conversation from a real issue. Why does that matter, and what's the cost of a misfire beyond the brand's own reputation?",
      placeholder:
        "What conversation was lost? Who loses out when it is?…",
    },
  ],
};
