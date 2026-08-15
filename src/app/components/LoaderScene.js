"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import * as THREE from "three";

// A laptop floating in the site aurora with VS Code actually running on it: the editor is
// a live <canvas> texture that types the portfolio source out character by
// character in step with the loading progress. At 100% the camera pushes
// through the bezel until the display fills the frame and hands over.
//
// Everything is primitives with physically-shaded materials — no model files to
// fetch, so the loader never waits on an asset of its own.

// ── the file being "written" on screen, tokenised for syntax colour ──────────
const C = {
  key: "#c586c0", // import / export / const
  fn: "#dcdcaa",
  type: "#4ec9b0",
  var: "#9cdcfe",
  str: "#ce9178",
  num: "#b5cea8",
  com: "#6a9955",
  txt: "#d4d4d4",
};

const LINES = [
  [["import", C.key], [" Hero ", C.var], ["from", C.key], [" './Hero'", C.str], [";", C.txt]],
  [["import", C.key], [" { motion } ", C.var], ["from", C.key], [" 'framer-motion'", C.str], [";", C.txt]],
  [],
  [["// portfolio — zohair ahmed", C.com]],
  [["export default function", C.key], [" Portfolio", C.fn], ["() {", C.txt]],
  [["  const", C.key], [" [ready, setReady] ", C.var], ["=", C.txt], [" useState", C.fn], ["(", C.txt], ["false", C.num], [");", C.txt]],
  [],
  [["  useEffect", C.fn], ["(() => {", C.txt]],
  [["    setReady", C.fn], ["(", C.txt], ["true", C.num], [");", C.txt]],
  [["  }, []);", C.txt]],
  [],
  [["  return", C.key], [" (", C.txt]],
  [["    <", C.txt], ["main", C.type], [" className", C.var], ["=", C.txt], ["\"relative\"", C.str], [">", C.txt]],
  [["      <", C.txt], ["Hero", C.type], [" ready", C.var], ["={ready} />", C.txt]],
  [["    </", C.txt], ["main", C.type], [">", C.txt]],
  [["  );", C.txt]],
  [["}", C.txt]],
];

const TOTAL_CHARS = LINES.reduce(
  (n, l) => n + l.reduce((m, [t]) => m + t.length, 0) + 1,
  0
);

