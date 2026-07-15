"use client";

import { ArrowUp } from "lucide-react";

export default function Footer() {
  const toTop = () => {
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full overflow-hidden bg-transparent px-6 pb-12 pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-10 text-center">
          {/* logo */}
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm font-bold text-black">
              ZA
            </span>
            <span className="text-lg font-semibold tracking-tight text-white">
              Zohair Ahmed
            </span>
          </div>

          {/* divider */}
          <div className="h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-zinc-500">
              © {new Date().getFullYear()} Zohair Ahmed. All rights reserved.
            </p>
            <p className="text-xs text-zinc-500">
              Crafted with motion, code & storytelling.
            </p>
          </div>
        </div>
      </div>

      {/* scroll to top */}
      <button
        onClick={toTop}
        aria-label="Scroll to top"
        className="group absolute bottom-10 right-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-white/40 sm:right-12"
      >
        <ArrowUp className="h-5 w-5 text-white transition-transform group-hover:-translate-y-0.5" />
      </button>
    </footer>
  );
}
