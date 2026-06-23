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
          className="relative rounded-3xl p-10 md:p-16 overflow-hidden text-primary-foreground"
          style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))" }}
        >
          <div className="absolute inset-0 scanline" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 80% 20%, oklch(1 0 0 / 0.3), transparent 50%)" }} />
          <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.3em] opacity-80">/ {eyebrow}</div>
              <h3 className="mt-4 font-display text-4xl md:text-5xl leading-tight max-w-xl">{title}</h3>
            </div>
            <Link to={to} data-magnetic className="inline-flex items-center gap-3 text-sm font-medium px-6 py-3 rounded-full bg-white/15 backdrop-blur-md hover:bg-white/25 transition-colors">
              {cta} <ArrowRight className="size-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
