// Authored Scenario — Kurt Zouma, when a private video goes public (2022).
// Ported from the HTML POC. A fixed documentary timeline; authored, never
// simulated (ADR-0006). Shares the beat/task types defined in ./red-bull.
// Note: the source act is animal cruelty; like the POC, the content is never
// described — the teaching focus is privacy and real-world accountability.
import type { Scenario } from "./red-bull";

export const ZOUMA_SCENARIO: Scenario = {
  id: "zouma-cat",
  badge: "Scenario",
  title: "Kurt Zouma — When a Private Video Goes Public (2022)",
  prePosts: [
    { type: "post", name: "Premier League Daily", handle: "@pldaily", av: "journo", initials: "PL", verified: true, text: "A quiet-ish week in the Premier League calendar... or so everyone thought before this morning. Sometimes the biggest football story of the week doesn't happen on the pitch at all. 👀", likes: 2200, rts: 420, platform: "MockTweet" },
    { type: "post", name: "Footy Fan", handle: "@clarets_andy", av: "public", initials: "FF", text: "woke up to my whole timeline talking about a video involving a premier league player. haven't even seen it yet and people are already furious. what's gone on??", likes: 480, rts: 80, platform: "MockTweet" },
  ],
  sections: [
    {
      label: "A Private Video Escapes",
      gap: 1800,
      posts: [
        { type: "post", name: "UK Football News", handle: "@ukfootynews", av: "journo", initials: "UF", verified: true, text: "A video has gone viral appearing to show West Ham defender Kurt Zouma mistreating his pet cat. It was reportedly filmed by his own brother and posted to Snapchat — then spread everywhere within hours. West Ham say they're aware and are addressing it. 🐱", likes: 64200, rts: 38600, platform: "MockTweet" },
        { type: "post", name: "Just Megan", handle: "@megan_h", av: "public", initials: "JM", text: "I'm not going to describe what's in that video because it's horrible and I wish I hadn't seen it. but the thing that strikes me is — this was filmed on a PHONE, by a family member, meant for a private Snapchat. and now the entire planet has seen it. there's no such thing as 'private' anymore.", likes: 48400, rts: 14200, platform: "MockTweet" },
        { type: "post", name: "Digital Footprint Dan", handle: "@dan_online", av: "public", initials: "DD", text: "let this be the lesson burned into every teenager's brain: 'it was only on a private story / only sent to one person' is NOT private. one screen recording, one share, and it's everywhere forever. you have zero control once it leaves your phone. zero.", likes: 36800, rts: 12400, platform: "MockTweet" },
      ],
    },
    {
      label: "The Outrage — This Isn't Blowing Over",
      gap: 1600,
      posts: [
        { type: "post", name: "Animal Lovers UK", handle: "@animallovers_uk", av: "public", initials: "AL", text: "The reaction has been absolutely enormous. This isn't a few angry tweets that fade by lunchtime — it's national news, it's trending all day, and the RSPCA has confirmed they're now investigating. The public is not letting this one go. 🐾", likes: 52600, rts: 18800, platform: "MockTweet" },
        { type: "post", name: "RSPCA (statement)", handle: "@RSPCA_official", av: "official", initials: "RS", verified: true, text: "We are aware of the video circulating online and are looking into it as a priority. Animal cruelty is taken extremely seriously and we are working to establish the welfare of the animals involved. 🐈", likes: 78400, rts: 32200, platform: "MockTweet" },
        { type: "post", name: "Kurt Zouma (statement)", handle: "@KurtZouma", av: "official", initials: "KZ", verified: true, text: "I want to apologise for my actions. There are no excuses for my behaviour, which I sincerely regret. I love and care for my pets and this was an isolated incident that will not happen again. (His real, public apology.)", likes: 14200, rts: 6800, platform: "MockTweet" },
      ],
    },
    {
      label: "The Consequences — Outrage With Teeth",
      gap: 1500,
      posts: [
        { type: "post", name: "UK Football News", handle: "@ukfootynews", av: "journo", initials: "UF", verified: true, text: "🚨 The consequences are coming thick and fast now — and they are SERIOUS. This is what happens when public outrage has real weight behind it. Here's the running total of what that viral video has cost him. 👇", likes: 41200, rts: 16400, platform: "MockTweet" },
        { type: "consequences", title: "What the video cost him", items: [
          { icon: "🐱", label: "Cats removed", detail: "The RSPCA took his two cats into care." },
          { icon: "💷", label: "Fined ~£250,000", detail: "West Ham fined him the maximum two weeks' wages — donated to animal welfare." },
          { icon: "👟", label: "Dropped by Adidas", detail: "His sponsor ended their deal with him." },
          { icon: "⚖️", label: "Prosecuted", detail: "Charged under the Animal Welfare Act." },
          { icon: "🧹", label: "180 hours community service", detail: "Plus a ban on keeping cats for five years." },
        ], footer: "A private clip, filmed by a family member, intended for Snapchat — turned into one of the most expensive home videos in football." },
        { type: "post", name: "Law & Footy", handle: "@lawandfooty", av: "public", initials: "LF", text: "important to clock what's happening here: this didn't stay 'internet anger.' it became an RSPCA investigation, a criminal prosecution, a sentence, lost sponsorship and a club fine. online outrage, when it's about something real and serious, can absolutely translate into real-world accountability. it has teeth.", likes: 33600, rts: 11800, platform: "MockTweet" },
      ],
    },
    {
      label: "The Row — He's Still in the Team?",
      gap: 1600,
      posts: [
        { type: "post", name: "UK Football News", handle: "@ukfootynews", av: "journo", initials: "UF", verified: true, text: "Despite the national outcry and an active RSPCA investigation, West Ham named Kurt Zouma in their starting XI for the very next match. The decision has gone down... badly. 😬", likes: 38400, rts: 14600, platform: "MockTweet" },
        { type: "post", name: "Hammers Til I Die", handle: "@hammers_til", av: "public", initials: "HD", text: "as a West Ham fan I'm genuinely uncomfortable. I love this club but playing him 48 hours after THAT, while the country's furious and the RSPCA's investigating? reads like we care more about three points than about doing the right thing. not a good look at all.", likes: 27200, rts: 9400, platform: "MockTweet" },
        { type: "post", name: "Terrace Talk", handle: "@terracetalk", av: "public", initials: "TT", text: "and here's the thing the club maybe didn't think through: if you keep playing him, you've just painted a giant target on his back. every opposition crowd for the rest of the season now has their song ready. you haven't protected him — you've served him up. 🎯", likes: 31800, rts: 12200, platform: "MockTweet" },
      ],
    },
    {
      label: "The Away Game — The Crowd Has Its Say",
      gap: 1500,
      posts: [
        { type: "post", name: "Matchday Live", handle: "@matchdaylive", av: "journo", initials: "ML", verified: true, text: "Zouma's first away game since the video — at Anfield. And the moment his name was read out, the entire away end knew exactly what was coming. This is going to be a LONG ninety minutes for him. 🐱🔊", likes: 48600, rts: 21400, platform: "MockTweet" },
        { type: "terrace", stadium: "Anfield", chants: [
          "🐱 MEOOOOW — every single time he touches the ball",
          "🎵 \"Leave that cat alone!\" — sung by the terraces, all game",
          "🔊 A wall of cat noises swelling every time he steps up to defend",
        ], note: "Tens of thousands of fans turning a stadium into one long, relentless, darkly funny act of public shaming — ninety minutes of it, no let-up." },
        { type: "post", name: "Footy Banter", handle: "@footybanter", av: "public", initials: "FB", text: "the ENTIRE ground meowing every time Zouma gets the ball 😭 and then 40,000 people singing 'leave that cat alone' in unison. brutal. relentless. and honestly? hard to say he didn't bring it on himself. the crowd has appointed itself judge, jury and choir.", likes: 52200, rts: 19800, platform: "MockTweet" },
        { type: "post", name: "Terrace Talk", handle: "@terracetalk", av: "public", initials: "TT", text: "this is just what football crowds DO. the second something like this comes out about a player, every away end becomes a courtroom and the verdict is sung at full volume for 90 minutes. you can't escape it, you can't out-run it. the terraces are the fastest court in the land. ⚖️🎵", likes: 36400, rts: 13600, platform: "MockTweet" },
      ],
    },
    {
      label: "The Lesson — Three Things",
      gap: 1800,
      posts: [
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "Setting aside the football, this whole saga is a near-perfect lesson in how the online world actually works. Three things to take from it. 🧵👇", likes: 28400, rts: 11200, platform: "MockTweet" },
        { type: "twolesson", title: "Three Truths From One Viral Clip", left: { label: "Nothing is truly private", points: [
          "Filmed by a family member, meant for Snapchat",
          "One share and it reached the entire world",
          "Cost him his cats, ~£250k, a sponsor and a record",
          "Once it leaves your phone, you have zero control",
        ] }, right: { label: "Outrage can have teeth", points: [
          "Not just angry tweets — RSPCA, courts, a sentence",
          "Public anger drove real-world accountability",
          "And the crowd became an instant court of opinion",
          "Ninety minutes of it, with no escape",
        ] }, verdict: "A few seconds of footage, never meant to be seen, reshaped his career, his finances and his reputation. That's the reach of one shared clip." },
        { type: "post", name: "Digital Footprint Dan", handle: "@dan_online", av: "public", initials: "DD", text: "the single most important takeaway for anyone with a phone: assume anything you record or send COULD end up public. not because it should — because it can. 'it was private' is not a defence the internet recognises. behave online like the whole world might be watching, because one day it might be. 📱", likes: 31600, rts: 13800, platform: "MockTweet" },
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "And the football bit is its own lesson: a crowd is a powerful, instant, collective form of public accountability. When a club kept selecting him, it didn't make the story go away — it gave 40,000 people a weekly opportunity to remind everyone. Public opinion finds a stage whether you give it one or not.", likes: 24200, rts: 9600, platform: "MockTweet" },
        { type: "verdict", tone: "cautionary", label: "The Verdict",
          heading: "Nothing Online Is Truly Private — and Outrage Can Have Teeth",
          body: "A few seconds of footage, filmed by a family member for a private Snapchat, reached the entire world within hours — and reshaped Kurt Zouma's finances, career and reputation. Two lessons sit on top of each other. First: 'private' barely exists once something leaves your phone; one share and you have zero control, permanently. Second: when public anger is about something real and serious, it doesn't just fade — here it became an RSPCA investigation, a criminal prosecution and sentence, a dropped sponsor and a club fine. And when his club kept selecting him, the crowd simply became the courtroom, game after game. Online outrage aimed at something real has teeth — and a stage it will find with or without permission." },
        { type: "impact", title: "Nothing Online Is Truly Private", stats: [
          { num: "1", label: "Private clip that escaped to the whole world" },
          { num: "~£250k", label: "Club fine — plus a dropped sponsor" },
          { num: "180 hrs", label: "Community service, plus a 5-year cat ban" },
          { num: "90 mins", label: "Of cat calls, with nowhere to hide" },
        ] },
      ],
    },
  ],
  tasks: [
    {
      type: "mcq",
      id: "kz-q1",
      prompt: "What is the central privacy lesson of this case?",
      options: [
        "Snapchat videos are automatically safe",
        "A clip meant for a private Snapchat reached the whole world — once content leaves your phone you have no control over it",
        "Only public posts can spread",
        "Deleting a video removes every copy",
      ],
      correctIndex: 1,
      explanation:
        "The video was filmed by a family member for a private Snapchat, yet spread everywhere within hours. One screen-recording or share and it's permanent and public — you have zero control once it leaves your device.",
    },
    {
      type: "mcq",
      id: "kz-q2",
      prompt: "How does the internet treat the defence 'but it was private'?",
      options: [
        "It fully protects you from consequences",
        "It doesn't recognise it — one share makes it public and permanent",
        "It only applies to videos, not photos",
        "It guarantees the content stays among friends",
      ],
      correctIndex: 1,
      explanation:
        "'It was private' is not a defence the internet recognises. The realistic assumption is that anything you record or send could become public.",
    },
    {
      type: "mcq",
      id: "kz-q3",
      prompt: "Commentators said the outrage 'had teeth'. What does that mean here?",
      options: [
        "It was a few angry tweets that faded by lunchtime",
        "Online anger translated into real-world accountability — an RSPCA investigation, prosecution, a sentence, a dropped sponsor and a club fine",
        "It only affected his social media following",
        "It led to nothing concrete",
      ],
      correctIndex: 1,
      explanation:
        "This wasn't anger that evaporated. Because it concerned something real and serious, it produced concrete consequences in the real world — legal, financial and professional.",
    },
    {
      type: "mcq",
      id: "kz-q4",
      prompt: "Why did West Ham's decision to keep selecting him backfire?",
      options: [
        "It made the story disappear",
        "It gave tens of thousands of fans a weekly stage to remind everyone — 'painting a target on his back' rather than protecting him",
        "It improved the club's reputation",
        "It ended the RSPCA investigation",
      ],
      correctIndex: 1,
      explanation:
        "Continuing to play him didn't make it go away — every away crowd got a fresh chance to react, and it signalled the club valued points over doing the right thing.",
    },
    {
      type: "mcq",
      id: "kz-q5",
      prompt: "The Anfield crowd's reaction is an example of…",
      options: [
        "A private conversation",
        "An instant, collective form of public accountability — 'the fastest court in the land'",
        "An official legal verdict",
        "A club statement",
      ],
      correctIndex: 1,
      explanation:
        "A crowd acts as a powerful, immediate form of public opinion. It isn't a legal process, but it's a stage that public anger will find whether the club provides one or not.",
    },
    {
      type: "mcq",
      id: "kz-q6",
      prompt: "Why didn't this outrage simply blow over, when much online anger does?",
      options: [
        "Because it was a slow news week",
        "Because it concerned a real, serious, verifiable act, with an identifiable person and an authority (the RSPCA) acting on it",
        "Because the player ignored it",
        "Because the club apologised first",
      ],
      correctIndex: 1,
      explanation:
        "Outrage tends to fade when it's vague or unverifiable. Here the act was real and serious, the person identifiable, and official bodies stepped in — so it persisted and produced consequences.",
    },
    {
      type: "mcq",
      id: "kz-q7",
      prompt: "What is the key digital-footprint takeaway for anyone with a phone?",
      options: [
        "Only post on public accounts",
        "Assume anything you record or send could end up public, and behave accordingly",
        "Never use a phone camera",
        "Private messages can never be screenshotted",
      ],
      correctIndex: 1,
      explanation:
        "The realistic rule is 'it can, not it should': treat anything recordable as potentially public one day, because control vanishes the moment it leaves your device.",
    },
    {
      type: "mcq",
      id: "kz-q8",
      prompt: "Why did the sponsor (Adidas) end the deal quickly?",
      options: [
        "Because his form had dropped",
        "Because brands are judged by who they associate with — continued association would attach the controversy to the brand",
        "Because his contract had expired anyway",
        "Because fans asked for a new boot design",
      ],
      correctIndex: 1,
      explanation:
        "Sponsorship is an association of values. Staying attached to a figure at the centre of a cruelty case would transfer that reputational risk onto the brand, so they cut ties fast.",
    },
    {
      type: "mcq",
      id: "kz-q9",
      prompt: "Which best describes how the club SHOULD have weighed the next-match decision?",
      options: [
        "Pick the strongest team and ignore the public mood entirely",
        "Balance sporting choices against the seriousness of the situation and the message selection sends — not treat it as business as usual",
        "Let the players vote on it",
        "Issue no comment and hope it passed",
      ],
      correctIndex: 1,
      explanation:
        "Treating it as a normal selection call missed the point. The decision carried a values message, and ignoring that is what drew the backlash and the season-long crowd response.",
    },
    {
      type: "mcq",
      id: "kz-q10",
      prompt: "A fair word of caution about crowd-driven 'justice' is that…",
      options: [
        "Crowds are always right",
        "Crowd reaction is powerful but isn't due process — it can be disproportionate or misdirected, even when (as here) it tracks a proven, serious act",
        "Crowd reaction has no effect on anyone",
        "Only courts ever influence behaviour",
      ],
      correctIndex: 1,
      explanation:
        "Here the anger matched a real, proven act handled by proper legal process. But crowd judgement isn't due process and can get things wrong — worth holding both truths at once.",
    },
    {
      type: "written",
      id: "kz-w1",
      prompt:
        "Explain why 'it was private' is not a defence the internet recognises, using this case as your example.",
      placeholder:
        "Where was the video meant to go? How did it spread? What control did he have once it left the phone?…",
    },
    {
      type: "written",
      id: "kz-w2",
      prompt:
        "'Online outrage can have teeth.' Explain how anger turned into real-world accountability here, and what made this case different from outrage that fades by lunchtime.",
      placeholder:
        "List the concrete consequences, and think about why this one persisted…",
    },
    {
      type: "written",
      id: "kz-w3",
      prompt:
        "The club kept selecting him. Explain why that decision backfired, and what it suggested about the club's priorities.",
      placeholder:
        "Think about the 'target on his back' point and the message selection sent…",
    },
    {
      type: "written",
      id: "kz-w4",
      prompt:
        "A crowd became 'an instant court'. Discuss the power AND the risks of crowds acting as public accountability — is it always fair or proportionate?",
      placeholder:
        "When does crowd reaction track real wrongdoing, and when can it go too far or target the wrong person?…",
    },
    {
      type: "written",
      id: "kz-w5",
      prompt:
        "You advise West Ham (or the sponsor) the morning the video breaks. What would you do, and why?",
      placeholder:
        "Consider statements, selection, sponsorship, tone, and acting on facts vs reacting to noise…",
    },
    {
      type: "written",
      id: "kz-w6",
      prompt:
        "What should this saga teach anyone with a phone about what they record, send, or allow others to film?",
      placeholder:
        "Think about control, permanence, and behaving as if anything could become public…",
    },
  ],
};
