"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const STATS = [
  { value: "4+", label: "Years Experience" },
  { value: "Fintech", label: "& Enterprise Apps" },
  { value: "Karachi", label: "Pakistan" },
];

const SKILLS = [
  "React.js",
  "Flutter",
  "SPFx",
  "REST APIs",
  "Redux & Context",
  "Riverpod & Provider",
  "Clean Architecture (MVVM)",
  "Figma → Pixel-Perfect UI",
  "Performance Optimization",
];

const EXPERIENCE = [
  { role: "React Developer", org: "Al Rafay Consultancy", period: "2024 — 2026" },
  { role: "Flutter Developer", org: "CodeBase Technologies", period: "2022 — 2024" },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-transparent px-6 py-28"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-indigo-600/10 blur-[130px]"
        animate={{ x: [0, 40, 0], y: [0, -30, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-[24rem] w-[24rem] rounded-full bg-emerald-500/10 blur-[130px]"
        animate={{ x: [0, -30, 0], y: [0, 25, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
      />

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-zinc-500">
            About Me
          </p>
          <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            Frontend &amp; mobile developer crafting polished, scalable products.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          <p className="text-lg leading-relaxed text-zinc-300">
            I&apos;m Zohair Ahmed, a Frontend &amp; Mobile Application Developer with
            4+ years of experience across Flutter, React.js and SPFx. I specialise
            in building scalable fintech and enterprise applications — turning
            complex Figma designs into pixel-perfect, performant interfaces backed
            by clean, maintainable architecture.
          </p>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            I&apos;ve shipped core features for fintech products like AAA Financing,
            WINK Pay and Raqami, and delivered enterprise SharePoint solutions with
            React and PnP.js — collaborating closely with design and backend teams
            throughout.
          </p>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Right now I&apos;m focused on building my own path as a freelancer —
            showcasing my work across social media and taking on new projects for
            clients. If you&apos;re looking to build something great, let&apos;s talk.
          </p>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
            />
            Available for freelance projects
          </span>

          {/* stats */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="mt-8 grid grid-cols-3 gap-4"
          >
            {STATS.map((s) => (
              <motion.div
                key={s.label}
                variants={item}
                whileHover={{ y: -4, borderColor: "rgba(129,140,248,0.4)" }}
                transition={{ duration: 0.25, ease }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <p className="text-xl font-semibold text-white sm:text-2xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs leading-snug text-zinc-500">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* experience */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="mt-8 space-y-3"
          >
            {EXPERIENCE.map((e) => (
              <motion.div
                key={e.org}
                variants={item}
                className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/5 pb-3"
              >
                <p className="text-sm font-medium text-white">
                  {e.role} <span className="text-zinc-500">· {e.org}</span>
                </p>
                <p className="text-xs text-zinc-500">{e.period}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* skills */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {SKILLS.map((skill) => (
              <motion.span
                key={skill}
                variants={item}
                whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.1)" }}
                className="cursor-default rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-zinc-300"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
