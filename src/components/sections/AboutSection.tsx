// put this at: src/components/sections/AboutSection.tsx
// Layout like your "Meet Our Visionary" reference: photo left, text + 2 buttons right.
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import assets from "@/assets";
import DanceBackground from "@/components/ui/DanceGround";

import { site } from "@/data/site";
import SectionHeading from "./SectionHeading";

export default function AboutSection() {
  const f = site.founder;
  return (
    <DanceBackground
      showBars={false}
      showCounter={false}
      particles={30}
      bpm={88}
      className="py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading before="Meet Our" accent="Visionary" />

        <div className="mt-16 grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto aspect-square w-full max-w-md"
          >
            <div className="absolute -inset-3 rounded-3xl border-2 border-dashed border-neon-400/50" />
            <div className="relative h-full w-full overflow-hidden rounded-3xl border border-neon-400/60 shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
              <Image
                src={f.image ?? assets.images.logo}
                alt={f.name}
                fill
                sizes="(min-width:768px) 28rem, 90vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-4xl font-extrabold text-neon-400 md:text-5xl">
              {f.name}
            </h3>
            <p className="mt-4 text-xl text-neon-400/90">{f.role}</p>
            <p className="mt-8 border-l-4 border-neon-400 pl-5 text-lg leading-relaxed text-white/75">
              {f.bio}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-xl bg-gradient-to-r from-neon-400 to-neon-600 px-7 py-4 font-bold text-ink-950 transition hover:-translate-y-1 hover:shadow-[0_10px_0_#3f8f27]"
              >
                Learn More About Our Mission
              </Link>
              <Link
                href="/menu"
                className="rounded-xl border-2 border-neon-400/70 px-7 py-4 font-bold text-neon-400 transition hover:bg-neon-400 hover:text-ink-950"
              >
                View Classes
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </DanceBackground>
  );
}
