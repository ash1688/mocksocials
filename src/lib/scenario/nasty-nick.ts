// Authored Scenario — "Nasty Nick" Bateman, Big Brother 1 (2000, rediscovered
// 2023). Ported from the HTML POC. A fixed documentary timeline; authored, never
// simulated (ADR-0006). Reuses existing beat types (the POC's bbretro -> our
// broadcast card; thenandnow -> our twolesson card).
import type { Scenario } from "./red-bull";

export const NASTY_NICK_SCENARIO: Scenario = {
  id: "nasty-nick",
  badge: "Scenario",
  title: "Nasty Nick — The Original Reality TV Villain (2000, rediscovered 2023)",
  prePosts: [
    { type: "post", name: "Big Brother UK", handle: "@bbuk", av: "brand", initials: "BB", verified: true, text: "It's official. Big Brother is returning to ITV2 this autumn — and we are SO ready. 25 years of drama, iconic moments, and unforgettable housemates. Before the new series launches, we're going back to where it all began. 👁️🏠 #BBUK #BigBrother", likes: 28400, rts: 8600, platform: "MockTweet" },
    { type: "post", name: "Gen Z Reacts", handle: "@genzsays", av: "public", initials: "GZ", text: "my mum keeps going on about something called Nasty Nick from the original big brother. apparently it was a big deal. never watched it. should I? 👀", likes: 1200, rts: 180, platform: "MockTweet" },
  ],
  sections: [
    {
      label: "Big Brother Is Back — And So Is Nick",
      gap: 1800,
      posts: [
        { type: "post", name: "Big Brother UK", handle: "@bbuk", av: "brand", initials: "BB", verified: true, text: "25 YEARS. Big Brother is BACK on ITV2 this autumn — and before we meet our new housemates, we're looking back at where it all began. The show that changed British television. The moments that made history. And a man called Nick. 🏠👁️ #BBUK", likes: 42600, rts: 14800, platform: "MockTweet" },
        { type: "post", name: "ITV2", handle: "@ITV2", av: "journo", initials: "IT", verified: true, text: "Before you meet the new housemates... let's revisit the moment that put Big Brother on the map. Summer 2000. No social media. No smartphones. Just a Channel 4 live feed, a nation glued to their screens — and the first reality TV villain the world had ever seen. 📺👁️", likes: 28400, rts: 9600, platform: "MockTweet" },
      ],
    },
    {
      label: "The '25 Years' Retrospective — Nasty Nick",
      gap: 1700,
      posts: [
        { type: "broadcast", show: "Big Brother — 25 Years", segment: "Archive", headline: "The Original: Nasty Nick Bateman, BB1, 2000", standfirst: "Summer 2000. The first ever Big Brother. Ten strangers in a house, watched by cameras 24 hours a day. One of them — Nick Bateman, a former City broker — spent 34 days running rings around everyone. Lying. Manipulating. Passing secret notes to influence who got voted out. And never receiving a single nomination himself. The housemates loved him. The public despised him. And they could see everything he was doing.", ticker: "BB1 · 2000 · NICK BATEMAN · NASTY NICK · THE ORIGINAL VILLAIN" },
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "The key thing about Nasty Nick that makes it such a perfect media story: the ASYMMETRY. The public watching the live feed could see every note, every lie, every manipulation. The housemates inside had no idea. It was like the audience was watching a crime happening in real time and screaming at the screen — unable to do anything except buy a tabloid and vote on the phone line. 📺", likes: 18400, rts: 7200, platform: "MockTweet" },
        { type: "post", name: "TV History Nerd", handle: "@tvhistorynerd", av: "public", initials: "TH", text: "things Nick did in the Big Brother house: told housemates his wife had died in a car crash (she hadn't), passed secret handwritten notes encouraging people to nominate specific housemates, played everyone off against each other — AND never received a single nomination himself. his manipulation was WORKING. the only problem was the whole country could see it. 😭", likes: 26400, rts: 12600, platform: "MockTweet" },
      ],
    },
    {
      label: "TikTok Discovers 2000 — Chaos Ensues",
      gap: 1500,
      posts: [
        { type: "post", name: "Gen Z Reacts", handle: "@genzsays", av: "public", initials: "GZ", text: "ok my mum keeps telling me to watch the Nasty Nick stuff before the new Big Brother and I finally did and I'm OBSESSED. this man was doing full villain arc in a reality show in the year 2000?? before Love Island existed?? before ANYTHING?? he was writing little notes?? 😭😭😭 I need to talk about this", likes: 48600, rts: 22400, platform: "MockTweet" },
        { type: "post", name: "TikTok Clip Account", handle: "@realitytvvault", av: "public", initials: "TC", text: "the Nasty Nick Big Brother clip has now done 4.2 million views on here in 48 hours. people are discovering this story 23 years later and reacting with the same energy as if it's happening live. 'he's WRITING NOTES??' energy in every comment section 😂📝", likes: 31200, rts: 14800, platform: "MockTweet" },
        { type: "post", name: "Gen Z Reacts", handle: "@genzsays", av: "public", initials: "GZ", text: "wait but the most UNHINGED part is that on day 24 they sent a HELICOPTER over the house to drop 40 leaflets in the garden calling for him to be nominated. they had to remove them before the housemates saw them. IN 2000. they deployed AIR SUPPORT against a reality TV contestant. this was the Twitter pile-on of its era and it was done with a HELICOPTER 😭🚁", likes: 62400, rts: 34800, platform: "MockTweet" },
      ],
    },
    {
      label: "Day 35 — The Confrontation",
      gap: 1600,
      posts: [
        { type: "post", name: "Big Brother UK", handle: "@bbuk", av: "brand", initials: "BB", verified: true, text: "Day 35. Craig Phillips gathers the housemates. He has the notes. He has the evidence. And the nation — which has known about this for weeks — finally gets the moment it has been waiting for. 📝👁️ #NastyNick #BB25Years", likes: 38400, rts: 18600, platform: "MockTweet" },
        { type: "reported", source: "Craig Phillips — documented confrontation, Big Brother house, Day 35, 2000", context: "Craig, having gathered the housemates and laid out the evidence of Nick's note-passing, said directly to him:", quote: "How can you be so two-faced? I'm very disappointed. I not only feel but am quite positive that you're plotting a very dirty plan on everybody in here.", footer: "Nick was ejected the same day. Channel 4: 'persistent infringement of the Big Brother rules.' Ratings up 50% overnight. Front page of every national newspaper." },
        { type: "post", name: "TV History Nerd", handle: "@tvhistorynerd", av: "public", initials: "TH", text: "Broadcast magazine voted this one of the 50 best TV moments ever. Front page of every tabloid. Internet traffic hit 10 million — the most ever recorded on a single website live at that point. In. The. Year. 2000. No social media. No smartphones. A Channel 4 live feed and the next day's papers. And it STILL hit 10 million online. 📺", likes: 24600, rts: 11400, platform: "MockTweet" },
        { type: "post", name: "Gen Z Reacts", handle: "@genzsays", av: "public", initials: "GZ", text: "the way the ENTIRE COUNTRY was watching Craig confront Nick in 2000 with the same energy we'd be on twitter dot com watching a villain get exposed in a reality show today. they didn't have the tweets. they had the tabloids and the phone-in lines. same vibes ENTIRELY different tools 😭", likes: 44200, rts: 21600, platform: "MockTweet" },
      ],
    },
    {
      label: "The Label That Followed Him",
      gap: 1700,
      posts: [
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "Here's the bit worth sitting with. 'Nasty Nick' was a tabloid nickname. The tabloids gave it to him in summer 2000. He's now 57. He moved to Australia. He works in marketing. And the nickname is still the first thing anyone knows about him — still in the headline of every 'where are they now' article in 2023. A game show label. For 25 years. 🏷️", likes: 22400, rts: 9800, platform: "MockTweet" },
        { type: "post", name: "Gen Z Reacts", handle: "@genzsays", av: "public", initials: "GZ", text: "wait so the 'Nasty Nick' name — he didn't choose that? the TABLOIDS gave him that? and it just... stuck? for 25 years? even though he's been living a totally normal life since? this is actually kind of uncomfortable when you think about it. he cheated on a game show and got a nickname that never went away. 😬", likes: 28600, rts: 12400, platform: "MockTweet" },
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "He did genuinely cheat. He did manipulate people. The anger was real and arguably justified. But the 'Nasty Nick' label was the tabloids' work — and labels like that have a half-life that the person who earned them has no control over. That's its own media-literacy lesson: a nickname given in the heat of a story can follow someone forever. 🏷️", likes: 19800, rts: 8600, platform: "MockTweet" },
      ],
    },
    {
      label: "And Then There Was Craig",
      gap: 1600,
      posts: [
        { type: "post", name: "Big Brother UK", handle: "@bbuk", av: "brand", initials: "BB", verified: true, text: "On Day 64, Craig Phillips — the builder from Liverpool who confronted Nick, who became the nation's unlikely hero — walked out of the Big Brother house as the first-ever winner. The prize was £70,000. What did he do with it? 👇", likes: 32400, rts: 12200, platform: "MockTweet" },
        { type: "post", name: "Big Brother UK", handle: "@bbuk", av: "brand", initials: "BB", verified: true, text: "He donated every single penny to fund a heart and lung transplant for his friend Jo Harris, who had Down's syndrome. Every. Penny. He didn't keep a single pound of the £70,000. 🏆💙 #BB25Years", likes: 86400, rts: 42600, platform: "MockTweet" },
        { type: "post", name: "Gen Z Reacts", handle: "@genzsays", av: "public", initials: "GZ", text: "WAIT. he won the £70,000. and gave ALL of it to fund his friend's heart transplant. IMMEDIATELY. I'm actually going to cry??? 2000 was 23 years ago and I genuinely did not know this story existed and now I'm emotional about a builder from Liverpool 😭💙", likes: 74200, rts: 38400, platform: "MockTweet" },
        { type: "post", name: "TV History Nerd", handle: "@tvhistorynerd", av: "public", initials: "TH", text: "The Big Brother formula was always: villain + hero + the public deciding. What made 2000 special is the hero was just a genuinely good person who did a genuinely good thing. Craig didn't play a character. He was just Craig — the builder from Liverpool who said 'how can you be so two-faced' and then gave away his prize. Beautiful television. 💙", likes: 31600, rts: 14800, platform: "MockTweet" },
      ],
    },
    {
      label: "The Closing Lesson — The Platform Changed",
      gap: 1800,
      posts: [
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "And here's what the Nasty Nick story, rediscovered in 2023, really teaches us. Not just about Big Brother. About everything in this whole media-literacy set. 🧵👇", likes: 14600, rts: 5800, platform: "MockTweet" },
        { type: "twolesson", title: "2000 vs Now — Same Story, Different Tools", left: { label: "How it spread in 2000", points: [
          "Channel 4 live feed (still very new)",
          "Tabloid front pages every morning",
          "Phone-in voting lines",
          "Word of mouth at work the next day",
          "A helicopter dropping leaflets",
        ] }, right: { label: "How it would spread today", points: [
          "TikTok clips going viral in hours",
          "Twitter/X pile-on in real time",
          "WhatsApp group chats",
          "Reddit threads dissecting every note",
          "A petition with a million signatures",
        ] }, verdict: "Same villain. Same outrage. Same public demanding justice. Same redemption for the hero. The platform changed. The psychology didn't." },
        { type: "post", name: "Media Studies Mark", handle: "@markonmedia", av: "journo", initials: "MM", text: "Everything in this set — from Sachsgate to Nasty Nick, from manufactured outrage to viral stats, from the Rashford mural to the rat on a wall in Liverpool — has shown the same patterns. We love a villain. We feel betrayed. We demand accountability. We celebrate the fall. And then someone like Craig comes along and reminds us what actual decency looks like. 💙", likes: 28400, rts: 13200, platform: "MockTweet" },
        { type: "post", name: "Gen Z Reacts", handle: "@genzsays", av: "public", initials: "GZ", text: "I came here because Big Brother was back on telly and ended up learning about media literacy, tabloid power, the permanence of labels, and a builder who gave away £70,000. honestly one of the best accidental education experiences of my life. the notes were HANDWRITTEN btw. HANDWRITTEN. 📝💙😭", likes: 52400, rts: 28600, platform: "MockTweet" },
        { type: "verdict", tone: "win", label: "The Verdict",
          heading: "Same Story, Different Tools",
          body: "In summer 2000, Nick Bateman ran rings around the first Big Brother house — lying, passing handwritten notes, never once nominated — while the whole country watched every move on a live feed the housemates couldn't see. The outrage machinery was all there: tabloid front pages, phone-in votes, even a helicopter dropping leaflets demanding his nomination. It was the pile-on of its era, built from different tools. Rediscovered on TikTok 23 years later, the same story landed with the same energy. Two lessons stand out. First: the platform changes, the psychology doesn't — we love a villain, feel betrayed, demand accountability and celebrate the fall, whether the tool is a tabloid or a tweet. Second: 'Nasty Nick' was a label the tabloids created, and it has followed him for 25 years beyond his control — a nickname assigned in the heat of a story has a half-life all its own. And then there's Craig, who confronted Nick and gave away every penny of his £70,000 prize — a reminder of what genuine decency looks like amid the spectacle." },
        { type: "impact", title: "Same Story, Different Tools", stats: [
          { num: "34", label: "Days. Never nominated once. The housemates loved him." },
          { num: "10M", label: "Website hits on Day 35. In 2000. No social media." },
          { num: "£70k", label: "Prize money Craig gave away. Every penny. For Jo." },
          { num: "25 yrs", label: "And the platform changed. The psychology didn't." },
        ] },
      ],
    },
  ],
  tasks: [
    {
      type: "mcq",
      id: "nn-q1",
      prompt: "What 'asymmetry' made Nasty Nick such a perfect media story?",
      options: [
        "The cameras only filmed at night",
        "The public watching the live feed could see every note and lie — but the housemates inside couldn't",
        "Nick could see the audience but they couldn't see him",
        "Only the tabloids knew what was happening",
      ],
      correctIndex: 1,
      explanation:
        "The audience watched the manipulation in real time while the housemates had no idea — like watching a crime unfold and being unable to do anything but vote and buy a paper.",
    },
    {
      type: "mcq",
      id: "nn-q2",
      prompt: "What is the central media-literacy lesson when you compare 2000 with today?",
      options: [
        "Reality TV was better in 2000",
        "Social media invented public outrage",
        "Same villain, outrage and redemption — the platform changed, the psychology didn't",
        "Nothing about it is relevant now",
      ],
      correctIndex: 2,
      explanation:
        "Tabloids, phone-ins and a helicopter did in 2000 what TikTok, X and petitions would do today. The tools change; the underlying human pattern doesn't.",
    },
    {
      type: "mcq",
      id: "nn-q3",
      prompt: "How is the day-24 helicopter leaflet drop best understood?",
      options: [
        "A safety operation",
        "A Channel 4 promotion",
        "The 'pile-on of its era' — public outrage demanding action, using the tools of 2000",
        "An accident",
      ],
      correctIndex: 2,
      explanation:
        "Dropping leaflets calling for Nick's nomination is exactly the dynamic of a modern online pile-on, just executed with the technology available at the time.",
    },
    {
      type: "mcq",
      id: "nn-q4",
      prompt: "Where did the label 'Nasty Nick' come from, and what's the lesson?",
      options: [
        "Nick chose it himself; it means nothing",
        "The producers assigned it as his official name",
        "The tabloids created it — and a nickname given in the heat of a story can follow someone for decades, beyond their control",
        "The other housemates voted on it",
      ],
      correctIndex: 2,
      explanation:
        "It was a tabloid creation that stuck for 25 years and still headlines every 'where are they now' piece. Labels have a half-life their subject can't control.",
    },
    {
      type: "mcq",
      id: "nn-q5",
      prompt: "How should you hold the two truths about Nick at once?",
      options: [
        "He did nothing wrong, so the label is unfair",
        "He genuinely cheated and manipulated people, AND the permanent tabloid label is its own separate issue",
        "The label proves he was evil forever",
        "Neither the cheating nor the label was real",
      ],
      correctIndex: 1,
      explanation:
        "The anger was justified — he really did manipulate people. That doesn't cancel the separate point that a sticky tabloid nickname following him for life is worth examining.",
    },
    {
      type: "mcq",
      id: "nn-q6",
      prompt: "How did the story reach 10 million website hits in 2000 without social media?",
      options: [
        "It didn't — that figure is invented",
        "Through the live feed, tabloid front pages and phone-in lines — outrage machinery that predates social media",
        "Because everyone owned a smartphone",
        "Through a single viral tweet",
      ],
      correctIndex: 1,
      explanation:
        "Like Sachsgate, it shows the amplification machine existed before social platforms. The infrastructure was different; the appetite and the spread were not.",
    },
    {
      type: "mcq",
      id: "nn-q7",
      prompt: "What is the classic Big Brother formula the story relies on?",
      options: [
        "Villain + hero + the public deciding",
        "Only luck and editing",
        "A panel of expert judges",
        "Whoever lasts longest automatically wins",
      ],
      correctIndex: 0,
      explanation:
        "A villain to despise, a hero to root for, and a public given the power to decide — that engine is what made the story (and the format) work.",
    },
    {
      type: "mcq",
      id: "nn-q8",
      prompt: "What made Craig Phillips' win notable?",
      options: [
        "He played the best villain",
        "He gave away the entire £70,000 prize to fund his friend's transplant — genuine decency, not a performance",
        "He won by a single vote",
        "He refused the prize on camera for attention",
      ],
      correctIndex: 1,
      explanation:
        "Craig wasn't playing a character. Confronting Nick and then donating every penny of the prize is the story's reminder of what real decency looks like amid the spectacle.",
    },
    {
      type: "mcq",
      id: "nn-q9",
      prompt: "What does the 2023 'rediscovery' on TikTok show?",
      options: [
        "Old stories can never go viral",
        "A 23-year-old story drew the same live-energy reactions — virality isn't bound to the moment it happened",
        "Gen Z invented Big Brother",
        "The original footage was fake",
      ],
      correctIndex: 1,
      explanation:
        "People reacted to a decades-old clip as if it were happening live, showing how the same emotional patterns re-ignite whenever a story resurfaces.",
    },
    {
      type: "mcq",
      id: "nn-q10",
      prompt: "What's the takeaway about labels for anyone online today?",
      options: [
        "Assign sticky nicknames freely — they're harmless",
        "Be careful with labels: they outlast the moment, and the person tagged can't control how long they stick",
        "Only celebrities are affected by labels",
        "Labels always fade within a week",
      ],
      correctIndex: 1,
      explanation:
        "A nickname coined in the heat of a story can define someone for decades. That permanence is a reason to be cautious about how we label people in a pile-on.",
    },
    {
      type: "written",
      id: "nn-w1",
      prompt:
        "Explain the 'asymmetry' between the audience and the housemates, and why it made the viewing experience so intense.",
      placeholder:
        "What could the public see that the housemates couldn't? How did that shape the public's reaction?…",
    },
    {
      type: "written",
      id: "nn-w2",
      prompt:
        "'Same story, different tools.' Compare how the Nick story spread in 2000 with how it would spread today, and explain what stays constant.",
      placeholder:
        "Tabloids, phone-ins and a helicopter vs TikTok, X and petitions — what's the unchanging part?…",
    },
    {
      type: "written",
      id: "nn-w3",
      prompt:
        "The 'Nasty Nick' label has followed him for 25 years. Discuss the permanence and 'half-life' of labels — who creates them and who controls them?",
      placeholder:
        "Who coined it? Why did it stick? What does that mean for the person it's attached to?…",
    },
    {
      type: "written",
      id: "nn-w4",
      prompt:
        "'Both things can be true' — Nick genuinely cheated, AND the permanent label is its own issue. Explain how both can hold at once.",
      placeholder:
        "Why doesn't justified anger settle the separate question about the label?…",
    },
    {
      type: "written",
      id: "nn-w5",
      prompt:
        "Craig gave away his entire prize. What does the villain/hero/public-decides formula reveal about why we watch — and what did Craig add to it?",
      placeholder:
        "Think about what audiences want from these stories, and what genuine decency contributed…",
    },
    {
      type: "written",
      id: "nn-w6",
      prompt:
        "What should this story teach you about assigning labels or joining a pile-on online?",
      placeholder:
        "Consider permanence, control, proportionality, and how you'd want to be treated…",
    },
  ],
};
