// put this at: src/components/layout/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import assets from "@/assets";
import DanceBackground from "@/components/ui/DanceGround";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t-[3px] border-neon-400">
      <DanceBackground
        bpm={104}
        showBars={false}
        showCounter={false}
        particles={25}
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.2fr_0.8fr_1.2fr_0.8fr] md:px-10">
          {/* tagline */}
          <div>
            <p className="text-3xl font-extrabold leading-snug text-white md:text-4xl">
              Bringing out
              <br />
              the <span className="italic text-neon-400">Beat</span>
              <br />
              in yourself
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:-translate-y-1 hover:bg-neon-400 hover:text-ink-950"
              >
                <InstagramIcon fontSize="small" />
              </a>
              <a
                href={site.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:-translate-y-1 hover:bg-neon-400 hover:text-ink-950"
              >
                <YouTubeIcon fontSize="small" />
              </a>
            </div>
          </div>

          {/* quick links */}
          <div>
            <h3 className="text-xl font-bold text-white">Quick Links</h3>
            <ul className="mt-6 space-y-3">
              {site.quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-lg text-white/60 transition hover:pl-2 hover:text-neon-400"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <h3 className="text-xl font-bold text-white">Contact Us</h3>
            <ul className="mt-6 space-y-3 text-lg text-white/60">
              <li>
                Phone:{" "}
                <a href={`tel:${site.phone}`} className="hover:text-neon-400">
                  {site.phone}
                </a>
              </li>
              <li>
                Email:{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="hover:text-neon-400"
                >
                  {site.email}
                </a>
              </li>
              <li>Address: {site.address}</li>
            </ul>
          </div>

          {/* logo */}
          <div className="flex md:justify-end">
            <div className="relative h-40 w-40 md:h-44 md:w-44">
              <Image
                src={assets.images.logo}
                alt={site.name}
                fill
                sizes="176px"
                className="rounded-full object-cover shadow-[0_0_60px_rgba(122,210,84,0.45)]"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-6 py-5 text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-white/50">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </DanceBackground>
    </footer>
  );
}
