"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

const STAGES = [
  { n: "01", icon: Search, title: "Discover", body: "Research, goals and audience. We map the problem before touching a pixel.", glow: "rgba(56,189,248,0.5)" },
  { n: "02", icon: PenTool, title: "Design", body: "Wireframes to high-fidelity systems — the look, feel and motion language.", glow: "rgba(168,85,247,0.5)" },
  { n: "03", icon: Code2, title: "Develop", body: "Production-grade, animated and accessible code built to scale.", glow: "rgba(132,204,22,0.5)" },
  { n: "04", icon: Rocket, title: "Launch", body: "Ship, measure and iterate. Momentum that keeps compounding.", glow: "rgba(244,114,182,0.5)" },
];

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const track = trackRef.current;

      // Distance the track has to travel = its overflow past the viewport.
      // (Animating `x` by this amount lands exactly on the last panel; the old
      // `xPercent: -300` moved the 400vw track by 1200vw, so panels 1-4 flew
      // past in the first quarter and the rest was an empty black screen.)
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      const scroll = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + getScrollAmount(),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // progress bar tied to the same horizontal scroll
      gsap.to(".proc-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + getScrollAmount(),
          scrub: true,
        },
      });

      return () => scroll.kill();
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-transparent">
      {/* ambient colour shades so the section isn't pure black — echoes the
          per-stage glow palette (sky / violet / lime / pink). Fixed to the
          section so they stay put while the panels scroll horizontally. */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[34rem] w-[34rem] rounded-full bg-sky-500/10 blur-[150px]" />
      <div className="pointer-events-none absolute left-1/3 -top-24 h-[30rem] w-[30rem] rounded-full bg-violet-600/10 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[32rem] w-[32rem] rounded-full bg-lime-500/[0.07] blur-[150px]" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-[34rem] w-[34rem] rounded-full bg-pink-500/10 blur-[150px]" />

      {/* progress bar */}
      <div className="absolute left-0 top-0 z-20 h-1 w-full bg-white/5">
        <div className="proc-bar h-full w-full origin-left scale-x-0 bg-gradient-to-r from-sky-400 via-violet-400 to-pink-400" />
      </div>

      <div className="absolute left-6 top-8 z-20 sm:left-12">
        <p className="text-xs font-medium uppercase tracking-[0.4em] text-zinc-500">
          The Process
        </p>
      </div>

      <div ref={trackRef} className="flex h-full w-[400vw]">
        {STAGES.map(({ n, icon: Icon, title, body, glow }, i) => (
          <div
            key={title}
            className="proc-panel relative flex h-full w-screen flex-col items-center justify-center px-8"
          >
            {i < STAGES.length - 1 && (
              <div className="pointer-events-none absolute right-0 top-1/2 hidden h-px w-40 bg-gradient-to-r from-white/20 to-transparent lg:block" />
            )}
            <span className="text-[22vw] font-bold leading-none text-white/5 sm:text-[16vw]">
              {n}
            </span>
            <div
              className="-mt-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
              style={{ boxShadow: `0 0 40px ${glow}` }}
            >
              <Icon className="h-7 w-7 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="mt-8 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              {title}
            </h3>
            <p className="mt-4 max-w-md text-center text-base leading-relaxed text-zinc-400">
              {body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
