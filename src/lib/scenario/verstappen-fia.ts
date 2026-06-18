// Authored Scenario — Verstappen vs the FIA: the swearing ban & protest presser
// (2024). Ported from the HTML POC. Authored, never simulated (ADR-0006). Uses
// the transcript card, comparison->twolesson, and the real supplied photo.
import type { Scenario } from "./red-bull";

export const VERSTAPPEN_FIA_SCENARIO: Scenario = {
  id: "verstappen-fia-swearing",
  badge: "Scenario",
  title: "Verstappen vs the FIA — The Swearing Ban & the Protest Presser (2024)",
  prePosts: [
    { type: "post", name: "F1 Weekend", handle: "@f1weekend", av: "journo", initials: "FW", verified: true, text: "Lights out this weekend at the Singapore GP under the floodlights at Marina Bay. One of the toughest races of the year — hot, humid, and unforgiving. 🇸🇬", likes: 4200, rts: 860, platform: "MockTweet" },
    { type: "post", name: "Casual Viewer", handle: "@sundayf1watcher", av: "public", initials: "CV", text: "the FIA have been talking a lot lately about cracking down on drivers swearing on the radio and in interviews. feels like a clash is coming with some of the more... outspoken drivers 👀", likes: 1100, rts: 280, platform: "MockTweet" },
  ],
  sections: [
    {
      label: "The Swear — Community Service? For a Word?",
      gap: 1700,
      posts: [
        { type: "news", outlet: "Paddock News", outletColor: "#1d9bf0", headline: "Verstappen Handed 'Work of Public Interest' for Swearing in FIA Press Conference", sub: "At the Singapore Grand Prix, the reigning champion used an expletive to describe his car's performance during a mandatory FIA press conference. With the governing body mid-clampdown on strong language, stewards ruled it misconduct and ordered him to carry out community service.", url: "paddocknews.com" },
        { type: "post", name: "F1 Fan Zone", handle: "@f1fanzone", av: "public", initials: "FZ", text: "let me get this straight. Max said his CAR was 'broken' but with a swear word. in a press conference. and the punishment is... COMMUNITY SERVICE? like he robbed a shop?? for describing his own car?? 😭 what are we doing here", likes: 38400, rts: 16200, platform: "MockTweet" },
        { type: "post", name: "Neutral Observer", handle: "@just_watching_f1", av: "public", initials: "NO", text: "to be fair to the FIA — F1 has a massive young audience, it's on live TV worldwide, broadcasters and sponsors have standards, and drivers are mic'd up constantly. you can see WHY they want less swearing on camera. the question is whether 'community service' is the right way to do it.", likes: 14600, rts: 4800, platform: "MockTweet" },
        { type: "post", name: "F1 Fan Zone", handle: "@f1fanzone", av: "public", initials: "FZ", text: "I get the 'kids are watching' argument, genuinely. but there's a gap between 'maybe don't drop F-bombs live on air' and 'we're sentencing a grown adult to community service.' one's a reasonable ask. the other sounds like a parody. that's the bit people are reacting to.", likes: 22100, rts: 8400, platform: "MockTweet" },
      ],
    },
    {
      label: "The Protest — He Takes It Outside",
      gap: 1500,
      posts: [
        { type: "post", name: "Max Verstappen", handle: "@Max33Verstappen", av: "driver", initials: "MV", verified: true, text: "To the media before today's FIA press conference: I want to apologise in advance for what I'm about to do in there. It's nothing personal to any of you. If you want to actually talk afterwards, come find me outside. 🙂", likes: 124000, rts: 41200, platform: "MockTweet" },
        { type: "post", name: "Paddock Insider", handle: "@paddock_insider", av: "journo", initials: "PI", text: "Max just turned up to the official FIA press conference and... gave one-word answers to everything. 'Yes.' 'No.' 'Good.' Completely deadpan. Refusing to give them the soundbites. Then told everyone he'll do a PROPER chat with us outside the room. He literally warned us this morning. This is a planned protest. 🍿", likes: 48200, rts: 24600, platform: "MockTweet" },
        { type: "transcript", title: "FIA Press Conference — official transcript", subtitle: "Post-qualifying, Singapore GP", lines: [
          { q: "Max, are you happy with second on the grid?", a: "Yes." },
          { q: "Was the car difficult out there today?", a: "No." },
          { q: "Do you think you can fight for the win tomorrow?", a: "Yes." },
          { q: "Is there anything more you'd like to say?", a: "No." },
        ] },
        { type: "photo", name: "Pit Lane Press", handle: "@pitlanepress", av: "journo", initials: "PP", verified: true, caption: "Max holding his OWN impromptu press conference in the pit lane — outside the official FIA room. Every microphone in the paddock turned up. By refusing to talk inside, he made talking outside the biggest story of the weekend.", platform: "MockTweet", src: "/assets/scenarios/verstappen-fia.png" },
        { type: "post", name: "Max Verstappen", handle: "@Max33Verstappen", av: "driver", initials: "MV", verified: true, text: "Thanks to all the media who came outside for a proper chat. 🙂 Like I said — nothing against you. If I can't speak freely in there, I'll speak freely out here. Now let's go racing.", likes: 156000, rts: 39800, platform: "MockTweet" },
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "From a media strategy view this is genuinely brilliant. He didn't rant. He didn't break any rule. He just gave them nothing — and moved the real conversation somewhere the FIA didn't control. Refusing to play the game became the game. Textbook narrative control. 👏", likes: 31600, rts: 15800, platform: "MockTweet" },
      ],
    },
    {
      label: "The Comment That Shifted Everything",
      gap: 1600,
      posts: [
        { type: "reported", source: "FIA President — reported comments", context: "Defending the clampdown on driver language, the FIA president argued drivers should set a better example for younger viewers, and drew a comparison many found jarring:", quote: "We have to differentiate between our sport and rap music.", footer: "His reported words. This single comparison — between drivers swearing and 'rap music' — is the moment the whole story changed direction." },
        { type: "post", name: "Paddock News", handle: "@paddocknews", av: "journo", initials: "PN", text: "The 'rap music' comparison drew immediate criticism. Many called it tone-deaf; others said it carried an unpleasant subtext about which cultures get associated with 'bad language.' Whatever the intent, it moved the conversation away from swearing and onto the people making the rules.", likes: 28400, rts: 14200, platform: "MockTweet" },
        { type: "post", name: "Culture Desk", handle: "@culturedesk", av: "public", initials: "CD", text: "and THAT'S the moment the public mood flipped. up to then it was 'is community service a bit much for a swear?' after the 'rap music' line it became 'what exactly is the problem here, and who is it really aimed at?' one comment can completely change what a story is about.", likes: 34200, rts: 18600, platform: "MockTweet" },
        { type: "twolesson", title: "Same offence. Different punishment.", left: { label: "Verstappen", points: [
          "Swore describing his car (Singapore)",
          "Penalty: community service",
        ] }, right: { label: "Leclerc", points: [
          "Swore in a press conference (Mexico)",
          "Penalty: €10,000 fine",
        ] }, verdict: "Two drivers, the same kind of offence, weeks apart — two very different punishments. The inconsistency became part of the story." },
        { type: "post", name: "F1 Fan Zone", handle: "@f1fanzone", av: "public", initials: "FZ", text: "so one driver gets a fine and another gets COMMUNITY SERVICE for basically the same thing?? if the rule isn't applied consistently it stops looking like a standard and starts looking personal. that's the actual problem, more than the swearing itself.", likes: 26800, rts: 12400, platform: "MockTweet" },
      ],
    },
    {
      label: "The Paddock Closes Ranks",
      gap: 1500,
      posts: [
        { type: "post", name: "Lewis Hamilton", handle: "@LewisHamilton", av: "driver", initials: "LH", verified: true, text: "Stood with Max on this one. We're grown adults and we're racing these cars on the limit — passion comes with it. The punishment doesn't fit. He shouldn't have to do it. We should be talking about this together as drivers. 🤝", likes: 142000, rts: 38400, platform: "MockTweet" },
        { type: "post", name: "George Russell", handle: "@GeorgeRussell63", av: "driver", initials: "GR", verified: true, text: "As GPDA directors we've raised this directly. There's a real conversation to be had about how drivers are treated, how penalties are decided, and how the money from fines is even used. Consistency and respect, both directions. We're united on it.", likes: 86200, rts: 22600, platform: "MockTweet" },
        { type: "post", name: "Charles Leclerc", handle: "@Charles_Leclerc", av: "driver", initials: "CL", verified: true, text: "I got a fine for basically the same thing so I'm not going to pretend I don't have a view here 😅 we all know not to swear on the broadcast, fair enough — but the way this is being handled, and how differently, isn't right. With Max on this.", likes: 94600, rts: 24800, platform: "MockTweet" },
        { type: "post", name: "Paddock Insider", handle: "@paddock_insider", av: "journo", initials: "PI", text: "This is the bit the FIA probably didn't expect. It's not 'one difficult driver' anymore. Hamilton, Russell, the GPDA, half the grid — they've closed ranks. When the drivers are united against a governing decision, that's a serious problem for the people who made it.", likes: 38200, rts: 18400, platform: "MockTweet" },
      ],
    },
    {
      label: "The FIA Doubles Down (For Now)",
      gap: 1700,
      posts: [
        { type: "news", outlet: "Paddock News", outletColor: "#1d9bf0", headline: "FIA Toughens Language Rules: Big Fines, Points Deductions, Possible Bans", sub: "Heading into the new season, the governing body adds a new appendix to the International Sporting Code: swearing offences now carry escalating fines reportedly starting in the tens of thousands of euros, rising toward six figures, with potential points deductions and race bans for repeat breaches. The rules also reference 'moral injury' to the federation.", url: "paddocknews.com" },
        { type: "post", name: "Neutral Observer", handle: "@just_watching_f1", av: "public", initials: "NO", text: "playing fair here: a governing body IS allowed to set standards for its own televised events. that's not unreasonable in principle. but 'moral injury to the federation' and six-figure fines for a swear word? that's a big jump from 'keep it clean on the broadcast.' proportionality is the whole debate.", likes: 19800, rts: 8200, platform: "MockTweet" },
        { type: "post", name: "Max Verstappen", handle: "@Max33Verstappen", av: "driver", initials: "MV", verified: true, text: "I prefer not to say too much. It might get me in trouble. 🙂 But I think everyone can see what's going on, and what this side of the sport has become. I'd rather we spent this energy on racing.", likes: 168000, rts: 44200, platform: "MockTweet" },
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "Notice the move again: he says almost nothing, flags that he CAN'T speak freely, and lets the silence make the point louder than a rant would. 'I'd get in trouble for saying more' is itself a comment on the rules. He's playing this expertly.", likes: 28600, rts: 13400, platform: "MockTweet" },
      ],
    },
    {
      label: "The Climbdown & The Lesson",
      gap: 1800,
      posts: [
        { type: "news", outlet: "Paddock News", outletColor: "#1d9bf0", headline: "FIA Softens Stance on Driver Language After Pushback", sub: "Following sustained criticism from drivers and the GPDA, the governing body later eased elements of the clampdown — clarifying that swearing in the heat of the moment on team radio would be treated differently from language in controlled settings like press conferences. A partial climbdown after months of pressure.", url: "paddocknews.com" },
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "The media-literacy lessons here are gold: 1) Refusing to play the game can be the loudest statement of all — Max never broke a rule, he just gave them nothing. 2) One off-hand quote ('rap music') reframed the entire story. 3) Collective pressure moved an institution. Watch the TACTICS, not just the row.", likes: 32400, rts: 16800, platform: "MockTweet" },
        { type: "post", name: "Neutral Observer", handle: "@just_watching_f1", av: "public", initials: "NO", text: "and the fair conclusion: BOTH sides had a point. The FIA's right that a global, kids-watching, broadcast sport can ask for standards. The drivers were right that the punishment was disproportionate and inconsistent. The answer wasn't 'who's evil' — it was 'find the sensible middle', which is roughly where it landed.", likes: 24100, rts: 10600, platform: "MockTweet" },
        { type: "post", name: "Culture Desk", handle: "@culturedesk", av: "public", initials: "CD", text: "last thought: this whole saga lived and was WON on social media. fan sympathy, driver solidarity, clips of the one-word answers going viral, the quote spreading — that pressure is what forced the rethink. it's a real example of how public sentiment online can push back on an authority. 📲", likes: 27600, rts: 12200, platform: "MockTweet" },
        { type: "verdict", tone: "win", label: "The Verdict",
          heading: "Refusing to Play the Game Became the Game",
          body: "Handed community service for swearing about his own car, Verstappen didn't rant — he protested by giving the FIA's press conference nothing but one-word answers, then held his real conference outside the room the governing body controlled. Several media lessons stack up. Refusing to play the game can be the loudest statement of all (he broke no rule, yet moved the conversation to ground the authority didn't own). One off-hand quote — the president's 'rap music' comparison — reframed the entire story from 'is this punishment too much?' to 'what's really going on here?' Inconsistent enforcement (community service for one driver, a fine for another) made the rule look personal rather than principled. And collective solidarity plus online sentiment forced a partial climbdown. The fair conclusion holds both sides: a broadcast sport can ask for standards, AND the punishment was disproportionate and uneven — the answer was a sensible middle, not a villain." },
        { type: "impact", title: "The Swearing Ban & the Protest Presser", stats: [
          { num: "1 word", label: "Answers that became a global protest" },
          { num: "1 quote", label: "That flipped public sympathy overnight" },
          { num: "1 grid", label: "Of drivers, united against the call" },
          { num: "Partial", label: "Climbdown after sustained pushback" },
        ] },
      ],
    },
  ],
  tasks: [
    {
      type: "mcq",
      id: "vf-q1",
      prompt: "How did Verstappen protest without breaking any rule?",
      options: [
        "He swore even more",
        "He gave one-word answers in the official press conference, then held his real chat outside it — giving them nothing and moving the conversation elsewhere",
        "He refused to race",
        "He sued the FIA",
      ],
      correctIndex: 1,
      explanation:
        "Technically he answered everything and broke no rule, while denying the soundbites and relocating the real story to ground the FIA didn't control. 'Refusing to play the game became the game.'",
    },
    {
      type: "mcq",
      id: "vf-q2",
      prompt: "What does 'narrative control' mean in his protest?",
      options: [
        "Controlling the race result",
        "Deciding where and how the real conversation happens — he made talking OUTSIDE the official room the biggest story",
        "Banning journalists",
        "Writing the headlines himself",
      ],
      correctIndex: 1,
      explanation:
        "By starving the controlled setting and feeding the uncontrolled one, he set where the story lived — a deliberate, effective tactic.",
    },
    {
      type: "mcq",
      id: "vf-q3",
      prompt: "Why was the FIA president's 'rap music' comparison so pivotal?",
      options: [
        "It ended the story",
        "One off-hand quote reframed the whole story — from 'is the punishment too harsh?' to 'what's the real problem, and who's it aimed at?'",
        "It was about racing strategy",
        "Nobody noticed it",
      ],
      correctIndex: 1,
      explanation:
        "A single comment can change what a story is about. It shifted attention onto the rule-makers and their judgement.",
    },
    {
      type: "mcq",
      id: "vf-q4",
      prompt: "Why did the Verstappen-vs-Leclerc punishment difference matter?",
      options: [
        "It didn't matter at all",
        "Inconsistent enforcement (community service vs a fine for the same kind of offence) made the rule look personal, not principled",
        "Leclerc was faster",
        "Both got community service",
      ],
      correctIndex: 1,
      explanation:
        "A standard applied unevenly loses legitimacy — it starts to look like it's about the person, not the principle.",
    },
    {
      type: "mcq",
      id: "vf-q5",
      prompt: "What made the drivers' response hard for the FIA to dismiss?",
      options: [
        "It was one lone complaint",
        "Collective solidarity — Hamilton, Russell, Leclerc and the GPDA closed ranks, so it wasn't 'one difficult driver' anymore",
        "The drivers stopped racing",
        "It was kept private",
      ],
      correctIndex: 1,
      explanation:
        "A united grid changes the power balance: an institution can manage one critic, but not a coordinated body of them.",
    },
    {
      type: "mcq",
      id: "vf-q6",
      prompt: "How can saying very little ('I'd get in trouble for saying more') be powerful?",
      options: [
        "It isn't — you must always say a lot",
        "The restraint itself comments on the rules; pointed silence can make the point louder than a rant",
        "It means he had no opinion",
        "It breaks the rules",
      ],
      correctIndex: 1,
      explanation:
        "Flagging that he can't speak freely turns the gag into evidence for his argument — understatement as strategy.",
    },
    {
      type: "mcq",
      id: "vf-q7",
      prompt: "What's the balanced 'both sides' conclusion?",
      options: [
        "The FIA was purely evil",
        "A broadcast sport can reasonably ask for standards AND the punishment was disproportionate and inconsistent — the answer is a sensible middle",
        "The drivers were entirely wrong",
        "Standards don't matter at all",
      ],
      correctIndex: 1,
      explanation:
        "It wasn't 'who's the villain'. Holding the legitimate standard-setting AND the proportionality/consistency problem together is the mature reading.",
    },
    {
      type: "mcq",
      id: "vf-q8",
      prompt: "What role did social media play in the outcome?",
      options: [
        "None at all",
        "Fan sympathy, viral clips of the one-word answers, driver solidarity and the spreading quote built the pressure that forced a rethink",
        "It silenced the drivers",
        "It only helped the FIA",
      ],
      correctIndex: 1,
      explanation:
        "The saga was largely fought and won online — a real example of public sentiment pushing back on an authority.",
    },
    {
      type: "written",
      id: "vf-w1",
      prompt:
        "Explain how 'refusing to play the game became the game'. Why was Verstappen's silent protest effective without breaking a rule?",
      placeholder:
        "What did he deny them? Where did he move the story? Why couldn't they punish it?…",
    },
    {
      type: "written",
      id: "vf-w2",
      prompt:
        "How did one quote ('rap music') reframe the whole story? What does that show about how a single comment can shift a narrative?",
      placeholder:
        "What was the story about before vs after the quote?…",
    },
    {
      type: "written",
      id: "vf-w3",
      prompt:
        "Why does inconsistent enforcement undermine a rule? Use the Verstappen vs Leclerc comparison.",
      placeholder:
        "Same offence, different penalties — what does that do to the rule's legitimacy?…",
    },
    {
      type: "written",
      id: "vf-w4",
      prompt:
        "Give the strongest case for BOTH the FIA and the drivers, then explain what a sensible middle looks like.",
      placeholder:
        "Why can a broadcast sport set standards? Why was this handling wrong? Where should it land?…",
    },
  ],
};
