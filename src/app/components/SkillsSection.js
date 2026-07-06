"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiNextdotjs,
  SiReact,
  SiFlutter,
  SiGreensock,
  SiThreedotjs,
  SiFramer,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa";
import TiltCard from "./TiltCard";

const SKILLS = [
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", glow: "rgba(255,255,255,0.35)" },
  { name: "React", icon: SiReact, color: "#61DAFB", glow: "rgba(56,189,248,0.4)" },
  { name: "Flutter", icon: SiFlutter, color: "#02569B", glow: "rgba(2,86,155,0.45)" },
  { name: "SharePoint", icon: FaMicrosoft, color: "#036C70", glow: "rgba(3,108,112,0.45)" },
  { name: "GSAP", icon: SiGreensock, color: "#88CE02", glow: "rgba(132,204,22,0.4)" },
  { name: "Three.js", icon: SiThreedotjs, color: "#ffffff", glow: "rgba(148,163,184,0.4)" },
  { name: "Framer Motion", icon: SiFramer, color: "#E64FFF", glow: "rgba(236,72,153,0.4)" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8", glow: "rgba(45,212,191,0.4)" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", glow: "rgba(59,130,246,0.45)" },
];

export default function SkillsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".skill-card", {
        y: 60,
        opacity: 0,
        scale: 0.9,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".skills-grid", start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#070707] px-6 py-28"
    >
      <div className="pointer-events-none absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-sky-500/10 blur-[130px]" />

      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-zinc-500">
          Toolkit
        </p>
        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          The tech I build with.
        </h2>

        <div className="skills-grid mt-16 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {SKILLS.map(({ name, icon: Icon, color, glow }, i) => (
            <TiltCard
              key={name}
              glow={glow}
              max={12}
              className="skill-card skill-float p-8"
            >
              <div style={{ animationDelay: `${i * 0.35}s` }} className="skill-inner">
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5"
                  style={{ boxShadow: `0 0 24px ${glow}` }}
                >
                  <Icon className="h-6 w-6" style={{ color }} />
                </div>
                <p className="text-lg font-semibold text-white">{name}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      <style jsx>{`
        :global(.skill-float) {
          animation: skillFloat 6s ease-in-out infinite;
        }
        @keyframes skillFloat {
          0%,
          100% {
            translate: 0 0;
          }
          50% {
            translate: 0 -10px;
          }
        }
      `}</style>
    </section>
  );
}
