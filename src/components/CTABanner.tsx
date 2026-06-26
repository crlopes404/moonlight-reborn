import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTABanner({ eyebrow = "Pronto?", title = "Vamos desenhar o teu próximo sistema.", cta = "Iniciar projeto", to = "/contacto" }: { eyebrow?: string; title?: string; cta?: string; to?: string }) {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="group relative overflow-hidden rounded-[2rem] p-8 sm:p-10 md:p-16 text-primary-foreground ring-1 ring-white/15"
          style={{
            background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
            boxShadow: "0 30px 80px -28px var(--glow), 0 1px 0 0 oklch(1 0 0 / 0.18) inset",
          }}
        >
          {/* Depth: layered soft glows */}
          <div className="pointer-events-none absolute -right-16 -top-24 size-80 rounded-full opacity-70" style={{ background: "radial-gradient(circle, oklch(1 0 0 / 0.35), transparent 60%)", filter: "blur(40px)" }} />
          <div className="pointer-events-none absolute -bottom-32 -left-24 size-[26rem] rounded-full opacity-50 transition-opacity duration-700 group-hover:opacity-70" style={{ background: "radial-gradient(circle, var(--color-electric), transparent 65%)", filter: "blur(90px)" }} />

          {/* Fine grid texture for detail, masked for depth */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage: "linear-gradient(oklch(1 0 0 / 0.6) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.6) 1px, transparent 1px)",
              backgroundSize: "46px 46px",
              maskImage: "radial-gradient(ellipse 90% 110% at 100% 0%, black, transparent 72%)",
              WebkitMaskImage: "radial-gradient(ellipse 90% 110% at 100% 0%, black, transparent 72%)",
            }}
          />

          {/* Existing scanline shimmer + top sheen line */}
          <div className="absolute inset-0 scanline" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/30" />

          <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3.5 py-1.5 ring-1 ring-white/20 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] opacity-90">/ {eyebrow}</span>
              </div>
              <h3 className="mt-5 font-display text-4xl md:text-5xl leading-[1.04] tracking-tight text-balance">
                {title}
              </h3>
            </div>

            {/* Premium primary CTA */}
            <Link
              to={to}
              data-magnetic
              className="group/btn relative inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-white px-7 py-4 text-sm font-semibold text-primary shadow-[0_14px_44px_-10px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] md:self-auto"
            >
              {cta}
              <span className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover/btn:translate-x-0.5">
                <ArrowRight className="size-3.5" />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
