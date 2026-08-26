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
    const count = 1200;
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
    if (!starsRef.current) return;

    starsRef.current.rotation.y = state.clock.elapsedTime * 0.002;
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
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* -------------------------------------------------------------------------- */
/*                                DUST PARTICLES                              */
/* -------------------------------------------------------------------------- */

function DustParticles() {
  const dustRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 250;
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

    dustRef.current.rotation.y = state.clock.elapsedTime * 0.004;
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
        opacity={0.25}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* -------------------------------------------------------------------------- */
/*                             MOON SURFACE MATERIAL                          */
/* -------------------------------------------------------------------------- */

function MoonSurface() {
  const moonRef = useRef<THREE.Group>(null);

  /*
    IMPORTANT:
    Geometry bilkul normal sphere hai.
    Isliye moon ki outer shape hamesha perfectly round rahegi.
  */

  useFrame((state) => {
    if (!moonRef.current) return;

    const targetRotationY =
      state.pointer.x * 0.025 +
      state.clock.elapsedTime * 0.004;

    const targetRotationX = -state.pointer.y * 0.018;

    moonRef.current.rotation.y = THREE.MathUtils.lerp(
      moonRef.current.rotation.y,
      targetRotationY,
      0.015
    );

    moonRef.current.rotation.x = THREE.MathUtils.lerp(
      moonRef.current.rotation.x,
      targetRotationX,
      0.015
    );

    moonRef.current.position.y =
      -5.25 +
      Math.sin(state.clock.elapsedTime * 0.12) * 0.035;
  });

  return (
    <group
      ref={moonRef}
      position={[0, -5.25, -3.8]}
    >
      {/* MAIN PERFECTLY ROUND MOON */}
      <mesh>
        <sphereGeometry args={[6.4, 160, 160]} />

        <meshStandardMaterial
          color="#555555"
          roughness={0.98}
          metalness={0}
        />
      </mesh>

      {/* LARGE SUBTLE CRATER SHADOWS */}

      <mesh position={[-1.7, 1.1, 5.75]}>
        <circleGeometry args={[0.62, 64]} />
        <meshBasicMaterial
          color="#1d1d1d"
          transparent
          opacity={0.32}
        />
      </mesh>

      <mesh position={[1.6, 0.65, 6.05]}>
        <circleGeometry args={[0.42, 64]} />
        <meshBasicMaterial
          color="#202020"
          transparent
          opacity={0.3}
        />
      </mesh>

      <mesh position={[0.25, 1.75, 6.05]}>
        <circleGeometry args={[0.28, 64]} />
        <meshBasicMaterial
          color="#171717"
          transparent
          opacity={0.28}
        />
      </mesh>

      <mesh position={[-2.7, -0.4, 5.65]}>
        <circleGeometry args={[0.34, 64]} />
        <meshBasicMaterial
          color="#202020"
          transparent
          opacity={0.28}
        />
      </mesh>

      <mesh position={[2.65, -0.85, 5.55]}>
        <circleGeometry args={[0.55, 64]} />
        <meshBasicMaterial
          color="#1b1b1b"
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* SMALL CRATERS */}

      <mesh position={[-0.9, 0.15, 6.32]}>
        <circleGeometry args={[0.16, 32]} />
        <meshBasicMaterial
          color="#202020"
          transparent
          opacity={0.4}
        />
      </mesh>

      <mesh position={[0.9, -0.35, 6.25]}>
        <circleGeometry args={[0.2, 32]} />
        <meshBasicMaterial
          color="#1c1c1c"
          transparent
          opacity={0.38}
        />
      </mesh>

      <mesh position={[-2.2, 1.8, 5.65]}>
        <circleGeometry args={[0.18, 32]} />
        <meshBasicMaterial
          color="#1c1c1c"
          transparent
          opacity={0.35}
        />
      </mesh>

      <mesh position={[2.15, 1.5, 5.85]}>
        <circleGeometry args={[0.22, 32]} />
        <meshBasicMaterial
          color="#1c1c1c"
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* DARK ATMOSPHERIC EDGE */}
      <mesh scale={1.003}>
        <sphereGeometry args={[6.4, 160, 160]} />

        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  LIGHTING                                  */
/* -------------------------------------------------------------------------- */

function SceneLights() {
  return (
    <>
      {/* Main cinematic light */}
      <directionalLight
        position={[-6, 8, 8]}
        intensity={2.2}
        color="#f5f5f4"
      />

      {/* Soft secondary fill */}
      <directionalLight
        position={[5, 1, 6]}
        intensity={0.35}
        color="#a1a1aa"
      />

      {/* Keep lower moon dark */}
      <directionalLight
        position={[0, -6, 3]}
        intensity={0.05}
        color="#64748b"
      />

      {/* Gentle horizon glow */}
      <pointLight
        position={[0, 4, 5]}
        intensity={0.45}
        distance={18}
        color="#ffffff"
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                                HERO SCENE                                  */
/* -------------------------------------------------------------------------- */

export default function HeroSculpture() {
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">
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
        {/* Transparent / black cinematic world */}
        <color attach="background" args={['#030405']} />

        <fog
          attach="fog"
          args={['#030405', 12, 30]}
        />

        <ambientLight intensity={0.12} />

        <SceneLights />

        <MoonSurface />

        <Stars />

        <DustParticles />

        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
