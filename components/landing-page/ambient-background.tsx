"use client";

import {Canvas, useFrame, useThree} from "@react-three/fiber";
import {OrbitControls, Grid} from "@react-three/drei";
import {useEffect, useRef, useState} from "react";
import * as THREE from "three";

function useBreakpoint() {
  const [bp, setBp] = useState<"mobile" | "tablet" | "desktop">("desktop");
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 640) return setBp("mobile");
      if (w < 1024) return setBp("tablet");
      return setBp("desktop");
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return bp;
}

function PieceMaterial({color}: {color: string}) {
  return (
    <meshStandardMaterial
      color={color}
      metalness={0.45}
      roughness={0.35}
      opacity={0.92}
      transparent
    />
  );
}

function ChessPieceMesh({
  type,
  color,
}: {
  type: "pawn" | "rook" | "bishop" | "queen" | "king" | "knight";
  color: string;
}) {
  const base = (
    <>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.55, 0.65, 0.24, 24]} />
        <PieceMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.42, 0.52, 0.18, 24]} />
        <PieceMaterial color={color} />
      </mesh>
    </>
  );

  if (type === "pawn") {
    return (
      <group scale={0.95}>
        {base}
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.22, 0.32, 0.55, 20]} />
          <PieceMaterial color={color} />
        </mesh>
        <mesh position={[0, 1.15, 0]}>
          <sphereGeometry args={[0.32, 20, 20]} />
          <PieceMaterial color={color} />
        </mesh>
      </group>
    );
  }

  if (type === "rook") {
    const merlons = [
      [-0.22, -0.22],
      [-0.22, 0.22],
      [0.22, -0.22],
      [0.22, 0.22],
      [0, -0.22],
      [0, 0.22],
    ] as const;
    return (
      <group scale={0.95}>
        {base}
        <mesh position={[0, 0.85, 0]}>
          <cylinderGeometry args={[0.34, 0.38, 0.9, 20]} />
          <PieceMaterial color={color} />
        </mesh>
        <mesh position={[0, 1.4, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.22, 20]} />
          <PieceMaterial color={color} />
        </mesh>
        {merlons.map(([x, z]) => (
          <mesh key={`${x}-${z}`} position={[x, 1.62, z]}>
            <boxGeometry args={[0.16, 0.28, 0.16]} />
            <PieceMaterial color={color} />
          </mesh>
        ))}
      </group>
    );
  }

  if (type === "bishop") {
    return (
      <group scale={0.95}>
        {base}
        <mesh position={[0, 0.95, 0]}>
          <cylinderGeometry args={[0.2, 0.34, 1.0, 20]} />
          <PieceMaterial color={color} />
        </mesh>
        <mesh position={[0, 1.55, 0]}>
          <sphereGeometry args={[0.28, 20, 20]} />
          <PieceMaterial color={color} />
        </mesh>
        <mesh position={[0, 1.88, 0]}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <PieceMaterial color={color} />
        </mesh>
      </group>
    );
  }

  if (type === "queen") {
    return (
      <group scale={0.95}>
        {base}
        <mesh position={[0, 1.0, 0]}>
          <cylinderGeometry args={[0.24, 0.36, 1.15, 22]} />
          <PieceMaterial color={color} />
        </mesh>
        <mesh position={[0, 1.7, 0]}>
          <cylinderGeometry args={[0.38, 0.3, 0.28, 22]} />
          <PieceMaterial color={color} />
        </mesh>
        {[0, 1, 2, 3, 4].map((i) => {
          const a = (i / 5) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * 0.28, 1.95, Math.sin(a) * 0.28]}>
              <sphereGeometry args={[0.09, 10, 10]} />
              <PieceMaterial color={color} />
            </mesh>
          );
        })}
        <mesh position={[0, 2.12, 0]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <PieceMaterial color={color} />
        </mesh>
      </group>
    );
  }

  if (type === "king") {
    return (
      <group scale={0.95}>
        {base}
        <mesh position={[0, 1.05, 0]}>
          <cylinderGeometry args={[0.26, 0.38, 1.25, 22]} />
          <PieceMaterial color={color} />
        </mesh>
        <mesh position={[0, 1.8, 0]}>
          <cylinderGeometry args={[0.4, 0.32, 0.28, 22]} />
          <PieceMaterial color={color} />
        </mesh>
        <mesh position={[0, 2.15, 0]}>
          <boxGeometry args={[0.12, 0.45, 0.12]} />
          <PieceMaterial color={color} />
        </mesh>
        <mesh position={[0, 2.22, 0]}>
          <boxGeometry args={[0.36, 0.12, 0.12]} />
          <PieceMaterial color={color} />
        </mesh>
      </group>
    );
  }

  return (
    <group scale={0.95}>
      {base}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.28, 0.36, 0.55, 18]} />
        <PieceMaterial color={color} />
      </mesh>
      <mesh position={[0.08, 1.25, 0]}>
        <boxGeometry args={[0.45, 0.55, 0.35]} />
        <PieceMaterial color={color} />
      </mesh>
      <mesh position={[0.28, 1.55, 0.02]} rotation={[0, 0, -0.35]}>
        <boxGeometry args={[0.35, 0.28, 0.28]} />
        <PieceMaterial color={color} />
      </mesh>
      <mesh position={[0.42, 1.45, 0]}>
        <boxGeometry args={[0.18, 0.14, 0.22]} />
        <PieceMaterial color={color} />
      </mesh>
    </group>
  );
}

