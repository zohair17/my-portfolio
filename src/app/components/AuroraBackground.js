"use client";

import { useEffect, useRef } from "react";

// Colourful flowing "ribbon" aurora drawn to a <canvas>. Several diagonal,
// gradient-filled bands ride layered sine waves and glow via additive
// blending. The waves animate on their own (time) and intensify / shift as the
// page scrolls, so the background visibly "waves when you scroll".
const RIBBONS = [
  { colors: ["#ff2d95", "#ff8ad4"], y: 0.30, amp: 0.10, thick: 0.16, speed: 0.00035, freq: 1.4, phase: 0.0 },
  { colors: ["#7c5bff", "#b47bff"], y: 0.46, amp: 0.15, thick: 0.22, speed: 0.00024, freq: 1.0, phase: 1.6 },
  { colors: ["#3b82f6", "#22d3ee"], y: 0.60, amp: 0.12, thick: 0.18, speed: 0.00042, freq: 1.7, phase: 3.4 },
  { colors: ["#a855f7", "#ec4899"], y: 0.52, amp: 0.17, thick: 0.24, speed: 0.00020, freq: 0.8, phase: 5.0 },
];

export default function AuroraBackground({ className = "" }) {
  const canvasRef = useRef(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = Math.floor(window.innerWidth * dpr);
      h = canvas.height = Math.floor(window.innerHeight * dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const onScroll = () => {
      scrollRef.current = window.scrollY || 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const TAU = Math.PI * 2;

    const draw = (t) => {
      raf = requestAnimationFrame(draw);
      // Fixed backdrop for the whole page — only pause when the tab is hidden.
      if (document.hidden) return;

      const scroll = scrollRef.current;
      const scrollAmp = 1 + Math.min(scroll / 900, 1) * 0.9; // waves grow as you scroll
      const scrollPhase = scroll * 0.0022; // ...and drift sideways

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      // Tilt the whole field so the ribbons run diagonally, like the reference.
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate((-18 * Math.PI) / 180);
      ctx.translate(-w / 2, -h / 2);

      const step = Math.max(w / 48, 14);
      const x0 = -w * 0.25;
      const x1 = w * 1.25;

      const edge = (r, x, sign) => {
        const midY = h * r.y;
        const amp = h * r.amp * scrollAmp;
        const u = x / w;
        return (
          midY +
          Math.sin(u * TAU * r.freq + t * r.speed + r.phase + scrollPhase) * amp +
          Math.sin(u * TAU * r.freq * 2.3 + t * r.speed * 1.7 + r.phase) * amp * 0.35 +
          (sign * h * r.thick) / 2
        );
      };

      for (const r of RIBBONS) {
        ctx.beginPath();
        for (let x = x0; x <= x1; x += step) {
          const y = edge(r, x, -1);
          x === x0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        for (let x = x1; x >= x0; x -= step) {
          ctx.lineTo(x, edge(r, x, 1));
        }
        ctx.closePath();

        const midY = h * r.y;
        const half = h * r.thick;
        const g = ctx.createLinearGradient(0, midY - half, 0, midY + half);
        g.addColorStop(0, r.colors[0] + "00");
        g.addColorStop(0.5, r.colors[0]);
        g.addColorStop(1, r.colors[1] + "00");
        ctx.fillStyle = g;
        ctx.fill();
      }

      ctx.restore();
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
