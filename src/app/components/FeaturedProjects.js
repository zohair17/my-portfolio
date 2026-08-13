"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FEATURED_PROJECTS, HOME_COUNT } from "../work/data";
import CasePanel from "./CasePanel";

export default function FeaturedProjects() {
  const shown = FEATURED_PROJECTS.slice(0, HOME_COUNT);
  const hasMore = FEATURED_PROJECTS.length > HOME_COUNT;

  return (
    <section id="work" className="relative w-full bg-transparent">
      {/* Anchor used by the /work "Back" button (kept separate from #work so a
          plain reload still starts at the hero). */}
      <span id="featured" aria-hidden className="pointer-events-none absolute -top-24" />

      <div className="mx-auto max-w-6xl px-6 pt-28">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-zinc-500">
          Selected Work
        </p>
        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Featured Projects
        </h2>
      </div>

      {/* Same "case" panels as /work — each pins and the next slides up over it.
          The last one is non-sticky so the short "View More" link below (not a
          full panel) never sits under the pinned last case. */}
      <div className="relative mt-10">
        {/* sticky panels stay pinned behind; the closing block below is opaque
            and sits on top so their stands/cards never peek through. */}
        {shown.map((project, index) => (
          <CasePanel
            key={project.slug}
            project={project}
            index={index}
            sticky={index < shown.length - 1}
          />
        ))}
      </div>

      {/* Route to the full showcase (handles "more than HOME_COUNT"). */}
      <div
        style={{ zIndex: shown.length + 1 }}
        className="relative flex justify-center px-6 pb-32 pt-8"
      >
        <Link
          href="/work"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
        >
          {hasMore ? "View More Projects" : "View All Projects"}
          <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
        </Link>
      </div>
    </section>
  );
}
