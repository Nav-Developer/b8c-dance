"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DanceBackground from "@/components/ui/DanceGround";
import SectionHeading from "./SectionHeading";
import { site } from "@/data/site";
import type { Video } from "@/data/feed";

function Play() {
  return (
    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-neon-400 text-3xl text-ink-950 shadow-[0_0_50px_rgba(122,210,84,0.8)] transition group-hover:scale-110">
      ▶
    </span>
  );
}

export default function YouTubeSection({ videos }: { videos: Video[] }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [showAll, setShowAll] = useState(false);

  if (!videos || videos.length === 0) return null;

  const v = videos[active] ?? videos[0];
  const list = showAll ? videos : videos.slice(0, 4);

  return (
    <DanceBackground
      showBars={false}
      showCounter={false}
      particles={30}
      bpm={92}
      className="py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          before="Watch Us"
          accent="Perform"
          sub="Full performances from our YouTube channel."
        />

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-[1fr_0.35fr]">
          {/* main player */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative aspect-video overflow-hidden rounded-2xl border border-neon-400/60 bg-black shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
          >
            {playing ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`}
                title={v.title}
                allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                onClick={() => setPlaying(true)}
                className="group absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neon-600/40 to-black"
                aria-label={`Play ${v.title}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-80"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <Play />
                <span className="absolute bottom-4 left-5 right-5 line-clamp-2 text-lg font-bold text-white">
                  {v.title}
                </span>
              </button>
            )}
          </motion.div>

          {/* playlist + show more (wrapped in ONE div so the grid stays 2 columns) */}
          <div>
            <div className="flex gap-3 overflow-x-auto pb-2 lg:max-h-[420px] lg:flex-col lg:overflow-x-visible lg:overflow-y-auto lg:pb-0 lg:pr-1">
              {list.map((vid) => {
                const i = videos.indexOf(vid);
                return (
                  <button
                    key={vid.id}
                    onClick={() => {
                      setActive(i);
                      setPlaying(false);
                    }}
                    className={`group relative aspect-video min-w-[200px] shrink-0 overflow-hidden rounded-xl border-2 text-left transition lg:min-w-0 ${
                      i === active
                        ? "border-neon-400"
                        : "border-white/10 hover:border-neon-400/60"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://img.youtube.com/vi/${vid.id}/mqdefault.jpg`}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />
                    <span className="absolute bottom-2 left-3 right-3 line-clamp-2 text-sm font-bold text-white">
                      {vid.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {videos.length > 4 && (
              <button
                onClick={() => setShowAll((s) => !s)}
                className="mt-3 w-full text-sm font-bold uppercase tracking-wider text-neon-400 hover:underline"
              >
                {showAll ? "Show less" : `Show more (${videos.length - 4})`}
              </button>
            )}
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href={`${site.youtube}/videos`}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-full border-2 border-neon-400 px-8 py-3 font-black uppercase tracking-wider text-neon-400 transition hover:bg-neon-400 hover:text-ink-950"
          >
            See all videos on YouTube
          </a>
        </div>
      </div>
    </DanceBackground>
  );
}
