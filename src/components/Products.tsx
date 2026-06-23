import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Target, BarChart3, Link2, Gamepad2, ShoppingBag } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
export { SectionHeader };



const products = [
  {
    id: "leads",
    name: "M.Leads",
    icon: Target,
    tag: "Sales Intelligence",
    desc: "Plataforma de captura e qualificação de leads alimentada por IA, com scoring em tempo real e integrações CRM nativas.",
    color: "oklch(0.65 0.28 295)",
  },
  {
    id: "analytics",
    name: "M.Analytics",
    icon: BarChart3,
    tag: "Business Intelligence",
    desc: "Dashboards executivos com modelagem preditiva, KPIs em tempo real e drill-down a qualquer dimensão do negócio.",
    color: "oklch(0.7 0.22 245)",
  },
  {
    id: "chain",
    name: "M.Chain+",
    icon: Link2,
    tag: "Supply Chain",
    desc: "Orquestração end-to-end da supply chain com rastreabilidade blockchain e otimização logística automática.",
    color: "oklch(0.7 0.3 330)",
  },
  {
    id: "gaming",
    name: "M.Gaming",
    icon: Gamepad2,
    tag: "Interactive Experiences",
    desc: "Engine proprietário para gamificação corporativa, training imersivo e experiências AR/VR para enterprise.",
    color: "oklch(0.75 0.2 200)",
  },
  {
    id: "ecom",
    name: "Ecommerce",
    icon: ShoppingBag,
    tag: "Commerce Suite",
    desc: "Plataforma headless de comércio com checkout otimizado, gestão omnichannel e analytics de conversão integrados.",
    color: "oklch(0.7 0.25 60)",
  },
];

export function Products() {
  const [active, setActive] = useState<number | null>(null);
  const sel = active !== null ? products[active] : null;
  const accent = sel?.color ?? "oklch(0.65 0.28 295)";

  return (
    <section id="products" className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Produtos Proprietários"
          title="Módulos de tecnologia"
          subtitle="Cinco produtos desenhados como um sistema orbital — cada um autónomo, todos interligados."
        />

        <div className="mt-20 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          {/* orbital */}
          <div className="relative aspect-square max-w-[600px] w-full mx-auto">
            {/* concentric rings */}
            {[0.55, 0.78, 1].map((s, i) => (
              <div
                key={i}
                className="absolute rounded-full border border-border/40"
                style={{
                  inset: `${(1 - s) * 50}%`,
                  borderStyle: i === 1 ? "dashed" : "solid",
                }}
              />
            ))}

            {/* core */}
            <div className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full glass-elev grid place-items-center holo-border">
              <div className="text-center">
                <div className="font-display text-xl text-gradient leading-none">M.</div>
                <div className="mt-1 text-[8px] uppercase tracking-[0.3em] text-muted-foreground">core</div>
              </div>

              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  boxShadow: sel ? `0 0 60px ${accent}` : "none",
                  transition: "box-shadow 600ms",
                }}
              />
            </div>

            {/* nodes */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              {products.map((p, i) => {
                const angle = (i / products.length) * Math.PI * 2;
                const r = 50; // % radius
                const x = 50 + Math.cos(angle) * r;
                const y = 50 + Math.sin(angle) * r;
                const isActive = i === active;
                return (
                  <motion.button
                    key={p.id}
                    data-magnetic
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive((cur) => (cur === i ? null : cur))}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive((cur) => (cur === i ? null : cur))}
                    onClick={() => setActive(i)}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${x}%`, top: `${y}%` }}
                    whileHover={{ scale: 1.15 }}
                  >
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                      className={`size-20 md:size-24 rounded-2xl glass grid place-items-center transition-all ${isActive ? "holo-border" : ""}`}
                      style={{
                        boxShadow: isActive ? `0 0 40px ${p.color}, inset 0 1px 0 oklch(1 0 0 / 0.1)` : undefined,
                      }}
                    >
                      <div className="text-center">
                        <p.icon className="size-5 mx-auto mb-1" style={{ color: p.color }} />
                        <div className="text-[10px] font-mono uppercase tracking-wider">{p.name}</div>
                      </div>
                    </motion.div>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* connection line to active */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={accent} stopOpacity="0" />
                  <stop offset="100%" stopColor={accent} stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* info panel */}
          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {sel && active !== null && (
                <motion.div
                  key={sel.id}
                  initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0)" }}
                  exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-elev rounded-3xl p-8 md:p-10 holo-border relative overflow-hidden"
                >
                  <div
                    className="absolute -top-20 -right-20 size-64 rounded-full pointer-events-none"
                    style={{ background: sel.color, opacity: 0.2, filter: "blur(60px)" }}
                  />
                  <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    {String(active + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")} · {sel.tag}
                  </div>
                  <h3 className="mt-3 font-display text-4xl md:text-5xl tracking-tight">{sel.name}</h3>
                  <p className="mt-5 text-muted-foreground leading-relaxed">{sel.desc}</p>

                  <div className="mt-8 grid grid-cols-3 gap-3 font-mono text-[10px] uppercase tracking-wider">
                    {["API-first", "Cloud-native", "Real-time"].map((t) => (
                      <div key={t} className="glass rounded-lg px-3 py-2 text-center">
                        {t}
                      </div>
                    ))}
                  </div>

                  <button data-magnetic className="mt-8 inline-flex items-center gap-2 text-sm text-primary group">
                    Explorar módulo
                    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6 flex gap-2">
              {products.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setActive(i)}
                  className={`h-1 flex-1 rounded-full transition-all ${i === active ? "bg-primary" : "bg-border"}`}
                  aria-label={p.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

