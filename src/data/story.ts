import type { StaticImageData } from "next/image";
import assets from "@/assets";

export type Chapter = {
  tag: string;
  title: string;
  text: string;
  image: StaticImageData | string;
  focus?: string;
  highlights?: string[];
  stats?: { label: string; value: number; suffix?: string }[];
};

const bg = assets.images.founder;

export const chapters: Chapter[] = [
  {
    tag: "Since 2011",
    title: "Bala's 8 Counts",
    text: "A Coimbatore dance company built on one idea: every count matters. Fifteen years of stages, studios and celebrations.",
    image: assets.images.cheering,
    focus: "50% 25%",
    highlights: ["Learn", "Perform", "Move"],
  },
  {
    tag: "Weddings & Sangeet",
    title: "Welcome Dance",
    text: "Wedding welcome dances and sangeet choreography that get the whole family, from grandparents to cousins, on the floor.",
    image: assets.images.marriage,
    focus: "50% 25%",
    highlights: ["Welcome Dance", "Sangeet", "Couple Acts"],
  },
  {
    tag: "Surprise",
    title: "Flashmobs",
    text: "Surprise flashmobs that turn an ordinary moment into the one everybody films. Planned in secret, performed in a flash.",
    image: assets.images.onStage,
    focus: "50% 25%",
    highlights: ["Surprise", "Crowd", "Viral"],
  },
  {
    tag: "Corporate & Campus",
    title: "Events & College",
    text: "Corporate dance events and college choreography, built around your team, your theme and your stage.",
    image: assets.images.corporate,
    focus: "50% 25%",
    highlights: ["Corporate", "College", "Fests"],
  },
  {
    tag: "Fitness",
    title: "Zumba & Classes",
    text: "Come curious, leave dancing. Zumba and regular classes for beginners right up to performers.",
    image: assets.images.team,
    focus: "50% 25%",
    highlights: ["Zumba", "Hip-Hop", "Freestyle"],
  },
  {
    tag: "On Stage",
    title: "Diwali Thiruvizha",
    text: "Bala Master & Crew live at Semmozhi Poonga, Coimbatore. Oct 31, 4 to 7 PM. Entry free. Dress up, show up, light it up.",
    image: assets.images.other,
    focus: "50% 25%",
    highlights: ["Oct 31", "4 – 7 PM", "Entry Free"],
  },
  {
    tag: "The Numbers",
    title: "Join The Family",
    text: "Thousands follow the journey. Your turn to take the floor.",
    image: assets.images.group,
    focus: "50% 25%",
    stats: [
      { label: "Years", value: 15, suffix: "+" },
      { label: "Posts", value: 1643 },
      { label: "Followers", value: 3216 },
    ],
  },
];
