// put this at: src/components/sections/ContactSection.tsx
// The form has no backend: on submit it opens WhatsApp with the message already typed.
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DanceBackground from "@/components/ui/DanceGround";
import SectionHeading from "./SectionHeading";
import { site } from "@/data/site";

const INTERESTS = [
  "Wedding / Sangeet",
  "Flashmob",
  "Corporate event",
  "College choreography",
  "Zumba",
  "Hip-Hop / Freestyle",
];

const inputCls =
  "w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3.5 text-white outline-none transition placeholder:text-white/40 focus:border-neon-400 focus:shadow-[0_0_0_2px_rgba(122,210,84,0.4)]";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState(INTERESTS[0]);
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi b8c Dance Company! I'm ${name} (${phone}). I'm interested in: ${interest}.${
      message ? `\n${message}` : ""
    }`;
    window.open(
      `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  const info = [
    { k: "Phone", v: site.phone, href: `tel:${site.phone}` },
    { k: "Email", v: site.email, href: `mailto:${site.email}` },
    { k: "Address", v: site.address },
    { k: "Instagram", v: `@${site.instagramHandle}`, href: site.instagram },
  ];

  return (
    <DanceBackground
      showBars={false}
      showCounter={false}
      particles={35}
      className="py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          before="Get In"
          accent="Touch"
          sub="Tell us about your event or class. We reply on WhatsApp."
        />

        <div className="mt-16 grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {info.map((r) => (
              <div
                key={r.k}
                className="rounded-2xl border border-neon-400/30 bg-black/50 p-5 backdrop-blur"
              >
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-neon-400">
                  {r.k}
                </p>
                {r.href ? (
                  <a
                    href={r.href}
                    target={r.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="mt-1 block text-lg text-white hover:text-neon-400"
                  >
                    {r.v}
                  </a>
                ) : (
                  <p className="mt-1 text-lg text-white">{r.v}</p>
                )}
              </div>
            ))}
          </motion.div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 rounded-2xl border border-neon-400/30 bg-black/50 p-7 backdrop-blur"
          >
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className={inputCls}
            />
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              className={inputCls}
            />
            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className={inputCls}
            >
              {INTERESTS.map((o) => (
                <option key={o} value={o} className="bg-ink-900">
                  {o}
                </option>
              ))}
            </select>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Event date, venue, number of people..."
              className={inputCls}
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-neon-400 to-neon-600 py-4 font-black uppercase tracking-wider text-ink-950 transition hover:-translate-y-1 hover:shadow-[0_10px_0_#3f8f27]"
            >
              Send on WhatsApp
            </button>
          </motion.form>
        </div>
      </div>
    </DanceBackground>
  );
}
