"use client";

import Link from "next/link";
import { Images, FileText } from "lucide-react";
import { Github } from "./BrandIcons";

const PROJECTS = [
  {
    title: "Aurora Commerce",
    slug: "darimooch",
    desc: "A headless storefront with buttery product transitions and instant checkout.",
    stack: ["Next.js", "GSAP", "Stripe", "Tailwind"],
    tint: "from-indigo-600/25 to-fuchsia-600/15",
    screen: "url('/asset/Darimooch/hero%20section.png')",
  },
  {
    title: "Nebula Analytics",
    slug: "tcs",
    desc: "Real-time data visualisation dashboard with 3D charts and live streams.",
    stack: ["React", "Three.js", "WebSocket", "D3"],
    tint: "from-sky-500/25 to-emerald-500/15",
    screen: "url('/asset/TCS/hero.png')",
  },
  {
    title: "Studio Motion",
    slug: "elyscents",
    desc: "An award-style agency site built around scroll-scrubbed cinematic footage.",
    stack: ["Next.js", "Framer Motion", "Lenis", "GLSL"],
    tint: "from-amber-500/25 to-rose-500/15",
    screen: "url('/asset/Elyscents/hero%20section.png')",
  },
  {
    title: "Shilajit Reserve",
    slug: "shilajit",
    desc: "A premium wellness brand experience with immersive product storytelling and checkout.",
    stack: ["Next.js", "GSAP", "Tailwind", "Shopify"],
    tint: "from-emerald-600/25 to-lime-500/15",
    screen: "url('/asset/Shilajeet/Hero%20section.png')",
  },
];

function LaptopMockup({ screen }) {
  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="rounded-t-2xl border border-white/15 bg-zinc-900 p-2 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
        <div className="flex gap-1.5 px-2 py-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <div
          className="aspect-video w-full rounded-lg bg-cover bg-center"
          style={{ backgroundImage: screen }}
        />
      </div>
      {/* laptop base */}
      <div className="mx-auto h-3 w-[108%] -translate-x-[3.7%] rounded-b-xl bg-gradient-to-b from-zinc-700 to-zinc-900" />
      <div className="mx-auto h-1 w-[70%] rounded-b-lg bg-zinc-950" />
    </div>
  );
}

export default function FeaturedProjects() {
  return (
    <section id="work" className="w-full bg-[#050505] px-4 pb-32 sm:px-6">
      <div className="mx-auto max-w-6xl pt-28">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-zinc-500">
          Selected Work
        </p>
        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Featured Projects
        </h2>
      </div>

      {/* Sticky stacking cards — each pins near the top and the next slides
          over it as you scroll, so the projects pile up like a card stack. */}
      <div className="mx-auto mt-16 max-w-5xl">
        {PROJECTS.map((project, index) => (
          <div
            key={project.title}
            className="sticky"
            style={{ top: `${96 + index * 26}px` }}
          >
            <div className="relative mb-8 overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0d] shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.tint}`}
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              <div className="relative z-10 grid grid-cols-1 items-center gap-10 p-8 sm:p-12 lg:grid-cols-2">
                <div>
                  <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-white/50">
                    {String(index + 1).padStart(2, "0")} — Featured
                  </p>
                  <h3 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-300">
                    {project.desc}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
                    >
                      <Images className="h-4 w-4" strokeWidth={1.75} /> View Gallery
                    </Link>
                    <a className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10">
                      <FileText className="h-4 w-4" strokeWidth={1.75} /> Case Study
                    </a>
                    <a className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10">
                      <Github className="h-4 w-4" strokeWidth={1.75} /> GitHub
                    </a>
                  </div>
                </div>

                <LaptopMockup screen={project.screen} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
