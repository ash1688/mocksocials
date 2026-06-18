// Authored Scenario — Gary Lineker & the BBC (March 2023). Ported from the HTML
// POC. Authored, never simulated (ADR-0006). A genuinely contested case: the
// teaching focus is impartiality rules, employer-vs-employee speech, solidarity
// and the Streisand effect — not the underlying immigration politics. Section
// captions/illustrations from the POC are omitted; the match-themed labels
// preserve the structure.
import type { Scenario } from "./red-bull";

export const LINEKER_SCENARIO: Scenario = {
  id: "lineker-bbc-showdown",
  badge: "Scenario",
  title: "Gary Lineker — The BBC Showdown (March 2023)",
  prePosts: [
    { type: "post", name: "Match of the Day", handle: "@BBCMOTD", av: "journo", initials: "MD", text: "Saturday night football is back. Join us for full coverage of today's Premier League action. #MOTD", likes: 3200, rts: 840, platform: "MockTweet" },
    { type: "post", name: "Alan Shearer", handle: "@alanshearer", av: "public", initials: "AS", text: "Big weekend in the Premier League. Plenty to talk about on Saturday night. See you on the sofa @GaryLineker", likes: 9100, rts: 1800, platform: "MockTweet" },
    { type: "post", name: "BBC News", handle: "@BBCNews", av: "journo", initials: "BB", verified: true, text: "Home Secretary Suella Braverman is set to unveil new legislation targeting small boat crossings. Critics say the language used has been deliberately inflammatory.", likes: 4200, rts: 1900, platform: "MockTweet" },
  ],
  sections: [
    {
      label: "Coin Toss — Braverman Makes Her Move",
      gap: 1800,
      posts: [
        { type: "post", name: "Suella Braverman", handle: "@SuellaBraverman", av: "official", initials: "SB", verified: true, text: "The British people are compassionate but fair. We cannot continue to have illegal migration at this scale. Our new Illegal Migration Bill will fix our broken asylum system once and for all.", likes: 8200, rts: 3100, platform: "MockTweet" },
        { type: "post", name: "Rishi Sunak", handle: "@RishiSunak", av: "official", initials: "RS", verified: true, text: "People are dying trying to cross the Channel in small boats. Criminal gangs are exploiting vulnerable people. Our new legislation will stop the boats and fix our broken asylum system.", likes: 6100, rts: 2400, platform: "MockTweet" },
        { type: "news", outlet: "BBC News", outletColor: "#e83030", headline: "Government unveils Illegal Migration Bill — critics say language echoes far-right rhetoric", sub: "Home Secretary Suella Braverman describes asylum seekers as an \"invasion\" as the government launches its flagship immigration legislation.", url: "bbc.co.uk/news/uk-politics" },
      ],
    },
    {
      label: "Kick Off — Gary's Tweet Lands",
      gap: 1800,
      posts: [
        { type: "post", name: "Gary Lineker", handle: "@GaryLineker", av: "mr", initials: "GL", verified: true, text: "There is no huge influx. We take far fewer refugees than other major European countries. This is just an immeasurably cruel policy directed at the most vulnerable people in language that is not dissimilar to that used by Germany in the 30s. It's beyond awful. #RefugeesWelcome", likes: 426000, rts: 98000, platform: "MockTweet" },
        { type: "post", name: "James O'Brien", handle: "@mrjamesob", av: "public", initials: "JO", text: "Gary Lineker is saying what any decent, informed person knows to be true. The comparison is historically accurate. The BBC trying to silence him would be one of the most shameful things they've ever done. #GaryLineker", likes: 54200, rts: 18900, platform: "MockTweet" },
        { type: "post", name: "Piers Morgan", handle: "@piersmorgan", av: "public", initials: "PM", text: "Sorry but comparing Britain's immigration policy to Nazi Germany is offensive, wrong and completely out of order. Gary Lineker should apologise immediately.", likes: 31800, rts: 8200, platform: "MockTweet" },
        { type: "post", name: "Brendan O'Neill", handle: "@Brendan_Oneill", av: "public", initials: "BO", text: "A millionaire footballer lecturing the British public about refugees from his mansion. The BBC needs to act. He's a presenter, not a politician. #GaryLineker", likes: 19200, rts: 5800, platform: "MockTweet" },
        { type: "post", name: "Best for Britain", handle: "@BestForBritain", av: "public", initials: "BF", text: "The facts Gary Lineker cited are correct. We DO take far fewer refugees than comparable European nations. Calling out inflammatory political language is not bias — it's basic civic responsibility. #GaryLineker", likes: 42100, rts: 19800, platform: "MockTweet" },
      ],
    },
    {
      label: "Foul — Public Reaction Floods In",
      gap: 1800,
      posts: [
        { type: "trend", label: "Trending in United Kingdom", hashtag: "#GaryLineker", volume: "284K posts", context: "Gary Lineker's tweet comparing asylum seeker rhetoric to 1930s Germany goes viral" },
        { type: "post", name: "Owen Jones", handle: "@OwenJones84", av: "public", initials: "OJ", text: "Gary Lineker is right and the people attacking him know he's right. That's why they're so angry. Truth spoken plainly to power. #IStandWithGaryLineker", likes: 88200, rts: 34100, platform: "MockTweet" },
        { type: "post", name: "Rachel Riley", handle: "@RachelRileyRR", av: "public", initials: "RR", text: "Completely disagree with Gary here. The Nazi comparison trivialises the Holocaust. There are better ways to make this argument. #GaryLineker", likes: 22100, rts: 6800, platform: "MockTweet" },
        { type: "post", name: "Amnesty International UK", handle: "@AmnestyUK", av: "public", initials: "AI", text: "The Illegal Migration Bill would breach international law. Gary Lineker is right to call out the language being used. Dehumanising rhetoric has real-world consequences. #GaryLineker", likes: 61400, rts: 28900, platform: "MockTweet" },
        { type: "post", name: "Robert Jenrick", handle: "@RobertJenrick", av: "official", initials: "RJ", verified: true, text: "The BBC has rules on impartiality for a reason. Gary Lineker is a BBC employee and he knows the guidelines. This cannot be ignored by BBC leadership. #GaryLineker", likes: 14200, rts: 4100, platform: "MockTweet" },
      ],
    },
    {
      label: "VAR Check — The BBC Steps In",
      gap: 2200,
      posts: [
        { type: "news", outlet: "BBC News", outletColor: "#e83030", headline: "BBC asks Gary Lineker to \"step back\" from presenting Match of the Day", sub: "The BBC says it has asked Gary Lineker to step back from presenting MOTD with immediate effect while it reviews the situation regarding his recent social media post.", url: "bbc.co.uk/news/entertainment" },
        { type: "post", name: "Gary Lineker", handle: "@GaryLineker", av: "mr", initials: "GL", verified: true, text: "I have been asked to step back from presenting Match of the Day until we've had the opportunity to discuss the matter. I'm told there are things that need to be resolved first. I'm not sure what those things are.", likes: 198000, rts: 54000, platform: "MockTweet" },
        { type: "post", name: "Tory Fibs", handle: "@ToryFibs", av: "public", initials: "TF", text: "The BBC's director general — appointed by the government — is threatening to sack Gary Lineker for criticising that same government. You literally could not make this up. #FreeGaryLineker", likes: 112000, rts: 58000, platform: "MockTweet" },
      ],
    },
    {
      label: "Half Time — Empty Studio. Pundits Walk Out.",
      gap: 2000,
      posts: [
        { type: "post", name: "Alan Shearer", handle: "@alanshearer", av: "public", initials: "AS", text: "I've decided not to appear on Match of the Day this evening. Out of solidarity with my friend Gary Lineker.", likes: 284000, rts: 88000, platform: "MockTweet" },
        { type: "post", name: "Ian Wright", handle: "@IanWright0", av: "public", initials: "IW", text: "Solidarity. Can't say any more than that right now.", likes: 312000, rts: 94000, platform: "MockTweet" },
        { type: "post", name: "Micah Richards", handle: "@MicahRichards", av: "public", initials: "MC", text: "I won't be appearing on Match of the Day tonight. Gary is my friend and my colleague. Simple as that.", likes: 198000, rts: 72000, platform: "MockTweet" },
        { type: "post", name: "5 Live Sport", handle: "@5liveSport", av: "journo", initials: "5L", text: "MOTD commentators have also stepped back. Tonight's show will air with no presenter, no pundits and minimal commentary. An unprecedented moment for British broadcasting.", likes: 54200, rts: 28100, platform: "MockTweet" },
      ],
    },
    {
      label: "Second Half — The Internet Explodes",
      gap: 1800,
      posts: [
        { type: "trend", label: "Trending Worldwide", hashtag: "#FreeGaryLineker", volume: "1.2M posts", context: "After BBC suspends presenter and pundits walk out of Match of the Day in solidarity" },
        { type: "post", name: "Have I Got News For You", handle: "@haveigotnews", av: "public", initials: "HG", text: "MATCH OF THE DAY TONIGHT: ⚽⚽⚽ [no further information available] #MOTD #FreeGaryLineker", likes: 221000, rts: 98000, platform: "MockTweet" },
        { type: "news", outlet: "New York Times", outletColor: "#333333", headline: "Britain's BBC faces full-blown crisis over Gary Lineker suspension", sub: "The BBC's flagship football show aired without presenters or pundits in an extraordinary act of solidarity after Gary Lineker was suspended for a tweet about asylum seeker rhetoric.", url: "nytimes.com" },
        { type: "news", outlet: "Sky News", outletColor: "#1d9bf0", headline: "BBC faces full-blown crisis as MOTD pundits boycott show in Gary Lineker solidarity", sub: "The BBC's handling of the Gary Lineker row has drawn widespread criticism from across the political spectrum, with even government allies questioning whether the corporation overreacted.", url: "news.sky.com/story" },
      ],
    },
    {
      label: "BBC Backs Down — Gary to Return",
      gap: 2200,
      posts: [
        { type: "news", outlet: "BBC News", outletColor: "#e83030", headline: "Gary Lineker to return to Match of the Day after BBC resolves social media row", sub: "The BBC says it has reached an agreement with Gary Lineker and that he will return to present MOTD this weekend. The corporation will review its social media guidelines for all freelancers.", url: "bbc.co.uk/news/entertainment" },
        { type: "post", name: "The Guardian", handle: "@guardian", av: "journo", initials: "GU", text: "The BBC's climbdown over Gary Lineker is as complete as it is humiliating. Within 72 hours, the corporation suspended its most famous presenter, watched its flagship show collapse in solidarity, and then quietly reversed course.", likes: 82000, rts: 38000, platform: "MockTweet" },
      ],
    },
    {
      label: "Full Time — The Lesson",
      gap: 1800,
      posts: [
        { type: "post", name: "Gary Lineker", handle: "@GaryLineker", av: "mr", initials: "GL", verified: true, text: "It's been a surreal few days. The support I've received has been quite overwhelming and I'm deeply grateful to all those that have shown such solidarity. The bravery of my colleagues was truly extraordinary. I hope we can now get back to what we love: football. ⚽", likes: 612000, rts: 128000, platform: "MockTweet" },
        { type: "post", name: "Ian Wright", handle: "@IanWright0", av: "public", initials: "IW", text: "Back where we belong. Massive love to everyone who stood up this week. You know who you are. ❤️⚽ #MOTD", likes: 224000, rts: 58000, platform: "MockTweet" },
        { type: "verdict", tone: "cautionary", label: "The Verdict",
          heading: "How a Suspension Became the Story",
          body: "Gary Lineker — the BBC's best-known and freelance sports presenter — criticised government asylum rhetoric, including a comparison to 1930s Germany. There's a genuine, two-sided debate here: some argue a high-profile BBC face must stay impartial; others that calling out political language (and citing verifiable refugee figures) is fair comment, especially for a freelancer outside news. What's clearer is the comms lesson. By suspending him, the BBC turned a tweet into a full-blown crisis: pundits walked out in solidarity, Match of the Day aired as an empty studio, #FreeGaryLineker went global, and within 72 hours the corporation climbed down — a textbook Streisand effect plus the power of collective solidarity. Other threads worth weighing: separate the verifiable facts from the contested framing (the comparison); notice the perceived inconsistency critics raised about who gets sanctioned; and remember that an organisation's response to a controversy often does more damage than the original post." },
        { type: "impact", title: "The BBC Showdown", stats: [
          { num: "72hrs", label: "From suspension to BBC climbdown" },
          { num: "426K", label: "Likes on Gary's original tweet" },
          { num: "1.2M", label: "#FreeGaryLineker posts worldwide" },
          { num: "3", label: "Pundits who walked out in solidarity" },
        ] },
      ],
    },
  ],
  tasks: [
    {
      type: "mcq",
      id: "ln-q1",
      prompt: "What turned a single tweet into a 'full-blown crisis' for the BBC?",
      options: [
        "The tweet itself, with no further action",
        "The BBC's decision to suspend him — which triggered solidarity walkouts, an empty studio and global backlash",
        "A rival broadcaster",
        "Nothing — it blew over quietly",
      ],
      correctIndex: 1,
      explanation:
        "The response, not the post, escalated it. Suspending the presenter created a far bigger story than the tweet ever was.",
    },
    {
      type: "mcq",
      id: "ln-q2",
      prompt: "How is this another example of the Streisand effect?",
      options: [
        "The tweet was deleted and forgotten",
        "Trying to shut Lineker down amplified him — the empty studio and #FreeGaryLineker reached far more people than the original tweet",
        "Nobody noticed the suspension",
        "The BBC gained viewers",
      ],
      correctIndex: 1,
      explanation:
        "Suppression drew enormous attention. The attempt to manage him became the headline worldwide.",
    },
    {
      type: "mcq",
      id: "ln-q3",
      prompt: "What made the pundits' walkout so powerful?",
      options: [
        "It was ignored",
        "Collective solidarity collapsed the flagship show — an empty studio that the BBC couldn't easily wait out",
        "It was a single person",
        "It had no effect on the BBC",
      ],
      correctIndex: 1,
      explanation:
        "One person can be suspended; a coordinated walkout that guts the programme changes the power balance and forces a response.",
    },
    {
      type: "mcq",
      id: "ln-q4",
      prompt: "Why is it useful to separate the 'facts' from the 'framing' in his tweet?",
      options: [
        "There's no difference",
        "The refugee-numbers claim was verifiable, while the 1930s-Germany comparison was the genuinely contested part — they should be judged separately",
        "Both were equally agreed on",
        "Neither could be checked",
      ],
      correctIndex: 1,
      explanation:
        "Good media literacy distinguishes a checkable factual claim from a rhetorical comparison people reasonably disagree about.",
    },
    {
      type: "mcq",
      id: "ln-q5",
      prompt: "What is the genuine two-sided debate at the heart of this?",
      options: [
        "Whether football is good",
        "Whether a high-profile BBC presenter (and freelancer, outside news) should be bound by impartiality rules on personal social media",
        "Whether the BBC should exist",
        "Whether tweets should be banned",
      ],
      correctIndex: 1,
      explanation:
        "Reasonable people disagreed: impartiality protects trust in the BBC, but a freelance sports host isn't a news journalist. Holding that tension is the point.",
    },
    {
      type: "mcq",
      id: "ln-q6",
      prompt: "What 'perceived inconsistency' did critics of the BBC raise?",
      options: [
        "That MOTD aired too late",
        "That the BBC sanctioned Lineker while routinely platforming politicians whose claims also drew scrutiny — raising 'who gets sanctioned and why?'",
        "That Lineker wasn't famous",
        "That nobody watched the show",
      ],
      correctIndex: 1,
      explanation:
        "The 'who benefits / who gets punished' question is a recurring media-literacy lens: critics argued the standard was applied unevenly.",
    },
    {
      type: "mcq",
      id: "ln-q7",
      prompt: "What's the broad lesson about an organisation's response to a controversy?",
      options: [
        "Always suspend people fast",
        "The response often does more damage than the original post — a heavy-handed reaction can manufacture the real crisis",
        "Never respond to anything",
        "Responses never matter",
      ],
      correctIndex: 1,
      explanation:
        "As with several other cases, the institution's handling — not the initial act — created the lasting problem and the climbdown.",
    },
    {
      type: "mcq",
      id: "ln-q8",
      prompt: "How should you read the fact that voices on the SAME 'side' disagreed (e.g. some who back Lineker disliked the comparison)?",
      options: [
        "It means they secretly agreed with the government",
        "It shows you can support someone's right to speak and the core point while still criticising a specific phrasing — positions aren't all-or-nothing",
        "It proves nobody had a real opinion",
        "It means the debate was fake",
      ],
      correctIndex: 1,
      explanation:
        "Nuance: agreeing with the substance doesn't require endorsing every word. Flattening people into two tribes misses that.",
    },
    {
      type: "written",
      id: "ln-w1",
      prompt:
        "Explain how the BBC's suspension became a bigger story than the tweet. Reference the Streisand effect and the walkouts.",
      placeholder:
        "What did suspending him trigger? What did the empty studio communicate?…",
    },
    {
      type: "written",
      id: "ln-w2",
      prompt:
        "Set out the genuine two-sided impartiality debate fairly. What's the strongest case on each side?",
      placeholder:
        "Why might a BBC face need to stay impartial? Why might a freelance sports host be free to comment?…",
    },
    {
      type: "written",
      id: "ln-w3",
      prompt:
        "Separate the verifiable facts from the contested framing in Lineker's tweet, and explain why that distinction matters.",
      placeholder:
        "Which claim is checkable? Which part is a rhetorical comparison people disagree on?…",
    },
    {
      type: "written",
      id: "ln-w4",
      prompt:
        "You advise the BBC the morning the tweet goes viral. What would you do differently from how it actually played out, and why?",
      placeholder:
        "Consider escalation, the impartiality rules for freelancers, and avoiding a self-inflicted crisis…",
    },
  ],
};
