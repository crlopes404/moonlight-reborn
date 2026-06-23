import { motion } from "framer-motion";

export function MoonScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="relative h-[520px] w-[520px]"
      >
        {/* Core moon */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, oklch(0.85 0.04 290), oklch(0.4 0.12 290) 55%, oklch(0.15 0.05 280) 100%)",
            boxShadow:
              "0 0 120px 20px oklch(0.65 0.28 295 / 0.45), inset -40px -60px 120px oklch(0.1 0.04 280 / 0.8)",
          }}
        />
        {/* Orbital rings */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border"
            style={{
              borderColor: "oklch(0.7 0.25 295 / 0.25)",
              transform: `scale(${1.15 + i * 0.18}) rotate(${i * 30}deg)`,
              animation: `${i % 2 === 0 ? "orbit-spin" : "orbit-counter"} ${20 + i * 10}s linear infinite`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
