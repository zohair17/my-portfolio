"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Ultra-premium cinematic loader: black screen → GSAP % counter → 0.3s hold →
// the black backdrop fades out to reveal the hero as one continuous, cut-free
// motion (no spotlight bloom).
export default function Loader() {
  const [done, setDone] = useState(false);
  const rootRef = useRef(null);
  const backRef = useRef(null);
  const numRef = useRef(null);
  const contentRef = useRef(null);
  const canvasRef = useRef(null);

  // subtle low-opacity floating particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.6 + 0.3,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      a: Math.random() * 0.25 + 0.03,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        p.x = (p.x + p.vx + canvas.width) % canvas.width;
        p.y = (p.y + p.vy + canvas.height) % canvas.height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,190,255,${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const count = { v: 0 };
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline();
    tl.to(count, {
      v: 100,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (numRef.current)
          numRef.current.textContent = Math.round(count.v).toString();
      },
    })
      .to({}, { duration: 0.3 }) // hold at 100%
      .to(contentRef.current, { opacity: 0, duration: 0.4 }, "reveal")
      // fade the black backdrop out → hero shows through (clean, no spotlight)
      .to(backRef.current, { opacity: 0, duration: 1.0, ease: "power2.inOut" }, "reveal+=0.15")
      .add(() => {
        document.body.style.overflow = "";
        setDone(true);
      });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* black backdrop that fades to reveal the hero */}
      <div ref={backRef} className="absolute inset-0 bg-[#050505]" />

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* counter */}
      <div ref={contentRef} className="relative z-10 flex flex-col items-center">
        <div className="flex items-end font-semibold tracking-tight text-white">
          <span ref={numRef} className="text-7xl tabular-nums sm:text-8xl">0</span>
          <span className="mb-2 ml-1 text-2xl text-zinc-400 sm:text-3xl">%</span>
        </div>
        <p className="mt-4 text-xs font-medium uppercase tracking-[0.5em] text-zinc-500">
          Loading
        </p>
      </div>
    </div>
  );
}
