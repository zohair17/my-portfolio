"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// Fullscreen-quad vertex shader — ignores the camera so the plane always fills
// clip space (planeGeometry is [2,2] spanning -1..1).
const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Procedural aurora: value-noise fbm flowing over a matte-black base, tinted
// with electric blue / deep purple / soft magenta / subtle cyan. Kept dark and
// slow so it reads cinematic, not like a wallpaper.
const frag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uRes;

  vec2 hash(vec2 p){
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(dot(hash(i + vec2(0,0)), f - vec2(0,0)),
                   dot(hash(i + vec2(1,0)), f - vec2(1,0)), u.x),
               mix(dot(hash(i + vec2(0,1)), f - vec2(0,1)),
                   dot(hash(i + vec2(1,1)), f - vec2(1,1)), u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.55;
    for (int i = 0; i < 5; i++){ v += a * noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    vec2 p = uv;
    p.x *= uRes.x / max(uRes.y, 1.0);
    float t = uTime * 0.04;

    float f  = fbm(p * 2.0 + vec2(t, t * 0.5));
    f       += 0.5 * fbm(p * 3.2 - vec2(t * 0.7, t * 0.2));
    float g  = fbm(p * 1.6 + vec2(-t * 0.5, t));

    vec3 cBlue    = vec3(0.05, 0.22, 0.85);
    vec3 cPurple  = vec3(0.33, 0.10, 0.72);
    vec3 cMagenta = vec3(0.78, 0.14, 0.55);
    vec3 cCyan    = vec3(0.10, 0.62, 0.78);

    vec3 col = mix(cBlue, cPurple, smoothstep(0.0, 1.0, f));
    col = mix(col, cMagenta, smoothstep(0.35, 1.25, f + uv.y * 0.4));
    col = mix(col, cCyan, 0.18 * smoothstep(0.4, 1.0, g));

    // aurora banding — keeps the black base dominant
    float band = smoothstep(0.15, 0.95, f);
    col *= 0.35 + 0.9 * band;
    col *= band;
    col = col * col * 1.35;           // soft bloom / deepen

    // vignette + fine grain for a luxury cinematic finish
    col *= smoothstep(1.25, 0.35, length(uv - 0.5));
    col += (hash(uv * (uTime + 1.0)).x) * 0.02;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Waves() {
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uRes: { value: new THREE.Vector2(1, 1) } }),
    []
  );
  const ref = useRef();

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uRes.value.set(state.size.width, state.size.height);
  });

  return (
    <mesh ref={ref} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vert}
        fragmentShader={frag}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function WaveBackground({ className = "" }) {
  return (
    <div className={className}>
      <Canvas
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ width: "100%", height: "100%" }}
      >
        <Waves />
      </Canvas>
    </div>
  );
}
