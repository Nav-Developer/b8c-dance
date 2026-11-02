// put this at: src/components/ui/SectionHeading.tsx
// Reusable heading like "Meet Our <Visionary>": white text + one highlighted word.
"use client";

import { motion } from "framer-motion";

type Props = {
  before?: string;
  accent: string;
  after?: string;
  sub?: string;
  align?: "center" | "left";
};

export default function SectionHeading({
  before,
  accent,
  after,
  sub,
  align = "center",
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className={align === "center" ? "text-center" : "text-left"}
    >
      <h2 className="text-4xl font-extrabold text-white md:text-6xl">
        {before} <span className="italic text-neon-400">{accent}</span>
        {after ? ` ${after}` : ""}
      </h2>
      <div
        className={`mt-4 h-1 w-20 rounded-full bg-neon-400 ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
      {sub && (
        <p
          className={`mt-5 max-w-2xl text-lg text-white/70 ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {sub}
        </p>
      )}
    </motion.div>
  );
}
