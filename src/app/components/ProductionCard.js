"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

// One animated production-project card: a laptop screen (site screenshot),
// title, short description and a clickable "View Live Website" button.
export default function ProductionCard({ project, index = 0 }) {
  const live = project.url && project.url !== "#";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
    >
      {/* laptop mockup */}
      <div className="[transform-style:preserve-3d]">
        <div className="rounded-xl border border-white/12 bg-zinc-900 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex gap-1 px-1.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
          </div>
          <div
            className="aspect-video w-full overflow-hidden rounded-md bg-cover bg-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            style={{ backgroundImage: `url('${project.screen}')` }}
          />
        </div>
        <div className="mx-auto h-2 w-[108%] -translate-x-[3.7%] rounded-b-lg bg-gradient-to-b from-zinc-700 to-zinc-900" />
      </div>

      {/* copy + CTA */}
      <div className="mt-5 flex flex-1 flex-col px-1">
        <h3 className="text-lg font-semibold tracking-tight text-white">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
          {project.description}
        </p>

        <a
          href={project.url || "#"}
          target={live ? "_blank" : undefined}
          rel={live ? "noopener noreferrer" : undefined}
          aria-disabled={!live}
          className={`mt-5 inline-flex items-center gap-2 self-start rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            live
              ? "border-white/20 bg-white/5 text-white hover:bg-white hover:text-black"
              : "pointer-events-none border-white/10 bg-white/[0.02] text-zinc-500"
          }`}
        >
          <ExternalLink className="h-4 w-4" strokeWidth={1.75} /> View Live Website
        </a>
      </div>
    </motion.div>
  );
}
