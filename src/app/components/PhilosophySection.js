"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Gauge, Heart } from "lucide-react";
import TiltCard from "./TiltCard";

const HEADLINE = ["Design", "catches", "attention.", "Development", "keeps", "it."];

const CARDS = [
  {
    icon: Sparkles,
    title: "Creativity",
    body: "Ideas with a point of view — bold concepts translated into interfaces people remember.",
    glow: "rgba(168,85,247,0.35)",
  },
  {
    icon: Gauge,
    title: "Performance",
    body: "Silky 60fps motion, lean bundles, and instant loads. Beauty that never gets in the way.",
    glow: "rgba(56,189,248,0.35)",
  },
  {
    icon: Heart,
    title: "User Experience",
    body: "Every tap, scroll, and transition considered — intuitive journeys that feel effortless.",
    glow: "rgba(244,114,182,0.35)",
  },
];

export default function PhilosophySection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Same guard as the cards below: hold the "from" values back until the
      // tween runs, so a mis-measured trigger can never leave the headline
      // frozen tilted and half-transparent.
      gsap.fromTo(
        ".ph-word",
        { yPercent: 120, opacity: 0, rotateX: -60 },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.08,
          immediateRender: false,
          scrollTrigger: { trigger: ".ph-headline", start: "top 80%", once: true },
        }
      );

      // Deliberately flat: no rotation, no per-card offset. The 3D entrance
      // that used to live here left the cards skewed and sitting at different
      // heights whenever its ScrollTrigger mis-measured, which is exactly what
      // a row of cards must never do.
      //
      // immediateRender is off so the "from" values are only applied once the
      // tween actually starts. If the trigger never fires, the cards render in
      // their normal, correct position instead of freezing mid-pose.
      gsap.fromTo(
        ".ph-card",
        { y: 60, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.14,
          immediateRender: false,
          scrollTrigger: { trigger: ".ph-cards", start: "top 88%", once: true },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-transparent px-6 py-28"
    >
      {/* soft ambient lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />
      {/* cinematic letterbox falloff at the section edges */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 to-transparent" />

      <p className="mb-6 text-xs font-medium uppercase tracking-[0.4em] text-zinc-500">
        My Philosophy
      </p>

      <h2 className="ph-headline mx-auto max-w-5xl text-center text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
        {HEADLINE.map((w, i) => (
          <span key={i} className="mx-[0.15em] inline-block overflow-hidden align-bottom">
            <span className="ph-word inline-block">{w}</span>
          </span>
        ))}
      </h2>

      <div className="ph-cards mt-20 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {CARDS.map(({ icon: Icon, title, body, glow }) => (
          <TiltCard key={title} glow={glow} className="ph-card p-8">
            <div
              className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
              style={{ boxShadow: `0 0 30px ${glow}` }}
            >
              <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{body}</p>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
