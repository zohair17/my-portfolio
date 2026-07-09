"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import ProductionCard from "./ProductionCard";
import { PRODUCTION_PROJECTS } from "../production/data";

const ease = [0.22, 1, 0.36, 1];

export default function ProductionListing() {
  return (
    <main className="relative z-10 min-h-screen w-full bg-transparent">
      {/* back to the Production Projects section on the home page */}
      <Link
        href="/#production"
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
            All Live Work
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            Production Projects
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-400">
            Every deployed website — click any card to open the live site.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTION_PROJECTS.map((project, i) => (
            <ProductionCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
