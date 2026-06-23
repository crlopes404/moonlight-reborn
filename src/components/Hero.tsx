import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { ClientOnly } from "@tanstack/react-router";
import { MagneticButton } from "./MagneticButton";
import { MoonScene } from "./MoonScene";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden">
      {/* Animated grid */}
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" />

      {/* Radial glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full opacity-60 animate-pulse-glow"
        style={{ background: "radial-gradient(circle, oklch(0.62 0.27 295 / 0.4), transparent 60%)" }}
      />

      {/* 3D Scene */}
      <div className="absolute inset-0 z-10">
        <ClientOnly fallback={null}>
          <MoonScene />
        </ClientOnly>
      </div>

      {/* Top scanline */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        <div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          style={{ animation: "scan 8s linear infinite" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-30 min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-mono uppercase tracking-widest text-muted-foreground mb-8"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span>Est. 1998 · Portugal</span>
          <Sparkles className="h-3 w-3 text-primary" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-display font-semibold text-[clamp(2.8rem,9vw,8rem)] leading-[0.95] tracking-tight max-w-6xl"
        >
          <span className="block text-gradient">O Futuro</span>
          <span className="block text-gradient-aurora">Não Espera</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-8 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed"
        >
          IT Solutions, Consulting & Marketing — desde <span className="text-foreground font-medium">1998</span> a
          transformar empresas com tecnologia que se sente{" "}
          <span className="text-foreground font-medium">de outro tempo</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton variant="primary">
            Quero ser contactado <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton variant="ghost">Explorar o futuro</MagneticButton>
        </motion.div>

        {/* Floating HUD chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-10 inset-x-0 flex flex-wrap items-center justify-center gap-3 px-6"
        >
          {["27 anos", "200+ projetos", "5 produtos próprios", "ISO 27001"].map((t, i) => (
            <motion.div
              key={t}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
              className="px-3 py-1.5 glass rounded-full text-[11px] font-mono uppercase tracking-wider text-muted-foreground"
            >
              {t}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Corner HUD */}
      <div className="absolute top-20 left-6 z-30 hidden lg:block font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
        <div className="flex items-center gap-2">
          <span className="h-1 w-1 bg-primary rounded-full" /> SYS · Moonlight OS v2026
        </div>
        <div className="mt-1 opacity-60">LAT 38.7223 · LON -9.1393</div>
      </div>
      <div className="absolute top-20 right-6 z-30 hidden lg:block font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 text-right">
        <div>
          STATUS · <span className="text-emerald-400">ONLINE</span>
        </div>
        <div className="mt-1 opacity-60">UPTIME 99.99%</div>
      </div>
    </section>
  );
}
