// put this at: src/components/sections/ClassesSection.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import DanceBackground from "@/components/ui/DanceGround";
import SectionHeading from "./SectionHeading";
import { site } from "@/data/site";

export default function ClassesSection() {
  return (
    <DanceBackground
      showBars={false}
      showCounter={false}
      particles={40}
      bpm={96}
      className="py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          before="Our"
          accent="Classes"
          sub="From wedding floors to college stages. Pick your beat."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.classes.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl border border-neon-400/30 bg-black/50 p-7 backdrop-blur transition-colors hover:border-neon-400"
            >
              {/* big outlined number */}
              <span
                className="pointer-events-none absolute -right-2 -top-6 text-[8rem] font-black leading-none text-transparent transition-all duration-500 group-hover:scale-110"
                style={{ WebkitTextStroke: "1px rgba(122,210,84,0.3)" }}
              >
                {i + 1}
              </span>

              <span className="relative inline-block rounded-full bg-neon-400 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-ink-950">
                {c.tag}
              </span>
              <h3 className="relative mt-5 text-2xl font-extrabold text-white">
                {c.title}
              </h3>
              <p className="relative mt-3 text-white/70">{c.text}</p>

              <ul className="relative mt-5 flex flex-wrap gap-2">
                {c.points.map((p) => (
                  <li
                    key={p}
                    className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70"
                  >
                    {p}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="relative mt-7 inline-flex items-center gap-2 font-bold uppercase tracking-wider text-neon-400"
              >
                Book a free trial
                <span className="transition-transform group-hover:translate-x-2">
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </DanceBackground>
  );
}
