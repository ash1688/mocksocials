// Authored Scenario — Saka, Rashford & Sancho: hate, and the answer to it (Euro
// 2020 final, 2021). Ported from the HTML POC. Authored, never simulated
// (ADR-0006). The racist abuse is never reproduced; the focus is the response.
import type { Scenario } from "./red-bull";

export const SAKA_SCENARIO: Scenario = {
  id: "saka-rashford-sancho",
  badge: "Scenario",
  title: "Saka, Rashford & Sancho — Hate, and the Answer to It (2021)",
  prePosts: [
    { type: "post", name: "England Football", handle: "@england", av: "public", initials: "EF", verified: true, text: "It's here. The Euro 2020 final. England vs Italy at Wembley. A nation holds its breath. 55 years of hurt on the line. Come on England. 🦁🦁🦁", likes: 248000, rts: 62400, platform: "MockTweet" },
    { type: "post", name: "Footy Fan", handle: "@wembley_dreamer", av: "public", initials: "FF", text: "whatever happens tonight this young england team has been an absolute joy. Saka, Rashford, Sancho, the lot of them. proud of this group already", likes: 3400, rts: 620, platform: "MockTweet" },
  ],
  sections: [
    {
      label: "The Final — Brave Enough to Step Up",
      gap: 1800,
      posts: [
        { type: "post", name: "England Football", handle: "@england", av: "public", initials: "EF", verified: true, text: "Heartbreak at Wembley. 💔 England fall to Italy on penalties in the Euro 2020 final. So close to a first major trophy in 55 years. Proud of this young team — they carried the hopes of a nation all summer and gave us nights we'll never forget.", likes: 184000, rts: 42600, platform: "MockTweet" },
        { type: "post", name: "Footy Heart", handle: "@footyheart", av: "public", initials: "FH", text: "three of the youngest lads in the squad volunteered to take penalties in a EURO FINAL in front of the world. that takes more courage than most of us will ever know. they missed. so did legends before them. that's football, and it should END there. 💙", likes: 56200, rts: 16800, platform: "MockTweet" },
      ],
    },
    {
      label: "And Then the Abuse Came",
      gap: 1700,
      posts: [
        { type: "post", name: "UK News", handle: "@uknews", av: "journo", initials: "UN", verified: true, text: "Within minutes of the final whistle, Marcus Rashford, Jadon Sancho and Bukayo Saka — the three players who missed penalties, all young and all Black — were targeted with a flood of racist abuse on social media. We won't repeat any of it. It was vile, and it was immediate.", likes: 92400, rts: 38200, platform: "MockTweet" },
        { type: "post", name: "Dr Maya Okonkwo", handle: "@drmayaok", av: "public", initials: "MO", text: "Let's be clear about what happened, without amplifying a word of it: three young men, two of them still teenagers in football terms, were racially abused by thousands of strangers for missing a penalty in a game. The abuse tells you nothing about them — and everything about the people who sent it.", likes: 64800, rts: 22400, platform: "MockTweet" },
        { type: "post", name: "Gareth Southgate (reported)", handle: "@england", av: "public", initials: "GS", verified: true, text: "The England manager's reported response was unequivocal: the abuse was 'unforgivable,' the players who stepped up were heroes not villains, and those responsible were not wanted following the team. The FA, the players and the squad stood as one against it.", likes: 78600, rts: 26200, platform: "MockTweet" },
      ],
    },
    {
      label: "The Country Turns — On the Racists",
      gap: 1600,
      posts: [
        { type: "post", name: "Just an England Fan", handle: "@three_lions_tom", av: "public", initials: "ET", text: "to the people abusing Saka, Rashford and Sancho: you do NOT speak for England. you don't speak for me, my family, my mates, or the millions of us who were proud of those boys. not in our name. never in our name. ❤️", likes: 128000, rts: 41200, platform: "MockTweet" },
        { type: "post", name: "Football Supporters' Assoc.", handle: "@wearethefsa", av: "public", initials: "FS", verified: true, text: "The overwhelming response from fans has been to drown out the racists. For every cowardly anonymous account, thousands of supporters are sending love to three young men who did their country proud all tournament. That's the real England. 💙", likes: 54200, rts: 17600, platform: "MockTweet" },
        { type: "post", name: "Bukayo Saka (reported)", handle: "@bukayosaka87", av: "public", initials: "BS", verified: true, text: "Saka's own reported response was remarkably mature for a 19-year-old: he thanked fans for the love, said he knew the hate wouldn't be allowed to win, and called on the social media companies to stop letting it happen. Dignity in the face of cruelty. 💙", likes: 96800, rts: 31400, platform: "MockTweet" },
      ],
    },
    {
      label: "The Mural — Hate Answered With Love",
      gap: 1600,
      posts: [
        { type: "post", name: "Manchester Live", handle: "@manchesterlive", av: "journo", initials: "MC", verified: true, text: "Overnight, the Marcus Rashford mural in Withington was defaced. By morning, the community had answered. People came from everywhere — kids, families, pensioners — and covered it in hundreds of notes, hearts and flowers. You can barely see the damage now. 🥹", likes: 88400, rts: 32600, platform: "MockTweet" },
        { type: "photo", name: "Manchester Live", handle: "@manchesterlive", av: "journo", initials: "MC", verified: true, caption: "The Rashford mural in Withington today. 🥹 Hundreds of messages of love, England flags signed by strangers, hearts, and a quote that hits harder than ever: 'Take pride in knowing that your struggle will play the biggest role in your purpose.' A community answering hate the only way that beats it.", platform: "MockTweet" },
        { type: "post", name: "Local Mum", handle: "@withington_jo", av: "public", initials: "LM", text: "took my little one down to add a note this morning. she drew a heart and wrote 'thank you Marcus.' there were people queuing to do the same. you couldn't even SEE the damage anymore under all the love. I cried, honestly. THIS is my city. this is who we are. 💙🐝", likes: 72200, rts: 24800, platform: "MockTweet" },
      ],
    },
    {
      label: "Not So Anonymous After All",
      gap: 1600,
      posts: [
        { type: "post", name: "UK News", handle: "@uknews", av: "journo", initials: "UN", verified: true, text: "The people who sent that abuse thought they were untouchable behind anonymous accounts. They were wrong. Police forces launched investigations, and over the following weeks and months a number of individuals were identified, arrested and convicted. ⚖️", likes: 76400, rts: 29200, platform: "MockTweet" },
        { type: "consequences", title: "The myth of 'you can't touch me online'", items: [
          { icon: "🔍", label: "Identified", detail: "Police traced abusers behind 'anonymous' accounts." },
          { icon: "🚔", label: "Arrested & convicted", detail: "A number were prosecuted for what they posted." },
          { icon: "🚫", label: "Football banning orders", detail: "The law was extended so online racist abuse can get you banned from grounds." },
          { icon: "💼", label: "Real-life fallout", detail: "Some lost jobs and places at university once identified." },
        ], footer: "Posting hate from a fake name is not the shield people think it is. The screen is not a mask — it's a record." },
        { type: "post", name: "Law & Society", handle: "@lawandsociety", av: "public", initials: "LS", text: "the single biggest myth this whole episode busted: that online abuse is 'just words' and that anonymity makes you untouchable. it isn't, and it doesn't. what you type is logged, traceable and — increasingly — prosecutable. consequences are catching up with the keyboard.", likes: 48600, rts: 18400, platform: "MockTweet" },
      ],
    },
    {
      label: "The Lesson — Hate, and the Answer to It",
      gap: 1800,
      posts: [
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "This is one of the most important digital-citizenship stories of recent years — not because of the abuse, but because of everything that answered it. Three things worth taking from it. 🧵👇", likes: 42400, rts: 16200, platform: "MockTweet" },
        { type: "twolesson", title: "Hate vs The Answer", left: { label: "What the abuse was", points: [
          "Real abuse aimed at real, very young people",
          "Sent by thousands hiding behind anonymity",
          "'Just words' — but words that do real harm",
          "Told you nothing about the players, everything about the senders",
        ] }, right: { label: "What answered it", points: [
          "A country that said 'not in our name'",
          "A community that buried the hate under love",
          "Arrests, convictions and banning orders",
          "Three young men who responded with dignity",
        ] }, verdict: "The abuse was loud. The answer was louder — from the public, the players, a Manchester street with a wall full of sticky notes, and the courts." },
        { type: "post", name: "Dr Maya Okonkwo", handle: "@drmayaok", av: "public", initials: "MO", text: "Two things can be true: that the abuse was sickening, AND that the response showed the best of people. Don't let the cruelty be the takeaway. The lasting image isn't a vile message — it's a mural you couldn't see for all the hearts stuck to it. Choose which one you carry. 💙", likes: 58200, rts: 21600, platform: "MockTweet" },
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "And the practical takeaways: 1) Online abuse is real abuse — it has real victims and now real legal consequences. 2) Anonymity is mostly a myth; what you post is traceable. 3) How a community responds to hate is a CHOICE — and decency, at scale, genuinely drowns it out. Be the sticky note, not the silence. 💙", likes: 51800, rts: 19400, platform: "MockTweet" },
        { type: "verdict", tone: "win", label: "The Verdict",
          heading: "The Abuse Was Loud. The Answer Was Louder.",
          body: "After three young England players missed penalties in the Euro 2020 final, they were hit with a flood of racist abuse within minutes. But the lasting story isn't the hate — it's what answered it. The country said 'not in our name'; a Manchester community buried a defaced mural under hundreds of notes and hearts until you couldn't see the damage; the players responded with dignity; and police identified, arrested and convicted abusers who assumed anonymity made them untouchable. Three lessons stand out. Online abuse is real abuse — with real victims and, now, real legal consequences. Anonymity is largely a myth: what you post is logged and traceable. And how a community responds to hate is a choice — decency, at scale, genuinely drowns it out. Be the sticky note, not the silence." },
        { type: "impact", title: "Hate, and the Answer to It", stats: [
          { num: "3", label: "Young players who were brave enough to step up" },
          { num: "100s", label: "Messages of love that buried the defaced mural" },
          { num: "Many", label: "Abusers identified, arrested and convicted" },
          { num: "1", label: "Question that matters: which response do you carry?" },
        ] },
      ],
    },
  ],
  tasks: [
    {
      type: "mcq",
      id: "sk-q1",
      prompt: "What does Dr Okonkwo mean that the abuse 'tells you nothing about them — and everything about the senders'?",
      options: [
        "The players were to blame",
        "Racist abuse reflects the character of the people sending it, not anything about its targets",
        "The abuse was a fair football reaction",
        "Missing a penalty justifies criticism",
      ],
      correctIndex: 1,
      explanation:
        "Abuse for missing a penalty reveals the abusers, not the players. Separating the act (a missed kick) from the response (racism) is the core point.",
    },
    {
      type: "mcq",
      id: "sk-q2",
      prompt: "What is the truth about 'anonymity' that this story busted?",
      options: [
        "Anonymous accounts can never be traced",
        "Online posts are logged and traceable — many abusers were identified, arrested and convicted",
        "Only the platforms can see who you are, and they never tell",
        "Deleting a post erases all evidence",
      ],
      correctIndex: 1,
      explanation:
        "The screen isn't a mask — it's a record. Believing anonymity grants immunity was exactly the myth the arrests and convictions disproved.",
    },
    {
      type: "mcq",
      id: "sk-q3",
      prompt: "Why is 'online abuse is just words' rejected here?",
      options: [
        "Because words can't be evidence",
        "Because it has real victims and, increasingly, real legal consequences — it's real abuse",
        "Because only spoken words count",
        "Because the players didn't mind",
      ],
      correctIndex: 1,
      explanation:
        "The episode shows online abuse doing real harm and triggering real prosecutions, banning orders and lost jobs — not a harmless abstraction.",
    },
    {
      type: "mcq",
      id: "sk-q4",
      prompt: "What did the defaced-then-restored Rashford mural come to represent?",
      options: [
        "That vandalism always wins",
        "That a community's response to hate is a choice — and decency at scale can drown it out",
        "That murals should be removed",
        "That nobody cared",
      ],
      correctIndex: 1,
      explanation:
        "Hundreds of notes and hearts covered the damage overnight. The image of love burying the defacement is the story's answer to the abuse.",
    },
    {
      type: "mcq",
      id: "sk-q5",
      prompt: "How did Saka's own response model good digital citizenship?",
      options: [
        "He abused the abusers back",
        "He thanked fans, refused to let hate win, and called on the platforms to act — dignity plus a constructive demand",
        "He quit football",
        "He stayed completely silent",
      ],
      correctIndex: 1,
      explanation:
        "Rather than retaliate, he responded with dignity and pointed responsibility at the platforms that allowed the abuse — calm and constructive.",
    },
    {
      type: "mcq",
      id: "sk-q6",
      prompt: "What does 'two things can be true' mean in this story?",
      options: [
        "The abuse and the response cancel each other out",
        "The abuse was sickening AND the response showed the best of people — both are real, and you choose which to carry",
        "Only the abuse was real",
        "Only the response was real",
      ],
      correctIndex: 1,
      explanation:
        "Holding both honestly means not letting the cruelty be the only takeaway — the lasting image can be the wall of hearts, not the vile message.",
    },
    {
      type: "mcq",
      id: "sk-q7",
      prompt: "Whose responsibility did the players and campaigners highlight beyond the individual abusers?",
      options: [
        "The referees'",
        "The social media platforms' — for allowing the abuse to reach the players so easily",
        "The fans who sent love",
        "The opposing team's",
      ],
      correctIndex: 1,
      explanation:
        "Saka and others called on the companies to stop letting it happen — pointing at platform responsibility, not just the individuals who typed it.",
    },
    {
      type: "mcq",
      id: "sk-q8",
      prompt: "What is the 'be the sticky note, not the silence' takeaway?",
      options: [
        "Stay quiet to avoid trouble",
        "Actively add to the positive response — decency that speaks up, at scale, is what beats hate",
        "Only post anonymously",
        "Ignore everything online",
      ],
      correctIndex: 1,
      explanation:
        "Silence cedes the space to the abusers. Choosing to add your voice to the supportive response is how a community drowns out hate.",
    },
    {
      type: "written",
      id: "sk-w1",
      prompt:
        "Explain why the abuse 'tells you nothing about the players and everything about the senders.' Why does separating the act from the response matter?",
      placeholder:
        "What did the players actually do? What did the abuse reveal about its authors?…",
    },
    {
      type: "written",
      id: "sk-w2",
      prompt:
        "'Anonymity is a myth.' Using this story, explain why posting hate from a fake name is not the shield people assume.",
      placeholder:
        "What happened to the abusers? What does 'the screen is a record, not a mask' mean?…",
    },
    {
      type: "written",
      id: "sk-w3",
      prompt:
        "How a community responds to hate is a choice. Describe the choices made here and why the response 'was louder' than the abuse.",
      placeholder:
        "Think about the public, the mural, the players' dignity and the courts…",
    },
    {
      type: "written",
      id: "sk-w4",
      prompt:
        "The players pointed at the platforms, not just individuals. What responsibility do social media companies have for abuse like this, and what could they do?",
      placeholder:
        "Consider how easily abuse reached the players and what platforms control…",
    },
    {
      type: "written",
      id: "sk-w5",
      prompt:
        "'Choose which response you carry.' Why does it matter whether the lasting image is the abuse or the wall of hearts — for you, and for how these stories are remembered?",
      placeholder:
        "What do we lose if cruelty becomes the only takeaway?…",
    },
  ],
};
