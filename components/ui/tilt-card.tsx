"use client";

import {
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type MouseEvent,
  type KeyboardEvent,
} from "react";
import {cn} from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  maxTilt?: number;
  glare?: boolean;
  as?: "div" | "button";
  onClick?: () => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  role?: string;
  tabIndex?: number;
}

export default function TiltCard({
  children,
  className,
  style,
  maxTilt = 8,
  glare = true,
  as = "div",
  onClick,
  onKeyDown,
  role,
  tabIndex,
}: TiltCardProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [transform, setTransform] = useState(
    "perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
  );
  const [glarePos, setGlarePos] = useState({x: 50, y: 50, opacity: 0});

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - y) * maxTilt * 2;
    setTransform(
      `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`,
    );
    setGlarePos({x: x * 100, y: y * 100, opacity: 0.35});
  };

  const handleLeave = () => {
    setTransform(
      "perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
    );
    setGlarePos((g) => ({...g, opacity: 0}));
  };

  const combinedStyle: CSSProperties = {
    ...style,
    transform,
    transition:
      "transform 180ms ease-out, box-shadow 300ms ease, border-color 300ms ease",
  };

  const classNames = cn(
    "relative transform-gpu will-change-transform transition-shadow duration-300",
    className,
  );

  const glareEl = glare ? (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] mix-blend-soft-light"
      style={{
        opacity: glarePos.opacity,
        background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.55), transparent 55%)`,
      }}
    />
  ) : null;

  if (as === "button") {
    return (
      <button
        type="button"
        ref={ref as React.RefObject<HTMLButtonElement>}
        className={classNames}
        style={combinedStyle}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={onClick}
        onKeyDown={onKeyDown}>
        {children}
        {glareEl}
      </button>
    );
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={classNames}
      style={combinedStyle}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={role}
      tabIndex={tabIndex}>
      {children}
      {glareEl}
    </div>
  );
}
