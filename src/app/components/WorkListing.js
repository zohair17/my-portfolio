"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Images, FileText } from "lucide-react";
import { FEATURED_PROJECTS } from "../work/data";

const ease = [0.22, 1, 0.36, 1];

function WorkCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.tint}`}
      />

      {/* laptop mockup */}
      <div className="relative [transform-style:preserve-3d]">
        <div className="rounded-xl border border-white/12 bg-zinc-900 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex gap-1 px-1.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
          </div>
          <div
            className="aspect-video w-full overflow-hidden rounded-md bg-cover bg-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            style={{ backgroundImage: project.screen }}
          />
        </div>
        <div className="mx-auto h-2 w-[108%] -translate-x-[3.7%] rounded-b-lg bg-gradient-to-b from-zinc-700 to-zinc-900" />
      </div>

      {/* copy */}
      <div className="relative mt-5 flex flex-1 flex-col px-1">
        <h3 className="text-lg font-semibold tracking-tight text-white">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
          {project.desc}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[11px] text-zinc-300"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
          >
            <Images className="h-4 w-4" strokeWidth={1.75} /> View Gallery
          </Link>
          <Link
            href={`/projects/${project.slug}/case-study`}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            <FileText className="h-4 w-4" strokeWidth={1.75} /> Case Study
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkListing() {
  return (
    <main className="relative z-10 min-h-screen w-full bg-transparent">
      <Link
        href="/#featured"
        className="fixed left-5 top-5 z-50 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/10"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.75} /> Back
      </Link>

      <section className="mx-auto max-w-6xl px-6 pb-28 pt-32 sm:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="text-center"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.5em] text-zinc-400">
            Selected Work
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            All Projects
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-400">
            Every featured revamp — open a full gallery or read the case study.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_PROJECTS.map((project, i) => (
            <WorkCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