const PIECE_TYPES: Array<
  "pawn" | "rook" | "bishop" | "queen" | "king" | "knight"
> = [
  "pawn",
  "rook",
  "bishop",
  "queen",
  "king",
  "knight",
  "pawn",
  "rook",
  "bishop",
  "knight",
  "queen",
  "king",
  "pawn",
  "rook",
  "bishop",
  "knight",
];

const GRID_STEP = 3;
const MOVE_SPEED = 1.6; // same constant speed for every piece
const CORNER_PAUSE = 0.55; // seconds stopped at each grid corner
const WAIT_RETRY = 0.25; // retry soon if neighbors are blocked
const BOARD_MIN = -15;
const BOARD_MAX = 15;
/** Prefer staying at least this far from other pieces (one grid step) */
const MIN_SEPARATION = GRID_STEP;

type Dir = readonly [number, number];

const CARDINAL: Dir[] = [
  [GRID_STEP, 0],
  [-GRID_STEP, 0],
  [0, GRID_STEP],
  [0, -GRID_STEP],
];

function snapToGrid(n: number) {
  return Math.round(n / GRID_STEP) * GRID_STEP;
}

function inBounds(x: number, z: number) {
  return x >= BOARD_MIN && x <= BOARD_MAX && z >= BOARD_MIN && z <= BOARD_MAX;
}

type PieceSlot = {
  id: number;
  x: number;
  z: number;
  reservedX: number | null;
  reservedZ: number | null;
};

/** Shared board so pieces never share a cell or claim the same destination. */
const board = {
  pieces: new Map<number, PieceSlot>(),

  register(id: number, x: number, z: number) {
    this.pieces.set(id, {
      id,
      x,
      z,
      reservedX: null,
      reservedZ: null,
    });
  },

  unregister(id: number) {
    this.pieces.delete(id);
  },

  isTaken(x: number, z: number, selfId: number) {
    for (const p of this.pieces.values()) {
      if (p.id === selfId) continue;
      if (p.x === x && p.z === z) return true;
      if (p.reservedX === x && p.reservedZ === z) return true;
    }
    return false;
  },

  /** Smallest distance to any other piece (current or reserved cell). */
  nearestOther(x: number, z: number, selfId: number) {
    let min = Infinity;
    for (const p of this.pieces.values()) {
      if (p.id === selfId) continue;
      min = Math.min(min, Math.hypot(x - p.x, z - p.z));
      if (p.reservedX != null && p.reservedZ != null) {
        min = Math.min(min, Math.hypot(x - p.reservedX, z - p.reservedZ));
      }
    }
    return min;
  },

  reserve(id: number, x: number, z: number) {
    const p = this.pieces.get(id);
    if (!p || this.isTaken(x, z, id)) return false;
    p.reservedX = x;
    p.reservedZ = z;
    return true;
  },

  arrive(id: number, x: number, z: number) {
    const p = this.pieces.get(id);
    if (!p) return;
    p.x = x;
    p.z = z;
    p.reservedX = null;
    p.reservedZ = null;
  },
};

