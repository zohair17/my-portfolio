"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Images, ExternalLink } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

export default function CaseStudy({ data, slug }) {
  const { name, tagline, summary, hero, original, caseStudy } = data;
  const { role, timeline, overview, sections } = caseStudy;

  return (
    <main className="w-full bg-[#050505]">
      <Link
        href="/#work"
        className="fixed left-5 top-5 z-50 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/10"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.75} /> Back
      </Link>

      {/* ── Hero ── */}
      <section className="relative w-full overflow-hidden px-6 pb-16 pt-32 sm:pt-40">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('${hero}')` }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050505]/60 to-[#050505]" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="mb-5 text-xs font-medium uppercase tracking-[0.5em] text-zinc-400"
          >
            Case Study · {tagline}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease }}
            className="text-5xl font-semibold tracking-tight text-white sm:text-7xl"
          >
            {name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9, ease }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-300"
          >
            {summary}
          </motion.p>
        </div>
      </section>

      {/* ── Meta ── */}
      <section className="mx-auto max-w-4xl px-6">
        <div className="grid grid-cols-1 gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:grid-cols-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-zinc-500">Role</p>
            <p className="mt-2 text-sm text-white">{role}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-zinc-500">Timeline</p>
            <p className="mt-2 text-sm text-white">{timeline}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-zinc-500">Live Site</p>
            <a
              href={original}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-sm text-white underline-offset-4 hover:underline"
            >
              Visit <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-xs font-medium uppercase tracking-[0.4em] text-zinc-500">Overview</p>
        <p className="mt-5 text-xl leading-relaxed text-zinc-200 sm:text-2xl">{overview}</p>
      </section>

      {/* ── Sections ── */}
      <section className="mx-auto max-w-3xl px-6 pb-24">
        {sections.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
            className="mb-16 border-t border-white/10 pt-10 last:mb-0"
          >
            <div className="flex items-baseline gap-4">
              <span className="text-sm font-semibold text-zinc-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {s.title}
              </h2>
            </div>
            <p className="mt-5 text-base leading-relaxed text-zinc-400">{s.body}</p>
          </motion.div>
        ))}
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-white/5 bg-[#080808] px-6 py-20 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          See the revamp in detail
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={`/projects/${slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
          >
            <Images className="h-4 w-4" strokeWidth={1.75} /> View Gallery
          </Link>
          <a
            href={original}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            <ExternalLink className="h-4 w-4" strokeWidth={1.75} /> Visit live site
          </a>
        </div>
      </section>
    </main>
  );
}
