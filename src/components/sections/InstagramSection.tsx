// put this at: src/components/sections/InstagramSection.tsx
// Three reels in phone frames. Each loads the real Instagram embed only when tapped.
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DanceBackground from "@/components/ui/DanceGround";
import SectionHeading from "./SectionHeading";
import { site } from "@/data/site";
import { Reel } from "@/data/feed";

function ReelCard({
  code,
  title,
  index,
}: {
  code: string;
  title: string;
  index: number;
}) {
  const [on, setOn] = useState(false);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 60,
        rotate: index === 1 ? 0 : index === 0 ? -3 : 3,
      }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.12, type: "spring", stiffness: 90 }}
      whileHover={{ y: -10 }}
      className="mx-auto w-full max-w-[340px]"
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-[2rem] border-4 border-neon-400/70 bg-black shadow-[0_30px_80px_rgba(0,0,0,0.7),0_0_40px_rgba(122,210,84,0.25)]">
        {on ? (
          <iframe
            className="absolute inset-0 h-full w-full bg-white"
            src={`https://www.instagram.com/reel/${code}/embed`}
            title={title}
            loading="lazy"
            allowFullScreen
          />
        ) : (
          <button
            onClick={() => setOn(true)}
            className="group absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_50%_30%,#1f5212,#000)]"
            aria-label={`Play ${title}`}
          >
            <span
              className="absolute -right-4 top-2 text-[12rem] font-black leading-none text-transparent"
              style={{ WebkitTextStroke: "1px rgba(122,210,84,0.25)" }}
            >
              {index + 1}
            </span>
            <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-neon-400 text-3xl text-ink-950 shadow-[0_0_50px_rgba(122,210,84,0.8)] transition group-hover:scale-110">
              ▶
            </span>
            <span className="relative px-6 text-center text-lg font-extrabold uppercase tracking-wider text-white">
              {title}
            </span>
            <span className="relative text-xs uppercase tracking-[0.25em] text-neon-400">
              Tap to play
            </span>
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function InstagramSection({ reels }: { reels: Reel[] }) {
  const [count, setCount] = useState(3);

  return (
    <DanceBackground
      showBars={false}
      showCounter={false}
      particles={30}
      bpm={100}
      className="py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          before="Follow Us On"
          accent="Instagram"
          sub={`@${site.instagramHandle}: fresh reels, flashmobs and behind the scenes.`}
        />

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {reels.slice(0, count).map((r, i) => (
            <ReelCard
              key={r.code}
              code={r.code}
              title={r.title}
              index={i % 3}
            />
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          {count < Math.min(reels.length, 9) && (
            <button
              onClick={() => setCount((c) => c + 3)}
              className="rounded-full border-2 border-neon-400 px-8 py-3 font-black uppercase tracking-wider text-neon-400 transition hover:bg-neon-400 hover:text-ink-950"
            >
              Show more
            </button>
          )}
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-full bg-neon-400 px-8 py-3 font-black uppercase tracking-wider text-ink-950 transition hover:-translate-y-1 hover:shadow-[0_10px_0_#3f8f27]"
          >
            Follow @{site.instagramHandle}
          </a>
        </div>
      </div>
    </DanceBackground>
  );
}
