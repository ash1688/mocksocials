// Authored Scenario — Vettel's #RaceForWomen (Jeddah, 2021). Ported from the
// HTML POC. A fixed documentary timeline; authored, never simulated (ADR-0006).
// Shares the beat/task types defined in ./red-bull. A deliberately nuanced case:
// the lesson is to hold more than one truth at once, not to pick a side.
import type { Scenario } from "./red-bull";

export const VETTEL_SCENARIO: Scenario = {
  id: "vettel-race-for-women",
  badge: "Scenario",
  title: "Vettel's #RaceForWomen — The Story With No Easy Answer (2021)",
  prePosts: [
    { type: "post", name: "Sky Sports F1", handle: "@SkySportsF1", av: "journo", initials: "SF", verified: true, text: "It's race week! 🏁 Formula 1 heads to Jeddah for the FIRST EVER Saudi Arabian Grand Prix. A brand new street circuit, the title fight going down to the wire, and plenty of talking points on and off track.", likes: 4200, rts: 960, platform: "MockTweet" },
    { type: "post", name: "F1 Fan", handle: "@lights_out_f1", av: "public", initials: "FF", text: "first race in Saudi this weekend. loads to talk about — the new track, the championship, and a fair bit of debate about F1 being there in the first place. going to be an interesting one", likes: 1100, rts: 280, platform: "MockTweet" },
  ],
  sections: [
    {
      label: "Sky F1 Build-Up — The Story",
      gap: 1800,
      posts: [
        { type: "broadcast", show: "Sky Sports F1", segment: "Saudi Arabian GP Build-Up", headline: "Vettel hosts all-women karting event in Jeddah", standfirst: "Ahead of Formula 1's first-ever race in Saudi Arabia, Sebastian Vettel has organised a women-only karting day under the banner #RaceForWomen — celebrating the 2018 law change that allowed women in the kingdom to drive, and giving local women of mixed experience a day on track.", ticker: "SAUDI ARABIAN GP BUILD-UP · VETTEL #RACEFORWOMEN · FIRST F1 RACE IN JEDDAH" },
        { type: "post", name: "Sky Sports F1", handle: "@SkySportsF1", av: "journo", initials: "SF", verified: true, text: "Ahead of this weekend's inaugural Saudi Arabian Grand Prix, @SebVettel has staged a karting event exclusively for local women in Jeddah. We hear from Seb and the women who took part — and ask what events like this really mean. 🏁 #RaceForWomen", likes: 18400, rts: 4200, platform: "MockTweet" },
      ],
    },
    {
      label: "From Seb Himself",
      gap: 1700,
      posts: [
        { type: "post", name: "Sebastian Vettel", handle: "@SebVettel", av: "driver", initials: "SV", verified: true, platform: "MockTube", videoTitle: "#RaceForWomen — Jeddah 🏁", text: "Reported framing from Vettel's own message: he set up the event because there's so much focus on the negatives around countries F1 visits, and he wanted to highlight a positive — the change that's already happening. Women have only been able to drive here since 2018. He invited a mix of local women, some experienced, some who'd never raced, to share his experience and grow their confidence. He said he came away inspired by their stories.", likes: 2100000, rts: 0 },
        { type: "reported", source: "Sebastian Vettel — reported comments, Jeddah 2021", context: "Asked about the complexity of holding the event in Saudi Arabia, and aware of the criticism, Vettel was notably self-reflective:", quote: "Who am I to judge about right and wrong? I think that's a slippery slope.", footer: "His reported words. He acknowledged that from a Western lens plenty still needs to improve — but argued it's also true some things are changing, and for those women it makes a huge difference. He chose to celebrate the positive rather than only condemn." },
      ],
    },
    {
      label: "The Sky F1 View — Empowerment",
      gap: 1500,
      posts: [
        { type: "post", name: "David Croft", handle: "@CroftyF1", av: "journo", initials: "DC", verified: true, text: "Whatever else you think about F1 racing here, watching local women get out on a kart track — some who legally couldn't even drive a few years ago — and absolutely loving it, is a genuinely lovely thing. Fair play to Seb for actually DOING something rather than just talking. 🏁", likes: 22600, rts: 6400, platform: "MockTweet" },
        { type: "post", name: "Craig Slater", handle: "@CraigSlaterF1", av: "journo", initials: "CS", verified: true, text: "What strikes me reporting from Jeddah is that Vettel's approach was to LISTEN. He hired the track, invited the women, and spent the day hearing their stories first-hand rather than arriving with a lecture. That's a more thoughtful kind of activism than a slogan on a t-shirt.", likes: 16200, rts: 4100, platform: "MockTweet" },
        { type: "post", name: "Bernie Collins", handle: "@berniecollins", av: "journo", initials: "BC", verified: true, text: "As someone who's spent her career as a woman in motorsport, grassroots access is EVERYTHING. You can't have female F1 drivers in fifteen years without girls in karts today. Whatever the wider debate, a day that gets more young women into a kart is how the pipeline actually starts. 🏎️", likes: 19800, rts: 5600, platform: "MockTweet" },
        { type: "post", name: "Jenson Button", handle: "@JensonButton", av: "driver", initials: "JB", verified: true, text: "Karting is where every single one of us started. It's where you fall in love with racing. Giving that first taste to women who never had the chance before — that's a good thing in anyone's book. Credit to Seb for putting it together. 👏", likes: 31200, rts: 8200, platform: "MockTweet" },
      ],
    },
    {
      label: "The Paddock Backs the Initiative",
      gap: 1500,
      posts: [
        { type: "post", name: "Toto Wolff", handle: "@totowolff", av: "public", initials: "TW", verified: true, text: "Proud of what Seb has put together here. Motorsport should be for everyone, and giving young women a first opportunity on track is exactly the kind of grassroots work the sport needs more of. Fully behind the initiative. 🏁", likes: 28400, rts: 7200, platform: "MockTweet" },
        { type: "post", name: "James Vowles", handle: "@JamesVowles", av: "public", initials: "JV", text: "Initiatives like #RaceForWomen matter. Widening access — to anyone who's been locked out of motorsport for any reason — makes the whole sport stronger and more representative. Great to see Seb leading on it.", likes: 18600, rts: 4800, platform: "MockTweet" },
        { type: "post", name: "Zak Brown", handle: "@ZBrownCEO", av: "public", initials: "ZB", verified: true, text: "Big supporter of getting more women into motorsport at every level. What Seb organised in Jeddah is a positive step and the kind of grassroots access we should all be championing across the grid. 👏", likes: 21200, rts: 5400, platform: "MockTweet" },
        { type: "post", name: "Paddock Watcher", handle: "@paddock_watch", av: "public", initials: "PW", text: "interesting that the team bosses are all praising the EVENT specifically — the women, the access, the grassroots bit — but none of them are touching the wider political stuff. that's a very deliberate line they're all walking. support the good thing, stay out of the geopolitics.", likes: 14200, rts: 6800, platform: "MockTweet" },
      ],
    },
    {
      label: "Two Champions, Two Approaches",
      gap: 1600,
      posts: [
        { type: "reported", source: "Lewis Hamilton — reported comments, 2021", context: "Hamilton took a different, more openly uncomfortable stance about the sport racing in Saudi Arabia at all:", quote: "I do not feel comfortable racing here.", footer: "His reported position. Hamilton argued F1 has a responsibility to do more on human rights in the countries it visits. Not a contradiction of Vettel — two thoughtful drivers, the same concern, two different ways of responding to it." },
        { type: "post", name: "F1 Observer", handle: "@f1_observer", av: "public", initials: "FO", text: "the Hamilton/Vettel contrast is the whole story really. Lewis: 'I'm not comfortable being here and I'll say so.' Seb: 'I'm uncomfortable too, so I'll try to do one concrete positive thing while I'm here.' both are valid responses to a hard situation. neither is the 'wrong' one.", likes: 24600, rts: 9200, platform: "MockTweet" },
      ],
    },
    {
      label: "The Other Side — A Football Podcast Pushes Back",
      gap: 1600,
      posts: [
        { type: "podcast", show: "The Offside Line", epnum: "Ep. 112", title: "Sportswashing, or genuine good? The Saudi question", panel: [
          { name: "Gary Neville", initials: "GN" },
          { name: "Jamie Carragher", initials: "JC" },
          { name: "Roy Keane", initials: "RK" },
          { name: "Jill Scott", initials: "JS" },
        ], tagline: "Four voices from football look in on a motorsport story — and ask the awkward question nobody in the paddock wants to." },
        { type: "post", name: "The Offside Line", handle: "@offsidelinepod", av: "creator", initials: "OL", creator: true, text: "On this week's pod, Gary puts the question straight: it's a lovely event — but does a feel-good side-story risk being used to soften the image of the whole weekend being there? Carra and Roy aren't so sure it's that deep. Jill brings the women-in-sport angle. A proper debate. 🎙️", likes: 26400, rts: 8600, platform: "MockTweet" },
        { type: "post", name: "The Offside Line", handle: "@offsidelinepod", av: "creator", initials: "OL", creator: true, text: "GARY'S POINT (paraphrased): nobody's knocking the women or Seb — the question is whether big sport turning up somewhere, with a nice photogenic side-event, ends up lending a positive gloss the hosts can point to. That's the 'sportswashing' worry human rights groups raise. Worth ASKING, even if you don't land on a yes.", likes: 19800, rts: 9400, platform: "MockTweet" },
        { type: "post", name: "The Offside Line", handle: "@offsidelinepod", av: "creator", initials: "OL", creator: true, text: "CARRA & ROY (paraphrased): pushback from the other side — at some point, if a real woman gets a real opportunity she didn't have before, isn't that just... good? You can overthink this. Roy's line: 'are we really going to tell those women their day out doesn't count because of politics they didn't choose?' Jill: the women's own view has to come first here.", likes: 22100, rts: 7800, platform: "MockTweet" },
      ],
    },
    {
      label: "The Voices That Matter Most",
      gap: 1600,
      posts: [
        { type: "post", name: "Susie Wolff", handle: "@susie_wolff", av: "public", initials: "SW", verified: true, text: "I've spent my life pushing for women in motorsport, and here's what I'd say: progress is built one opportunity at a time. A girl in a kart today is a possibility that didn't exist for her before. The bigger debates are real and worth having — but don't talk over the women actually living the change. Ask them. 🏎️", likes: 34200, rts: 11600, platform: "MockTweet" },
        { type: "post", name: "Jamie Chadwick", handle: "@JamieChadwick", av: "public", initials: "JC", verified: true, text: "Representation is everything. When I was young I needed to SEE women racing to believe I could. For a young Saudi girl to watch local women on a track for the first time — that image does something no debate on the internet can. The pipeline starts with a single day like this.", likes: 27800, rts: 8400, platform: "MockTweet" },
        { type: "post", name: "Reema Juffali", handle: "@reemajuffali", av: "public", initials: "RJ", verified: true, text: "As a Saudi woman who races, I'll say this: people love to debate what's 'really' going on here from the outside. But I AM from here, and I'm on the grid. The change is real, it's happening, and it's faster than people abroad realise. Events like this are part of how that happened. Let us speak for ourselves. 🇸🇦🏁", likes: 41200, rts: 16800, platform: "MockTweet" },
        { type: "post", name: "Farah AlYousef", handle: "@farahalyousef", av: "public", initials: "FA", verified: true, text: "I went from karting to racing in the F1 Academy. A few years ago that sentence wasn't possible for a woman here. So when people argue about whether days like Seb's 'really mean anything' — I'm the answer to that question. They meant everything to girls like me. 🏎️", likes: 38600, rts: 14200, platform: "MockTweet" },
      ],
    },
    {
      label: "The Lesson — Hold More Than One Truth",
      gap: 1800,
      posts: [
        { type: "post", name: "Sky Sports F1", handle: "@SkySportsF1", av: "journo", initials: "SF", verified: true, text: "So where does that leave us? Maybe not with a neat answer — and that's okay. A thing can be a genuine, positive step for the women involved AND sit inside a wider debate worth taking seriously. Both are true. Grown-up topics don't resolve into a single tweet. 🏁", likes: 28400, rts: 11200, platform: "MockTweet" },
        { type: "multilens", title: "One Event, Four Honest Lenses", lenses: [
          { label: "Positive allyship", text: "Vettel used his platform to do something concrete and uplifting, and listened to the women rather than lecturing." },
          { label: "The sportswashing question", text: "Does a photogenic side-event risk lending positive cover to a wider weekend that critics say softens a regime's image? A fair thing to ASK." },
          { label: "The 'Western lens' caution", text: "Vettel raised it himself — is it for outsiders to judge another country's pace of change? A slippery slope, in his words." },
          { label: "The women's own view", text: "The participants — Saudi women in motorsport — were thrilled and empowered. Their voice matters most, and it's the one most often talked over." },
        ], footer: "All four can be true at once. The skill isn't picking one — it's holding them together honestly." },
        { type: "post", name: "F1 Observer", handle: "@f1_observer", av: "public", initials: "FO", text: "the media-literacy lesson here is the best one going: some stories genuinely don't have a clean villain or a tidy answer. the trap is flattening them — 'it's all sportswashing' OR 'it's purely wonderful, shut up.' the honest position holds the tension. resist the binary.", likes: 26200, rts: 12400, platform: "MockTweet" },
        { type: "post", name: "Jill Scott", handle: "@JillScottJS8", av: "public", initials: "JS", verified: true, text: "Came into this pod sceptical, left thinking differently. The bit that stayed with me: when a story is about a group of people, FIND those people before you decide what it means. We almost spent an hour debating Saudi women without listening to a single one. They had the clearest answer of all. 💭", likes: 31600, rts: 13800, platform: "MockTweet" },
        { type: "verdict", tone: "win", label: "The Verdict",
          heading: "Some Stories Don't Resolve Into a Single Tweet",
          body: "Vettel's #RaceForWomen was a genuine, positive step for the women who took part — concrete action, with listening instead of lecturing. AND the wider 'sportswashing' question (does a feel-good side-event lend cover to a contested weekend?) is fair to ask. AND outsiders should be careful judging another country's pace of change. AND the people the story is actually about — Saudi women in motorsport — were thrilled, and their voice matters most. The lesson isn't to pick one of these; it's to hold them together honestly. Resist the binary, and when a story is about a group of people, find those people before deciding what it means." },
        { type: "impact", title: "Hold More Than One Truth", stats: [
          { num: "2018", label: "Year Saudi women gained the right to drive" },
          { num: "4", label: "Honest lenses on one event — all valid" },
          { num: "1", label: "Voice that matters most: the women's own" },
          { num: "0", label: "Tidy answers — and that's the lesson" },
        ] },
      ],
    },
  ],
  tasks: [
    {
      type: "mcq",
      id: "vw-q1",
      prompt: "What is the central media-literacy lesson of this story?",
      options: [
        "Every story has a clear villain if you look hard enough",
        "Some stories have no tidy answer — the trap is flattening them into a binary",
        "Activism is always sportswashing",
        "You should never discuss politics in sport",
      ],
      correctIndex: 1,
      explanation:
        "The honest position holds the tension: a thing can be genuinely good AND sit inside a debate worth taking seriously. Flattening it to 'all good' or 'all bad' is the trap.",
    },
    {
      type: "mcq",
      id: "vw-q2",
      prompt: "What made Vettel's activism 'more thoughtful than a slogan on a t-shirt'?",
      options: [
        "He posted about it the most",
        "He did something concrete and listened to the women first-hand rather than arriving with a lecture",
        "He criticised Saudi Arabia the most loudly",
        "He refused to take part in the race",
      ],
      correctIndex: 1,
      explanation:
        "He organised a real event and spent the day hearing the participants' stories. Action plus listening is a more substantial form of advocacy than a slogan.",
    },
    {
      type: "mcq",
      id: "vw-q3",
      prompt: "What is the 'sportswashing' question being raised?",
      options: [
        "Whether the women enjoyed the karting",
        "Whether a photogenic side-event risks lending positive cover to a wider weekend critics say softens a host's image — a fair thing to ASK",
        "Whether Vettel was paid to attend",
        "Whether karting is a real sport",
      ],
      correctIndex: 1,
      explanation:
        "It's not an accusation against the women or Vettel — it's the worth-asking question of whether big sport's feel-good moments can be used as positive gloss. You can ask it without concluding 'yes'.",
    },
    {
      type: "mcq",
      id: "vw-q4",
      prompt: "How are Hamilton's and Vettel's responses best described?",
      options: [
        "Hamilton was right and Vettel was wrong",
        "Vettel was right and Hamilton was wrong",
        "Two thoughtful people, the same concern, two valid ways of responding",
        "Neither cared about the issue",
      ],
      correctIndex: 2,
      explanation:
        "Hamilton voiced his discomfort openly; Vettel channelled his into one concrete positive act. Same underlying concern, different valid responses — not a right-vs-wrong.",
    },
    {
      type: "mcq",
      id: "vw-q5",
      prompt: "Vettel said 'who am I to judge… that's a slippery slope.' What's the balanced takeaway?",
      options: [
        "Outsiders should never have any opinion on other countries",
        "Be cautious about judging another country's pace of change from a Western lens — while still acknowledging more can improve",
        "Anything a host country does is automatically fine",
        "Only Western views count",
      ],
      correctIndex: 1,
      explanation:
        "It's a both/and: humility about outside judgement of pace and context, without pretending nothing needs to improve. The nuance is the point.",
    },
    {
      type: "mcq",
      id: "vw-q6",
      prompt: "Why did the team bosses praise the event but avoid the wider geopolitics?",
      options: [
        "They didn't know what sportswashing was",
        "A deliberate line: support the concrete good (access, the women) while staying out of the politics",
        "They were ordered to by the FIA",
        "They secretly opposed the event",
      ],
      correctIndex: 1,
      explanation:
        "Their praise was carefully scoped to the grassroots good. Backing the event while not commenting on the politics was a consistent, deliberate choice across the paddock.",
    },
    {
      type: "mcq",
      id: "vw-q7",
      prompt: "Whose voices does the story argue matter most?",
      options: [
        "The team principals'",
        "The outside commentators' and podcasters'",
        "The Saudi women in motorsport themselves — the people the story is actually about",
        "Whoever has the most followers",
      ],
      correctIndex: 2,
      explanation:
        "Reema Juffali, Farah AlYousef and Susie Wolff all make the same point: don't talk over the people living the change. Their first-hand view is the one most often drowned out.",
    },
    {
      type: "mcq",
      id: "vw-q8",
      prompt: "What was Jill Scott's key takeaway after the podcast debate?",
      options: [
        "Politics should never be discussed",
        "When a story is about a group of people, find and listen to those people before deciding what it means",
        "Footballers shouldn't comment on F1",
        "The debate was a waste of time",
      ],
      correctIndex: 1,
      explanation:
        "They nearly spent an hour debating Saudi women without hearing one. The lesson: seek out the affected voices first — they often have the clearest answer.",
    },
    {
      type: "mcq",
      id: "vw-q9",
      prompt: "Which of these is an example of 'flattening' the story (the trap to avoid)?",
      options: [
        "Holding several truths at once",
        "Insisting it's 'purely wonderful, shut up' OR 'it's all just sportswashing' — collapsing it to one extreme",
        "Asking the women what they thought",
        "Noting both the positives and the fair questions",
      ],
      correctIndex: 1,
      explanation:
        "Both absolute positions flatten a genuinely complex situation. The honest stance resists the binary and holds the competing truths together.",
    },
    {
      type: "mcq",
      id: "vw-q10",
      prompt: "How should you engage with a complex, politically charged story online?",
      options: [
        "Pick the punchiest one-line verdict and post it fast",
        "Hold the tension, seek out the affected voices, and avoid forcing it into a single tweet-sized verdict",
        "Avoid it entirely and never comment",
        "Only repeat what your favourite account says",
      ],
      correctIndex: 1,
      explanation:
        "Grown-up topics don't resolve into one tweet. Responsible engagement means holding multiple truths, centring the people involved, and resisting the urge to flatten.",
    },
    {
      type: "written",
      id: "vw-w1",
      prompt:
        "Explain what 'hold more than one truth' means using this story. Name at least two truths here that can both be valid at the same time.",
      placeholder:
        "Think about the women's experience, the sportswashing question, and the 'Western lens' caution…",
    },
    {
      type: "written",
      id: "vw-w2",
      prompt:
        "What made Vettel's activism more thoughtful than 'a slogan on a t-shirt'? Use details from the event.",
      placeholder:
        "Consider what he actually did, and how he treated the women's own stories…",
    },
    {
      type: "written",
      id: "vw-w3",
      prompt:
        "Explain the 'sportswashing' question fairly: what is it, and why is it worth asking even if you don't land on 'yes'?",
      placeholder:
        "Who raises it and why? How can you ask it without dismissing the women involved?…",
    },
    {
      type: "written",
      id: "vw-w4",
      prompt:
        "Hamilton and Vettel responded differently to the same discomfort. Compare the two responses — is either one 'wrong'? Explain.",
      placeholder:
        "Speaking out vs doing a concrete positive thing — what are the merits of each?…",
    },
    {
      type: "written",
      id: "vw-w5",
      prompt:
        "'Find the people the story is about.' Why did centring the Saudi women's voices change the debate, and what is the wider lesson for any story about a group of people?",
      placeholder:
        "What did Reema, Farah and Susie add that the outside debate missed?…",
    },
    {
      type: "written",
      id: "vw-w6",
      prompt:
        "You're discussing a complex, politically charged story online. How would you engage responsibly and avoid flattening it into a single take?",
      placeholder:
        "Think about tone, seeking affected voices, holding tension, and resisting the binary…",
    },
  ],
};
