import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import { LogoScene } from "@/components/LogoScene";

export const Route = createFileRoute("/teste")({
  head: () => ({ meta: [{ title: "Teste — Moonlight" }] }),
  component: Teste,
});

// Service labels that float around the logo "core"
const orbit = [
  { label: "Software Development", style: "top-[6%] left-[4%]" },
  { label: "BI & Marketing", style: "top-[2%] right-[10%]" },
  { label: "IT Consulting", style: "top-1/2 -translate-y-1/2 right-[1%]" },
  { label: "IoT / AR / VR", style: "bottom-[6%] right-[14%]" },
  { label: "Suporte SLA", style: "bottom-[10%] left-[6%]" },
];

function Teste() {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background, same language as the current hero */}
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" />
      <div
        className="absolute left-[72%] top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full opacity-60 animate-pulse-glow"
        style={{ background: "radial-gradient(circle, oklch(0.62 0.27 295 / 0.4), transparent 60%)" }}
      />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 pt-28 pb-16 lg:grid-cols-[1.05fr_1fr] lg:pt-24">
        {/* Left — copy + CTAs */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Moonlight Comunicação Global · Est. 1998
            <Sparkles className="h-3 w-3 text-primary" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.9 }}
            className="mt-7 font-display font-semibold text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.95] tracking-tight"
          >
            <span className="block text-gradient">O Futuro</span>
            <span className="block text-gradient-aurora">Não Espera</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.9 }}
            className="mt-7 lead text-muted-foreground measure mx-auto lg:mx-0"
          >
            Software à medida, Business Intelligence e consultoria IT — desde
            <span className="text-foreground font-medium"> 1998</span> a transformar empresas
            do setor automóvel e enterprise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-4"
          >
            <MagneticButton variant="primary" onClick={() => navigate({ to: "/contacto" })}>
              Quero ser contactado <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton variant="ghost" onClick={() => navigate({ to: "/produtos" })}>
              Conhecer o B.Analytics
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right — logo "core" with floating service labels */}
        <div className="relative order-1 lg:order-2 h-[360px] sm:h-[460px] lg:h-[600px]">
          <LogoScene className="absolute inset-0" />

          {/* floating service chips */}
          {orbit.map((o, i) => (
            <motion.div
              key={o.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, y: [0, -7, 0] }}
              transition={{ opacity: { delay: 1 + i * 0.12, duration: 0.6 }, scale: { delay: 1 + i * 0.12, duration: 0.6 }, y: { duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut" } }}
              className={`absolute ${o.style} hidden sm:block pointer-events-none rounded-full glass px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-muted-foreground`}
            >
              {o.label}
            </motion.div>
          ))}

          {/* corner HUD chips */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.8 }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2"
          >
            {["Desde 1998", "B.Analytics"].map((t) => (
              <span key={t} className="rounded-full glass px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{t}</span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
