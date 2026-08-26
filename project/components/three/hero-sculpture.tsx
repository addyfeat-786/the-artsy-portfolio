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
  const count = 180;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 7;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }

    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;

    ref.current.rotation.y += delta * 0.015;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.08;
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
        size={0.016}
        color="#ffffff"
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}

/* --------------------------- Volumetric light --------------------------- */

function VolumetricShaft() {
  return (
    <mesh
      position={[0.3, 3.4, -1]}
      rotation={[Math.PI - 0.12, 0, 0.08]}
    >
      <coneGeometry args={[1.5, 6.5, 32, 1, true]} />

      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.025}
        side={DoubleSide}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ------------------------------ Camera ------------------------------ */

function CameraSculpture({
  onFlash,
}: {
  onFlash: () => void;
}) {
  const group = useRef<Group>(null);
  const shutter = useRef<Mesh>(null);
  const flashLight = useRef<PointLight>(null);
  const lensMat = useRef<MeshStandardMaterial>(null);

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

    // Very slow cinematic rotation
    group.current.rotation.y += delta * 0.025;

    // Subtle mouse movement
    const targetX = pointer.y * 0.08;
    const targetZ = pointer.x * 0.08;

    group.current.rotation.x = MathUtils.lerp(
      group.current.rotation.x,
      targetX,
      0.025
    );

    group.current.rotation.z = MathUtils.lerp(
      group.current.rotation.z,
      targetZ,
      0.025
    );

    // Shutter interaction
    if (shutter.current) {
      const targetY = hovered.current ? 0.73 : 0.78;

      shutter.current.position.y = MathUtils.lerp(
        shutter.current.position.y,
        targetY,
        0.15
      );
    }

    // Flash animation
    const t = clock.elapsedTime - flashStart.current;

    let flash = 0;

    if (t >= 0 && t < 0.5) {
      flash =
        t < 0.04
          ? t / 0.04
          : 1 - (t - 0.04) / 0.46;

      flash = MathUtils.clamp(flash, 0, 1);
    }

    if (flashLight.current) {
      flashLight.current.intensity = flash * 7;
    }

    if (lensMat.current) {
      lensMat.current.emissiveIntensity = 0.1 + flash * 2.5;
    }
  });

  return (
    <group
      ref={group}
      position={[0, -0.1, 0]}
      scale={0.88}
    >
      <Float
        speed={0.9}
        rotationIntensity={0.06}
        floatIntensity={0.28}
      >
        <group>
          {/* Chrome outer frame */}

          <RoundedBox
            args={[2.25, 1.5, 0.82]}
            radius={0.12}
            smoothness={8}
            castShadow
          >
            <meshStandardMaterial
              color="#d8d8d8"
              metalness={1}
              roughness={0.08}
              envMapIntensity={1.4}
            />
          </RoundedBox>

          {/* Dark camera body */}

          <RoundedBox
            args={[2.12, 1.38, 0.86]}
            radius={0.1}
            smoothness={8}
            position={[0, 0, 0.02]}
            castShadow
          >
            <meshPhysicalMaterial
              color="#050505"
              metalness={0.15}
              roughness={0.18}
              transmission={0.12}
              thickness={0.5}
              ior={1.5}
              clearcoat={1}
              clearcoatRoughness={0.1}
              envMapIntensity={1.2}
            />
          </RoundedBox>

          {/* Right grip */}

          <RoundedBox
            args={[0.34, 1.38, 0.7]}
            radius={0.1}
            smoothness={6}
            position={[1.02, 0, 0.02]}
            castShadow
          >
            <meshStandardMaterial
              color="#111111"
              metalness={0.9}
              roughness={0.2}
            />
          </RoundedBox>

          {/* Viewfinder */}

          <RoundedBox
            args={[0.7, 0.34, 0.5]}
            radius={0.08}
            smoothness={6}
            position={[-0.35, 0.78, -0.05]}
            castShadow
          >
            <meshStandardMaterial
              color="#080808"
              metalness={1}
              roughness={0.12}
            />
          </RoundedBox>

          {/* Top dial */}

          <mesh position={[0.55, 0.82, 0]} castShadow>
            <cylinderGeometry args={[0.16, 0.16, 0.08, 48]} />

            <meshStandardMaterial
              color="#d5d5d5"
              metalness={1}
              roughness={0.1}
            />
          </mesh>

          <mesh position={[0.55, 0.87, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.03, 48]} />

            <meshStandardMaterial
              color="#1f1f1f"
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>

          {/* Shutter */}

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

            <meshStandardMaterial
              color="#ececec"
              metalness={1}
              roughness={0.05}
            />
          </mesh>

          {/* Lens chrome */}

          <mesh
            position={[0, 0, 0.5]}
            rotation={[Math.PI / 2, 0, 0]}
            castShadow
          >
            <cylinderGeometry args={[0.5, 0.5, 0.16, 64]} />

            <meshStandardMaterial
              color="#d8d8d8"
              metalness={1}
              roughness={0.08}
            />
          </mesh>

          {/* Lens outer ring */}

          <mesh
            position={[0, 0, 0.58]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.42, 0.42, 0.05, 64]} />

            <meshStandardMaterial
              color="#181818"
              metalness={0.9}
              roughness={0.25}
            />
          </mesh>

          {/* Lens glass */}

          <mesh
            position={[0, 0, 0.62]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.38, 0.38, 0.12, 64]} />

            <meshPhysicalMaterial
              color="#030306"
              roughness={0.05}
              transmission={0.3}
              thickness={0.3}
              clearcoat={1}
              clearcoatRoughness={0.04}
              metalness={0.2}
            />
          </mesh>

          {/* Inner lens */}

          <mesh
            position={[0, 0, 0.66]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.22, 0.22, 0.06, 64]} />

            <meshStandardMaterial
              ref={lensMat}
              color="#05050a"
              emissive={new Color('#64748b')}
              emissiveIntensity={0.1}
              metalness={0.9}
              roughness={0.18}
            />
          </mesh>

          {/* Gold accent */}

          <mesh
            position={[0, 0, 0.69]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <torusGeometry args={[0.46, 0.01, 16, 64]} />

            <meshStandardMaterial
              color="#b89b5e"
              metalness={1}
              roughness={0.2}
            />
          </mesh>

          {/* Flash */}

          <pointLight
            ref={flashLight}
            position={[0, 0, 1.3]}
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

/* ------------------------------ Main Scene ------------------------------ */

export default function HeroSculpture({
  onFlash,
}: {
  onFlash?: () => void;
}) {
  const handleFlash = useRef<() => void>(() => {});

  handleFlash.current = onFlash ?? (() => {});

  return (
    <div className="absolute inset-0 z-10 h-full w-full pointer-events-none">
      <div className="pointer-events-auto h-full w-full">
        <Canvas
          camera={{
            position: [0, 0, 6.8],
            fov: 35,
          }}
          dpr={[1, 2]}
          gl={{
            alpha: true,
            antialias: true,
          }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.28} />

            <directionalLight
              position={[5, 6, 5]}
              intensity={1}
              castShadow
            />

            <directionalLight
              position={[-5, -3, -5]}
              intensity={0.25}
            />

            <spotLight
              position={[0.4, 7, 3]}
              intensity={1}
              angle={0.5}
              penumbra={1}
              color="#ffffff"
            />

            <pointLight
              position={[-3, 1, 2]}
              intensity={0.18}
              color="#64748b"
            />

            <pointLight
              position={[2.5, 2, -1]}
              intensity={0.12}
              color="#c9a96e"
            />

            <CameraSculpture
              onFlash={() => handleFlash.current()}
            />

            <DustParticles />

            <VolumetricShaft />

            <Environment preset="studio" />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
