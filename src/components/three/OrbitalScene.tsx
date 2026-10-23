import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
function Sculpture({
  interactive,
  onSelect,
}: {
  interactive: boolean;
  onSelect?: (index: number) => void;
}) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.18 + pointer.x * 0.08;
    group.current.rotation.x =
      0.12 + Math.sin(clock.elapsedTime * 0.2) * 0.08 + pointer.y * 0.04;
  });
  return (
    <group ref={group} rotation={[0.12, 0, -0.3]}>
      <Float speed={0.6} rotationIntensity={0.08} floatIntensity={0.15}>
        <mesh>
          <sphereGeometry args={[1.3, 32, 24]} />
          <meshStandardMaterial
            color="#10283a"
            metalness={0.83}
            roughness={0.36}
          />
        </mesh>
        <mesh scale={1.014}>
          <sphereGeometry args={[1.3, 24, 16]} />
          <meshBasicMaterial
            color="#50809a"
            wireframe
            transparent
            opacity={0.18}
          />
        </mesh>
        {[0, 1, 2].map((n) => (
          <mesh key={n} rotation={[Math.PI / 2 + n * 0.31, n * 0.38, 0.2]}>
            <torusGeometry args={[1.85 + n * 0.22, 0.012 + n * 0.005, 8, 96]} />
            <meshStandardMaterial
              color={n === 1 ? "#8acde8" : "#d6ac70"}
              emissive={n === 1 ? "#456a80" : "#a87532"}
              emissiveIntensity={0.45}
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>
        ))}
        {interactive &&
          [0, 1, 2, 3].map((n) => (
            <mesh
              key={n}
              position={[
                Math.cos((n * Math.PI) / 2) * 2.3,
                Math.sin((n * Math.PI) / 2) * 1.5,
                0.7,
              ]}
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.(n);
              }}
            >
              <sphereGeometry args={[0.15, 20, 20]} />
              <meshStandardMaterial
                color={n % 2 ? "#8acde8" : "#f0d5a5"}
                emissive="#d6ac70"
                emissiveIntensity={0.4}
              />
            </mesh>
          ))}
      </Float>
    </group>
  );
}
export default function OrbitalScene({
  active,
  interactive = false,
  onSelect,
}: {
  active: boolean;
  interactive?: boolean;
  onSelect?: (index: number) => void;
}) {
  const [visible, setVisible] = useState(!document.hidden);
  useEffect(() => {
    const handler = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);
  const mobile = window.matchMedia("(max-width: 760px)").matches;
  return (
    <Canvas
      dpr={[1, mobile ? 1 : 1.5]}
      camera={{ position: [0, 0, 6.4], fov: 45 }}
      frameloop={visible && active ? "always" : "never"}
      gl={{ alpha: true, antialias: !mobile, powerPreference: "low-power" }}
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[3, 3, 3]} color="#8acde8" intensity={35} />
      <pointLight position={[-3, -1, 2]} color="#d6ac70" intensity={24} />
      <Sculpture interactive={interactive} onSelect={onSelect} />
      <Stars
        radius={30}
        depth={20}
        count={mobile ? 180 : 650}
        factor={2}
        saturation={0}
        fade
        speed={0.15}
      />
    </Canvas>
  );
}
