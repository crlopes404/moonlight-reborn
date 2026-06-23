import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ReactNode, useRef } from "react";

/**
 * Subtle 3D hover-tilt with a parallax depth layer.
 * GPU-only transforms (rotateX/rotateY/translateZ) — no layout thrash.
 * Honours prefers-reduced-motion by disabling the tilt entirely.
 */
export function TiltCard({
  children,
  className = "",
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 300, damping: 30 });
  const sy = useSpring(my, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", willChange: "transform" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
