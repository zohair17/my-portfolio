"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// `screen` in the data is a CSS url("…"); pull the bare path out.
const cleanUrl = (s) =>
  s.replace(/^url\((['"]?)/, "").replace(/(['"]?)\)$/, "");

// One "case" panel — CASE label, an LCD monitor on the left playing the project
// video, serif title + hashtags on the right. `sticky` turns on the
// pin-and-stack scroll (each panel pins, and the next slides up over it).
//
// The monitor only powers on once this panel is *properly* on top of the stack:
// its own section is pinned at the viewport top and the next panel has not yet
// started sliding over it. Scrolling on to the next case powers this screen back
// down and lights the next one up, so exactly one video ever plays.
//
// The panel *section* is transparent so the one page-wide aurora shows through
// behind every panel; only the inner *card* is opaque, so a panel sliding up
// cleanly covers the one behind it.
export default function CasePanel({ project: p, index, sticky = true }) {
  const tags = p.stack
    .slice(0, 3)
    .map((s) => "#" + s.replace(/[^a-z0-9]/gi, "").toUpperCase());

  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [on, setOn] = useState(false);
  const [covered, setCovered] = useState(false);

  // Ownership of the top of the stack, measured from layout (works with the
  // Lenis smooth scroll, which drives real window scrolling).
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let active;
      if (sticky) {
        // Pinned at the top, and the next panel hasn't begun covering it.
        const next = el.nextElementSibling;
        const nextTop = next ? next.getBoundingClientRect().top : Infinity;
        active = r.top <= 2 && nextTop > vh * 0.12;
        setCovered(nextTop <= 2); // fully hidden → drop it so aurora shows
      } else {
        // Last panel scrolls normally — on once it substantially fills the view.
        active = r.top < vh * 0.4 && r.bottom > vh * 0.45;
      }
      setOn((prev) => (prev === active ? prev : active));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [sticky]);

  // Screen on → play from the top; off → pause (so each case starts fresh).
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (on) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [on]);

  return (
    <section
      ref={sectionRef}
      id={`project-${p.slug}`}
      style={{
        zIndex: index + 1,
      }}
      className={`relative flex min-h-screen w-full items-center px-3 sm:px-5 lg:px-6 ${
        sticky ? "sticky top-0 h-screen" : "py-16"
      }`}
    >
      <div className={`relative z-10 mx-auto w-full max-w-[112rem] ${covered ? "invisible" : ""}`}>
        <div
          style={{ backgroundColor: "#0b0a13" }}
          className="overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-b from-white/[0.06] to-white/[0.01] shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
        >
          <p className="px-6 pt-6 font-mono text-xs uppercase tracking-[0.4em] text-zinc-300 sm:px-9 sm:pt-8">
            Case {String(index + 1).padStart(2, "0")}
          </p>

          <div className="grid items-center gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            {/* left — LCD monitor; the project video runs inside the screen */}
            <div className="flex items-center justify-center p-5 sm:p-8">
              <Link
                href={`/projects/${p.slug}`}
                aria-label={`${p.title} — open case`}
                className="block w-full max-w-3xl"
              >
                {/* bezel */}
                <div
                  className={`relative rounded-[18px] border p-[10px] transition-all duration-700 sm:rounded-[22px] sm:p-[14px] ${
                    on
                      ? "border-white/25 shadow-[0_0_70px_rgba(124,91,255,0.28),0_30px_80px_rgba(0,0,0,0.65)]"
                      : "border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
                  }`}
                  style={{
                    background:
                      "linear-gradient(160deg,#2a2a33 0%,#141419 45%,#0d0d11 100%)",
                  }}
                >
                  {/* screen */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[10px] bg-black sm:rounded-xl">
                    <video
                      ref={videoRef}
                      src={p.video}
                      poster={cleanUrl(p.screen)}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className={`h-full w-full object-cover object-top transition-opacity duration-700 ${
                        on ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    {/* powered-down state — dead black glass */}
                    <div
                      className={`pointer-events-none absolute inset-0 bg-[#050507] transition-opacity duration-700 ${
                        on ? "opacity-0" : "opacity-100"
                      }`}
                    />
                    {/* glass sheen + scanlines, always over the picture */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-transparent" />
                    <div
                      className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
                        on ? "opacity-30" : "opacity-0"
                      }`}
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(to bottom,rgba(0,0,0,0.35) 0px,rgba(0,0,0,0.35) 1px,transparent 1px,transparent 3px)",
                      }}
                    />
                  </div>

                  {/* chin — brand line + power LED */}
                  <div className="flex items-center justify-between px-2 pt-2 sm:pt-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-zinc-500 sm:text-[10px]">
                      {p.title}
                    </span>
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                        on
                          ? "bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.75)]"
                          : "bg-zinc-700"
                      }`}
                    />
                  </div>
                </div>

                {/* stand */}
                <div className="mx-auto h-5 w-16 bg-gradient-to-b from-[#23232b] to-[#101014] sm:h-7 sm:w-24" />
                <div className="mx-auto h-1.5 w-28 rounded-full bg-gradient-to-b from-[#2a2a33] to-[#0d0d11] shadow-[0_10px_24px_rgba(0,0,0,0.6)] sm:h-2 sm:w-44" />
              </Link>
            </div>

            {/* right — serif title · hashtags · summary */}
            <div className="px-8 pb-12 pt-2 lg:py-12 lg:pl-4 lg:pr-14">
              <h2 className="font-serif text-4xl font-medium leading-[1.03] tracking-tight text-white sm:text-6xl md:text-7xl">
                <Link
                  href={`/projects/${p.slug}`}
                  className="transition-opacity hover:opacity-70"
                >
                  {p.title}
                </Link>
              </h2>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400">
                {tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-zinc-300">
                {p.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
