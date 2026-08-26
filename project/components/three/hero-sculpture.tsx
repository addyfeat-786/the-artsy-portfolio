'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

type MoonProps = {
  onFlash?: () => void;
};

/* -------------------------------------------------------------------------- */
/*                              STAR BACKGROUND                               */
/* -------------------------------------------------------------------------- */

function Stars() {
  const starsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 900;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 8 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (!starsRef.current) return;

    starsRef.current.rotation.y = state.clock.elapsedTime * 0.003;
    starsRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.02) * 0.015;
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
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  );
}

/* -------------------------------------------------------------------------- */
/*                              SMALL DUST                                    */
/* -------------------------------------------------------------------------- */

function DustParticles() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 180;
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }

    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.rotation.y = state.clock.elapsedTime * 0.006;
    ref.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
  });

  return (
    <points ref={ref}>
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
        opacity={0.28}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* -------------------------------------------------------------------------- */
/*                              PROCEDURAL MOON                               */
/* -------------------------------------------------------------------------- */

function createMoonGeometry() {
  const geometry = new THREE.SphereGeometry(5.4, 180, 120);

  const position = geometry.attributes.position;

  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const y = position.getY(i);
    const z = position.getZ(i);

    const length = Math.sqrt(x * x + y * y + z * z);

    const nx = x / length;
    const ny = y / length;
    const nz = z / length;

    /*
      Multiple mathematical waves create rough lunar terrain.
      This avoids needing an external moon texture.
    */

    const large =
      Math.sin(nx * 3.2 + ny * 1.7) *
      Math.cos(nz * 2.8) *
      0.1;

    const medium =
      Math.sin(nx * 9.0 + nz * 7.0) *
      Math.cos(ny * 8.0) *
      0.035;

    const fine =
      Math.sin(nx * 25.0 + ny * 21.0 + nz * 18.0) *
      0.018;

    const surfaceNoise = large + medium + fine;

    const scale = 1 + surfaceNoise;

    position.setXYZ(
      i,
      x * scale,
      y * scale,
      z * scale
    );
  }

  position.needsUpdate = true;
  geometry.computeVertexNormals();

  return geometry;
}

function Moon() {
  const moonRef = useRef<THREE.Group>(null);

  const geometry = useMemo(() => createMoonGeometry(), []);

  useFrame((state, delta) => {
    if (!moonRef.current) return;

    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    /* Very slow cinematic movement */
    moonRef.current.rotation.y += delta * 0.012;

    /* Subtle mouse parallax */
    moonRef.current.rotation.x = THREE.MathUtils.lerp(
      moonRef.current.rotation.x,
      -mouseY * 0.08,
      0.025
    );

    moonRef.current.rotation.z = THREE.MathUtils.lerp(
      moonRef.current.rotation.z,
      mouseX * 0.025,
      0.025
    );

    /* Gentle floating */
    moonRef.current.position.y =
      -5.2 + Math.sin(state.clock.elapsedTime * 0.18) * 0.08;
  });

  return (
    <group ref={moonRef} position={[0, -5.2, -3.5]}>
      {/* Main moon */}
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="#5a5a5a"
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* Slight dark atmospheric shell */}
      <mesh scale={1.006} geometry={geometry}>
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*                           CINEMATIC LIGHT RIM                              */
/* -------------------------------------------------------------------------- */

function MoonLighting() {
  return (
    <>
      {/* Main light from upper left */}
      <directionalLight
        position={[-6, 7, 5]}
        intensity={2.4}
        color="#ffffff"
      />

      {/* Soft front fill */}
      <directionalLight
        position={[4, 2, 6]}
        intensity={0.28}
        color="#9ca3af"
      />

      {/* Dark side */}
      <directionalLight
        position={[5, -3, -5]}
        intensity={0.08}
        color="#334155"
      />

      {/* Horizon glow */}
      <pointLight
        position={[0, 3, 4]}
        intensity={0.45}
        distance={14}
        color="#d6d3d1"
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                              MAIN COMPONENT                                */
/* -------------------------------------------------------------------------- */

export default function HeroSculpture({ onFlash }: MoonProps) {
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
        <color attach="background" args={['#030405']} />

        <fog attach="fog" args={['#030405', 12, 28]} />

        <ambientLight intensity={0.18} />

        <MoonLighting />

        <Moon />

        <Stars />

        <DustParticles />

        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
