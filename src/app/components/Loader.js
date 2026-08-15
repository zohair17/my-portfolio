"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CLOSED = "/asset/Laptop%20Loader.webp";
const OPEN = "/asset/Laptop%20Loader%201.webp";

// Where the screen sits inside the open-laptop shot, as a share of the image
// box. The zoom uses it as the transform origin so the push lands dead centre
// on the display instead of the middle of the whole laptop.
const SCREEN_ORIGIN = "50% 28%";

// Cinematic loader: a closed laptop rolls a full 360° in its own plane as the counter climbs
// to 100%, then the lid opens and the camera pushes straight into the screen
// until it fills the viewport — and the hero is sitting there behind it.
export default function Loader() {
  const [done, setDone] = useState(false);
  const backRef = useRef(null);
  const numRef = useRef(null);
  const contentRef = useRef(null);
  const canvasRef = useRef(null);
  const spinRef = useRef(null);
  const closedRef = useRef(null);
  const openRef = useRef(null);
  const stageRef = useRef(null);
  const glowRef = useRef(null);
  const sheenRef = useRef(null);
  const shadowRef = useRef(null);

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

    const finish = () => {
      document.body.style.overflow = "";
      setDone(true);
      // Cue the hero to start its video now that the overlay is gone.
      window.dispatchEvent(new Event("loader:done"));
    };

    const tl = gsap.timeline({ onComplete: finish });

    // 1 — the closed laptop turns a full circle while the counter runs up.
    tl.fromTo(
      spinRef.current,
      { rotateZ: 0 },
      {
        rotateZ: 360,
        duration: 2.6,
        ease: "power1.inOut",
        // A roll, not a flip: the laptop stays facing us and turns a full circle
        // in its own plane — the bottom edge swings up and over to the top and
        // back to where it started. The sheen sweeps round with it so the metal
        // catches the light from a fixed source while the body keeps turning.
        onUpdate: () => {
          const deg = gsap.getProperty(spinRef.current, "rotateZ") || 0;
          const rad = deg * (Math.PI / 180);
          if (sheenRef.current) {
            gsap.set(sheenRef.current, {
              opacity: 0.25 + Math.abs(Math.cos(rad)) * 0.6,
              backgroundPositionX: ((1 - Math.cos(rad)) / 2) * 100 + "%",
            });
          }
          if (shadowRef.current) {
            gsap.set(shadowRef.current, {
              scaleX: 0.7 + Math.abs(Math.cos(rad)) * 0.3,
              opacity: 0.3 + Math.abs(Math.cos(rad)) * 0.35,
            });
          }
        },
      },
      0
    )
      .to(
        count,
        {
          v: 100,
          duration: 2.4,
          ease: "power1.inOut",
          onUpdate: () => {
            if (numRef.current)
              numRef.current.textContent = Math.round(count.v).toString();
          },
        },
        0
      )

      // 2 — at 100% the lid opens: the closed shell gives way to the open one,
      // which tips up from the hinge as the display lights up.
      .to(closedRef.current, { opacity: 0, duration: 0.35 }, "open")
      .fromTo(
        openRef.current,
        { opacity: 0, rotateX: -72, scale: 0.94 },
        { opacity: 1, rotateX: 0, scale: 1, duration: 0.85, ease: "power3.out" },
        "open"
      )
      .fromTo(
        glowRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" },
        "open+=0.35"
      )

      // 3 — push into the screen until it fills the frame, then hand over.
      .to(
        stageRef.current,
        { scale: 5.2, duration: 1.35, ease: "power2.in" },
        "zoom"
      )
      .to(contentRef.current, { opacity: 0, duration: 0.4 }, "zoom")
      .to(
        [stageRef.current, backRef.current, canvasRef.current],
        { opacity: 0, duration: 0.55, ease: "power2.inOut" },
        "zoom+=0.8"
      );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      {/* black backdrop that fades to reveal the hero */}
      <div ref={backRef} className="absolute inset-0 bg-[#050505]" />

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* the laptop — zoomed as one unit, origin fixed on the screen */}
      <div
        ref={stageRef}
        style={{ transformOrigin: SCREEN_ORIGIN, perspective: "1400px" }}
        className="absolute z-10 w-[56vw] max-w-md sm:w-[40vw]"
      >
        {/* closed shell — a real slab, not a flat card: the lid sits in front,
            a darkened copy sits behind it as the body, and the whole thing is
            tilted so the roll reads as an object with thickness. */}
        <div ref={closedRef} className="[transform-style:preserve-3d]">
          <div
            style={{ transform: "rotateX(-12deg)" }}
            className="[transform-style:preserve-3d]"
          >
            <div ref={spinRef} className="relative [transform-style:preserve-3d]">
              {/* lid, facing out */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={CLOSED}
                alt=""
                style={{ transform: "translateZ(9px)" }}
                className="block w-full"
              />
              {/* the body behind the lid — its darkened edge is what makes the
                  roll read as an object with thickness, not a flat picture */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={CLOSED}
                alt=""
                style={{ filter: "brightness(0.18)", transform: "translateZ(0px)" }}
                className="absolute inset-0 block w-full"
              />
              {/* specular sheen that slides across the lid as it turns */}
              <div
                ref={sheenRef}
                style={{ transform: "translateZ(10px)", backgroundSize: "260% 100%" }}
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_35%,rgba(255,255,255,0.35)_50%,transparent_65%)]"
              />
            </div>
          </div>

          {/* contact shadow on the floor, squashing as the lid turns edge-on */}
          <div
            ref={shadowRef}
            className="pointer-events-none absolute left-1/2 top-[104%] h-3 w-[70%] -translate-x-1/2 rounded-[50%] bg-black/70 blur-md"
          />
        </div>

        {/* open laptop, revealed at 100% */}
        <div
          ref={openRef}
          style={{ transformOrigin: "50% 55%", opacity: 0 }}
          className="absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={OPEN} alt="" className="block w-full" />
          {/* display backlight coming up */}
          <div
            ref={glowRef}
            style={{ opacity: 0 }}
            className="pointer-events-none absolute left-[18.7%] top-[6%] h-[44%] w-[62.9%] bg-[radial-gradient(ellipse_at_center,rgba(124,150,255,0.55),rgba(40,60,140,0.25)_60%,transparent_100%)] blur-[2px]"
          />
        </div>
      </div>

      {/* counter */}
      <div
        ref={contentRef}
        className="absolute bottom-[12vh] z-20 flex flex-col items-center"
      >
        <div className="flex items-end font-semibold tracking-tight text-white">
          <span ref={numRef} className="text-6xl tabular-nums sm:text-7xl">0</span>
          <span className="mb-2 ml-1 text-2xl text-zinc-400 sm:text-3xl">%</span>
        </div>
        <p className="mt-3 text-xs font-medium uppercase tracking-[0.5em] text-zinc-500">
          Loading
        </p>
      </div>
    </div>
  );
}
