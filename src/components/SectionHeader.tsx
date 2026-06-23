import { motion } from "framer-motion";

export function SectionHeader({ eyebrow, title, subtitle, center }: { eyebrow: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="font-mono text-xs uppercase tracking-[0.3em] text-primary"
      >
        / {eyebrow}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.1 }}
        className="mt-4 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2 }}
          className={`mt-4 text-lg text-muted-foreground ${center ? "mx-auto" : ""} max-w-2xl`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
