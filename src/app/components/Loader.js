"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Ultra-premium cinematic loader: black screen → GSAP % counter → 0.3s hold →
// a blue-purple light blooms and expands like a lens opening while the black
// backdrop fades, revealing the hero as one continuous, cut-free motion.
export default function Loader() {
  const [done, setDone] = useState(false);
  const rootRef = useRef(null);
  const backRef = useRef(null);
  const numRef = useRef(null);
  const contentRef = useRef(null);
  const lightRef = useRef(null);
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
      // bloom the light in, then expand it like a lens opening
      .fromTo(
        lightRef.current,
        { scale: 0.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" },
        "reveal"
      )
      .to(
        lightRef.current,
        { scale: 14, duration: 1.2, ease: "power3.inOut" },
        ">-0.05"
      )
      // fade the black backdrop out as the light expands → hero shows through
      .to(backRef.current, { opacity: 0, duration: 1.0, ease: "power2.inOut" }, "<0.15")
      .to(lightRef.current, { opacity: 0, duration: 0.5, ease: "power2.in" }, "<0.5")
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

      {/* expanding blue-purple bloom (blurred edges, chromatic offset, glow) */}
      <div
        ref={lightRef}
        className="pointer-events-none absolute h-40 w-40 rounded-full opacity-0 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle at 48% 46%, rgba(120,180,255,0.95) 0%, rgba(90,90,255,0.8) 28%, rgba(150,60,230,0.6) 52%, rgba(60,20,120,0.15) 75%, transparent 82%)",
          filter: "blur(14px)",
          boxShadow:
            "0 0 120px 40px rgba(90,110,255,0.5), 0 0 220px 90px rgba(150,60,230,0.35)",
        }}
      />

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
