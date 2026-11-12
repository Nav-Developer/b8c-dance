"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DanceBackground from "@/components/ui/DanceGround";
import SectionHeading from "./SectionHeading";
import { site } from "@/data/site";

const INTERESTS = [
  {
    label: "Wedding / Sangeet",
    icon: "", // icon: "💍"
  },
  {
    label: "Flashmob",
    icon: "", //icon: "⚡"
  },
  {
    label: "Corporate event",
    icon: "", //icon: "🏢"
  },
  {
    label: "College choreography",
    icon: "", // icon: "🎓"
  },
  {
    label: "Zumba",
    icon: "", //icon: "🔥"
  },
  {
    label: "Hip-Hop / Freestyle",
    icon: "",
    //icon: "🎤"
  },
];

const FAQ = [
  {
    q: "Do you take students of all ages?",
    a: "Yes. B8C works with children, college students, adults, institutions, corporates and families.",
  },
  {
    q: "Can I try a class first?",
    a: "Absolutely. Pick your style, send the message and we'll arrange a free trial.",
  },
  {
    q: "Do you choreograph events outside Coimbatore?",
    a: "Yes. We have performed at 25,000+ events across India.",
  },
];

const inputCls =
  "w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3.5 text-white outline-none transition placeholder:text-white/40 focus:border-neon-400 focus:shadow-[0_0_0_2px_rgba(122,210,84,0.4)]";

const STEP_NAMES = ["Interest", "Details", "Send"];

