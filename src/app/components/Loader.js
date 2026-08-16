"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import AuroraBackground from "./AuroraBackground";

// The 3D scene is browser-only and heavy, so it never renders on the server.
const LoaderScene = dynamic(() => import("./LoaderScene"), { ssr: false });

// Module state: it survives client-side navigation but not a real page load.
// That is exactly the line we want — coming Back from a project should not
// replay an intro the visitor has just sat through, while a fresh visit or a
// refresh still gets the full thing.
let played = false;

// How long to wait for WebGL before giving up on the 3D version. The scene is a
// ~230KB chunk, so on a slow connection it can take a moment; past this we run
// the plain counter instead rather than letting the laptop appear late.
const SCENE_TIMEOUT = 5000;

const hasWebGL = () => {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl2") || c.getContext("webgl"))
    );
  } catch {
    return false;
  }
};

// Cinematic loader: a laptop floating in the site aurora running VS Code,
// typing the portfolio out as the counter climbs. At 100% the camera dives into
// the screen, the display blows out white-hot and the portfolio is behind it.
//
// Progress lives in refs, not state — the scene reads them every frame, so
// holding them in state would re-render React 60 times a second for nothing.
export default function Loader() {
  const [done, setDone] = useState(false);
  // Dropped for good once we have decided to run without the 3D scene, so a
  // late-arriving chunk can never pop a laptop into a run already under way.
  const [withScene, setWithScene] = useState(true);

  const progress = useRef(0); // 0 to 1: how much of the file has been typed
  const zooming = useRef(false); // camera dives into the screen once true

  const backRef = useRef(null);
  const numRef = useRef(null);
  const hudRef = useRef(null);
  const flashRef = useRef(null);
  const sceneRef = useRef(null);

  // Nothing runs until the renderer has drawn its first frame, otherwise the
  // counter ticks over an empty background while the WebGL chunk boots and the
  // laptop turns up several per cent late.
  const begin = useRef(null);
  const onSceneReady = () => begin.current && begin.current();

  useEffect(() => {
    if (played) {
      // Torn down on the next tick rather than during render, which would
      // disagree with the server-rendered markup and break hydration. The tick
      // also lets the hero attach its listener before the cue fires.
      const t = setTimeout(() => {
        setDone(true);
        window.dispatchEvent(new Event("loader:done"));
      }, 0);
      return () => clearTimeout(t);
    }

    const count = { v: 0 };
    document.body.style.overflow = "hidden";

    let tl = null;
    let started = false;
    let failsafe = 0;

    const finish = () => {
      document.body.style.overflow = "";
      played = true;
      setDone(true);
      // Cue the hero to start its video now that the overlay is gone.
      window.dispatchEvent(new Event("loader:done"));
    };

    const start = (scene) => {
      if (started) return;
      started = true;
      clearTimeout(failsafe);
      if (!scene) setWithScene(false);

      tl = gsap.timeline({ onComplete: finish });

      // 0 - fade up as one piece the moment there is something to show.
      tl.to(scene ? [backRef.current, sceneRef.current] : [backRef.current], {
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
      })
        .to(hudRef.current, { opacity: 1, duration: 0.4 }, "<0.15")

        // 1 - load: the counter runs, and with it the typing on screen.
        .to(count, {
          v: 100,
          duration: scene ? 2.6 : 1.5,
          ease: "power1.inOut",
          onUpdate: () => {
            progress.current = count.v / 100;
            if (numRef.current)
              numRef.current.textContent = Math.round(count.v).toString();
          },
        });

      if (scene) {
        // 2 - the HUD steps aside and the camera dives at the screen.
        tl.add(() => {
          zooming.current = true;
        })
          .to(hudRef.current, { opacity: 0, y: 12, duration: 0.5 }, "<")

          // 3 - the display blows out, hiding the swap to the real page.
          .to(flashRef.current, { opacity: 1, duration: 0.5, ease: "power2.in" }, "+=0.6")
          .to([sceneRef.current, backRef.current], { opacity: 0, duration: 0.3 }, "<0.35")
          .to(flashRef.current, { opacity: 0, duration: 0.7, ease: "power2.out" });
      } else {
        // No 3D: just clear the way rather than dive through a screen that
        // was never drawn.
        tl.to(
          [hudRef.current, backRef.current],
          { opacity: 0, duration: 0.6, ease: "power2.inOut" },
          "+=0.15"
        );
      }
    };

    begin.current = () => start(true);

    if (!hasWebGL()) {
      // No point waiting on a scene this device cannot draw.
      start(false);
    } else {
      failsafe = setTimeout(() => start(false), SCENE_TIMEOUT);
    }

    return () => {
      clearTimeout(failsafe);
      begin.current = null;
      if (tl) tl.kill();
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

      {withScene && (
        <div ref={sceneRef} style={{ opacity: 0 }} className="absolute inset-0">
          <LoaderScene progress={progress} zooming={zooming} onReady={onSceneReady} />
        </div>
      )}

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
