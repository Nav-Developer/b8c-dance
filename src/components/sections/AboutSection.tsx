"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, animate, motion, useInView } from "framer-motion";
import assets from "@/assets";
import DanceBackground from "@/components/ui/DanceGround";
import { site } from "@/data/site";
import SectionHeading from "./SectionHeading";

const TEAM = [
  {
    key: "bala",
    name: site.founder.name || "Bala Master",
    role: "Founder Choreographer",
    bio:
      site.founder.bio ||
      "A professional choreographer and mentor with extensive experience in the performing-arts field.",
    image: assets.images.founder,
    initials: "BM",
  },
  {
    key: "hanetha",
    name: "K. M. Hanetha Balaji",
    role: "Proprietor",
    bio: "Focused on management, programme coordination, talent development and building opportunities for students and aspiring performers.",
    image: assets.images.Proprietor,
    initials: "KH",
  },
];

const MILESTONES = [
  { label: "Founded in", to: 2011, suffix: "", plain: true },
  { label: "Students trained", to: 5000, suffix: "+", plain: false },
  { label: "Events across India", to: 25000, suffix: "+", plain: false },
];

const TABS = [
  {
    key: "vision",
    label: "Vision",
    title: "Our Vision",
    body: "To build a strong and positive creative community where every individual gets an opportunity to discover their talent, develop confidence and express themselves through art.",
  },
  {
    key: "mission",
    label: "Mission",
    title: "Our Mission",
    list: [
      "Provide quality and professional dance training",
      "Identify and encourage hidden talents",
      "Develop confidence, discipline and teamwork",
      "Create meaningful opportunities for young talents",
      "Promote healthy and positive engagement through performing arts",
      "Connect education, creativity and real-world performance experiences",
    ],
  },
  {
    key: "why",
    label: "Why B8C?",
    title: "Why B8C?",
    body: "B8C believes that dance is more than movement. It builds confidence, discipline, creativity and character. Our programmes give participants not only training but also opportunities to perform on stage, work as a team and experience professional event environments.",
  },
] as const;

const EXPERTISE = [
  {
    key: "training",
    label: "Dance Training",
    chips: [
      "Western",
      "Hip Hop",
      "Locking",
      "Lyrical",
      "Folk",
      "Bharathanatyam",
      "Freestyle",
      "Contemporary",
      "Zumba",
    ],
  },
  {
    key: "choreo",
    label: "Professional Choreography",
    chips: [
      "Wedding Choreography",
      "Sangeet",
      "College Events",
      "Corporate Events",
      "Flash Mobs",
      "Stage Performances",
      "Special Occasions",
    ],
  },
  {
    key: "workshops",
    label: "Workshops & Talent",
    chips: [
      "Dance Workshops",
      "College Talent Programmes",
      "Youth Engagement",
      "Creative Events",
      "Performance Training",
    ],
  },
];

const STEPS = [
  { word: "Discover", text: "Find the rhythm you didn't know you had." },
  { word: "Learn", text: "Structured training from beginner to pro." },
  { word: "Perform", text: "Real stages, real audiences, real events." },
  { word: "Achieve", text: "Confidence and discipline for life." },
];

/* ---------- helpers ---------- */

