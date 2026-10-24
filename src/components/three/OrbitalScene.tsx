import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars, OrbitControls } from "@react-three/drei";
import { useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
const colors = ["#8acde8", "#bc9ee0", "#d6ac70", "#82c9b5"];
const positions: [number, number, number][] = [
  [-1.8, 0.8, 0.3],
  [1.5, 1, 0.1],
  [-1.2, -1.25, 0.65],
  [1.8, -0.8, 0.4],
];
function Planet({
  index,
  selected,
  onSelect,
}: {
  index: number;
  selected: boolean;
  onSelect?: (index: number) => void;
}) {
  const sphere = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (sphere.current)
      sphere.current.rotation.y += delta * (0.12 + index * 0.04);
  });
  return (
    <group position={positions[index]}>
      <mesh
        ref={sphere}
        onClick={(event) => {
          if (event.delta > 5) return;
          event.stopPropagation();
          onSelect?.(index);
        }}
      >
        <sphereGeometry args={[0.38 + index * 0.035, 32, 24]} />
        <meshStandardMaterial
          color={colors[index]}
          metalness={index === 2 ? 0.75 : 0.35}
          roughness={0.4}
          emissive={colors[index]}
          emissiveIntensity={selected ? 0.3 : 0.04}
        />
        <mesh scale={1.012}>
          <sphereGeometry args={[0.38 + index * 0.035, 16, 12]} />
          <meshBasicMaterial
            wireframe
            color={colors[index]}
            transparent
            opacity={0.17}
          />
        </mesh>
      </mesh>
      <mesh rotation={[1.15, 0.25, index * 0.5]}>
        <torusGeometry args={[0.62 + index * 0.035, 0.008, 8, 80]} />
        <meshBasicMaterial
          color={selected ? "#f0d5a5" : colors[index]}
          transparent
          opacity={selected ? 0.9 : 0.4}
        />
      </mesh>
    </group>
  );
}
function Sculpture({
  interactive,
  onSelect,
  selected,
  low,
}: {
  interactive: boolean;
  onSelect?: (index: number) => void;
  selected: number | null;
  low: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Group>(null);
  useFrame(({ clock, pointer }, delta) => {
    if (rings.current) rings.current.rotation.z += delta * 0.06;
    if (group.current && !interactive) {
      group.current.rotation.y =
        Math.sin(clock.elapsedTime * 0.12) * 0.3 + pointer.x * 0.1;
      group.current.rotation.x = 0.12 + pointer.y * 0.06;
    }
  });
  if (interactive)
    return (
      <group>
        <mesh>
          <sphereGeometry args={[0.22, 24, 16]} />
          <meshBasicMaterial color="#f0d5a5" />
        </mesh>
        <pointLight color="#d6ac70" intensity={3} />
        <group ref={rings}>
          {[1.35, 2.2, 2.65].map((radius, i) => (
            <mesh key={radius} rotation={[1.2 + i * 0.14, 0.2, 0]}>
              <torusGeometry args={[radius, 0.006, 6, 80]} />
              <meshBasicMaterial color="#8acde8" transparent opacity={0.24} />
            </mesh>
          ))}
        </group>
        {positions.map((_, index) => (
          <Planet
            key={index}
            index={index}
            selected={selected === index}
            onSelect={onSelect}
          />
        ))}
      </group>
    );
  return (
    <group ref={group} rotation={[0.12, 0, -0.3]}>
      <Float speed={0.6} rotationIntensity={0.08} floatIntensity={0.12}>
        <mesh>
          <sphereGeometry args={[1.18, low ? 24 : 48, low ? 16 : 32]} />
          <meshStandardMaterial
            color="#10283a"
            metalness={0.88}
            roughness={0.3}
          />
        </mesh>
        <mesh scale={1.008}>
          <sphereGeometry args={[1.18, 24, 16]} />
          <meshBasicMaterial
            wireframe
            color="#8acde8"
            transparent
            opacity={0.06}
          />
        </mesh>
        <group ref={rings}>
          {[0, 1, 2].map((n) => (
            <mesh key={n} rotation={[Math.PI / 2 + n * 0.34, n * 0.4, 0.2]}>
              <torusGeometry
                args={[
                  1.72 + n * 0.23,
                  0.016 + n * 0.007,
                  low ? 8 : 12,
                  low ? 80 : 144,
                ]}
              />
              <meshStandardMaterial
                color={n === 1 ? "#8acde8" : "#d6ac70"}
                emissive={n === 1 ? "#456a80" : "#a87532"}
                emissiveIntensity={0.28}
                metalness={0.9}
                roughness={0.25}
              />
            </mesh>
          ))}
        </group>
        <mesh position={[-1.7, 0.75, 0.5]}>
          <sphereGeometry args={[0.09, 16, 12]} />
          <meshStandardMaterial
            color="#f0d5a5"
            metalness={0.8}
            roughness={0.25}
          />
        </mesh>
        <mesh position={[1.8, -0.8, 0.5]}>
          <sphereGeometry args={[0.13, 16, 12]} />
          <meshStandardMaterial
            color="#8acde8"
            metalness={0.8}
            roughness={0.25}
          />
        </mesh>
      </Float>
    </group>
  );
}
function CameraRig({
  interactive,
  selected,
  rotate,
  active,
}: {
  interactive: boolean;
  selected: number | null;
  rotate: boolean;
  active: boolean;
}) {
  const controls = useRef<OrbitControlsImpl>(null);
  const moving = useRef(true);
  const target = useMemo(() => new THREE.Vector3(), []);
  const destination = useMemo(() => new THREE.Vector3(), []);
  useEffect(() => {
    moving.current = true;
  }, [selected, rotate]);
  useFrame(({ camera }, delta) => {
    if (!interactive) return;
    target.set(
      ...(selected === null
        ? ([0, 0, 0] as [number, number, number])
        : positions[selected]),
    );
    destination.set(target.x, target.y + 0.2, target.z + (selected === null ? 7.8 : 3.6));
    if (moving.current) {
      const alpha = 1 - Math.exp(-delta * 4);
      camera.position.lerp(destination, alpha);
      controls.current?.target.lerp(target, alpha);
      if (camera.position.distanceTo(destination) < 0.015)
        moving.current = false;
    }
    controls.current?.update();
  });
  if (!interactive) return null;
  return (
    <OrbitControls
      ref={controls}
      enabled={rotate && active}
      enableZoom={false}
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      minPolarAngle={0.5}
      maxPolarAngle={2.5}
      onStart={() => {
        moving.current = false;
      }}
    />
  );
}
function ContextGuard({ onFailure }: { onFailure?: () => void }) {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = () => onFailure?.();
    canvas.addEventListener("webglcontextlost", lost);
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [gl, onFailure]);
  return null;
}
export default function OrbitalScene({
  active,
  interactive = false,
  onSelect,
  selected = null,
  rotate = false,
  onFailure,
}: {
  active: boolean;
  interactive?: boolean;
  onSelect?: (index: number) => void;
  selected?: number | null;
  rotate?: boolean;
  onFailure?: () => void;
}) {
  const [visible, setVisible] = useState(!document.hidden);
  useEffect(() => {
    const handler = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);
  const low =
    window.matchMedia("(max-width:760px)").matches ||
    navigator.hardwareConcurrency <= 4;
  return (
    <Canvas
      dpr={[1, low ? 1 : 1.5]}
      camera={{ position: [0, 0, interactive ? 7.8 : 6.4], fov: 45 }}
      frameloop={visible && active ? "always" : "never"}
      gl={{ alpha: true, antialias: !low, powerPreference: "low-power" }}
    >
      <ContextGuard onFailure={onFailure} />
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 3, 3]} color="#8acde8" intensity={35} />
      <pointLight position={[-3, -1, 2]} color="#d6ac70" intensity={24} />
      <Sculpture
        interactive={interactive}
        selected={selected}
        onSelect={onSelect}
        low={low}
      />
      <CameraRig
        interactive={interactive}
        selected={selected}
        rotate={rotate}
        active={active && visible}
      />
      <Stars
        radius={30}
        depth={20}
        count={low ? 140 : 500}
        factor={2}
        saturation={0}
        fade
        speed={0.1}
      />
    </Canvas>
  );
}
