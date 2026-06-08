import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function DepthParticles() {
  const group = useRef();
  const particles = useMemo(() => {
    const count = 240;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#39c7ff"),
      new THREE.Color("#7c5cff"),
      new THREE.Color("#b48cff"),
      new THREE.Color("#7de7ff"),
    ];

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 12;
      positions[i3 + 1] = (Math.random() - 0.5) * 7;
      positions[i3 + 2] = (Math.random() - 0.5) * 8;

      const color = palette[i % palette.length];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return { positions, colors, count };
  }, []);

  useFrame((state) => {
    if (!group.current) return;

    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.018 + state.pointer.x * 0.08;
    group.current.rotation.x = Math.sin(t * 0.16) * 0.035 - state.pointer.y * 0.045;
    group.current.position.x = state.pointer.x * 0.18;
    group.current.position.y = state.pointer.y * 0.12;
  });

  return (
    <points ref={group}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.026}
        vertexColors
        transparent
        opacity={0.72}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GlowOrb({ color, position, scale = 1, speed = 1 }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.elapsedTime * speed;
    ref.current.position.x = position[0] + Math.sin(t * 0.35) * 0.18 + state.pointer.x * 0.16;
    ref.current.position.y = position[1] + Math.cos(t * 0.28) * 0.14 + state.pointer.y * 0.1;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.16}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <DepthParticles />
      <GlowOrb color="#1ca8ff" position={[-2.8, 1.2, -2.4]} scale={1.45} speed={0.9} />
      <GlowOrb color="#7c5cff" position={[2.7, -0.35, -2.8]} scale={1.65} speed={0.7} />
      <GlowOrb color="#43f3ff" position={[0.4, -1.7, -3.2]} scale={1.1} speed={1.1} />
    </>
  );
}

export default function AnimatedBackground() {
  const disabled =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 760px)").matches;

  if (disabled) {
    return <div className="animated-background fallback" aria-hidden="true" />;
  }

  return (
    <div className="animated-background" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.6], fov: 52 }}
        dpr={[1, 1.35]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>
      <div className="background-fog" />
    </div>
  );
}
