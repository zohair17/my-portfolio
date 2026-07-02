"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Lightbulb,
  PenTool,
  Code2,
  Bug,
  Rocket,
  Gauge,
  Users,
} from "lucide-react";

const STEPS = [
  { icon: Lightbulb, title: "Brainstorming", body: "Whiteboards, references and rough concepts — chasing the strongest idea." },
  { icon: PenTool, title: "Figma Design", body: "Pixel-perfect layouts, design tokens and interactive prototypes." },
  { icon: Code2, title: "Development", body: "Clean, componentised code built in VS Code with motion baked in." },
  { icon: Bug, title: "Testing", body: "Cross-device QA, edge cases and accessibility passes." },
  { icon: Gauge, title: "Optimization", body: "Lighthouse tuning, lazy loading and 60fps polishing." },
  { icon: Rocket, title: "Deployment", body: "Zero-downtime shipping with previews and CI/CD." },
  { icon: Users, title: "Collaboration", body: "Tight feedback loops with clients and teammates throughout." },
];

export default function BehindScenes() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(".bts-progress", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".bts-timeline",
          start: "top 60%",
          end: "bottom 70%",
          scrub: true,
        },
      });

      gsap.utils.toArray(".bts-item").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#070707] px-6 py-28"
    >
      <div className="pointer-events-none absolute left-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-violet-600/10 blur-[130px]" />

      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-zinc-500">
          Behind the Scenes
        </p>
        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          The craft behind every build.
        </h2>

        <div className="bts-timeline relative mt-20 pl-10">
          {/* rail + animated progress */}
          <div className="absolute left-[14px] top-2 h-full w-px bg-white/10" />
          <div className="bts-progress absolute left-[14px] top-2 h-full w-px origin-top scale-y-0 bg-gradient-to-b from-violet-400 to-sky-400" />

          <div className="space-y-14">
            {STEPS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bts-item relative">
                <div className="absolute -left-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-[#0e0e0e] shadow-[0_0_20px_rgba(139,92,246,0.35)]">
                  <Icon className="h-4 w-4 text-violet-300" strokeWidth={1.75} />
                </div>
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
