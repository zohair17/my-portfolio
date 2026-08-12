"use client";

import { useEffect, useRef, useState } from "react";
import AuroraBackground from "./AuroraBackground";

// The real site aurora, painted inside a single "case" panel using the exact
// same recipe as the global backdrop in layout.js (AuroraBackground at
// opacity-70 / blur-30 over a black/40 dim). The panel keeps its own opaque
// `#0a0a0a` base underneath, so the panel stays fully opaque (the pin-and-stack
// scroll never ghosts the panel behind) while looking identical to the fixed
// wave background — not a flat colour or a CSS approximation.
//
// Each panel gets its own instance, but an IntersectionObserver pauses the ones
// that are off-screen (with a generous margin so they wake before they scroll
// in), so only the one or two visible panels ever actually render.
export default function PanelAurora() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "40% 0px 40% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <AuroraBackground
        paused={!visible}
        className="absolute inset-0 h-full w-full opacity-70 [filter:blur(30px)]"
      />
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}
