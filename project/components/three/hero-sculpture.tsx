'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, RoundedBox } from '@react-three/drei';
import { useRef, Suspense, useMemo, useCallback } from 'react';
import {
  type Group,
  type Mesh,
  type MeshStandardMaterial,
  type PointLight,
  type Points,
  MathUtils,
  AdditiveBlending,
  DoubleSide,
  Color,
} from 'three';

/* ----------------------------- Dust particles ----------------------------- */
function DustParticles() {
  const ref = useRef<Points>(null);
  const count = 200;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.02;
    ref.current.position.y = Math.sin(performance.now() * 0.0002) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#ffffff"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}

/* --------------------------- Volumetric light shaft ------------------------ */
function VolumetricShaft() {
  return (
    <mesh position={[0.4, 3.2, -0.5]} rotation={[Math.PI - 0.15, 0, 0.1]}>
      <coneGeometry args={[1.6, 6, 32, 1, true]} />
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.035}
        side={DoubleSide}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ------------------------------ Camera sculpture --------------------------- */
function CameraSculpture({ onFlash }: { onFlash: () => void }) {
  const group = useRef<Group>(null);
  const shutter = useRef<Mesh>(null);
  const flashLight = useRef<PointLight>(null);
  const lensMat = useRef<MeshStandardMaterial>(null);
  const bodyMat = useRef<MeshStandardMaterial>(null);
  const { pointer, clock } = useThree();

  const hovered = useRef(false);
  const canFlash = useRef(true);
  const flashStart = useRef(-10);

  const triggerFlash = useCallback(() => {
    if (!canFlash.current) return;
    canFlash.current = false;
    flashStart.current = clock.elapsedTime;
    onFlash();
  }, [clock, onFlash]);

  useFrame((_, delta) => {
    if (!group.current) return;
    // slow auto-rotation
    group.current.rotation.y += delta * 0.08;
    // subtle mouse parallax
    const targetX = pointer.y * 0.18;
    const targetZ = pointer.x * 0.18;
    group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, targetX, 0.04);
    group.current.rotation.z = MathUtils.lerp(group.current.rotation.z, targetZ, 0.04);

    // shutter depress while hovered
    if (shutter.current) {
      const targetY = hovered.current ? 0.755 : 0.78;
      shutter.current.position.y = MathUtils.lerp(shutter.current.position.y, targetY, 0.2);
    }

    // flash intensity envelope: sharp rise, smooth decay
    const t = clock.elapsedTime - flashStart.current;
    let f = 0;
    if (t >= 0 && t < 0.5) {
      f = t < 0.04 ? t / 0.04 : 1 - (t - 0.04) / 0.46;
      f = MathUtils.clamp(f, 0, 1);
    }
    if (flashLight.current) flashLight.current.intensity = f * 9;
    if (lensMat.current) lensMat.current.emissiveIntensity = f * 4;
    if (bodyMat.current) bodyMat.current.envMapIntensity = 1.4 + f * 2.5;
  });

  return (
    <group ref={group}>
      <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.45}>
        <group>
          {/* Chrome frame (edges) — slightly larger than glass body */}
          <RoundedBox args={[2.25, 1.5, 0.82]} radius={0.12} smoothness={8} castShadow>
            <meshStandardMaterial
              color="#e6e6e6"
              metalness={1}
              roughness={0.06}
              envMapIntensity={1.6}
            />
          </RoundedBox>

          {/* Smoked glass body — inset to reveal chrome rim */}
          <RoundedBox
            args={[2.12, 1.38, 0.86]}
            radius={0.1}
            smoothness={8}
            position={[0, 0, 0.02]}
            castShadow
          >
            <meshPhysicalMaterial
              color="#0a0a0a"
              metalness={0}
              roughness={0.12}
              transmission={0.4}
              thickness={0.5}
              ior={1.5}
              clearcoat={1}
              clearcoatRoughness={0.08}
              transparent
              opacity={0.92}
              envMapIntensity={1.4}
            />
          </RoundedBox>

          {/* Right-hand grip bump */}
          <RoundedBox
            args={[0.34, 1.38, 0.7]}
            radius={0.1}
            smoothness={6}
            position={[1.02, 0, 0.02]}
            castShadow
          >
            <meshStandardMaterial
              color="#161616"
              metalness={0.9}
              roughness={0.18}
              envMapIntensity={1.3}
            />
          </RoundedBox>

          {/* Viewfinder hump */}
          <RoundedBox
            args={[0.7, 0.34, 0.5]}
            radius={0.08}
            smoothness={6}
            position={[-0.35, 0.78, -0.05]}
            castShadow
          >
            <meshStandardMaterial
              color="#0d0d0d"
              metalness={1}
              roughness={0.1}
              envMapIntensity={1.5}
            />
          </RoundedBox>

          {/* Top dial */}
          <mesh position={[0.55, 0.82, 0]} castShadow>
            <cylinderGeometry args={[0.16, 0.16, 0.08, 48]} />
            <meshStandardMaterial color="#dcdcdc" metalness={1} roughness={0.08} />
          </mesh>
          <mesh position={[0.55, 0.87, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.03, 48]} />
            <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
          </mesh>

          {/* Shutter button — interactive */}
          <mesh
            ref={shutter}
            position={[0, 0.78, 0]}
            castShadow
            onPointerOver={(e) => {
              e.stopPropagation();
              hovered.current = true;
              triggerFlash();
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              hovered.current = false;
              canFlash.current = true;
            }}
          >
            <cylinderGeometry args={[0.11, 0.11, 0.07, 48]} />
            <meshStandardMaterial color="#ececec" metalness={1} roughness={0.05} />
          </mesh>
          {/* Shutter center recess */}
          <mesh position={[0, 0.78, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.08, 48]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.35} />
          </mesh>

          {/* Lens chrome ring */}
          <mesh position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.5, 0.5, 0.16, 64]} />
            <meshStandardMaterial color="#e0e0e0" metalness={1} roughness={0.07} />
          </mesh>
          {/* Lens ring detail */}
          <mesh position={[0, 0, 0.58]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.42, 0.42, 0.05, 64]} />
            <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.25} />
          </mesh>

          {/* Glass lens element */}
          <mesh position={[0, 0, 0.62]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.38, 0.38, 0.12, 64]} />
            <meshPhysicalMaterial
              color="#050507"
              metalness={0}
              roughness={0.04}
              transmission={0.55}
              thickness={0.3}
              ior={1.5}
              clearcoat={1}
              clearcoatRoughness={0.04}
              transparent
              opacity={0.95}
              envMapIntensity={1.6}
            />
          </mesh>

          {/* Inner lens core — emissive, brightens on flash */}
          <mesh position={[0, 0, 0.66]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.06, 64]} />
            <meshStandardMaterial
              ref={lensMat}
              color="#10101c"
              emissive={new Color('#3b82f6')}
              emissiveIntensity={0.15}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>

          {/* Subtle iridescent accent ring on lens */}
          <mesh position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.46, 0.012, 16, 64]} />
            <meshStandardMaterial
              color="#c9a96e"
              metalness={1}
              roughness={0.15}
              emissive={new Color('#fbbf24')}
              emissiveIntensity={0.08}
            />
          </mesh>

          {/* Flash light — spikes on shutter hover */}
          <pointLight
            ref={flashLight}
            position={[0, 0, 1.2]}
            intensity={0}
            color="#ffffff"
            distance={6}
            decay={2}
          />
        </group>
      </Float>
    </group>
  );
}

/* ------------------------------ Scene wrapper ------------------------------ */
export default function HeroSculpture({ onFlash }: { onFlash?: () => void }) {
  const handleFlash = useRef<() => void>(() => {});
  handleFlash.current = onFlash ?? (() => {});

  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 35 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight position={[5, 6, 5]} intensity={1.1} castShadow />
          <directionalLight position={[-5, -3, -5]} intensity={0.35} color="#ffffff" />
          <spotLight position={[0.4, 7, 3]} intensity={1.2} angle={0.5} penumbra={1} color="#fff7ed" />

          {/* Subtle colored reflection lights */}
          <pointLight position={[-3.5, 1.5, 2]} intensity={0.35} color="#3b82f6" />
          <pointLight position={[3.5, -1.5, 2]} intensity={0.28} color="#a855f7" />
          <pointLight position={[0, 3.5, -2]} intensity={0.22} color="#22d3ee" />
          <pointLight position={[-2.5, -2.5, 1]} intensity={0.2} color="#f472b6" />
          <pointLight position={[2.5, 2.5, -1]} intensity={0.16} color="#fbbf24" />

          <CameraSculpture onFlash={() => handleFlash.current()} />
          <DustParticles />
          <VolumetricShaft />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}
