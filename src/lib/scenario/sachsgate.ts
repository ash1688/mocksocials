// Authored Scenario — Sachsgate (2008/09). Ported from the HTML POC. A fixed
// documentary timeline; authored, never simulated (ADR-0006). Shares the beat/
// task types defined in ./red-bull. Framed as a "Media Files" investigation.
import type { Scenario } from "./red-bull";

export const SACHSGATE_SCENARIO: Scenario = {
  id: "sachsgate",
  badge: "Scenario",
  title: "Sachsgate — How a Newspaper Made 44,000 Complaints (2008/09)",
  prePosts: [
    { type: "post", name: "BBC News", handle: "@BBCNews", av: "journo", initials: "BB", verified: true, text: "BREAKING: Ofcom has this morning published its ruling on the Russell Brand and Jonathan Ross voicemail scandal. The BBC has been fined £150,000 — the largest decency fine ever imposed on the corporation. Full findings below. 🔴", likes: 28400, rts: 12600, platform: "MockTweet" },
    { type: "post", name: "Media Watcher", handle: "@mediawatcher_uk", av: "public", initials: "MW", text: "Sachsgate fine is in. £150,000. Five months after it all kicked off. And if you want to understand what actually happened here — not just the scandal but the MECHANICS of it — the Media Files have a full breakdown landing today. Worth your time.", likes: 3800, rts: 1100, platform: "MockTweet" },
  ],
  sections: [
    {
      label: "Cold Open — The Verdict",
      gap: 1800,
      posts: [
        { type: "broadcast", show: "The Media Files", segment: "Maitlis & Gable", headline: "Sachsgate: How Britain's Biggest Complaints Scandal Was Made", standfirst: "Ofcom has today fined the BBC £150,000 over the Russell Brand and Jonathan Ross voicemail scandal. Today we ask: what exactly happened, who is really accountable — and how did two complaints become forty-four thousand?" },
        { type: "post", name: "The Media Files", handle: "@TheMediaFiles", av: "creator", initials: "MF", creator: true, text: "JAMES: I'm James. MAITLIS: This is Maitlis. — Today's episode. Ofcom drops the Sachsgate fine. £150,000. The biggest decency fine the BBC has ever received. But to understand what this actually means, we need to go back to October 2008 — and to the number two. As in: two complaints. That's where this started. 🎙️", likes: 8400, rts: 2200, platform: "MockTweet" },
      ],
    },
    {
      label: "Backstory — The Calls Nobody Noticed",
      gap: 1700,
      posts: [
        { type: "post", name: "The Media Files", handle: "@TheMediaFiles", av: "creator", initials: "MF", creator: true, text: "MAITLIS: The Russell Brand Show, BBC Radio 2, 18th October 2008. Pre-recorded. Brand and his guest Jonathan Ross attempt to call the actor Andrew Sachs for a segment. Sachs doesn't answer. They leave voicemails. Explicit ones. About Sachs's granddaughter. The show is pre-recorded, edited, and broadcast anyway. Two people complain. Two. The world moves on.", likes: 6200, rts: 1800, platform: "MockTweet" },
        { type: "post", name: "The Media Files", handle: "@TheMediaFiles", av: "creator", initials: "MF", creator: true, text: "JAMES: And here's the thing that doesn't get said enough — this wasn't live. There was no split-second decision under pressure. Someone at the BBC listened to those messages, and decided to broadcast them. MAITLIS: Exactly. This is an editorial choice. Made by a production team. With time to think. That matters enormously when we talk about accountability later. 🎙️", likes: 7400, rts: 2600, platform: "MockTweet" },
        { type: "post", name: "The Media Files", handle: "@TheMediaFiles", av: "creator", initials: "MF", creator: true, text: "MAITLIS: And there's a detail in the Ofcom report that should have been the headline. The producer responsible for compliance — the person whose job it was to stop this going out — was on loan from Brand's own independent production company. Hadn't been trained in BBC decency standards. The BBC's safeguard was Brand's employee. Let that sit. 🎙️", likes: 9200, rts: 3400, platform: "MockTweet" },
      ],
    },
    {
      label: "The Fuse — Mail on Sunday",
      gap: 1500,
      posts: [
        { type: "post", name: "The Media Files", handle: "@TheMediaFiles", av: "creator", initials: "MF", creator: true, text: "MAITLIS: Eight days later. The Mail on Sunday publishes. And then — watch this number. 👇", likes: 8800, rts: 2800, platform: "MockTweet" },
        { type: "counttimeline", title: "From 2 complaints to 44,790 — in four days", rows: [
          { date: "18 Oct 2008", event: "Show broadcast", count: "~2" },
          { date: "26 Oct 2008", event: "Mail on Sunday article published", count: "Still ~2" },
          { date: "28 Oct (morning)", event: "BBC announces", count: "4,700" },
          { date: "28 Oct (afternoon)", event: "Gordon Brown condemns it publicly", count: "10,000+" },
          { date: "29 Oct", event: "Brand and Ross suspended", count: "18,000+" },
          { date: "Final total", event: "BBC + Ofcom combined", count: "44,790", final: true },
        ], footer: "The vast majority of those 44,790 people had never heard the original broadcast. They complained about something they read about in a newspaper." },
        { type: "post", name: "The Media Files", handle: "@TheMediaFiles", av: "creator", initials: "MF", creator: true, text: "JAMES: That is a staggering escalation. MAITLIS: In four days. Without social media as we understand it today. A single newspaper article did what a viral tweet does in 2009. The mechanism is exactly the same — find the outrage, amplify it, watch the institutions panic. The platform changed. The psychology didn't. 🎙️", likes: 12400, rts: 4800, platform: "MockTweet" },
      ],
    },
    {
      label: "The Pile-On — Politicians, Press, Public",
      gap: 1600,
      posts: [
        { type: "post", name: "Media Watcher", handle: "@mediawatcher_uk", av: "public", initials: "MW", text: "Gordon Brown — the actual Prime Minister — has condemned a prank call on a Radio 2 show. Fifteen MPs have signed a motion. The Chair of the Culture Select Committee has called for a BBC investigation. All of this for a show that, when it aired, received two complaints. TWO.", likes: 14200, rts: 6800, platform: "MockTweet" },
        { type: "post", name: "Public Viewer", handle: "@justatelevision", av: "public", initials: "PV", text: "just complained to the BBC about sachsgate. haven't heard the actual show but what I've read in the papers is absolutely disgusting. this kind of behaviour has no place on the BBC full stop", likes: 4200, rts: 1200, platform: "MockTweet" },
        { type: "post", name: "Media Watcher", handle: "@mediawatcher_uk", av: "public", initials: "MW", text: "and THAT tweet is the whole lesson. a completely genuine reaction — but to something they've only read about. not heard. the complaints weren't about the show. they were about the COVERAGE OF the show. those are different things.", likes: 18600, rts: 8200, platform: "MockTweet" },
        { type: "post", name: "Emily Maitlis", handle: "@EmilyMaitlis", av: "journo", initials: "EM", verified: true, text: "This is Maitlis. Follow the incentives. Politicians condemning a radio prank are not primarily concerned with Andrew Sachs. They're concerned with being SEEN to be concerned. That's not cynicism — it's how political media works. Ask: who benefits from the pile-on? Then look at who's doing the piling.", likes: 22400, rts: 9600, platform: "MockTweet" },
      ],
    },
    {
      label: "The Voice That Got Lost",
      gap: 1700,
      posts: [
        { type: "post", name: "The Media Files", handle: "@TheMediaFiles", av: "creator", initials: "MF", creator: true, text: "JAMES: There's something that's been bothering me through all of this. The whole scandal was supposedly about protecting Georgina Baillie. But where was her voice in it? MAITLIS: It was almost entirely absent. Politicians, newspaper editors, BBC executives, Brand himself — everyone had a platform. The woman the calls were actually about? An afterthought. 🎙️", likes: 16400, rts: 6800, platform: "MockTweet" },
        { type: "reported", source: "Georgina Baillie — reported comments", context: "Years later, reflecting on how the scandal played out and how she was discussed at the time:", quote: "Slut shaming was totally fine back then, so I was an easy target.", footer: "Her own words on how she was treated in the coverage. The scandal that was supposedly about protecting her dignity largely discussed her without her. That absence is its own lesson." },
        { type: "post", name: "Emily Maitlis", handle: "@EmilyMaitlis", av: "journo", initials: "EM", verified: true, text: "This is Maitlis. Georgina Baillie was the subject of those calls — made about her, without her prior knowledge or consent. The public row that followed was largely conducted without her. Gordon Brown spoke. Fifteen MPs spoke. The Mail spoke at length. She was the headline. She was not the conversation. Remember that when you think about who 'outrage' actually serves.", likes: 28600, rts: 12400, platform: "MockTweet" },
      ],
    },
    {
      label: "The Ofcom Verdict — April 2009",
      gap: 1600,
      posts: [
        { type: "broadcast", show: "BBC News", segment: "Breaking — April 2009", headline: "Ofcom fines BBC £150,000 over Sachsgate", standfirst: "The broadcasting regulator has handed the BBC its largest-ever decency fine following the Russell Brand and Jonathan Ross voicemail scandal. Ofcom called the content 'gratuitously offensive, humiliating and demeaning' and cited a catalogue of editorial and managerial failures.", ticker: "SACHSGATE FINE · BBC FINED £150,000 · OFCOM: 'EXTRAORDINARY FAILURES' · FINE PAID BY LICENCE FEE PAYERS" },
        { type: "post", name: "Media Watcher", handle: "@mediawatcher_uk", av: "public", initials: "MW", text: "£150,000 fine. Sounds significant. Note that Jonathan Ross was earning £6 million a year from the BBC at the time. And note that the fine is paid by licence fee payers — the public. We were offended, we complained, and now WE pay the fine. Interesting model.", likes: 24200, rts: 9800, platform: "MockTweet" },
        { type: "post", name: "Emily Maitlis", handle: "@EmilyMaitlis", av: "journo", initials: "EM", verified: true, text: "This is Maitlis. The Ofcom report says Brand had already been classified as 'high risk' by BBC management before any of this. They knew. They kept him on. The compliance producer was from his own company. That's not one bad decision — that's a system that wasn't working. The fine is paid by you, the licence payer. Think about that.", likes: 32400, rts: 14200, platform: "MockTweet" },
        { type: "post", name: "The Media Files", handle: "@TheMediaFiles", av: "creator", initials: "MF", creator: true, text: "MAITLIS: Brand argued later that the scandal was partly driven by an anti-BBC agenda in sections of the press. JAMES: Is he wrong? MAITLIS: He's not entirely wrong. The Mail had reasons of its own to run hard at the BBC. That doesn't mean the calls weren't genuinely offensive. Both things can be true. But when a newspaper manufactures outrage, it's worth asking why. 🎙️", likes: 19600, rts: 8400, platform: "MockTweet" },
      ],
    },
    {
      label: "The Lesson — Maitlis Signs Off",
      gap: 1800,
      posts: [
        { type: "post", name: "The Media Files", handle: "@TheMediaFiles", av: "creator", initials: "MF", creator: true, text: "JAMES: So what do we take from Sachsgate? MAITLIS: Several things. And none of them are simple. 🎙️", likes: 14200, rts: 4600, platform: "MockTweet" },
        { type: "twolesson", title: "What Sachsgate Actually Teaches", left: { label: "The outrage machine", points: [
          "2 complaints → 44,790 in four days",
          "A newspaper did what a viral tweet does today",
          "Most complainants never heard the show",
          "The mechanics are older than social media",
        ] }, right: { label: "The institutional failure", points: [
          "Pre-recorded — someone approved it",
          "Brand already flagged 'high risk' — ignored",
          "Compliance producer was Brand's own employee",
          "The public paid the fine via the licence fee",
        ] }, verdict: "The manufactured outrage and the genuine institutional failure both happened. Hold both." },
        { type: "post", name: "Emily Maitlis", handle: "@EmilyMaitlis", av: "journo", initials: "EM", verified: true, text: "This is Maitlis. Three things to carry from this: 1) Outrage that spreads faster than the original content is almost always outrage about coverage, not content. Check what you're actually reacting to. 2) When institutions 'act swiftly' after a scandal, ask what they knew and when. 3) Find the person the story is supposedly about — and notice if they're actually in it.", likes: 38400, rts: 16200, platform: "MockTweet" },
        { type: "post", name: "The Media Files", handle: "@TheMediaFiles", av: "creator", initials: "MF", creator: true, text: "MAITLIS: Sachsgate was a story about a prank call. Then it became a story about the BBC. Then about press freedom. Then about institutional failure. The original two people who complained were probably right to. The 44,788 who followed them were reacting to a newspaper. Know the difference. This is Maitlis. Out. 🎙️", likes: 31600, rts: 13800, platform: "MockTweet" },
        { type: "verdict", tone: "cautionary", label: "The Verdict",
          heading: "Two Complaints, Forty-Four Thousand Reactions",
          body: "When the Russell Brand Show aired its offensive voicemails about Andrew Sachs's granddaughter, it drew two complaints. After a newspaper ran the story eight days later, the total reached 44,790 — the vast majority from people who had never heard the broadcast. Sachsgate holds two truths at once. There was a genuine institutional failure: the show was pre-recorded and approved, Brand was already flagged 'high risk', and the compliance producer was his own employee. AND there was a manufactured outrage machine: one article did what a viral post does today, and most complainants reacted to the coverage, not the content. Meanwhile the person the calls were actually about — Georgina Baillie — was the headline but not the conversation. The lessons: check whether you're reacting to content or coverage; ask what institutions knew and when; and find the person the story is supposedly about, and notice if they're even in it." },
        { type: "impact", title: "How 2 Complaints Became 44,790", stats: [
          { num: "2", label: "Original complaints when the show aired" },
          { num: "44,790", label: "Total — mostly from people who never heard it" },
          { num: "8 days", label: "From broadcast to national scandal — via one article" },
          { num: "£150k", label: "Fine paid by licence-fee payers — the public fined itself" },
        ] },
      ],
    },
  ],
  tasks: [
    {
      type: "mcq",
      id: "sg-q1",
      prompt: "Why did complaints jump from about 2 to 44,790 in days?",
      options: [
        "The show was re-broadcast many times",
        "A newspaper article ran the story — and most new complainants had never heard the original show",
        "The BBC asked people to complain",
        "The voicemails were leaked online",
      ],
      correctIndex: 1,
      explanation:
        "The broadcast itself drew two complaints. The surge came after the Mail on Sunday published — meaning the vast majority were reacting to coverage they'd read, not the show they'd heard.",
    },
    {
      type: "mcq",
      id: "sg-q2",
      prompt: "What is the key 'content vs coverage' distinction here?",
      options: [
        "There is no difference between the two",
        "People were reacting to what they read about the show, not to the show itself — those are different things",
        "The coverage was identical to the content",
        "Only the content mattered",
      ],
      correctIndex: 1,
      explanation:
        "The viewer who complained 'haven't heard the actual show but what I've read is disgusting' captures it: the outrage was about the coverage of the show, which isn't the same as the show.",
    },
    {
      type: "mcq",
      id: "sg-q3",
      prompt: "Why does Sachsgate show the 'outrage machine' predates social media?",
      options: [
        "Because it happened on Twitter",
        "Because a single newspaper article did what a viral post does today — same mechanism and psychology, different platform",
        "Because nobody complained at all",
        "Because the BBC invented it",
      ],
      correctIndex: 1,
      explanation:
        "Find the outrage, amplify it, watch institutions panic — that pattern ran on a newspaper in 2008. The platform changed; the psychology didn't.",
    },
    {
      type: "mcq",
      id: "sg-q4",
      prompt: "Why does it matter that the show was pre-recorded, not live?",
      options: [
        "It means no one is accountable",
        "It means it wasn't a split-second slip — someone listened, edited and approved it with time to think, which sharpens accountability",
        "Pre-recorded shows can't break rules",
        "It makes the content less offensive",
      ],
      correctIndex: 1,
      explanation:
        "A live gaffe is a split-second error. A pre-recorded show that's edited and approved is a deliberate editorial choice — so the failure sits with the production process, not one impulsive moment.",
    },
    {
      type: "mcq",
      id: "sg-q5",
      prompt: "What was the most damning compliance detail in the Ofcom report?",
      options: [
        "The show aired late at night",
        "The compliance producer — meant to stop it going out — was on loan from Brand's own company and untrained in BBC standards",
        "Brand wrote the script himself",
        "The voicemails were never edited",
      ],
      correctIndex: 1,
      explanation:
        "The BBC's safeguard against this was effectively Brand's own employee, without BBC decency training — a systemic failure, not a single bad call.",
    },
    {
      type: "mcq",
      id: "sg-q6",
      prompt: "Maitlis says 'both things can be true.' Which two?",
      options: [
        "The calls were fine AND the BBC was blameless",
        "The calls were genuinely offensive AND parts of the press had their own anti-BBC agenda in running so hard at it",
        "Nobody complained AND everybody complained",
        "The fine was too small AND too large",
      ],
      correctIndex: 1,
      explanation:
        "Acknowledging a press agenda doesn't excuse the content, and the content being offensive doesn't mean the coverage was disinterested. Both can hold at once.",
    },
    {
      type: "mcq",
      id: "sg-q7",
      prompt: "What does 'follow the incentives' reveal about the politicians' condemnations?",
      options: [
        "They were the only people who heard the show",
        "Much of it was about being SEEN to be concerned — political media rewards visible outrage",
        "They had no interest in the story",
        "They were paid by the Mail",
      ],
      correctIndex: 1,
      explanation:
        "Asking 'who benefits from the pile-on?' is the tool. Condemning a radio prank let politicians appear concerned — which is how that media ecosystem works.",
    },
    {
      type: "mcq",
      id: "sg-q8",
      prompt: "What happened to Georgina Baillie's voice in the scandal?",
      options: [
        "She led the public campaign",
        "She was 'the headline but not the conversation' — the person the calls were about was largely absent from the row about her",
        "She was interviewed by every outlet first",
        "She asked for the complaints",
      ],
      correctIndex: 1,
      explanation:
        "Politicians, editors, executives and Brand all had platforms; the woman the calls were actually about was an afterthought. Notice when the subject of a story is missing from it.",
    },
    {
      type: "mcq",
      id: "sg-q9",
      prompt: "Who ultimately paid the £150,000 fine?",
      options: [
        "Russell Brand personally",
        "Jonathan Ross personally",
        "Licence-fee payers — in effect, the public fined itself",
        "The Mail on Sunday",
      ],
      correctIndex: 2,
      explanation:
        "The BBC is funded by the licence fee, so the public that complained also paid the penalty — a detail worth weighing against, say, Ross's reported £6m salary.",
    },
    {
      type: "mcq",
      id: "sg-q10",
      prompt: "Before joining a wave of outrage, the single best check is to…",
      options: [
        "See how many others are angry first",
        "Ask whether you're reacting to the original content or to coverage of it",
        "Complain quickly before it's resolved",
        "Trust the loudest headline",
      ],
      correctIndex: 1,
      explanation:
        "Outrage that spreads faster than the content itself is usually about the coverage. Checking what you've actually seen or heard is the core habit Sachsgate teaches.",
    },
    {
      type: "written",
      id: "sg-w1",
      prompt:
        "Explain the difference between reacting to 'content' and reacting to 'coverage', using the jump from 2 to 44,790 complaints.",
      placeholder:
        "What had most complainants actually experienced? What were they responding to?…",
    },
    {
      type: "written",
      id: "sg-w2",
      prompt:
        "'The outrage machine is older than social media.' Explain how a newspaper in 2008 did what a viral post does today.",
      placeholder:
        "Describe the mechanism — find, amplify, panic — and what stayed the same…",
    },
    {
      type: "written",
      id: "sg-w3",
      prompt:
        "Sachsgate involved a genuine institutional failure. Describe it, and explain why 'pre-recorded' matters for accountability.",
      placeholder:
        "Think about the editorial approval, the 'high risk' flag, and the compliance producer…",
    },
    {
      type: "written",
      id: "sg-w4",
      prompt:
        "'Both things can be true.' Explain how genuine offence and an agenda-driven pile-on can coexist in the same story.",
      placeholder:
        "Why doesn't a press agenda excuse the content — or vice versa?…",
    },
    {
      type: "written",
      id: "sg-w5",
      prompt:
        "Georgina Baillie was 'the headline but not the conversation.' Why does that matter, and what's the wider lesson for any story about a person?",
      placeholder:
        "Who got platforms? Who didn't? What should that prompt you to check?…",
    },
    {
      type: "written",
      id: "sg-w6",
      prompt:
        "You advise the BBC the week the story breaks (or you're deciding whether to complain yourself). What would you do, and why?",
      placeholder:
        "Consider what's genuinely wrong vs the manufactured wave, accountability, and acting on facts…",
    },
  ],
};
