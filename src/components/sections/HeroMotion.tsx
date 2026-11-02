"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import assets from "@/assets";
import DanceBackground from "../ui/DanceGround";

const BPM = 104;
const BEAT = 60000 / BPM;

const STYLES = [
  "Wedding Welcome",
  "Flashmob",
  "Corporate",
  "Sangeet",
  "College",
  "Zumba",
  "Hip-Hop",
  "Freestyle",
];

const BEAMS = [
  { left: "6%", rot: [-14, 10, -14], dur: 9, w: "26rem" },
  { left: "38%", rot: [10, -12, 10], dur: 11, w: "30rem" },
  { left: "70%", rot: [-8, 14, -8], dur: 8, w: "24rem" },
];

export default function HeroStage() {
  const [count, setCount] = useState(0);

  // sync to the same clock the background uses
  useEffect(() => {
    const t = setInterval(() => {
      const c = Math.floor(performance.now() / BEAT) % 8;
      setCount((p) => (p === c ? p : c));
    }, 40);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative">
      <DanceBackground bpm={BPM} className="min-h-screen">
        {BEAMS.map((b, i) => (
          <motion.div
            key={i}
            className="pointer-events-none absolute -top-16 h-[130%] origin-top bg-gradient-to-b from-neon-400/30 via-neon-400/5 to-transparent mix-blend-screen [clip-path:polygon(45%_0,55%_0,100%_100%,0_100%)]"
            style={{ left: b.left, width: b.w }}
            animate={{ rotate: b.rot }}
            transition={{
              duration: b.dur,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] overflow-hidden [perspective:520px]">
          <motion.div
            className="h-full w-[220%] -translate-x-1/4 origin-bottom [transform:rotateX(62deg)] [background-image:linear-gradient(rgba(122,210,84,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(122,210,84,0.4)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_top,black,transparent_85%)]"
            animate={{ backgroundPositionY: ["0px", "64px"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 pb-36 pt-32 md:grid-cols-[1.1fr_0.9fr]">
          {/* TEXT */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 rounded-full border border-neon-400/60 bg-black/40 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.25em] text-neon-400 backdrop-blur"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-neon-400" />
              Coimbatore · Since 2011
            </motion.p>

            <h1 className="mt-6 font-black uppercase leading-[0.88]">
              <motion.span
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
                className="block text-6xl text-transparent md:text-8xl"
                style={{ WebkitTextStroke: "2px rgba(255,255,255,0.85)" }}
              >
                Bala&apos;s
              </motion.span>
              <motion.span
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.25 }}
                className="block text-7xl text-white md:text-[9.5rem]"
              >
                <motion.span
                  className="inline-block text-neon-400"
                  animate={{ scale: [1, 1.18, 1] }}
                  transition={{ duration: BEAT / 1000, repeat: Infinity }}
                  style={{ textShadow: "0 0 40px rgba(122,210,84,0.7)" }}
                >
                  8
                </motion.span>{" "}
                Counts
              </motion.span>
            </h1>

            {/* style that changes on every count */}
            <div className="mt-6 flex items-center gap-3 text-xl font-extrabold uppercase tracking-wider md:text-2xl">
              <span className="text-white/60">We bring</span>
              <span className="relative inline-block h-[1.4em] min-w-[11ch] overflow-hidden text-neon-400">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={count}
                    className="absolute left-0 top-0 whitespace-nowrap"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {STYLES[count]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-5 max-w-lg text-lg text-white/75"
            >
              Wedding welcome dances, surprise flashmobs, corporate events,
              sangeet and college choreography, and Zumba. Come curious, leave
              dancing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                href="/classes"
                className="rounded-full bg-neon-400 px-8 py-3 font-black uppercase tracking-wider text-ink-950 transition hover:-translate-y-1 hover:shadow-[0_10px_0_#3f8f27]"
              >
                View Classes
              </Link>
              <Link
                href="/contact"
                className="rounded-full border-2 border-white/80 px-8 py-3 font-black uppercase tracking-wider text-white transition hover:bg-white hover:text-ink-950"
              >
                Book a free trial
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="mt-10 flex gap-8 text-white"
            >
              {[
                ["3,216", "Followers"],
                ["1,643", "Posts"],
                ["15+", "Years"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="text-3xl font-black text-neon-400">{n}</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
                    {l}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 8-COUNT RING */}
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 12,
                delay: 0.3,
              }}
              className="relative h-[320px] w-[320px] md:h-[460px] md:w-[460px]"
            >
              <motion.div
                className="absolute inset-[6%] rounded-full border-2 border-dashed border-neon-400/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />

              {STYLES.map((s, i) => {
                const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
                const on = i === count;
                return (
                  <div
                    key={s}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${50 + 46 * Math.cos(a)}%`,
                      top: `${50 + 46 * Math.sin(a)}%`,
                    }}
                  >
                    <motion.div
                      animate={{ scale: on ? 1.35 : 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 14,
                      }}
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-black md:h-11 md:w-11 md:text-base ${
                        on
                          ? "bg-neon-400 text-ink-950 shadow-[0_0_30px_rgba(122,210,84,0.9)]"
                          : "border border-neon-400/50 bg-black/60 text-neon-400"
                      }`}
                    >
                      {i + 1}
                    </motion.div>
                  </div>
                );
              })}

              <div className="absolute inset-[19%]">
                <motion.div
                  className="relative h-full w-full"
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: BEAT / 1000, repeat: Infinity }}
                >
                  <Image
                    src={assets.images.logo}
                    alt="b8c Dance Company"
                    fill
                    priority
                    className="rounded-full object-cover shadow-[0_0_90px_rgba(122,210,84,0.55)]"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        {/* TICKER */}
        <div className="absolute inset-x-0 bottom-0 z-20 overflow-hidden border-y-2 border-ink-950 bg-neon-400 py-3">
          <motion.div
            className="flex w-max whitespace-nowrap text-xl font-black uppercase text-ink-950"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex">
                {STYLES.map((s) => (
                  <span key={s} className="mx-6">
                    {s} ✦
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </DanceBackground>
    </section>
  );
}
