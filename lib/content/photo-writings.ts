/*
 * Photography — Featured Writings. Four essays on what the camera
 * taught about rooms, speed, and translation. Each renders as an
 * expandable card: title, subtitle, and hero quote visible collapsed;
 * the body drops in between on expand.
 */

export interface PhotoWriting {
  slug: string;
  title: string;
  subtitle: string;
  heroQuote: string; // the essay's closing pull quote — shown even collapsed
  paragraphs: string[];
}

export const photoWritings: PhotoWriting[] = [
  {
    slug: "the-sideline-doesnt-pause",
    title: "The Sideline Doesn't Pause",
    subtitle: "The room that taught me everything else.",
    heroQuote:
      "Speed is rarely a gift. It is closer to a debt, paid off in advance, across hours nobody happened to be watching.",
    paragraphs: [
      "A live game does not wait for you to catch up. The play breaks, the crowd behind you keeps its noise going with no regard for whether you have found your footing, and whatever you were about to notice either gets caught in the next half-second or it disappears for good. I built most of my instincts inside that kind of pressure. It was not a room I chose because it was the hardest one available. It was simply the room I happened to be standing in the first time I picked up a camera with any seriousness, and it left a mark that outlasted the sport itself. It taught me that attention is not a state you drift into. It is a decision you make well ahead of time, so that when the moment arrives, the one that will not repeat itself no matter how badly you want it to, you are already looking in the right place.",
      "I spent years building that kind of knowledge without recognizing it as knowledge. It felt more like luck, showing up in the right place often enough that people eventually stopped calling it luck. What I understand now is that useful instinct is just pattern recognition running faster than the part of the brain that likes to take credit for things. Every frame I caught in time was preceded by dozens I caught late, and the lateness is where the real learning happened. I didn't get faster because I got smarter. I got faster because I accumulated enough failed timing that my body started correcting for it before I consciously asked it to.",
      "That is the part of sports photography that outlasted my interest in sports themselves. Not the adrenaline, which fades once you've covered enough games that they start to blur together, but the understanding that speed is rarely a gift. It is closer to a debt, paid off in advance, across hours nobody happened to be watching, so that the one moment everyone is watching finds you already prepared for it. I have carried that math into rooms that have nothing to do with a scoreboard. The people who look fastest in a crisis are almost never improvising. They are just cashing in work they already did somewhere else.",
    ],
  },
  {
    slug: "arriving-fluent",
    title: "Arriving Fluent",
    subtitle: "How many rooms only give you one honest look.",
    heroQuote:
      "Each room only gives you one honest look before the moment adjusts itself for an audience, tightens up, and starts performing something more polished than the truth.",
    paragraphs: [
      "Every room runs on two sets of rules. There are the ones written down somewhere, in a program or a policy or a sign near the door, and then there are the ones that actually govern behavior, which nobody writes down because everyone already inside the room agreed to them long before you arrived. A locker room has a hierarchy that has little to do with the roster. A sanctuary changes tempo depending on who just walked through the door. A green room before a show runs on an order of operations that looks, to a stranger, like chaos, and is in fact a fairly rigid system everyone inside it is unconsciously obeying. Learning to see that second, unwritten set of rules without anyone explaining them to me has been the most consistently useful skill I've built.",
      "It is closer to picking up a dialect than learning a fact. You watch who gets deferred to and who does the deferring. You notice which comments earn a laugh and which earn a nod and a quiet change of subject. You clock who speaks first in a room and who speaks last, and you learn, eventually, that the person who speaks last is very often the one whose opinion actually decides things. None of this shows up on paper, and none of it holds still for long. Each room only gives you one honest look before the moment adjusts itself for an audience, tightens up, and starts performing something more polished than the truth. The window to catch it is short, but it is almost always there for anyone patient enough to watch before they speak.",
      "What surprised me is how transferable this turned out to be across settings that otherwise share nothing. The specific code changes between a courtroom and a wedding and a classroom, but the practice of decoding it stays constant. I no longer walk into an unfamiliar room and experience unfamiliarity as a disadvantage. I experience it as a short, solvable puzzle, one I've now solved often enough, in different enough settings, that the solving has become the comfortable part rather than the anxious one.",
    ],
  },
  {
    slug: "fashion-show-field-day",
    title: "What a Fashion Show and a Field Day Have in Common",
    subtitle: "Two rooms, one clock.",
    heroQuote:
      "The specifics change every time. The instinct for where to look first almost never does.",
    paragraphs: [
      "An elementary school field day and a fashion show backstage should not, by any reasonable classification, belong in the same sentence. One is organized around sunscreen, whistles, and the fully containable stakes of an eight-year-old's three-legged race. The other is organized around adrenaline, hairspray, and the considerably less containable stakes of adults about to be evaluated by hundreds of strangers within the hour. I have photographed both more than once, and at some point the surface differences stopped being the interesting part of the comparison. What held my attention instead was a structure that kept reappearing underneath both events, dressed differently each time: a small group quietly doing the actual work of holding things together, a larger group performing a confidence it hadn't quite earned yet, and one or two unscheduled moments that ended up mattering more than anything printed on the official program.",
      "Once that structure became visible to me, it also became something I could act on rather than just admire. Walking into a room I've never worked before, I already know roughly where to point a camera before anything has happened, because I arrive with a working theory about which small group is actually running things and which larger group is only performing readiness. That theory rarely misses by much. It has held up at cultural showcases, at corporate product launches, at church events with two hundred moving parts and no formal chain of command anyone would admit to on paper. The specific setting changes every time. The instinct for where to look first almost never does.",
    ],
  },
  {
    slug: "the-interpreter",
    title: "The Interpreter",
    subtitle: "Carrying the moment to someone who wasn't there.",
    heroQuote:
      "Understanding a room by yourself is a private skill. Understanding it well enough to hand it to someone else is the one that's actually worth something.",
    paragraphs: [
      "A coach's shorthand means nothing to a parent watching from three rows up, piecing the outcome of the last play together from posture alone. A bride's vision for a room means just as little to a vendor encountering it secondhand, reduced to line items and a delivery window. In both cases, something true exists clearly on one side of a gap and has to reach someone standing on the other side of it mostly intact, or the effort of understanding it in the first place goes to waste. I have spent a considerable amount of my life standing inside that particular gap, usually without a name for what I was doing there, taking one person's fluency in a moment and turning it into something a second person, who was never in the room, could actually receive.",
      "This turned out to have less to do with photography than I originally assumed. An image can carry a fragment of a moment across that gap on its own, but the harder work usually happens around it rather than inside it: in the caption, in the choice of which frame to lead with and which to leave in a folder no one sees, in the follow-up conversation where someone asks what it was actually like and I have to decide, quickly, which details will make them feel it and which will only make the story longer without making it truer. Observation gets you halfway there and then stops being useful on its own. Understanding a room by yourself is a private skill, satisfying enough on its own terms. Understanding it well enough to hand it to someone else, without losing what made it true, is the one that's actually worth something.",
      "This is the part of the work I care most about protecting, because it is also the easiest one to lose. It is entirely possible to be excellent at noticing things and still fail completely at making a stranger feel what you noticed. The two skills look related from a distance and are not, in practice, the same muscle at all. I have tried, over time, to spend as much effort on the second one as I once spent almost exclusively on the first.",
    ],
  },
];
