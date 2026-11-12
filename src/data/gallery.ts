// put this at: src/data/gallery.ts
// Order here = order in the gallery. `key` must match a key in assets.gallery.
import assets from "@/assets";

export type GalleryKey = keyof typeof assets.gallery;

export type GalleryItem = {
  key: GalleryKey;
  title: string;
  tag: string;
  text: string;
  facts: string[];
};

export const galleryItems: GalleryItem[] = [
  {
    key: "team4",
    title: "The Heart of the Team",
    tag: "Teamwork",
    text: "The heart of a dance team is teamwork. One dancer can shine, but a whole formation only works when everyone trusts the count, the spacing and each other.",
    facts: [
      "Everyone learns every part",
      "Timing is shared, not solo",
      "We rehearse as one unit",
    ],
  },
  {
    key: "cheering",
    title: "Energy That Spreads",
    tag: "Crowd Energy",
    text: "Dance is a shared feeling. The cheers from the crowd feed the dancers, and the dancers feed the crowd right back.",
    facts: [
      "Crowd + dancers = one energy",
      "Confidence grows with every applause",
      "Every show is a team win",
    ],
  },
  {
    key: "choreo",
    title: "Where Choreography Begins",
    tag: "Choreography",
    text: "Every routine starts as an idea. We break it into counts, build the formations, then polish it until the whole group moves as one.",
    facts: [
      "Counts of 8, step by step",
      "Formations planned for every stage",
      "Clean lines before speed",
    ],
  },
  {
    key: "choreo2",
    title: "Formations in Motion",
    tag: "Choreography",
    text: "Good choreography is about the space between dancers as much as the steps. Spacing and transitions make a group look sharp.",
    facts: [
      "Spacing is practised, not guessed",
      "Smooth transitions matter",
      "Eyes and hands in sync",
    ],
  },
  {
    key: "choreo3",
    title: "Practice Makes It Look Easy",
    tag: "Rehearsal",
    text: "The moves that look effortless on stage come from many rehearsals. We repeat, fix, and repeat again until it feels natural.",
    facts: [
      "Small fixes, big difference",
      "Rehearse in costume when possible",
      "Stamina is part of the training",
    ],
  },
  {
    key: "choreo4",
    title: "Style and Detail",
    tag: "Technique",
    text: "Posture, expression and footwork separate a good routine from a great one. We train the details alongside the big moves.",
    facts: [
      "Posture first",
      "Expression sells the story",
      "Footwork keeps the beat",
    ],
  },
  {
    key: "onStage",
    title: "Lights, Music, Go",
    tag: "On Stage",
    text: "Stage performance is where all the practice pays off. Our dancers learn how to own the stage, hit their marks and play to the audience.",
    facts: [
      "Stage presence is trained",
      "Entry and exit are rehearsed",
      "We perform for every audience size",
    ],
  },
  {
    key: "onStage2",
    title: "Owning the Spotlight",
    tag: "On Stage",
    text: "Performing in front of people takes courage. Group stage experience helps shy beginners turn into confident performers.",
    facts: [
      "Confidence builds with each show",
      "Every dancer gets stage time",
      "Nerves turn into energy",
    ],
  },
  {
    key: "onStage3",
    title: "Moving as One",
    tag: "On Stage",
    text: "On a big stage, a group has to breathe together. We work on shared timing so the whole line lands the move at the same moment.",
    facts: [
      "Listen to the music, not just count",
      "Stay aware of the dancer beside you",
      "Finish every move together",
    ],
  },
  {
    key: "onStage4",
    title: "The Final Pose",
    tag: "On Stage",
    text: "A strong ending leaves a lasting memory. We plan the last pose as carefully as the opening step.",
    facts: [
      "Strong open, stronger close",
      "Hold the pose, feel the applause",
      "Every show ends together",
    ],
  },
  {
    key: "marriage1",
    title: "Wedding Welcome Dance",
    tag: "Wedding / Sangeet",
    text: "Sangeet and wedding performances are about joy. We choreograph family and friends so the whole celebration feels special and easy to enjoy.",
    facts: [
      "Custom songs and steps",
      "Family-friendly choreography",
      "Beginners are welcome",
    ],
  },
  {
    key: "marriage4",
    title: "Sangeet Celebrations",
    tag: "Wedding / Sangeet",
    text: "From the bride and groom's entry to group family numbers, we plan the dances so everyone feels confident on the floor.",
    facts: [
      "Couple and group routines",
      "Learn in a few short sessions",
      "Made to match your theme",
    ],
  },
  {
    key: "function1",
    title: "Function Performances",
    tag: "Events",
    text: "Functions and celebrations come alive with live dance. We bring a crew that matches the mood and the venue.",
    facts: [
      "Short, high-energy sets",
      "Works for small and large venues",
      "Costumes to match the event",
    ],
  },
  {
    key: "function2",
    title: "Making the Crowd Move",
    tag: "Events",
    text: "A good event performance pulls the audience in. We design routines that get people clapping, cheering and dancing along.",
    facts: [
      "Interactive moments",
      "Crowd-friendly music",
      "Tailored to the occasion",
    ],
  },
  {
    key: "function3",
    title: "Every Occasion, One Beat",
    tag: "Events",
    text: "Birthdays, launches, festivals or family functions, we adapt our style and our energy to fit what you are celebrating.",
    facts: ["Flexible themes", "Quick planning support", "Reliable on the day"],
  },
  {
    key: "event1",
    title: "Corporate and Public Events",
    tag: "Corporate Events",
    text: "Dance is a great way to bring a team together. We run performances and team activities for offices, colleges and public events.",
    facts: [
      "Teambuilding through dance",
      "Professional and clean routines",
      "Fits any event schedule",
    ],
  },
  {
    key: "celeb1",
    title: "Moments With Stars",
    tag: "Celebrity Moments",
    text: "Moments like this are a proud part of our journey. They show the hard work of our dancers being noticed and celebrated.",
    facts: [
      "Proud milestones for the team",
      "Recognition for our dancers",
      "Motivation to keep growing",
    ],
  },
  {
    key: "celeb2",
    title: "Meeting the Spotlight",
    tag: "Celebrity Moments",
    text: "Sharing a frame with well-known faces reminds our dancers that dedicated practice can lead to big moments.",
    facts: [
      "Hard work gets seen",
      "Memories our students keep",
      "Inspires the next batch",
    ],
  },
  {
    key: "celeb3",
    title: "Behind the Scenes",
    tag: "Celebrity Moments",
    text: "Off-stage moments are part of the story too. The bonds our team builds backstage are just as important as the shows.",
    facts: [
      "Friendships built through dance",
      "Support before every show",
      "One team, on and off stage",
    ],
  },
  {
    key: "other",
    title: "More From the b8c Family",
    tag: "Moments",
    text: "Classes, rehearsals and celebrations, our dance family shares many moments that do not fit in one category.",
    facts: [
      "Open to all ages and levels",
      "Fun first, skill follows",
      "Come curious, leave dancing",
    ],
  },
];
