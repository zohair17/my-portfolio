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
      className="relative w-full overflow-hidden bg-transparent px-6 py-28"
    >
      <div className="pointer-events-none absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-sky-500/10 blur-[130px]" />

      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-zinc-500">
          Toolkit
        </p>
        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          The tech I build with.
        </h2>

        {/* 3D spiral cylinder — the ring spins non-stop and pauses on hover.
            Each card sits at its own angle on the cylinder and steps down the
            spiral, logo centred with its name underneath. */}
        <div className="skills-grid mt-28 flex h-[22rem] sm:h-[30rem] items-center justify-center [perspective:2000px] sm:[perspective:2200px]">
          <div className="tech-ring relative h-full w-[15rem] [transform-style:preserve-3d]">
            {SKILLS.map(({ name, icon: Icon, color, glow }, i) => {
              const angle = (360 / SKILLS.length) * i;
              const y = -110 + (220 / (SKILLS.length - 1)) * i; // spiral rise
              return (
                <div
                  key={name}
                  className="skill-card absolute left-1/2 top-1/2 -ml-[6rem] -mt-[5rem] flex h-40 w-48 flex-col items-center justify-center gap-3 rounded-2xl px-3 sm:gap-5 sm:px-4 sm:-ml-[10rem] sm:-mt-[6.5rem] sm:h-52 sm:w-80 sm:gap-5 border border-white/12 bg-white/[0.06]"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(var(--ring-r)) translateY(${y}px)`,
                    boxShadow: `0 0 40px ${glow}`,
                  }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl sm:h-20 sm:w-20 sm:rounded-2xl border border-white/10 bg-white/5"
                    style={{ boxShadow: `0 0 24px ${glow}` }}
                  >
                    <Icon className="h-6 w-6 sm:h-11 sm:w-11" style={{ color }} />
                  </div>
                  <p className="text-center text-xs font-semibold leading-tight text-white sm:text-lg">{name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .tech-ring {
          --ring-r: 20rem;
        }
        @media (min-width: 640px) {
          .tech-ring { --ring-r: 32rem; }
        }
        @media (min-width: 1024px) {
          .tech-ring { --ring-r: 44rem; }
        }
        .tech-ring {
          animation: techSpin 26s linear infinite;
        }
        .tech-ring:has(.skill-card:hover) {
          animation-play-state: paused;
        }
        @keyframes techSpin {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(-360deg); }
        }
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
