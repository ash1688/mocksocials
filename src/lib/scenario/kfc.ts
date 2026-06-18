// Authored Scenario — KFC chicken shortage & the FCK apology (2018). Ported from
// the HTML POC. Authored, never simulated (ADR-0006). Uses the fckbucket card.
import type { Scenario } from "./red-bull";

export const KFC_SCENARIO: Scenario = {
  id: "kfc-fck-apology",
  badge: "Scenario",
  title: "KFC — The Chicken Shortage & The FCK Apology (2018)",
  prePosts: [
    { type: "post", name: "KFC UK", handle: "@KFC_UKI", av: "brand", initials: "KF", verified: true, text: "There's no such thing as too much chicken. Prove us wrong. 🍗", likes: 4200, rts: 1100, platform: "MockTweet" },
    { type: "post", name: "Tom B", handle: "@tomb_sheffield", av: "public", initials: "TB", text: "Friday night = bargain bucket night. It's the law. I don't make the rules. 🍗🍻", likes: 920, rts: 88, platform: "MockTweet" },
    { type: "post", name: "DHL UK", handle: "@DHLUK", av: "brand", initials: "DH", verified: true, text: "Delivering excellence across the UK, every single day. 📦 What will we deliver for you?", likes: 540, rts: 120, platform: "MockTweet" },
  ],
  sections: [
    {
      label: "The Switch — DHL Takes Over Delivery",
      gap: 1800,
      posts: [
        { type: "post", name: "DHL UK", handle: "@DHLUK", av: "brand", initials: "DH", verified: true, text: "We're delighted to announce that DHL has been appointed as the new logistics and delivery partner for KFC across the UK. Our state-of-the-art distribution model will deliver fresh produce more efficiently than ever before. A new era begins. 📦", likes: 1840, rts: 420, platform: "MockTweet" },
        { type: "post", name: "Logistics Weekly", handle: "@logisticsweekly", av: "journo", initials: "LW", text: "Big move in the food distribution sector — KFC has ended its contract with its previous delivery partner and handed UK logistics to DHL, consolidating to a single distribution centre. Efficiency gains expected. logisticsweekly.co.uk", likes: 640, rts: 180, platform: "MockTweet" },
      ],
    },
    {
      label: "Business As Usual — Nothing To Worry About",
      gap: 1800,
      posts: [
        { type: "post", name: "KFC UK", handle: "@KFC_UKI", av: "brand", initials: "KF", verified: true, text: "Exciting changes behind the scenes at KFC! We've upgraded our delivery partner to bring you the same great chicken, fresher than ever. It's business as usual in all our restaurants — nothing to worry about. See you soon! 🍗", likes: 2100, rts: 380, platform: "MockTweet" },
        { type: "post", name: "Dave M", handle: "@davem_brum", av: "public", initials: "DM", text: "@KFC_UKI good to hear! was worried for a second there 😂 see you Friday for the usual bargain bucket", likes: 210, rts: 18, platform: "MockTweet" },
      ],
    },
    {
      label: "The Rumour — Are They Running Low?",
      gap: 1700,
      posts: [
        { type: "post", name: "Sophie R", handle: "@sophier_leeds", av: "public", initials: "SR", text: "Went to my local KFC and they said they're 'out of chicken'?? It's a CHICKEN shop. How are you out of chicken. Anyway I'm fine it's fine everything's fine 🙃", likes: 8400, rts: 4200, platform: "MockTweet" },
        { type: "post", name: "Manchester Eats", handle: "@mcr_eats", av: "public", initials: "ME", text: "Hearing reports that multiple KFC branches across Manchester are turning customers away today. Anyone else seeing this? Surely not connected to that delivery change last week 👀", likes: 12100, rts: 6800, platform: "MockTweet" },
        { type: "post", name: "The Mirror", handle: "@DailyMirror", av: "journo", initials: "MR", verified: true, text: "RUMOURS: KFC fans report empty restaurants and 'no chicken' signs amid whispers of a supply problem following the chain's switch to a new delivery partner. KFC has been approached for comment. mirror.co.uk", likes: 18600, rts: 11200, platform: "MockTweet" },
      ],
    },
    {
      label: "Breaking — Stores Are Closing",
      gap: 2000,
      posts: [
        { type: "news", outlet: "BBC News", outletColor: "#e83030", headline: "KFC forced to close hundreds of UK restaurants amid chicken shortage", sub: "More than half of KFC's 900 UK outlets have closed after the fried chicken chain ran out of chicken, following problems with a new delivery contract handed to DHL. Customers have been left stunned.", url: "bbc.co.uk/news/business" },
        { type: "post", name: "Gemma T", handle: "@gemmat_uk", av: "public", initials: "GT", text: "A CHICKEN restaurant. Has run out. Of CHICKEN. I have genuinely never been so personally affected by a news story in my life. What am I supposed to eat now. A salad?? In THIS economy??", likes: 94200, rts: 61400, platform: "MockTweet" },
        { type: "post", name: "Concerned Citizen", handle: "@concerneduk2018", av: "public", initials: "CC", text: "People are RINGING THE POLICE about the KFC chicken shortage. Officers have had to publicly ask the public to stop calling 999 about fried chicken. We are not a serious country.", likes: 128000, rts: 88200, platform: "MockTweet" },
      ],
    },
    {
      label: "The Apology — FCK, We're Sorry",
      gap: 1800,
      posts: [
        { type: "fckbucket", caption: "KFC's full-page newspaper apology, 23 February 2018" },
        { type: "post", name: "KFC UK", handle: "@KFC_UKI", av: "brand", initials: "KF", verified: true, text: "A chicken restaurant without any chicken. It's not ideal. Huge apologies to our customers, especially those who travelled out of their way to find we were closed. And endless thanks to our restaurant teams and partners working tirelessly to fix it. 🍗", likes: 312000, rts: 198000, platform: "MockTweet" },
        { type: "post", name: "Marketing Week", handle: "@MarketingWeekUK", av: "journo", initials: "MW", verified: true, text: "This. Is. Genius. KFC has taken a full-page ad in the Metro and the Sun showing an empty bucket with the letters rearranged to read 'FCK'. Self-deprecating, honest, funny and humble. A masterclass in crisis communications. Take notes, everyone.", likes: 184000, rts: 102000, platform: "MockTweet" },
        { type: "post", name: "Hannah L", handle: "@hannahl_writes", av: "public", initials: "HL", text: "Not me actually respecting a fast food chain more AFTER they ran out of food. The 'FCK' apology is the funniest, most human thing a brand has ever done. All is forgiven KFC. I would die for you. 😂", likes: 241000, rts: 156000, platform: "MockTweet" },
        { type: "post", name: "PR Daily", handle: "@PRDailyUK", av: "journo", initials: "PR", text: "How to handle a crisis, by KFC: 1. Own it completely. 2. Apologise sincerely. 3. Use humour to defuse anger. 4. Thank your staff. 5. Don't blame your partner publicly. Every brand that's ever issued a non-apology should study this.", likes: 98400, rts: 67200, platform: "MockTweet" },
      ],
    },
    {
      label: "Back To Normal — Reputation Enhanced",
      gap: 1800,
      posts: [
        { type: "news", outlet: "BBC News", outletColor: "#e83030", headline: "KFC restaurants reopen as chicken supply returns to normal", sub: "The vast majority of KFC's UK restaurants are back open and fully stocked. The chain's handling of the shortage — particularly its widely-praised FCK apology — has been credited with turning a logistics disaster into a PR triumph.", url: "bbc.co.uk/news/business" },
        { type: "post", name: "Dave M", handle: "@davem_brum", av: "public", initials: "DM", text: "Back in my local KFC for the first time since The Great Chicken Drought of 2018. Bargain bucket has never tasted sweeter. We survived. We endured. We are stronger now. 🍗❤️", likes: 42100, rts: 18600, platform: "MockTweet" },
        { type: "post", name: "Sophie R", handle: "@sophier_leeds", av: "public", initials: "SR", text: "Genuinely think KFC came out of running out of chicken MORE popular than before. Imagine messing up so badly that everyone ends up loving you more. That's not a crisis. That's a flex.", likes: 88400, rts: 54200, platform: "MockTweet" },
        { type: "post", name: "Marketing Week", handle: "@MarketingWeekUK", av: "journo", initials: "MW", verified: true, text: "Six months on, the KFC FCK apology has won multiple advertising awards and is now taught in marketing courses worldwide. The lesson? When you mess up, own it, mean it, and don't be afraid to laugh at yourself. The public will forgive almost anything except a lie.", likes: 76200, rts: 41800, platform: "MockTweet" },
        { type: "verdict", tone: "win", label: "The Verdict",
          heading: "Own It, Mean It, and Laugh at Yourself",
          body: "A delivery switch to a single distribution centre left a chicken chain with no chicken, closing 600+ restaurants. KFC's recovery is the textbook for crisis comms: a full-page ad with an empty bucket reading 'FCK', a sincere apology that owned the absurdity ('a chicken restaurant without any chicken — it's not ideal'), humour to defuse the anger, thanks to its staff, and — crucially — no public blaming of its delivery partner. The result was a brand that came out more loved than before. The lessons: own the mistake completely, apologise like a human, use self-deprecation to take the heat out, protect your partners and staff, and remember the public will forgive almost anything except a lie or a non-apology. (Note the contrast with the earlier 'nothing to worry about' over-reassurance — honesty beats false comfort.)" },
        { type: "impact", title: "The FCK Apology", stats: [
          { num: "600+", label: "Restaurants closed at the peak" },
          { num: "1", label: "Distribution centre that caused it all" },
          { num: "5 days", label: "From shutdown to the FCK apology" },
          { num: "∞", label: "Goodwill earned by owning the mistake" },
        ] },
      ],
    },
  ],
  tasks: [
    {
      type: "mcq",
      id: "kf-q1",
      prompt: "What made the FCK apology so effective?",
      options: [
        "It blamed DHL for everything",
        "It owned the mistake with humour and humility — self-deprecating, honest and human, not a corporate non-apology",
        "It denied there was a problem",
        "It offered free chicken forever",
      ],
      correctIndex: 1,
      explanation:
        "Rearranging the bucket to 'FCK' and admitting 'a chicken restaurant without any chicken — it's not ideal' disarmed the anger by being honest and funny rather than defensive.",
    },
    {
      type: "mcq",
      id: "kf-q2",
      prompt: "Why was 'don't blame your partner publicly' part of the praise?",
      options: [
        "Because DHL wasn't involved",
        "Because publicly throwing your delivery partner under the bus looks like deflection — owning it yourself reads as accountable",
        "Because blame is illegal",
        "Because KFC caused it deliberately",
      ],
      correctIndex: 1,
      explanation:
        "Even though the logistics switch caused it, KFC took responsibility rather than pointing fingers — which preserves dignity and reads as genuine ownership.",
    },
    {
      type: "mcq",
      id: "kf-q3",
      prompt: "What does 'the public will forgive almost anything except a lie' mean here?",
      options: [
        "People never forgive mistakes",
        "Honest ownership earns forgiveness; it's the cover-up or non-apology that loses trust, not the error itself",
        "Lying is the safest option",
        "Apologies don't matter",
      ],
      correctIndex: 1,
      explanation:
        "A genuine mistake, honestly owned, is forgivable. What audiences punish is dishonesty and evasion — which KFC avoided entirely.",
    },
    {
      type: "mcq",
      id: "kf-q4",
      prompt: "Why is the early 'business as usual — nothing to worry about' tweet a quiet lesson?",
      options: [
        "It was perfect crisis comms",
        "Over-reassurance that turns out false damages trust — honesty would have been safer than premature comfort",
        "It caused the shortage",
        "It was the apology",
      ],
      correctIndex: 1,
      explanation:
        "Promising nothing's wrong just before everything goes wrong erodes credibility. The contrast with the honest FCK apology is the point.",
    },
    {
      type: "mcq",
      id: "kf-q5",
      prompt: "How did the crisis affect KFC's reputation overall?",
      options: [
        "It permanently damaged the brand",
        "The brand came out more loved — a logistics disaster turned into a PR triumph through the response",
        "Nobody noticed",
        "It had no effect either way",
      ],
      correctIndex: 1,
      explanation:
        "The failure was real, but the humble, funny, accountable response actually enhanced goodwill — proof that recovery can outweigh the mistake.",
    },
    {
      type: "mcq",
      id: "kf-q6",
      prompt: "What role did humour play?",
      options: [
        "It made light of something serious and offended people",
        "It defused anger — self-deprecation signalled humility and made the apology disarming rather than corporate",
        "It replaced the apology entirely",
        "It blamed customers",
      ],
      correctIndex: 1,
      explanation:
        "Humour aimed at themselves (not at customers or partners) lowered the temperature and made the genuine apology land warmly.",
    },
    {
      type: "written",
      id: "kf-w1",
      prompt:
        "List what KFC did right in the FCK apology and explain why each element worked.",
      placeholder:
        "Own it, apologise, humour, thank staff, don't blame the partner — why does each matter?…",
    },
    {
      type: "written",
      id: "kf-w2",
      prompt:
        "'The public will forgive almost anything except a lie.' Explain this using the contrast between the early 'nothing to worry about' tweet and the FCK apology.",
      placeholder:
        "What did each communicate? Which one built or lost trust?…",
    },
    {
      type: "written",
      id: "kf-w3",
      prompt:
        "Why did NOT publicly blaming DHL strengthen KFC's response, even though the logistics switch caused the problem?",
      placeholder:
        "How does deflection read vs ownership? What does it signal about the brand?…",
    },
    {
      type: "written",
      id: "kf-w4",
      prompt:
        "Compare KFC's recovery with a brand crisis that went badly (e.g. one you've studied). What did KFC do that the other didn't?",
      placeholder:
        "Speed, honesty, humour, ownership, protecting staff/partners — where did they differ?…",
    },
  ],
};
