// Authored Scenario — Vettel's Bee Hotels: hypocrite, or just honest? (2023).
// Ported from the HTML POC. Authored, never simulated (ADR-0006). gotcha ->
// twolesson card; photos become captioned placeholders.
import type { Scenario } from "./red-bull";

export const BEEHOTELS_SCENARIO: Scenario = {
  id: "vettel-bee-hotels",
  badge: "Scenario",
  title: "Vettel's Bee Hotels — Hypocrite, or Just Honest? (2023)",
  prePosts: [
    { type: "post", name: "Sky Sports F1", handle: "@SkySportsF1", av: "journo", initials: "SF", verified: true, text: "Race week in Japan! 🇯🇵 The paddock is at Suzuka, one of the most-loved circuits on the calendar. Plenty happening off-track too this year, including a rather unusual project taking shape down at Turn 2... 🐝", likes: 3400, rts: 720, platform: "MockTweet" },
    { type: "post", name: "F1 Fan", handle: "@suzuka_lover", av: "public", initials: "FF", text: "what are those little wooden hut things appearing at turn 2 in suzuka? they look like tiny shrines. anyone know what's going on down there?", likes: 820, rts: 160, platform: "MockTweet" },
  ],
  sections: [
    {
      label: "Buzzin' Corner — The Bee Hotels",
      gap: 1800,
      posts: [
        { type: "photo", name: "Sky Sports F1", handle: "@SkySportsF1", av: "journo", initials: "SF", verified: true, caption: "Live from Suzuka 🐝 Sebastian Vettel has turned Turn 2 into 'Buzzin' Corner' — a row of handmade insect hotels to support local biodiversity, with the kerbs painted yellow and black to match. The whole grid's getting involved. #BuzzinCorner", platform: "MockTweet" },
        { type: "post", name: "Sky Sports F1", handle: "@SkySportsF1", av: "journo", initials: "SF", verified: true, text: "What it's about: 'biodiversity' — protecting the variety of insects, plants and creatures in an ecosystem. Vettel built the hotels with a local carpenter to give insects a home. Bees are the mascot because everyone recognises them, but it's about ALL the little creatures that keep nature working. 🌿", likes: 16400, rts: 3800, platform: "MockTweet" },
        { type: "photo", name: "Sebastian Vettel", handle: "@SebVettel", av: "driver", initials: "SV", verified: true, caption: "Hands-on all afternoon building these with the team. They look like little Japanese shrines 🏯🐝 It's a small thing, but habitat for insects matters more than people realise. Welcome to Buzzin' Corner. #RaceForBiodiversity", platform: "MockTweet" },
      ],
    },
    {
      label: "The Whole Grid Gets Involved",
      gap: 1700,
      posts: [
        { type: "photo", name: "Sky Sports F1", handle: "@SkySportsF1", av: "journo", initials: "SF", verified: true, caption: "Carlos Sainz and Charles Leclerc painting their team's hotel 🎨 Every team on the grid customised one. A rare sight — the whole paddock downing tools to build insect homes together.", platform: "MockTweet" },
        { type: "photo", name: "F1 Media", handle: "@F1", av: "journo", initials: "F1", verified: true, caption: "Drivers and team principals all mucking in and signing their hotels 🐝 This wasn't just a Vettel solo act — it became an F1-wide moment, with FOM, the teams and all 20 drivers backing it.", platform: "MockTweet" },
        { type: "photo", name: "F1 Media", handle: "@F1", av: "journo", initials: "F1", verified: true, caption: "The whole grid, the team bosses and F1's leadership behind the Buzzin' Corner banner 🐝 The banner reads, roughly, 'towards the goal of biodiversity.' Whatever you think of the sport, that's a lot of clout pointed at a genuinely good cause.", platform: "MockTweet" },
      ],
    },
    {
      label: "The Pile-On — 'You're a Hypocrite'",
      gap: 1500,
      posts: [
        { type: "post", name: "Gotcha Greg", handle: "@greg_says_no", av: "public", initials: "GG", text: "An F1 driver. Who flew round the WORLD 23 times a year burning jet fuel and petrol. Lecturing ME about saving the environment. With a little wooden BUG HOUSE. 😂 the hypocrisy is unreal. sit down Seb.", likes: 22400, rts: 9600, platform: "MockTweet" },
        { type: "post", name: "Had Enough", handle: "@fedup_dave", av: "public", initials: "HE", text: "biggest carbon footprint in sport telling us to care about the planet. classic celebrity. do as I say not as I do. cancel the bug hotel and give up the private jet first mate 🙄", likes: 14200, rts: 5800, platform: "MockTweet" },
        { type: "post", name: "Just Saying", handle: "@justsaying_99", av: "public", initials: "JS", text: "every time a rich famous person tells us to be greener I just think... you first. easy to build a bee hotel when you've spent 15 years as one of the highest-polluting athletes alive. pure hypocrite.", likes: 11800, rts: 4200, platform: "MockTweet" },
      ],
    },
    {
      label: "Hang On — These Are Two Different Things",
      gap: 1600,
      posts: [
        { type: "post", name: "Priya — Eco Explainer", handle: "@priya_explains", av: "journo", initials: "PE", text: "Worth a pause here, because there's a muddle in the replies. The bee hotels are about BIODIVERSITY — protecting insect habitats and the variety of life. The 'jet fuel' criticism is about CLIMATE CHANGE — carbon emissions. Related family, but two different issues. 🧵", likes: 19800, rts: 9200, platform: "MockTweet" },
        { type: "post", name: "Priya — Eco Explainer", handle: "@priya_explains", av: "journo", initials: "PE", text: "Which matters because: you can absolutely have a big carbon footprint AND still do genuine good for a local ecosystem by building insect habitats. One doesn't cancel the other out. Attacking a biodiversity project by pointing at his flights is a bit like dismissing someone's litter-pick because they once left a tap running. Different problem.", likes: 16200, rts: 7400, platform: "MockTweet" },
        { type: "post", name: "Tom B", handle: "@tomb_thinks", av: "public", initials: "TB", text: "ok this is a fair point that I hadn't separated in my head. I lumped 'bees' and 'carbon' into one big 'environment' blob and went 'hypocrite.' they're genuinely not the same thing. the bug houses help insects regardless of how he got to Japan. huh.", likes: 13600, rts: 4100, platform: "MockTweet" },
      ],
    },
    {
      label: "How Vettel Actually Handles 'Hypocrite'",
      gap: 1700,
      posts: [
        { type: "post", name: "Priya — Eco Explainer", handle: "@priya_explains", av: "journo", initials: "PE", text: "And here's the genuinely interesting bit. Vettel has been asked the hypocrite question to his face — on BBC Question Time, about the climate side of it. Most people would get defensive. He did the opposite. Watch how he answered, because it's a masterclass. 👇", likes: 17400, rts: 6800, platform: "MockTweet" },
        { type: "reported", source: "Sebastian Vettel — reported, BBC Question Time", context: "Asked directly whether his environmental advocacy made him a hypocrite, given he was part of a 'gas-guzzling' sport, Vettel didn't dodge. He agreed:", quote: "It does, it does, and you're right when you laugh. I'm not a saint.", footer: "His real, reported words. He went on to say he asks himself every day whether travelling the world to race is the right thing — and elsewhere admitted he's 'the biggest hypocrite there is,' adding: we solve the problem not with shame, but by facing it." },
        { type: "post", name: "Priya — Eco Explainer", handle: "@priya_explains", av: "journo", initials: "PE", text: "See what he did? He didn't deny it. He didn't get defensive. He just... agreed. 'Yeah, I'm a hypocrite, I'm not a saint.' And then kept advocating anyway. You literally cannot 'gotcha' someone who has already conceded the point. It completely defuses the attack.", likes: 21200, rts: 9800, platform: "MockTweet" },
      ],
    },
    {
      label: "Why 'Hypocrite!' Is Often a Trap",
      gap: 1600,
      posts: [
        { type: "post", name: "Dr Aisha Bello", handle: "@draishabello", av: "public", initials: "AB", text: "There's a thinking trap hiding in all this. 'You're a hypocrite' is often used online not as a real argument, but as a CONVERSATION-ENDER — a way to dismiss someone so you don't have to engage with what they actually said. It feels like a checkmate. Usually it isn't. 🧠", likes: 24600, rts: 11200, platform: "MockTweet" },
        { type: "post", name: "Dr Aisha Bello", handle: "@draishabello", av: "public", initials: "AB", text: "Because if the rule is 'only perfect people are allowed to advocate for anything,' then NOBODY can ever speak up — we're all hypocrites about something. The doctor who tells you to exercise but skips the gym is still right about exercise. Imperfect-but-trying beats pure-but-silent.", likes: 21800, rts: 10400, platform: "MockTweet" },
        { type: "post", name: "Gotcha Greg", handle: "@greg_says_no", av: "public", initials: "GG", text: "ok fine, I'll be honest — I mostly said 'hypocrite' because it's an easy dunk and I didn't have to think harder than that. the bug houses do help bees whether or not he flies. and 'I'm not a saint' is a better answer than I'd have given. annoying when the point survives the dunk. 🐝", likes: 18400, rts: 6200, platform: "MockTweet" },
      ],
    },
    {
      label: "The Lesson — Two Things to Take Away",
      gap: 1800,
      posts: [
        { type: "twolesson", title: "Gotcha vs Good Faith", left: { label: "The gotcha", points: [
          "Lumps all 'environment' into one blob (bees = carbon)",
          "Uses 'hypocrite!' to dismiss, not to engage",
          "Demands purity: only saints may speak",
          "Ends the conversation",
        ] }, right: { label: "Good faith", points: [
          "Separates the issues: biodiversity ≠ climate",
          "Owns the contradiction honestly ('I'm not a saint')",
          "Accepts imperfect-but-trying as legitimate",
          "Keeps doing the small positive thing anyway",
        ] }, verdict: "The bug houses help insects regardless of how Vettel got to Japan — and 'I'm a hypocrite, but I'm trying' is a stronger, more honest answer than denial." },
        { type: "post", name: "Priya — Eco Explainer", handle: "@priya_explains", av: "journo", initials: "PE", text: "Two clean takeaways. ONE: tell issues apart. 'Environment' isn't one thing — biodiversity and climate are different, and a flight doesn't undo a bee hotel. TWO: 'hypocrite' is often a lazy off-ramp from actually thinking. Owning your contradictions and still trying is more honest than pretending you're pure. 🐝🧠", likes: 26400, rts: 12800, platform: "MockTweet" },
        { type: "post", name: "Tom B", handle: "@tomb_thinks", av: "public", initials: "TB", text: "the bit that'll stick with me: next time I'm about to type 'lol hypocrite' under someone, ask — am I making a real point, or just ending the conversation so I don't have to engage? usually it's the second one. the bees don't care about the dunk. they just got a new house. 🐝", likes: 22600, rts: 9400, platform: "MockTweet" },
        { type: "verdict", tone: "win", label: "The Verdict",
          heading: "Imperfect-But-Trying Beats Pure-But-Silent",
          body: "Vettel turned a Suzuka corner into 'Buzzin' Corner' — handmade insect hotels for biodiversity, backed by the whole grid. The predictable reply: 'hypocrite — you fly the world burning fuel.' Two things untangle it. First, tell the issues apart: the bee hotels are about biodiversity (insect habitats); the jet-fuel jibe is about climate (carbon). Related, but different — and a big carbon footprint doesn't cancel out genuine good done for a local ecosystem. Second, 'hypocrite!' is usually a conversation-ender, not an argument — a way to dismiss someone without engaging. If only perfect people may advocate, nobody can, because everyone is a hypocrite about something. Vettel's answer is the masterclass: asked to his face, he simply agreed — 'I'm not a saint' — and kept advocating, which defuses the gotcha entirely. The honest move isn't pretending you're pure; it's owning the contradiction and still doing the small good thing. The bees got a house regardless of how he got to Japan." },
        { type: "impact", title: "Hypocrite, or Just Honest?", stats: [
          { num: "2", label: "Different issues people blur into one: biodiversity vs climate" },
          { num: "'I'm not a saint'", label: "How you defuse a hypocrisy gotcha: own it" },
          { num: "20", label: "Drivers who backed the biodiversity project" },
          { num: "0", label: "Bee hotels made less useful by Seb's flights" },
        ] },
      ],
    },
  ],
  tasks: [
    {
      type: "mcq",
      id: "bh-q1",
      prompt: "What two different issues do people blur together in the 'hypocrite' attack?",
      options: [
        "Bees and wasps",
        "Biodiversity (insect habitats) and climate change (carbon emissions) — related, but not the same",
        "Racing and golf",
        "Sponsorship and salary",
      ],
      correctIndex: 1,
      explanation:
        "The bee hotels address biodiversity; the jet-fuel criticism is about climate. Lumping them into one 'environment' blob is what makes the gotcha seem to land.",
    },
    {
      type: "mcq",
      id: "bh-q2",
      prompt: "Why doesn't Vettel's carbon footprint cancel out the bee hotels?",
      options: [
        "Because he doesn't really fly",
        "Because doing genuine good for a local ecosystem is a separate thing from your overall emissions — one doesn't undo the other",
        "Because bees absorb carbon",
        "Because the hotels are fake",
      ],
      correctIndex: 1,
      explanation:
        "The insect habitats help regardless of how he travelled. Dismissing a biodiversity project by pointing at flights attacks a different problem entirely.",
    },
    {
      type: "mcq",
      id: "bh-q3",
      prompt: "How is 'you're a hypocrite' often used online, according to the story?",
      options: [
        "As a careful, evidence-based argument",
        "As a conversation-ender — a way to dismiss someone without engaging with what they actually said",
        "As a compliment",
        "As a legal term",
      ],
      correctIndex: 1,
      explanation:
        "It feels like a checkmate but usually isn't an argument at all — it's an off-ramp that lets you avoid engaging with the actual point.",
    },
    {
      type: "mcq",
      id: "bh-q4",
      prompt: "What's wrong with the 'only perfect people may advocate' rule?",
      options: [
        "Nothing — only saints should speak",
        "It silences everyone, because we're all hypocrites about something — imperfect-but-trying still beats pure-but-silent",
        "It applies only to athletes",
        "It makes advocacy more effective",
      ],
      correctIndex: 1,
      explanation:
        "A doctor who skips the gym is still right about exercise. Demanding purity as the price of speaking would mean no one could ever advocate for anything.",
    },
    {
      type: "mcq",
      id: "bh-q5",
      prompt: "Why was Vettel's 'I'm not a saint' such an effective response?",
      options: [
        "It denied the criticism outright",
        "By simply conceding the contradiction and continuing anyway, he removed the gotcha's power — you can't 'catch out' someone who already agreed",
        "It attacked the questioner",
        "It changed the subject",
      ],
      correctIndex: 1,
      explanation:
        "Defensiveness feeds a gotcha; honest agreement starves it. Owning the contradiction and carrying on is disarming and more credible.",
    },
    {
      type: "mcq",
      id: "bh-q6",
      prompt: "What useful self-check does Tom B land on?",
      options: [
        "How many likes will my dunk get?",
        "Am I making a real point, or just ending the conversation so I don't have to engage?",
        "Who is the most famous person here?",
        "Is the target rich?",
      ],
      correctIndex: 1,
      explanation:
        "Before typing 'lol hypocrite', asking whether you're actually arguing or just dismissing is the difference between good-faith engagement and a lazy dunk.",
    },
    {
      type: "mcq",
      id: "bh-q7",
      prompt: "What does the whole grid backing 'Buzzin' Corner' add to the story?",
      options: [
        "It proves it was pointless",
        "It shows real collective clout pointed at a genuine cause — bigger than one driver's gesture",
        "It means Vettel did nothing",
        "It was a sponsor stunt only",
      ],
      correctIndex: 1,
      explanation:
        "FOM, the teams and all 20 drivers getting involved turned a solo act into an F1-wide moment — a lot of influence aimed at a concrete, local good.",
    },
    {
      type: "mcq",
      id: "bh-q8",
      prompt: "What is the cleanest overall takeaway?",
      options: [
        "Never care about the environment",
        "Tell issues apart, and treat 'hypocrite' as a prompt to think — not as proof you've won",
        "Only perfect people should post",
        "Bees are more important than carbon",
      ],
      correctIndex: 1,
      explanation:
        "Separate biodiversity from climate, and recognise that 'hypocrite' is usually a thinking-stopper. Imperfect, honest action still counts.",
    },
    {
      type: "written",
      id: "bh-w1",
      prompt:
        "Explain why 'biodiversity' and 'climate' are different issues, and why that distinction defeats the 'hypocrite' attack on the bee hotels.",
      placeholder:
        "What does each issue concern? Why doesn't a flight undo a bee hotel?…",
    },
    {
      type: "written",
      id: "bh-w2",
      prompt:
        "Why is 'you're a hypocrite' often a conversation-ender rather than an argument? What does it let people avoid?",
      placeholder:
        "What does the accuser get to skip? Does it actually address the point made?…",
    },
    {
      type: "written",
      id: "bh-w3",
      prompt:
        "'Imperfect-but-trying beats pure-but-silent.' Do you agree? Use the doctor-who-skips-the-gym example or your own.",
      placeholder:
        "If only perfect people can advocate, who's left to speak?…",
    },
    {
      type: "written",
      id: "bh-w4",
      prompt:
        "Vettel answered the hypocrite charge by agreeing with it. Explain why owning a contradiction can be stronger than denying it.",
      placeholder:
        "What happens to a 'gotcha' when the target concedes the point?…",
    },
    {
      type: "written",
      id: "bh-w5",
      prompt:
        "Next time you're about to call someone a hypocrite online, what would you check first — and why?",
      placeholder:
        "Real point or conversation-ender? Same issue or two different ones?…",
    },
  ],
};
