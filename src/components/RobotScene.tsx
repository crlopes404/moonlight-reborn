import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme";

/**
 * Spline robot for the /contacto hero.
 * Uses the published Spline embed (my.spline.design) as a frameless,
 * transparent surface — no border, blends into the page, and the robot's
 * cursor-follow runs inside the scene.
 * Theme-aware: a soft glow keeps it visible on dark backgrounds and a gentle
 * brightness trim stops it blowing out in light mode.
 */
export function RobotScene({ embed }: { embed?: string }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-full w-full">
      {/* Ambient glow so the robot never disappears over dark/light backgrounds */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "80%",
          height: "80%",
          background: "radial-gradient(circle, var(--glow), transparent 68%)",
          filter: "blur(48px)",
          opacity: isDark ? 0.95 : 0.5,
        }}
      />

      {/* Fallback while the scene streams in (and graceful state if no embed set) */}
      {(!embed || !loaded) && <RobotFallback />}

      {embed && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            filter: isDark
              ? "saturate(1.05) contrast(1.02)"
              : "brightness(0.95) contrast(1.04) saturate(1.02)",
          }}
        >
          <iframe
            src={embed}
            title="Robot Moonlight"
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className="absolute inset-0 h-full w-full"
            style={{ border: 0, background: "transparent", colorScheme: "normal" }}
            allow="autoplay; fullscreen"
          />
          {/* Mask the Spline watermark in the corner so it never reads as a pasted iframe */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-1 right-1 h-9 w-40 rounded-full"
            style={{ background: "var(--color-background)", filter: "blur(8px)" }}
          />
        </motion.div>
      )}
    </div>
  );
}

/** Elegant on-brand placeholder shown while the scene streams in. */
function RobotFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative size-40 md:size-56">
        <div className="absolute inset-0 rounded-full glass-elev holo-border" />
        <div className="absolute inset-6 rounded-full border border-dashed border-border/50 animate-[orbit-spin_18s_linear_infinite]" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="size-3 rounded-full bg-primary animate-pulse" style={{ boxShadow: "0 0 30px var(--glow)" }} />
        </div>
      </div>
    </div>
  );
}