function makeEditorTexture() {
  const c = document.createElement("canvas");
  c.width = 1280;
  c.height = 800;
  const ctx = c.getContext("2d");
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;

  const FONT = '500 21px ui-monospace, "SF Mono", Menlo, Consolas, monospace';
  const CH = 12.6; // advance width of the monospace cell
  const LH = 34;
  const X0 = 300;
  const Y0 = 96;

  const draw = (revealed, caret) => {
    ctx.fillStyle = "#1e1e1e";
    ctx.fillRect(0, 0, 1280, 800);

    // title bar
    ctx.fillStyle = "#323233";
    ctx.fillRect(0, 0, 1280, 38);
    ["#ff5f57", "#febc2e", "#28c840"].forEach((col, i) => {
      ctx.beginPath();
      ctx.arc(26 + i * 24, 19, 7.5, 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.fill();
    });
    ctx.font = '500 16px ui-sans-serif, system-ui, sans-serif';
    ctx.fillStyle = "#cccccc";
    ctx.fillText("page.jsx — my-portfolio", 470, 25);

    // activity bar
    ctx.fillStyle = "#333333";
    ctx.fillRect(0, 38, 56, 736);
    for (let i = 0; i < 5; i++) {
      ctx.fillStyle = i === 0 ? "#ffffff" : "#858585";
      ctx.globalAlpha = i === 0 ? 1 : 0.7;
      ctx.fillRect(20, 70 + i * 50, 17, 17);
    }
    ctx.globalAlpha = 1;

    // explorer
    ctx.fillStyle = "#252526";
    ctx.fillRect(56, 38, 188, 736);
    ctx.font = '600 13px ui-sans-serif, system-ui, sans-serif';
    ctx.fillStyle = "#bbbbbb";
    ctx.fillText("EXPLORER", 74, 62);
    const files = [
      "src", "app", "page.jsx", "Hero.jsx", "Loader.jsx",
      "Projects.jsx", "globals.css", "public", "package.json",
    ];
    ctx.font = '14px ui-sans-serif, system-ui, sans-serif';
    files.forEach((f, i) => {
      const active = f === "page.jsx";
      if (active) {
        ctx.fillStyle = "#37373d";
        ctx.fillRect(56, 78 + i * 28, 188, 26);
      }
      ctx.fillStyle = active ? "#ffffff" : "#a9a9a9";
      ctx.fillText(f, 78 + (i > 1 && i < 7 ? 12 : 0), 96 + i * 28);
    });

    // open-file tab
    ctx.fillStyle = "#2d2d2d";
    ctx.fillRect(244, 38, 1036, 36);
    ctx.fillStyle = "#1e1e1e";
    ctx.fillRect(244, 38, 170, 36);
    ctx.fillStyle = "#4ec9b0";
    ctx.font = '14px ui-sans-serif, system-ui, sans-serif';
    ctx.fillText("page.jsx", 268, 61);
    ctx.fillStyle = "#007acc";
    ctx.fillRect(244, 36, 170, 2);

    // the code, typed out
    ctx.font = FONT;
    ctx.textBaseline = "alphabetic";
    let left = revealed;
    let caretXY = null;

    for (let i = 0; i < LINES.length && left > 0; i++) {
      const y = Y0 + i * LH;

      ctx.fillStyle = "#6e7681"; // gutter
      ctx.font = '500 17px ui-monospace, Menlo, Consolas, monospace';
      ctx.fillText(String(i + 1).padStart(2, " "), 258, y);
      ctx.font = FONT;

      let x = X0;
      for (const [text, colour] of LINES[i]) {
        if (left <= 0) break;
        const shown = text.slice(0, left);
        ctx.fillStyle = colour;
        ctx.fillText(shown, x, y);
        x += shown.length * CH;
        left -= text.length;
      }
      caretXY = [x, y];
      left -= 1; // the newline itself costs a tick
    }

    if (caret && caretXY) {
      ctx.fillStyle = "#aeafad";
      ctx.fillRect(caretXY[0] + 1, caretXY[1] - 17, 2, 23);
    }

    // minimap
    ctx.globalAlpha = 0.5;
    let mLeft = revealed;
    for (let i = 0; i < LINES.length && mLeft > 0; i++) {
      let mx = 1190;
      for (const [text, colour] of LINES[i]) {
        if (mLeft <= 0) break;
        const w = Math.min(text.length, mLeft) * 1.6;
        ctx.fillStyle = colour;
        ctx.fillRect(mx, 96 + i * 9, w, 3);
        mx += w + 2;
        mLeft -= text.length;
      }
      mLeft -= 1;
    }
    ctx.globalAlpha = 1;

    // status bar
    ctx.fillStyle = "#007acc";
    ctx.fillRect(0, 774, 1280, 26);
    ctx.font = '500 14px ui-sans-serif, system-ui, sans-serif';
    ctx.fillStyle = "#ffffff";
    ctx.fillText("main*", 16, 792);
    ctx.fillText("0 errors, 0 warnings", 90, 792);
    ctx.fillText("Ln " + LINES.length + ", Col 1     JavaScript React     UTF-8", 800, 792);

    tex.needsUpdate = true;
  };

  draw(0, false);
  return { tex, draw };
}

// 70 keycaps in one instanced draw.
function Keys() {
  const ref = useRef(null);
  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    let i = 0;
    for (let r = 0; r < 5; r++) {
      for (let k = 0; k < 14; k++) {
        m.setPosition(-0.266 + k * 0.041, 0.0295, -0.135 + r * 0.05);
        mesh.setMatrixAt(i++, m);
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, 70]}>
      <boxGeometry args={[0.034, 0.004, 0.04]} />
      <meshStandardMaterial color="#26282d" roughness={0.7} />
    </instancedMesh>
  );
}

function Laptop({ progress }) {
  const { tex, draw } = useMemo(() => makeEditorTexture(), []);
  const last = useRef({ chars: -1, caret: false, t: 0 });
  const body = useRef(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Weightless: with no desk under it the machine drifts, which is what makes
    // it belong in the aurora rather than look like it lost its table.
    if (body.current) {
      body.current.position.y = 0.775 + Math.sin(t * 0.6) * 0.022;
      body.current.rotation.z = Math.sin(t * 0.42) * 0.018;
      body.current.rotation.x = Math.sin(t * 0.33) * 0.012;
    }
    // Repainting a 1280x800 canvas and re-uploading it every frame is what made
    // the loader stutter. Twelve times a second still reads as live typing and
    // leaves the GPU free for the actual scene.
    if (t - last.current.t < 0.085) return;
    const chars = Math.round(progress.current * TOTAL_CHARS);
    const caret = Math.floor(t * 1.9) % 2 === 0;
    if (chars !== last.current.chars || caret !== last.current.caret) {
      last.current = { chars, caret, t };
      draw(chars, caret);
    } else {
      last.current.t = t;
    }
  });

  useEffect(() => () => tex.dispose(), [tex]);

  // Aluminium body: rough metal reads far more like a real machine than a flat
  // colour, and the screen is unlit so the editor stays its own light source.
  const shell = { color: "#b3b7bd", metalness: 0.85, roughness: 0.38 };

  return (
    <group ref={body} position={[0, 0.775, -0.78]}>
      {/* base */}
      <mesh position={[0, 0.013, 0]}>
        <boxGeometry args={[0.7, 0.026, 0.47]} />
        <meshStandardMaterial {...shell} />
      </mesh>
      {/* keyboard well */}
      <mesh position={[0, 0.0265, -0.03]}>
        <boxGeometry args={[0.58, 0.003, 0.29]} />
        <meshStandardMaterial color="#1c1e22" roughness={0.85} />
      </mesh>
      {/* keys — one instanced mesh, so seventy keycaps cost a single draw
          call instead of seventy */}
      <Keys />
      {/* trackpad */}
      <mesh position={[0, 0.0275, 0.135]}>
        <boxGeometry args={[0.2, 0.002, 0.13]} />
        <meshStandardMaterial color="#9fa3a9" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* hinge */}
      <mesh position={[0, 0.03, -0.225]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.012, 0.6, 16]} />
        <meshStandardMaterial color="#7d8188" metalness={0.9} roughness={0.35} />
      </mesh>

      {/* lid */}
      <group position={[0, 0.03, -0.225]} rotation={[-0.4, 0, 0]}>
        <mesh position={[0, 0.225, -0.008]}>
          <boxGeometry args={[0.7, 0.45, 0.014]} />
          <meshStandardMaterial {...shell} />
        </mesh>
        {/* black bezel */}
        <mesh position={[0, 0.225, 0.0005]}>
          <planeGeometry args={[0.68, 0.43]} />
          <meshStandardMaterial color="#0a0a0c" roughness={0.5} />
        </mesh>
        {/* webcam */}
        <mesh position={[0, 0.432, 0.002]}>
          <circleGeometry args={[0.004, 12]} />
          <meshStandardMaterial color="#1b1d22" roughness={0.2} metalness={0.5} />
        </mesh>
        {/* the editor */}
        <mesh position={[0, 0.223, 0.0015]}>
          <planeGeometry args={[0.645, 0.4]} />
          <meshBasicMaterial map={tex} toneMapped={false} />
        </mesh>
        {/* the display throwing its light back into the room — the strongest
            source in the scene, which is what makes the shot feel lit by it */}
        <pointLight position={[0, 0.22, 0.18]} intensity={3.2} distance={2.6} decay={2} color="#9db8ff" />
        <pointLight position={[0, 0.1, 0.5]} intensity={1.6} distance={1.8} decay={2} color="#7f9dff" />
      </group>
    </group>
  );
}

