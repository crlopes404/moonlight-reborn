import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

type Props = {
  children: ReactNode;
  variant?: "primary" | "ghost";
  onClick?: () => void;
  className?: string;
};

export function MagneticButton({ children, variant = "primary", onClick, className = "" }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const rx = useTransform(sy, [-30, 30], [10, -10]);
  const ry = useTransform(sx, [-30, 30], [-10, 10]);

  return (
    <motion.button
      ref={ref}
      data-magnetic
      onClick={onClick}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.35);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: sx, y: sy, rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className={`btn-magnetic ${variant === "primary" ? "btn-primary" : "btn-ghost"} ${className}`}
    >
      <span style={{ transform: "translateZ(20px)" }}>{children}</span>
    </motion.button>
  );
}