function AnimatedChessPiece({
  id,
  initialPosition,
  color,
  type,
}: {
  id: number;
  initialPosition: [number, number, number];
  color: string;
  type: "pawn" | "rook" | "bishop" | "queen" | "king" | "knight";
}) {
  const groupRef = useRef<THREE.Group>(null);
  const home = useRef({
    x: snapToGrid(initialPosition[0]),
    z: snapToGrid(initialPosition[2]),
  });
  const position = useRef(
    new THREE.Vector3(home.current.x, 0, home.current.z),
  );
  const target = useRef(position.current.clone());
  const moving = useRef(false);
  const pauseLeft = useRef(0.15 + Math.random() * CORNER_PAUSE);

  useEffect(() => {
    board.register(id, home.current.x, home.current.z);
    return () => board.unregister(id);
  }, [id]);

  const pickNextTarget = () => {
    type Candidate = {nx: number; nz: number; nearest: number; score: number};
    const candidates: Candidate[] = [];

    for (const [dx, dz] of CARDINAL) {
      const nx = position.current.x + dx;
      const nz = position.current.z + dz;
      if (!inBounds(nx, nz)) continue;
      if (board.isTaken(nx, nz, id)) continue;

      const nearest = board.nearestOther(nx, nz, id);
      // Never land on / through another piece's cell
      if (nearest < MIN_SEPARATION) continue;

      const homePull = Math.hypot(nx - home.current.x, nz - home.current.z);
      // Prefer open space + staying near assigned home so pieces stay scattered
      const score = nearest * 3 - homePull * 0.45 + Math.random() * 0.8;
      candidates.push({nx, nz, nearest, score});
    }

    if (candidates.length === 0) {
      pauseLeft.current = WAIT_RETRY;
      return;
    }

    // Prefer a one-cell buffer from others when possible
    const spacious = candidates.filter((c) => c.nearest >= GRID_STEP * 2);
    const pool = spacious.length > 0 ? spacious : candidates;
    pool.sort((a, b) => b.score - a.score);
    const best = pool[0];

    if (!board.reserve(id, best.nx, best.nz)) {
      pauseLeft.current = WAIT_RETRY;
      return;
    }

    target.current.set(best.nx, 0, best.nz);
    moving.current = true;
  };

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const dt = Math.min(delta, 1 / 30);

    if (pauseLeft.current > 0) {
      pauseLeft.current -= dt;
      groupRef.current.position.copy(position.current);
      return;
    }

    if (!moving.current) {
      pickNextTarget();
    }

    if (moving.current) {
      const pos = position.current;
      const dest = target.current;
      const dx = dest.x - pos.x;
      const dz = dest.z - pos.z;
      const dist = Math.hypot(dx, dz);

      if (dist <= MOVE_SPEED * dt) {
        pos.copy(dest);
        board.arrive(id, dest.x, dest.z);
        moving.current = false;
        pauseLeft.current = CORNER_PAUSE;
      } else {
        pos.x += (dx / dist) * MOVE_SPEED * dt;
        pos.z += (dz / dist) * MOVE_SPEED * dt;
      }
    }

    groupRef.current.position.copy(position.current);
  });

  return (
    <group ref={groupRef} position={position.current.toArray()}>
      <ChessPieceMesh type={type} color={color} />
    </group>
  );
}

const PIECE_COLORS_DARK = "#9CA3AF";
const PIECE_COLORS_LIGHT = "#4B5563";

function Scene({isDark}: {isDark: boolean}) {
  // Evenly scattered starts — unique grid cells across the board
  const positions: [number, number, number][] = [
    [-15, 0, -15],
    [-3, 0, -15],
    [9, 0, -15],
    [-15, 0, -6],
    [0, 0, -9],
    [15, 0, -9],
    [-9, 0, 0],
    [6, 0, 0],
    [-15, 0, 9],
    [-3, 0, 6],
    [12, 0, 6],
    [0, 0, 12],
    [15, 0, 15],
    [-12, 0, 15],
    [6, 0, -6],
    [3, 0, 15],
  ];

  const pieceColor = isDark ? PIECE_COLORS_DARK : PIECE_COLORS_LIGHT;

  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.18}
      />
      <ambientLight intensity={isDark ? 0.55 : 0.9} />
      <pointLight
        position={[10, 14, 8]}
        intensity={isDark ? 1.25 : 1.1}
        color="#A78BFA"
      />
      <directionalLight position={[-6, 12, -4]} intensity={0.4} />
      <fog attach="fog" args={["#101010", 48, 95]} />
      <Grid
        renderOrder={-1}
        position={[0, 0, 0]}
        infiniteGrid
        cellSize={3}
        cellThickness={0}
        sectionSize={3}
        sectionThickness={1}
        sectionColor={
          isDark
            ? new THREE.Color(0.88, 0.84, 1)
            : new THREE.Color(0.42, 0.38, 0.62)
        }
        cellColor={new THREE.Color(0, 0, 0)}
        fadeDistance={42}
        fadeStrength={1.15}
      />
      {positions.map((position, index) => (
        <AnimatedChessPiece
          key={index}
          id={index}
          initialPosition={position}
          color={pieceColor}
          type={PIECE_TYPES[index % PIECE_TYPES.length]}
        />
      ))}
    </>
  );
}

function ResponsiveCamera() {
  const bp = useBreakpoint();
  const {camera} = useThree();

  useEffect(() => {
    let position: [number, number, number] = [20, 5, 10];
    let fov = 50;
    if (bp === "tablet") {
      position = [18, 6, 12];
      fov = 52;
    } else if (bp === "mobile") {
      position = [14, 7, 14];
      fov = 56;
    }
    camera.position.set(...position);
    (camera as THREE.PerspectiveCamera).fov = fov;
    camera.updateProjectionMatrix();
  }, [bp, camera]);

  return null;
}

export default function AmbientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#101010]"
      aria-hidden>
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        camera={{position: [20, 5, 10], fov: 50}}
        className="absolute inset-0"
        style={{position: "absolute", inset: 0}}>
        <color attach="background" args={["#101010"]} />
        <ResponsiveCamera />
        <Scene isDark />
      </Canvas>
    </div>
  );
}
