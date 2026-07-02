"use client";

import { useRef } from "react";

// Reusable glassmorphism card that reacts to the mouse with a subtle 3D tilt
// and a light-following glow. Used by Philosophy / Skills / Testimonials.
export default function TiltCard({
  children,
  className = "",
  glow = "rgba(129,140,248,0.35)",
  max = 8,
}) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${px * max}deg) rotateX(${
      -py * max
    }deg)`;
    el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ "--mx": "50%", "--my": "50%", "--glow": glow }}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {/* light-following glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--mx) var(--my), var(--glow), transparent 60%)",
        }}
      />
      {/* top sheen */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
