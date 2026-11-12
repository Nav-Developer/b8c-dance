export const site = {
  name: "b8c Dance Company",
  fullName: "Bala's 8 Counts Dance Company",
  since: 2011,

  phone: "+91 9629202919",
  whatsapp: "919629202919",
  email: "hello@example.com",
  address: "Coimbatore, Tamil Nadu",

  instagramHandle: "b8cdancecompany",
  instagram: "https://www.instagram.com/b8cdancecompany/",

  youtube: "https://www.youtube.com/@b8cdancecompany821",
  youtubeChannelId: "UCxxxxxxxxxxxxxxxxxxxxxx",
  instagramFeedUrl: "https://feeds.behold.so/XXXXXXXX",

  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Classes", href: "/menu" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  founder: {
    name: "Bala Master",
    role: "Founder & Choreographer",
    bio: "Bala leads the crew behind Bala's 8 Counts, a Coimbatore dance company that has been performing since 2011. From wedding welcome dances and sangeet to surprise flashmobs, corporate shows and college choreography, every piece is built around one idea: every count matters.", // TODO: edit
    image: undefined as string | undefined,
  },

  classes: [
    {
      title: "Wedding & Sangeet",
      tag: "Most loved",
      text: "Welcome dances and sangeet choreography for couples and families, from first step to final pose.",
      points: ["Couple acts", "Family groups", "Welcome entry"],
    },
    {
      title: "Flashmobs",
      tag: "Surprise",
      text: "Surprise flashmobs planned in secret and performed in a flash.",
      points: ["Public places", "Proposals", "Campaigns"],
    },
    {
      title: "Corporate Events",
      tag: "Teams",
      text: "Dance events built around your team, theme and stage, for annual days and launches.",
      points: ["Annual days", "Team building", "Launches"],
    },
    {
      title: "College Choreography",
      tag: "Campus",
      text: "Competition-ready choreography for fests, cultural days and inter-college events.",
      points: ["Fest teams", "Competitions", "Cultural days"],
    },
    {
      title: "Zumba",
      tag: "Fitness",
      text: "High-energy Zumba that feels like a party and works like a workout.",
      points: ["All levels", "Weekly batches", "Fun first"],
    },
    {
      title: "Hip-Hop & Freestyle",
      tag: "Street",
      text: "Grooves, foundations and freestyle for beginners right up to performers.",
      points: ["Foundations", "Freestyle", "Stage practice"],
    },
  ],

  // YouTube: the part after v= in the video link
  videos: [
    { id: "YOUTUBE_VIDEO_ID_1", title: "Diwali Thiruvizha, live" }, // TODO
    { id: "YOUTUBE_VIDEO_ID_2", title: "Wedding welcome dance" }, // TODO
    { id: "YOUTUBE_VIDEO_ID_3", title: "Flashmob highlights" }, // TODO
  ],

  // Instagram: the part after /reel/ in the reel link
  reels: [
    { code: "REEL_CODE_1", title: "Latest reel" }, // TODO
    { code: "REEL_CODE_2", title: "Flashmob" }, // TODO
    { code: "REEL_CODE_3", title: "Wedding welcome" }, // TODO
  ],
};
