"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * <DanceBackground> — reusable interactive wrapper.
 *
 * Theme: "8 counts". A beat clock counts 1..8 on loop.
 *  - Equalizer bars along the bottom pulse on each count (the current count lights up)
 *  - Bars rise where your cursor is, like dancers reacting to you
 *  - Neon particles drift, get pulled toward the cursor and kicked out on the beat
 *  - Click / tap anywhere to drop a shockwave ring
 *  - A spotlight follows the pointer
 *
 * Usage:
 *   <DanceBackground bpm={104}>
 *     <YourSection />
 *   </DanceBackground>
 */

type Props = {
  children?: ReactNode;
  className?: string;
  /** beats per minute of the 8-count loop */
  bpm?: number;
  /** number of equalizer bars (multiple of 8 looks best) */
  bars?: number;
  /** number of floating particles */
  particles?: number;
  /** show the 1-8 count dots */
  showCounter?: boolean;
  /** hide the equalizer bars if a section is short */
  showBars?: boolean;
};

const NEON = "122,210,84";

type Ripple = { x: number; y: number; t: number };
type Particle = { x: number; y: number; vx: number; vy: number; r: number };

export default function DanceBackground({
  children,
  className = "",
  bpm = 96,
  bars = 40,
  particles = 60,
  showCounter = true,
  showBars = true,
}: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const counter = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const cv = canvas.current;
    if (!el || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const beatMs = 60000 / bpm;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let lastCount = -1;

    const mouse = { x: -9999, y: -9999, sx: -9999, sy: -9999 };
    const ripples: Ripple[] = [];
    const heights = new Float32Array(bars);
    const seeds = Array.from({ length: bars }, () => Math.random() * 10);
    let ps: Particle[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = el.getBoundingClientRect();
      w = r.width;
      h = r.height;
      cv.width = w * dpr;
      cv.height = h * dpr;
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ps = Array.from({ length: particles }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: 1 + Math.random() * 2.2,
      }));
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      el.style.setProperty("--mx", `${mouse.x}px`);
      el.style.setProperty("--my", `${mouse.y}px`);
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onDown = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      ripples.push({
        x: e.clientX - r.left,
        y: e.clientY - r.top,
        t: performance.now(),
      });
      if (ripples.length > 8) ripples.shift();
    };

    const draw = (now: number) => {
      if (visible) {
        ctx.clearRect(0, 0, w, h);

        const count = Math.floor(now / beatMs) % 8;
        const phase = (now % beatMs) / beatMs;
        const pulse = Math.exp(-phase * 5); // 1 on the beat, decays fast
        const isDownbeat = count === 0;

        // smooth cursor for particles
        if (mouse.x > -9000) {
          mouse.sx =
            mouse.sx < -9000 ? mouse.x : mouse.sx + (mouse.x - mouse.sx) * 0.15;
          mouse.sy =
            mouse.sy < -9000 ? mouse.y : mouse.sy + (mouse.y - mouse.sy) * 0.15;
        } else {
          mouse.sx = -9999;
          mouse.sy = -9999;
        }

        // update 1-8 counter dots
        if (count !== lastCount && counter.current) {
          lastCount = count;
          Array.from(counter.current.children).forEach((d, i) => {
            const dot = d as HTMLElement;
            const on = i === count;
            dot.style.background = on ? `rgb(${NEON})` : `rgba(${NEON},0.25)`;
            dot.style.transform = on ? "scale(1.6)" : "scale(1)";
            dot.style.boxShadow = on ? `0 0 14px rgba(${NEON},0.9)` : "none";
          });
        }

        // ---- particles + links ----
        for (const p of ps) {
          if (mouse.sx > -9000) {
            const dx = mouse.sx - p.x;
            const dy = mouse.sy - p.y;
            const d = Math.hypot(dx, dy);
            if (d < 220 && d > 1) {
              p.vx += (dx / d) * 0.03;
              p.vy += (dy / d) * 0.03;
            }
          }
          // kick outward from centre on the downbeat
          if (isDownbeat && phase < 0.04) {
            const cx = w / 2 - p.x;
            const cy = h / 2 - p.y;
            const d = Math.hypot(cx, cy) || 1;
            p.vx -= (cx / d) * 1.2;
            p.vy -= (cy / d) * 1.2;
          }
          p.vx *= 0.985;
          p.vy *= 0.985;
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;
        }
        ctx.lineWidth = 1;
        for (let i = 0; i < ps.length; i++) {
          for (let j = i + 1; j < ps.length; j++) {
            const a = ps[i];
            const b = ps[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < 110) {
              ctx.strokeStyle = `rgba(${NEON},${(1 - d / 110) * 0.22})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
        for (const p of ps) {
          ctx.fillStyle = `rgba(${NEON},${0.35 + pulse * 0.4})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r + pulse * 1.2, 0, Math.PI * 2);
          ctx.fill();
        }

        // ---- ripples ----
        for (let i = ripples.length - 1; i >= 0; i--) {
          const r = ripples[i];
          const age = (now - r.t) / 1100;
          if (age >= 1) {
            ripples.splice(i, 1);
            continue;
          }
          for (let k = 0; k < 3; k++) {
            const a = age - k * 0.12;
            if (a <= 0) continue;
            ctx.strokeStyle = `rgba(${NEON},${(1 - a) * 0.6})`;
            ctx.lineWidth = 2.5 - k * 0.6;
            ctx.beginPath();
            ctx.arc(r.x, r.y, a * 360, 0, Math.PI * 2);
            ctx.stroke();
          }
        }

        // ---- equalizer bars ----
        if (showBars) {
          const gap = 6;
          const bw = (w - gap * (bars + 1)) / bars;
          const maxH = Math.min(h * 0.32, 260);
          for (let i = 0; i < bars; i++) {
            const x = gap + i * (bw + gap);
            const cx = x + bw / 2;
            const isCount = i % 8 === count;
            const idle = 0.1 + 0.07 * Math.sin(now / 500 + seeds[i]);
            const beat =
              pulse *
              (isCount ? 0.65 : 0.18) *
              (0.6 + 0.4 * Math.sin(seeds[i] * 3));
            const near =
              mouse.x > -9000
                ? Math.exp(-(((cx - mouse.x) / 140) ** 2)) * 0.6
                : 0;
            const target = Math.min(1, idle + beat + near);
            heights[i] += (target - heights[i]) * 0.2;
            const bh = Math.max(6, heights[i] * maxH);

            const g = ctx.createLinearGradient(0, h - bh, 0, h);
            g.addColorStop(
              0,
              isCount ? "rgba(255,255,255,0.95)" : `rgba(${NEON},0.95)`,
            );
            g.addColorStop(1, `rgba(${NEON},0.05)`);
            ctx.fillStyle = g;
            ctx.beginPath();
            const rad = Math.min(bw / 2, 8);
            ctx.roundRect(x, h - bh, bw, bh, [rad, rad, 0, 0]);
            ctx.fill();
          }
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(el);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerdown", onDown);

    if (reduce) draw(performance.now());
    else raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerdown", onDown);
    };
  }, [bpm, bars, particles, showBars]);

  return (
    <div
      ref={wrap}
      className={`relative isolate overflow-hidden ${className}`}
      style={
        {
          "--mx": "70%",
          "--my": "40%",
          background:
            "radial-gradient(ellipse at 75% 35%, #1f5212 0%, #0b1a08 50%, #000 100%)",
        } as React.CSSProperties
      }
    >
      {/* dot grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]" />

      {/* cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx) var(--my), rgba(122,210,84,0.22), transparent 60%)",
        }}
      />

      {/* beat canvas */}
      <canvas
        ref={canvas}
        className="pointer-events-none absolute inset-0 -z-10"
      />

      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 -z-10 shadow-[inset_0_0_180px_rgba(0,0,0,0.75)]" />

      {/* 1–8 counter */}
      {showCounter && (
        <div
          ref={counter}
          aria-hidden
          className="pointer-events-none absolute right-6 top-24 z-20 flex items-center gap-2 md:right-10"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="h-2 w-2 rounded-full transition-all duration-150"
              style={{ background: `rgba(${NEON},0.25)` }}
            />
          ))}
        </div>
      )}

      {children}
    </div>
  );
}