// Fires once the renderer has actually drawn a frame, so the loader can hold
// everything hidden until there is something to show rather than flashing a
// bare background while the WebGL chunk boots.
function FirstFrame({ onReady }) {
  const fired = useRef(false);
  useFrame(() => {
    if (fired.current) return;
    fired.current = true;
    onReady();
  });
  return null;
}

// Where the display sits in world space, and the direction it faces. Both
// camera framings are derived from these and from the live viewport, so the
// shot composes the same on a phone, a tablet and a 27-inch monitor instead of
// being cropped by whichever axis is short.
const SCREEN = new THREE.Vector3(0, 1.01, -1.09);
const NORMAL = new THREE.Vector3(0, Math.sin(0.4), Math.cos(0.4)).normalize();
const SCREEN_W = 0.7;
const SCREEN_H = 0.46;

// Idle drift while loading, then straight through the bezel at 100%.
function Rig({ zooming }) {
  const { camera, size } = useThree();
  const look = useRef(new THREE.Vector3(0, 1.01, -1.05));
  const pos = useRef(new THREE.Vector3());

  // Distance at which a w-by-h target just fills the frame, taking whichever
  // axis runs out first. A margin above 1 pulls back to leave room around it.
  const fit = (w, h, margin) => {
    const aspect = size.width / Math.max(size.height, 1);
    const half = Math.tan((camera.fov * Math.PI) / 360);
    return Math.max(h / 2 / half, w / 2 / (half * aspect)) * margin;
  };

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;

    if (zooming.current) {
      // right up against the glass, overfilled so no bezel is left in shot
      pos.current
        .copy(NORMAL)
        .multiplyScalar(fit(SCREEN_W, SCREEN_H, 0.82))
        .add(SCREEN);
    } else {
      // the desk in full, with a slow handheld drift over it
      pos.current
        .copy(NORMAL)
        .multiplyScalar(fit(SCREEN_W, SCREEN_H, 2.5))
        .add(SCREEN);
      pos.current.x += 0.16 + Math.sin(t * 0.28) * 0.09;
      pos.current.y += 0.2 + Math.sin(t * 0.4) * 0.03;
    }

    easing.damp3(camera.position, pos.current, zooming.current ? 0.55 : 1.1, dt);
    easing.damp3(look.current, SCREEN, 0.6, dt);
    camera.lookAt(look.current);
  });

  return null;
}

export default function LoaderScene({ progress, zooming, onReady }) {
  return (
    <Canvas
      dpr={[1, 1.35]}
      camera={{ position: [0.42, 1.62, 0.5], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      {/* a dim room lit mostly by the screen — that contrast is what makes it
          read as a photograph of a desk rather than an illustration */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[2.2, 3.4, 1.6]} intensity={1.15} color="#ffe9d2" />
      {/* the room picks up the same aurora palette as the site */}
      <pointLight position={[-2.4, 1.9, -0.6]} intensity={7} color="#7c5bff" distance={7} />
      <pointLight position={[2.4, 1.6, -1.2]} intensity={5} color="#ff2d95" distance={7} />

      <Laptop progress={progress} />
      <Rig zooming={zooming} />
      <FirstFrame onReady={onReady} />
    </Canvas>
  );
}
