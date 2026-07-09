"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowDown, ExternalLink } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

function BrowserFrame({ src, alt }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/12 bg-zinc-900 shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-amber-400/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" className="block w-full" />
    </div>
  );
}

export default function ProjectGallery({ data, slug }) {
  const { name, tagline, summary, video, hero, original, shots } = data;

  return (
    <main className="relative z-10 w-full bg-transparent">
      {/* back */}
      <Link
        href={slug ? `/#project-${slug}` : "/#work"}
        className="fixed left-5 top-5 z-50 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/10"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.75} /> Back
      </Link>

      {/* ── Hero (video only, audio enabled) ── */}
      <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease }}
          className="absolute inset-0"
        >
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url('${hero}')` }}
          />
        </motion.div>

        {/* bottom fade only (pointer-events off so the video controls stay usable) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#050505]" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.4, duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-zinc-400"
        >
          <ArrowDown className="h-6 w-6" strokeWidth={1.5} />
        </motion.div>
      </section>

      {/* ── Title / intro (below the hero so the copy is fully readable) ── */}
      <section className="mx-auto max-w-4xl px-6 pt-20 text-center sm:pt-28">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mb-5 text-xs font-medium uppercase tracking-[0.5em] text-zinc-400"
        >
          {tagline}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="text-5xl font-semibold tracking-tight text-white sm:text-7xl md:text-8xl"
        >
          {name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-300"
        >
          {summary}
        </motion.p>
      </section>

      {/* ── Screenshot walkthrough (alternating 2-column layout) ── */}
      <section className="mx-auto max-w-6xl px-5 py-24 sm:py-28">
        {shots.map((shot, i) => {
          const imgFirst = i % 2 === 0; // even → image left, odd → image right
          return (
            <div
              key={i}
              className="mb-24 grid items-center gap-10 last:mb-0 sm:mb-28 lg:grid-cols-2 lg:gap-16"
            >
              <motion.div
                initial={{ opacity: 0, x: imgFirst ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease }}
                className={imgFirst ? "lg:order-1" : "lg:order-2"}
              >
                <BrowserFrame src={shot.src} alt={`${name} — ${shot.title}`} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: imgFirst ? 60 : -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease }}
                className={imgFirst ? "lg:order-2" : "lg:order-1"}
              >
                <p className="text-xs font-medium uppercase tracking-[0.4em] text-zinc-500">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {shot.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-zinc-400">
                  {shot.body}
                </p>
              </motion.div>
            </div>
          );
        })}
      </section>

      {/* ── Video walkthrough (comes first) ── */}
      {video && (
        <section className="border-t border-white/5 bg-black px-5 py-24 text-center">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-medium uppercase tracking-[0.4em] text-zinc-500">
              In motion
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Watch the walkthrough
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
              See the revamp come alive — press play for the full experience with sound.
            </p>
            <div className="mt-10 overflow-hidden rounded-2xl border border-white/12 shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
              <video className="w-full" src={video} controls playsInline preload="metadata" />
            </div>
          </div>
        </section>
      )}

      {/* ── Original comparison (comes after the walkthrough) ── */}
      {original && (
        <section className="border-t border-white/5 bg-[#080808] px-5 py-24 text-center">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.4em] text-zinc-500">
              For comparison
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              The original website
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              These screens are my own revamp concept — not the live site. Open the
              original to compare the landing page side by side.
            </p>
            <a
              href={original}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
            >
              <ExternalLink className="h-4 w-4" strokeWidth={1.75} /> View original site
            </a>
          </div>
        </section>
      )}
    </main>
  );
}
