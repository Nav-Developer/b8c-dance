"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { chapters } from "@/data/story";
import DanceBackground from "../ui/DanceGround";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEP = 3;

export default function StoryScroll() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const total = chapters.length * STEP;
      const last = chapters.length - 1;

      gsap.set(".chapter", { autoAlpha: 0 });
      gsap.set(".bg", { autoAlpha: 0 });
      gsap.set(".bg-0", { autoAlpha: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: `+=${chapters.length * 1500}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      chapters.forEach((_, i) => {
        const t = i * STEP;
        const sel = `.chapter-${i}`;
        const bgStart = Math.max(t - 0.4, 0);

        // ---- background: crossfade + slow zoom/drift (Ken Burns) ----
        if (i > 0) {
          tl.to(
            `.bg-${i}`,
            { autoAlpha: 1, duration: 0.9, ease: "none" },
            bgStart,
          );
          tl.to(
            `.bg-${i - 1}`,
            { autoAlpha: 0, duration: 0.9, ease: "none" },
            bgStart,
          );
        }
        tl.fromTo(
          `.bg-${i} .bgimg`,
          { scale: 1.25, xPercent: i % 2 ? 4 : -4, yPercent: 2 },
          {
            scale: 1.05,
            xPercent: i % 2 ? -4 : 4,
            yPercent: -2,
            ease: "none",
            duration: STEP + 0.6,
          },
          bgStart,
        );

        // ---- foreground text ----
        tl.to(sel, { autoAlpha: 1, duration: 0.4 }, t)
          .fromTo(
            `${sel} .reveal`,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.12, duration: 0.8 },
            t,
          )
          .fromTo(
            `${sel} .word`,
            { x: 140, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.18, duration: 0.8 },
            t + 0.2,
          )
          .fromTo(
            `${sel} .bignum`,
            { xPercent: -15, opacity: 0 },
            { xPercent: 0, opacity: 1, duration: 1 },
            t,
          );

        if (i < last) {
          tl.to(
            sel,
            { autoAlpha: 0, y: -40, duration: 0.5, ease: "power2.in" },
            t + STEP - 0.6,
          );
        }
      });

      // Animated counters in the final chapter
      root.current?.querySelectorAll<HTMLElement>(".stat").forEach((el) => {
        const o = { v: 0 };
        tl.to(
          o,
          {
            v: Number(el.dataset.value),
            duration: 1.4,
            ease: "power1.out",
            snap: { v: 1 },
            onUpdate: () => {
              el.textContent = o.v.toLocaleString("en-IN");
            },
          },
          last * STEP + 0.3,
        );
      });

      // Progress line + spinning "8" travelling along it
      tl.fromTo(
        ".track-fill",
        { scaleX: 0 },
        { scaleX: 1, ease: "none", duration: total },
        0,
      );
      tl.fromTo(
        ".cone",
        { left: "0%" },
        { left: "100%", ease: "none", duration: total },
        0,
      );
      tl.to(".cone", { rotate: 360, ease: "none", duration: total }, 0);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative h-screen overflow-hidden bg-black text-chalk-200"
    >
      {/* 1. chapter background photos (one per chapter, crossfading) */}
      <div className="pointer-events-none absolute inset-0">
        {chapters.map((c, i) => (
          <div
            key={i}
            className={`bg bg-${i} absolute inset-0 overflow-hidden`}
          >
            <div className="bgimg absolute inset-0 will-change-transform">
              <Image
                src={c.image}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: c.focus ?? "50% 30%" }}
              />
            </div>
          </div>
        ))}
        {/* readability overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />
      </div>

      {/* 2. interactive dance layer: screen-blended so the photo shows through,
             only the green glow, particles, spotlight and ripples are added */}
      <DanceBackground
        className="absolute inset-0 mix-blend-screen"
        bpm={88}
        showBars={false}
        showCounter={false}
        particles={45}
      />

      {/* 3. chapter text (ignores pointer so the layer below still reacts) */}
      <div className="pointer-events-none absolute inset-0">
        {chapters.map((c, i) => (
          <div
            key={i}
            className={`chapter chapter-${i} absolute inset-0 grid items-center gap-10 px-8 pb-28 pt-36 md:grid-cols-2 md:px-20`}
          >
            <span
              className="bignum absolute left-8 top-28 font-display text-[16rem] font-black leading-none text-transparent md:left-16"
              style={{ WebkitTextStroke: "1px rgba(122,210,84,0.3)" }}
            >
              0{i + 1}
            </span>

            <div className="relative z-10">
              <p className="reveal mb-4 inline-block rounded-full bg-neon-400 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.25em] text-ink-950">
                {c.tag}
              </p>
              <h2 className="reveal font-sans text-4xl font-black uppercase leading-[1.05] text-white md:text-6xl">
                {c.title}
              </h2>
              <div className="reveal my-6 h-px w-24 bg-gradient-to-r from-neon-400 to-transparent" />
              <p className="reveal max-w-md text-lg text-chalk-200/80">
                {c.text}
              </p>

              {c.stats && (
                <div className="reveal mt-10 flex gap-10">
                  {c.stats.map((s) => (
                    <div key={s.label}>
                      <p className="font-display text-5xl font-black text-neon-400 md:text-6xl">
                        <span className="stat" data-value={s.value}>
                          0
                        </span>
                        {s.suffix}
                      </p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-chalk-200/70">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {c.highlights && (
              <div className="relative z-10 flex flex-col items-start gap-1 md:items-end">
                {c.highlights.map((h, k) => (
                  <span
                    key={h}
                    className={`word text-4xl font-black uppercase leading-[0.95] md:text-7xl ${
                      k === 0 ? "text-neon-400" : "text-transparent"
                    }`}
                    style={
                      k === 0
                        ? { textShadow: "0 0 40px rgba(122,210,84,0.6)" }
                        : { WebkitTextStroke: "1.5px rgba(255,255,255,0.8)" }
                    }
                  >
                    {h}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />

      {/* progress track with travelling "8" */}
      <div className="pointer-events-none absolute inset-x-8 bottom-10 md:inset-x-20">
        <div className="relative h-px bg-neon-400/25">
          <div className="track-fill h-full origin-left bg-neon-400" />
          <div className="cone absolute top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neon-400 text-2xl font-black text-ink-950 shadow-[0_0_20px_rgba(122,210,84,0.6)] md:h-14 md:w-14">
              8
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
