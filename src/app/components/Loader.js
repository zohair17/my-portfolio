"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import AuroraBackground from "./AuroraBackground";

// The 3D scene is browser-only and heavy, so it never renders on the server.
const LoaderScene = dynamic(() => import("./LoaderScene"), { ssr: false });

// Cinematic loader: a laptop floating in the site aurora running VS Code,
// typing the portfolio out as the counter climbs. At 100% the camera dives into the screen, the
// display blows out white-hot and the portfolio is waiting behind it.
//
// Progress lives in refs, not state — the scene reads them every frame, so
// holding them in state would re-render React 60 times a second for nothing.
export default function Loader() {
  const [done, setDone] = useState(false);
  const progress = useRef(0); // 0 to 1: drives how much code has been typed
  const zooming = useRef(false); // camera dives into the screen once true

  const backRef = useRef(null);
  const numRef = useRef(null);
  const hudRef = useRef(null);
  const flashRef = useRef(null);
  const sceneRef = useRef(null);

  // Nothing runs until the renderer has drawn its first frame. Otherwise the
  // WebGL chunk boots for a beat and the visitor watches a bare background with
  // the counter already ticking — the scene then pops in a couple of per cent
  // late. Held here, the whole loader appears at once, fully formed.
  const begin = useRef(null);
  const onSceneReady = () => begin.current && begin.current();

  useEffect(() => {
    const count = { v: 0 };
    document.body.style.overflow = "hidden";

    const finish = () => {
      document.body.style.overflow = "";
      setDone(true);
      // Cue the hero to start its video now that the overlay is gone.
      window.dispatchEvent(new Event("loader:done"));
    };

    const tl = gsap.timeline({ paused: true, onComplete: finish });

    // 0 - fade the whole thing up as one piece the moment it can be drawn.
    tl.to([backRef.current, sceneRef.current], {
      opacity: 1,
      duration: 0.45,
      ease: "power2.out",
    })
      .to(hudRef.current, { opacity: 1, duration: 0.4 }, "<0.15")

      // 1 - load: the counter runs and the editor types itself out with it.
      .to(count, {
        v: 100,
        duration: 2.6,
        ease: "power1.inOut",
        onUpdate: () => {
          progress.current = count.v / 100;
          if (numRef.current)
            numRef.current.textContent = Math.round(count.v).toString();
        },
      })

      // 2 - at 100% the HUD steps aside and the camera dives at the screen.
      .add(() => {
        zooming.current = true;
      })
      .to(hudRef.current, { opacity: 0, y: 12, duration: 0.5 }, "<")

      // 3 - the display blows out, covering the swap to the real page.
      .to(flashRef.current, { opacity: 1, duration: 0.5, ease: "power2.in" }, "+=0.6")
      .to([sceneRef.current, backRef.current], { opacity: 0, duration: 0.3 }, "<0.35")
      .to(flashRef.current, { opacity: 0, duration: 0.7, ease: "power2.out" });

    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      tl.play();
    };
    begin.current = start;
    // Safety net: if WebGL never comes up, run anyway rather than hang on black.
    const failsafe = setTimeout(start, 2500);

    return () => {
      clearTimeout(failsafe);
      begin.current = null;
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-[#07070d]">
      {/* The same aurora waves the rest of the application runs on, so the
          loader reads as the first frame of the site rather than a separate
          screen in front of it. The blur is lighter than the 30px used
          elsewhere: filtering a full-screen canvas that hard while WebGL
          renders beside it is what cost the loader its smoothness. */}
      <div ref={backRef} style={{ opacity: 0 }} className="absolute inset-0">
        <AuroraBackground className="absolute inset-0 h-full w-full opacity-60 [filter:blur(18px)]" />
        {/* knocked back so the machine stays the subject */}
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div ref={sceneRef} style={{ opacity: 0 }} className="absolute inset-0">
        <LoaderScene progress={progress} zooming={zooming} onReady={onSceneReady} />
      </div>

      {/* white-hot screen at the end of the dive */}
      <div
        ref={flashRef}
        style={{ opacity: 0 }}
        className="pointer-events-none absolute inset-0 bg-white"
      />

      {/* counter */}
      <div
        ref={hudRef}
        style={{ opacity: 0 }}
        className="absolute bottom-[9vh] left-0 right-0 z-10 flex flex-col items-center"
      >
        <div className="flex items-end font-semibold tracking-tight text-white">
          <span ref={numRef} className="text-6xl tabular-nums sm:text-7xl">0</span>
          <span className="mb-2 ml-1 text-2xl text-zinc-400 sm:text-3xl">%</span>
        </div>
        <p className="mt-3 text-xs font-medium uppercase tracking-[0.5em] text-zinc-400">
          Zohair Ahmed
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-600">
          Building portfolio
        </p>
      </div>
    </div>
  );
}
