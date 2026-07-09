"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductionCard from "./ProductionCard";
import { PRODUCTION_PROJECTS } from "../production/data";

const ease = [0.22, 1, 0.36, 1];

const HOME_COUNT = 4;

export default function ProductionProjects() {
  const featured = PRODUCTION_PROJECTS.slice(0, HOME_COUNT);
  const hasMore = PRODUCTION_PROJECTS.length > HOME_COUNT;

  return (
    <section
      id="production"
      className="relative w-full scroll-mt-24 bg-transparent px-6 py-28"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-zinc-500">
            Live Work
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Production Projects
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
            Real, deployed websites — click through to any live site.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((project, i) => (
            <ProductionCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <Link
              href="/production"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
            >
              View More <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