function Counter({
  to,
  suffix,
  plain,
}: {
  to: number;
  suffix: string;
  plain: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (x) => setV(Math.round(x)),
    });
    return () => c.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {plain ? v : v.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/* ---------- component ---------- */

export default function AboutSection() {
  const [member, setMember] = useState(0);
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("vision");
  const [pillar, setPillar] = useState(0);
  const [step, setStep] = useState(0);

  const m = TEAM[member];
  const t = TABS.find((x) => x.key === tab)!;

  return (
    <DanceBackground
      showBars={false}
      showCounter={false}
      particles={30}
      bpm={88}
      className="py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          before="Meet Our"
          accent="Visionary"
          sub="Where Talent Meets Discipline, Creativity & Passion"
        />

        {/* ---------- TEAM SWITCHER ---------- */}
        <div className="mt-16 flex justify-center gap-3">
          {TEAM.map((p, i) => (
            <button
              key={p.key}
              onClick={() => setMember(i)}
              className={`rounded-full border px-5 py-2 text-sm font-bold uppercase tracking-wider transition ${
                member === i
                  ? "border-neon-400 bg-neon-400 text-ink-950"
                  : "border-neon-400/40 text-neon-400 hover:border-neon-400"
              }`}
            >
              {p.role}
            </button>
          ))}
        </div>

        <div className="mt-10 grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <AnimatePresence mode="wait">
            <motion.div
              key={m.key + "-img"}
              initial={{ opacity: 0, x: -60, rotate: -3 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
              className="relative mx-auto aspect-square w-full max-w-md"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                className="absolute -inset-3 rounded-3xl border-2 border-dashed border-neon-400/50"
              />
              <div className="relative h-full w-full overflow-hidden rounded-3xl border border-neon-400/60 shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
                {m.image ? (
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    sizes="(min-width:768px) 28rem, 90vw"
                    className="object-cover"
                  />
                ) : member === 0 ? (
                  <Image
                    src={assets.images.logo}
                    alt={m.name}
                    fill
                    sizes="(min-width:768px) 28rem, 90vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neon-600/40 to-black">
                    <span className="text-8xl font-black text-neon-400">
                      {m.initials}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={m.key + "-txt"}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-4xl font-extrabold text-neon-400 md:text-5xl">
                {m.name}
              </h3>
              <p className="mt-4 text-xl text-neon-400/90">{m.role}</p>
              <p className="mt-8 border-l-4 border-neon-400 pl-5 text-lg leading-relaxed text-white/75">
                {m.bio}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="rounded-xl bg-gradient-to-r from-neon-400 to-neon-600 px-7 py-4 font-bold text-ink-950 transition hover:-translate-y-1 hover:shadow-[0_10px_0_#3f8f27]"
                >
                  Talk to Us
                </Link>
                <Link
                  href="/classes"
                  className="rounded-xl border-2 border-neon-400/70 px-7 py-4 font-bold text-neon-400 transition hover:bg-neon-400 hover:text-ink-950"
                >
                  View Classes
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ---------- MILESTONES ---------- */}
        <div className="mt-24 grid gap-5 sm:grid-cols-3">
          {MILESTONES.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="rounded-2xl border border-neon-400/30 bg-black/50 p-7 text-center backdrop-blur transition-colors hover:border-neon-400"
            >
              <p className="text-5xl font-black text-neon-400">
                <Counter to={s.to} suffix={s.suffix} plain={s.plain} />
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.25em] text-white/70">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ---------- VISION / MISSION / WHY ---------- */}
        <div className="mt-24 rounded-2xl border border-neon-400/30 bg-black/50 p-6 backdrop-blur md:p-10">
          <div className="flex flex-wrap gap-2">
            {TABS.map((x) => (
              <button
                key={x.key}
                onClick={() => setTab(x.key)}
                className={`relative rounded-full px-5 py-2 text-sm font-bold uppercase tracking-wider transition ${
                  tab === x.key
                    ? "text-ink-950"
                    : "text-neon-400 hover:text-white"
                }`}
              >
                {tab === x.key && (
                  <motion.span
                    layoutId="about-tab"
                    className="absolute inset-0 rounded-full bg-neon-400"
                  />
                )}
                <span className="relative">{x.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={t.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              <h4 className="text-3xl font-extrabold text-white">{t.title}</h4>
              {"body" in t ? (
                <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/75">
                  {t.body}
                </p>
              ) : (
                <ul className="mt-5 grid gap-3 md:grid-cols-2">
                  {t.list.map((li, i) => (
                    <motion.li
                      key={li}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex gap-3 text-white/80"
                    >
                      <span className="mt-1 text-neon-400">✓</span>
                      {li}
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ---------- EXPERTISE ---------- */}
        <div className="mt-24">
          <h3 className="text-center text-3xl font-extrabold text-white">
            Our <span className="text-neon-400">Expertise</span>
          </h3>
          <p className="mt-2 text-center text-white/60">
            Tap a pillar, then tap a style to enquire about it.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {EXPERTISE.map((e, i) => (
              <button
                key={e.key}
                onClick={() => setPillar(i)}
                className={`rounded-2xl border p-5 text-left transition ${
                  pillar === i
                    ? "border-neon-400 bg-neon-400/10 shadow-[0_0_30px_rgba(122,210,84,0.25)]"
                    : "border-neon-400/30 bg-black/50 hover:border-neon-400/70"
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-neon-400">
                  0{i + 1}
                </p>
                <p className="mt-1 text-xl font-extrabold text-white">
                  {e.label}
                </p>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={pillar}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 flex flex-wrap justify-center gap-3"
            >
              {EXPERTISE[pillar].chips.map((c, i) => (
                <motion.div
                  key={c}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={`/contact?interest=${encodeURIComponent(c)}`}
                    className="inline-block rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 transition hover:-translate-y-1 hover:border-neon-400 hover:bg-neon-400 hover:text-ink-950"
                  >
                    {c}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ---------- DISCOVER / LEARN / PERFORM / ACHIEVE ---------- */}
        <div className="mt-24 rounded-2xl border border-neon-400/30 bg-black/60 p-6 text-center backdrop-blur md:p-10">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-2xl font-black uppercase tracking-wider md:text-4xl">
            {STEPS.map((s, i) => (
              <span key={s.word} className="flex items-center gap-4">
                <button
                  onMouseEnter={() => setStep(i)}
                  onClick={() => setStep(i)}
                  className={`transition ${
                    step === i
                      ? "text-neon-400 [text-shadow:0_0_20px_rgba(122,210,84,0.7)]"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {s.word}
                </button>
                {i < STEPS.length - 1 && (
                  <span className="text-neon-400">★</span>
                )}
              </span>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 text-lg text-white/70"
            >
              {STEPS[step].text}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </DanceBackground>
  );
}
