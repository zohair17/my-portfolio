"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
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

function LaptopMockup({ screen, screenRef }) {
  return (
    <div className="mx-auto w-full max-w-lg [transform-style:preserve-3d]">
      <div className="rounded-t-2xl border border-white/15 bg-zinc-900 p-2 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
        <div className="flex gap-1.5 px-2 py-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <div
          ref={screenRef}
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

function ProjectCard({ project, index }) {
  const router = useRouter();
  const cardLaptopRef = useRef(null);
  const stageRef = useRef(null);
  const backdropRef = useRef(null);
  const flyRef = useRef(null);
  const screenRef = useRef(null);
  const overlayRef = useRef(null);
  const busy = useRef(false);

  // Click → lift a same-size copy of the laptop OUT of the card onto a
  // fullscreen stage, glide it to screen centre, spin it 360° there, then zoom
  // its screen up to fill the viewport and navigate.
  const openGallery = () => {
    if (busy.current) return;
    busy.current = true;

    const rect = cardLaptopRef.current.getBoundingClientRect();
    const cx = (window.innerWidth - rect.width) / 2;
    const cy = (window.innerHeight - rect.height) / 2;

    gsap.set(stageRef.current, { display: "block" });
    gsap.set(flyRef.current, {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      rotateY: 0,
      transformPerspective: 1200,
      transformOrigin: "center center",
    });

    gsap
      .timeline({ onComplete: () => router.push(`/projects/${project.slug}`) })
      // dim the page + fly the laptop to centre (same size, no scale)
      .to(backdropRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" })
      .to(
        flyRef.current,
        { left: cx, top: cy, duration: 0.7, ease: "power3.inOut" },
        "<"
      )
      // spin in place at full-screen centre
      .to(flyRef.current, {
        rotateY: 360,
        duration: 1.1,
        ease: "power2.inOut",
      })
      // zoom the (now centred) screen out to fill the viewport
      .add(() => {
        const sr = screenRef.current.getBoundingClientRect();
        gsap.set(overlayRef.current, {
          display: "block",
          left: sr.left,
          top: sr.top,
          width: sr.width,
          height: sr.height,
          borderRadius: 8,
          opacity: 1,
        });
      })
      .to(overlayRef.current, {
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        duration: 0.75,
        ease: "power3.inOut",
      });
  };

  return (
    <div className="sticky" style={{ top: `${96 + index * 26}px` }}>
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
              <button
                onClick={openGallery}
                className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
              >
                <Images className="h-4 w-4" strokeWidth={1.75} /> View Gallery
              </button>
              <a className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10">
                <FileText className="h-4 w-4" strokeWidth={1.75} /> Case Study
              </a>
              <a className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10">
                <Github className="h-4 w-4" strokeWidth={1.75} /> GitHub
              </a>
            </div>
          </div>

          <div ref={cardLaptopRef}>
            <LaptopMockup screen={project.screen} />
          </div>
        </div>
      </div>

      {/* fullscreen stage — the laptop flies here, spins, then its screen zooms */}
      <div ref={stageRef} className="fixed inset-0 z-[200] hidden">
        <div ref={backdropRef} className="absolute inset-0 bg-black/85 opacity-0 backdrop-blur-sm" />
        <div ref={flyRef} className="absolute">
          <LaptopMockup screen={project.screen} screenRef={screenRef} />
        </div>
      </div>

      {/* zoom overlay (screen image) sits above the stage */}
      <div
        ref={overlayRef}
        className="fixed left-0 top-0 z-[210] hidden bg-cover bg-center"
        style={{ backgroundImage: project.screen }}
      />
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

      {/* Sticky stacking cards */}
      <div className="mx-auto mt-16 max-w-5xl">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
