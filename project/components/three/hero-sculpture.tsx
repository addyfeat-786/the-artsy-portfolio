'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

/* -------------------------------------------------------------------------- */
/*                                   STARS                                    */
/* -------------------------------------------------------------------------- */

function Stars() {
  const starsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 800;
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 10 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 14;

      arr[i * 3] = Math.cos(theta) * radius;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = Math.sin(theta) * radius - 8;
    }

    return arr;
  }, []);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.002;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#ffffff"
        size={0.018}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* -------------------------------------------------------------------------- */
/*                               DUST PARTICLES                               */
/* -------------------------------------------------------------------------- */

function DustParticles() {
  const dustRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 180;
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = -2 - Math.random() * 8;
    }

    return arr;
  }, []);

  useFrame((state) => {
    if (!dustRef.current) return;

    dustRef.current.rotation.y =
      state.clock.elapsedTime * 0.004;

    dustRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.1) * 0.08;
  });

  return (
    <points ref={dustRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#ffffff"
        size={0.025}
        transparent
        opacity={0.2}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* -------------------------------------------------------------------------- */
/*                              THREE.JS OVERLAY                              */
/* -------------------------------------------------------------------------- */

function ThreeOverlay() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <Stars />
      <DustParticles />
      <Environment preset="night" />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                                HERO SCENE                                  */
/* -------------------------------------------------------------------------- */

export default function HeroSculpture() {
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">

      {/* BACKGROUND VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* DARK CINEMATIC OVERLAY */}
      <div className="absolute inset-0 bg-black/45" />

      {/* GRADIENT FOR BETTER TEXT VISIBILITY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

      {/* THREE.JS STARS + DUST */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas
          camera={{
            position: [0, 0, 11],
            fov: 42,
          }}
          dpr={[1, 2]}
          gl={{
            alpha: true,
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
          }}
        >
          <ThreeOverlay />
        </Canvas>
      </div>
    </div>
  );
}
