"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  { icon: Lightbulb, title: "Brainstorming", body: "Whiteboards, references and rough concepts — chasing the strongest idea.", glow: "250,204,21" },
  { icon: PenTool, title: "Figma Design", body: "Pixel-perfect layouts, design tokens and interactive prototypes.", glow: "244,114,182" },
  { icon: Code2, title: "Development", body: "Clean, componentised code built in VS Code with motion baked in.", glow: "56,189,248" },
  { icon: Bug, title: "Testing", body: "Cross-device QA, edge cases and accessibility passes.", glow: "52,211,153" },
  { icon: Gauge, title: "Optimization", body: "Lighthouse tuning, lazy loading and 60fps polishing.", glow: "129,140,248" },
  { icon: Rocket, title: "Deployment", body: "Zero-downtime shipping with previews and CI/CD.", glow: "167,139,250" },
  { icon: Users, title: "Collaboration", body: "Tight feedback loops with clients and teammates throughout.", glow: "96,165,250" },
];

function ParallaxStep({ step, index }) {
  const { icon: Icon, title, body, glow } = step;
  const ref = useRef(null);
  const flip = index % 2 === 1;

  // Track this row's travel through the viewport…
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // …then move the number and the card at different rates → parallax depth.
  const numberY = useTransform(scrollYProgress, [0, 1], ["28%", "-28%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0.35]);

  return (
    <div
      ref={ref}
      className="relative grid items-center gap-4 py-6 lg:grid-cols-12 lg:gap-8"
    >
      {/* giant outlined number — the slow parallax layer */}
      <motion.div
        aria-hidden
        style={{ y: numberY }}
        className={`lg:col-span-5 ${flip ? "lg:order-2 lg:text-right" : "lg:order-1"}`}
      >
        <span
          className="block select-none text-[7rem] font-bold leading-none tracking-tighter text-transparent sm:text-[11rem]"
          style={{ WebkitTextStroke: `1.5px rgba(${glow},0.45)` }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </motion.div>

      {/* content — the faster foreground layer */}
      <motion.div
        style={{ y: contentY, opacity }}
        className={`lg:col-span-7 ${flip ? "lg:order-1" : "lg:order-2"}`}
      >
        <div className="max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
            style={{ boxShadow: `0 0 26px rgba(${glow},0.35)` }}
          >
            <Icon className="h-5 w-5 text-white" strokeWidth={1.75} />
          </div>
          <h3 className="mt-6 text-2xl font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function BehindScenes() {
  return (
    <section className="relative w-full overflow-hidden bg-transparent px-6 py-28">
      <div className="pointer-events-none absolute left-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-violet-600/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-0 h-[24rem] w-[24rem] rounded-full bg-sky-600/10 blur-[130px]" />

      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-zinc-500">
          Behind the Scenes
        </p>
        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          The craft behind every build.
        </h2>

        <div className="mt-12 flex flex-col gap-10 sm:gap-16">
          {STEPS.map((step, i) => (
            <ParallaxStep key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
