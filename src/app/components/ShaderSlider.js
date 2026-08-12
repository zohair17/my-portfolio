"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { ScreenQuad, useTexture, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// Fullscreen background slider: one shader plane that cross-dissolves between
// project textures with a radial displacement wipe, a subtle breathing zoom and
// mouse parallax — the "cinematic slider running behind" the copy.
const SliderMaterial = shaderMaterial(
  {
    uTexCurrent: null,
    uTexNext: null,
    uProgress: 0,
    uViewport: new THREE.Vector2(1, 1),
    uResCurrent: new THREE.Vector2(1, 1),
    uResNext: new THREE.Vector2(1, 1),
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
  },
  /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,
  /* glsl */ `
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D uTexCurrent;
    uniform sampler2D uTexNext;
    uniform float uProgress;
    uniform vec2 uViewport;
    uniform vec2 uResCurrent;
    uniform vec2 uResNext;
    uniform float uTime;
    uniform vec2 uMouse;

    // background-size: cover, centred, for a fullscreen 0..1 quad
    vec2 coverUv(vec2 uv, vec2 img) {
      vec2 ratio = vec2(
        min((uViewport.x / uViewport.y) / (img.x / img.y), 1.0),
        min((uViewport.y / uViewport.x) / (img.y / img.x), 1.0)
      );
      return vec2(
        uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
        uv.y * ratio.y + (1.0 - ratio.y) * 0.5
      );
    }

    void main() {
      float p = smoothstep(0.0, 1.0, uProgress);
      vec2 dir = vUv - 0.5;
      vec2 par = uMouse * 0.018;                  // mouse parallax
      float zoom = 1.0 + 0.03 * sin(uTime * 0.3); // gentle breathing depth

      vec2 uvC = coverUv(vUv + par, uResCurrent);
      vec2 uvN = coverUv(vUv + par, uResNext);
      uvC = (uvC - 0.5) / zoom + 0.5;
      uvN = (uvN - 0.5) / zoom + 0.5;
      uvC += dir * p * 0.14;                       // push current out
      uvN -= dir * (1.0 - p) * 0.14;               // pull next in

      vec4 c = texture2D(uTexCurrent, uvC);
      vec4 n = texture2D(uTexNext, uvN);

      // radial reveal so the swap sweeps from the centre outward
      float d = length(dir) * 1.4;
      float m = smoothstep(0.0, 1.0, p * 1.3 - d * 0.3 * sin(p * 3.14159));
      m = mix(p, m, 0.6);
      vec4 col = mix(c, n, clamp(m, 0.0, 1.0));

      // darken + vignette so overlaid copy stays legible on any image
      col.rgb *= 0.70;
      col.rgb *= 1.0 - d * 0.28;
      gl_FragColor = vec4(col.rgb, 1.0);
    }
  `
);
extend({ SliderMaterial });

function Scene({ images, active }) {
  const textures = useTexture(images);
  const matRef = useRef(null);
  const { size } = useThree();
  const current = useRef(0); // texture currently shown
  const pending = useRef(0); // texture we're transitioning toward
  const transitioning = useRef(false);
  // Tracked off window rather than R3F's pointer: the canvas is
  // pointer-events-none (so it never blocks the buttons), which would
  // otherwise leave R3F's pointer stuck at zero.
  const mouse = useRef({ x: 0, y: 0 });

  // Seed both slots with the first texture once everything is decoded.
  useEffect(() => {
    const m = matRef.current;
    if (!m) return;
    const t0 = textures[0];
    m.uTexCurrent = t0;
    m.uTexNext = t0;
    m.uResCurrent.set(t0.image.width, t0.image.height);
    m.uResNext.set(t0.image.width, t0.image.height);
  }, [textures]);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // `active` is captured fresh each render; R3F re-subscribes the frame loop.
  useFrame((state, dt) => {
    const m = matRef.current;
    if (!m) return;
    m.uTime += dt;
    m.uViewport.set(size.width, size.height);
    m.uMouse.x += (mouse.current.x - m.uMouse.x) * 0.05;
    m.uMouse.y += (mouse.current.y - m.uMouse.y) * 0.05;

    if (!transitioning.current && active !== current.current) {
      const nt = textures[active];
      m.uTexNext = nt;
      m.uResNext.set(nt.image.width, nt.image.height);
      m.uProgress = 0;
      pending.current = active;
      transitioning.current = true;
    }
    if (transitioning.current) {
      m.uProgress += dt / 1.1; // ~1.1s per transition
      if (m.uProgress >= 1) {
        m.uProgress = 0;
        m.uTexCurrent = m.uTexNext;
        m.uResCurrent.copy(m.uResNext);
        current.current = pending.current;
        transitioning.current = false;
      }
    }
  });

  return (
    <ScreenQuad>
      <sliderMaterial ref={matRef} key={SliderMaterial.key} />
    </ScreenQuad>
  );
}

export default function ShaderSlider({ images, active }) {
  return (
    <Canvas
      linear
      flat
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Suspense fallback={null}>
        <Scene images={images} active={active} />
      </Suspense>
    </Canvas>
  );
}
