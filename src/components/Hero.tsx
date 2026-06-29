import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { ClientOnly, useNavigate } from "@tanstack/react-router";
import { MagneticButton } from "./MagneticButton";
import { MoonScene } from "./MoonScene";

export function Hero() {
  const navigate = useNavigate();
  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden">
      {/* Animated grid */}
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" />

      {/* Moon visual (right, half-cut) */}
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

      {/* Content — split: text left, moon (background) right */}
      <div className="relative z-30 mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 pt-28 pb-28 lg:grid-cols-2">
        {/* Left column */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-mono uppercase tracking-widest text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span>Moonlight Comunicação Global · Est. 1998</span>
            <Sparkles className="h-3 w-3 text-primary" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-7 font-display font-semibold text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.95] tracking-tight"
          >
            <span className="block text-gradient">O Futuro</span>
            <span className="block text-gradient-aurora">Não Espera</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-7 max-w-xl lead text-foreground/80 dark:text-muted-foreground text-balance mx-auto lg:mx-0"
          >
            Software à medida, Business Intelligence e consultoria IT — desde{" "}
            <span className="text-foreground font-medium">1998</span> a transformar empresas
            do setor automóvel e enterprise com tecnologia que{" "}
            <span className="text-foreground font-medium">antecipa o amanhã</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4"
          >
            <MagneticButton variant="primary" onClick={() => navigate({ to: "/contacto" })}>
              Quero ser contactado <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton variant="ghost" onClick={() => navigate({ to: "/produtos" })}>
              Conhecer o B.Analytics
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right column — floating "órbita" card over the moon (desktop) */}
        <div className="relative hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute right-0 top-1/2 mt-20 w-[210px] glass-elev rounded-2xl p-5"
          >
            <Sparkles className="size-4 text-primary" />
            <p className="mt-3 font-display text-lg leading-snug">
              A tecnologia<br />é a nossa <span className="text-gradient">órbita</span>.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Floating HUD chips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-10 inset-x-0 z-30 flex flex-wrap items-center justify-center gap-3 px-6"
      >
        {["Desde 1998", "Software à medida", "B.Analytics", "Suporte SLA"].map((t) => (
          <div
            key={t}
            className="px-3 py-1.5 glass rounded-full text-[11px] font-mono uppercase tracking-wider text-muted-foreground"
          >
            {t}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