export default function ContactSection() {
  const [step, setStep] = useState(0);
  const [interest, setInterest] = useState(INTERESTS[0].label);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [people, setPeople] = useState(10);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // preselect from ?interest=
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search).get("interest");
      if (!q) return;
      const match = INTERESTS.find((i) =>
        q.toLowerCase().includes(i.label.split(" ")[0].toLowerCase()),
      );
      setInterest(match ? match.label : q);
      setStep(1);
    } catch {}
  }, []);

  const text = useMemo(
    () =>
      `Hi b8c Dance Company! I'm ${name || "…"} (${phone || "…"}). I'm interested in: ${interest}.` +
      (date ? `\nDate: ${date}` : "") +
      `\nApprox. people: ${people}` +
      (message ? `\n${message}` : ""),
    [name, phone, interest, date, people, message],
  );

  const detailsOk = name.trim().length > 1 && phone.trim().length >= 8;

  const send = () => {
    window.open(
      `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  const copy = async (k: string, v: string) => {
    try {
      await navigator.clipboard.writeText(v);
      setCopied(k);
      setTimeout(() => setCopied(null), 1500);
    } catch {}
  };

  const info = [
    {
      k: "Phone",
      v: site.phone,
      href: `tel:${site.phone}`,
      icon: "",
      //  icon: "📞"
    },
    {
      k: "Email",
      v: site.email,
      href: `mailto:${site.email}`,
      icon: "", //icon: "✉️"
    },
    {
      k: "Address",
      v: site.address,
      icon: "", //icon: "📍"
    },
    {
      k: "Instagram",
      v: `@${site.instagramHandle}`,
      href: site.instagram,
      icon: "",
      // icon: "📸",
    },
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
          {/* ---------- LEFT: contact cards + FAQ ---------- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {info.map((r) => (
              <motion.div
                key={r.k}
                whileHover={{ x: 6 }}
                className="flex items-center gap-4 rounded-2xl border border-neon-400/30 bg-black/50 p-5 backdrop-blur transition-colors hover:border-neon-400"
              >
                <span className="text-2xl">{r.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-neon-400">
                    {r.k}
                  </p>
                  {r.href ? (
                    <a
                      href={r.href}
                      target={r.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="mt-1 block truncate text-lg text-white hover:text-neon-400"
                    >
                      {r.v}
                    </a>
                  ) : (
                    <p className="mt-1 text-lg text-white">{r.v}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => copy(r.k, r.v)}
                  className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70 transition hover:border-neon-400 hover:text-neon-400"
                >
                  {copied === r.k ? "Copied ✓" : "Copy"}
                </button>
              </motion.div>
            ))}

            {/* FAQ */}
            <div className="rounded-2xl border border-neon-400/30 bg-black/50 p-5 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-neon-400">
                Quick answers
              </p>
              <div className="mt-3 divide-y divide-white/10">
                {FAQ.map((f, i) => (
                  <div key={f.q}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="flex w-full items-center justify-between gap-4 py-3 text-left text-white"
                    >
                      <span className="font-semibold">{f.q}</span>
                      <motion.span
                        animate={{ rotate: openFaq === i ? 45 : 0 }}
                        className="text-xl text-neon-400"
                      >
                        +
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {openFaq === i && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pb-3 text-white/70"
                        >
                          {f.a}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ---------- RIGHT: stepper form ---------- */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-neon-400/30 bg-black/50 p-7 backdrop-blur"
          >
            {/* progress */}
            <div className="flex items-center gap-2">
              {STEP_NAMES.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => i < step && setStep(i)}
                  className="flex-1 text-left"
                >
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full bg-neon-400"
                      animate={{ width: i <= step ? "100%" : "0%" }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <p
                    className={`mt-2 text-xs font-bold uppercase tracking-widest ${
                      i <= step ? "text-neon-400" : "text-white/40"
                    }`}
                  >
                    {i + 1}. {s}
                  </p>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* STEP 1 */}
              {step === 0 && (
                <motion.div
                  key="s0"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="mt-7"
                >
                  <p className="text-xl font-extrabold text-white">
                    What are you looking for?
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {INTERESTS.map((o) => (
                      <motion.button
                        key={o.label}
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ y: -4 }}
                        onClick={() => setInterest(o.label)}
                        className={`rounded-xl border p-4 text-left transition ${
                          interest === o.label
                            ? "border-neon-400 bg-neon-400/15 shadow-[0_0_25px_rgba(122,210,84,0.25)]"
                            : "border-white/15 hover:border-neon-400/60"
                        }`}
                      >
                        <span className="text-2xl">{o.icon}</span>
                        <p className="mt-2 text-sm font-bold text-white">
                          {o.label}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="mt-6 w-full rounded-xl bg-gradient-to-r from-neon-400 to-neon-600 py-4 font-black uppercase tracking-wider text-ink-950 transition hover:-translate-y-1 hover:shadow-[0_10px_0_#3f8f27]"
                  >
                    Next →
                  </button>
                </motion.div>
              )}

              {/* STEP 2 */}
              {step === 1 && (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="mt-7 space-y-4"
                >
                  <p className="text-xl font-extrabold text-white">
                    A few details
                  </p>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={inputCls}
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    className={inputCls}
                  />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={inputCls + " [color-scheme:dark]"}
                  />
                  <div>
                    <div className="flex justify-between text-sm text-white/70">
                      <span>Approx. number of people</span>
                      <span className="font-bold text-neon-400">{people}</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={200}
                      value={people}
                      onChange={(e) => setPeople(Number(e.target.value))}
                      className="mt-2 w-full accent-[#7ad254]"
                    />
                  </div>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Venue, song preferences, anything else..."
                    className={inputCls}
                  />
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      className="rounded-xl border-2 border-neon-400/60 px-6 py-4 font-bold text-neon-400 transition hover:bg-neon-400 hover:text-ink-950"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      disabled={!detailsOk}
                      onClick={() => setStep(2)}
                      className="flex-1 rounded-xl bg-gradient-to-r from-neon-400 to-neon-600 py-4 font-black uppercase tracking-wider text-ink-950 transition enabled:hover:-translate-y-1 enabled:hover:shadow-[0_10px_0_#3f8f27] disabled:opacity-40"
                    >
                      Preview →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 */}
              {step === 2 && (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="mt-7"
                >
                  <p className="text-xl font-extrabold text-white">
                    Your message
                  </p>
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mt-4 ml-auto max-w-[92%] whitespace-pre-line rounded-2xl rounded-tr-sm bg-[#1f3d17] p-4 text-white shadow-lg"
                  >
                    {text}
                    <span className="mt-2 block text-right text-[10px] text-white/50">
                      now ✓✓
                    </span>
                  </motion.div>
                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="rounded-xl border-2 border-neon-400/60 px-6 py-4 font-bold text-neon-400 transition hover:bg-neon-400 hover:text-ink-950"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={send}
                      className="flex-1 rounded-xl bg-gradient-to-r from-neon-400 to-neon-600 py-4 font-black uppercase tracking-wider text-ink-950 transition hover:-translate-y-1 hover:shadow-[0_10px_0_#3f8f27]"
                    >
                      Send on WhatsApp
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => copy("msg", text)}
                    className="mt-3 w-full text-center text-sm text-white/60 hover:text-neon-400"
                  >
                    {copied === "msg"
                      ? "Message copied ✓"
                      : "Or copy the message"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </DanceBackground>
  );
}
