import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Target, BarChart3, Link2, Gamepad2, ShoppingBag, ArrowRight, Check } from "lucide-react";
import { CTABanner } from "@/components/CTABanner";
import mLeadsAsset from "@/assets/m-leads.png.asset.json";
import mAnalyticsAsset from "@/assets/m-analytics.png.asset.json";
import mChainAsset from "@/assets/m-chain.png.asset.json";
import mGamingAsset from "@/assets/m-gaming.png.asset.json";
import mEcommerceAsset from "@/assets/m-ecommerce.png.asset.json";
import mLogoAsset from "@/assets/mlogo0.png.asset.json";

const productImages: Record<string, string> = {
  leads: mLeadsAsset.url,
  analytics: mAnalyticsAsset.url,
  chain: mChainAsset.url,
  gaming: mGamingAsset.url,
  ecom: mEcommerceAsset.url,
};

export const Route = createFileRoute("/produtos")({
  head: () => ({
    meta: [
      { title: "Produtos — Moonlight · M.Leads, M.Analytics, M.Chain+, M.Gaming, Ecommerce" },
      { name: "description", content: "Cinco produtos proprietários para sales, analytics, supply chain, AR/VR e commerce." },
      { property: "og:title", content: "Produtos — Moonlight" },
      { property: "og:description", content: "Um sistema orbital de tecnologia proprietária." },
    ],
  }),
  component: Produtos,
});

const products = [
  {
    id: "leads", name: "M.Leads", icon: Target, tag: "Sales Intelligence",
    color: "oklch(0.65 0.28 295)",
    headline: "Captura, qualifica e converte — em tempo real.",
    desc: "Plataforma de lead intelligence com scoring alimentado por IA, integrações CRM nativas e attribution multi-touch.",
    features: ["Lead scoring em tempo real", "Integração HubSpot/Salesforce", "Attribution multi-touch", "Automação de outreach", "Dashboards comerciais"],
    stack: ["Python", "Kafka", "PostgreSQL", "OpenAI", "Webhooks"],
    metrics: [{ k: "Lead-to-meeting", v: "+38%" }, { k: "Tempo qualificação", v: "−72%" }, { k: "Pipeline visibility", v: "100%" }],
  },
  {
    id: "analytics", name: "M.Analytics", icon: BarChart3, tag: "Business Intelligence",
    color: "oklch(0.7 0.22 245)",
    headline: "O sistema nervoso da decisão executiva.",
    desc: "Dashboards executivos com modelagem preditiva, KPIs em tempo real e drill-down a qualquer dimensão do negócio.",
    features: ["Modelos preditivos no-code", "Conectores nativos a 50+ sources", "Embedded analytics", "Alertas inteligentes", "Self-service para C-level"],
    stack: ["Snowflake", "dbt", "React", "Apache Superset", "Python"],
    metrics: [{ k: "Time-to-insight", v: "−85%" }, { k: "Adoção C-level", v: "94%" }, { k: "Custos BI", v: "−40%" }],
  },
  {
    id: "chain", name: "M.Chain+", icon: Link2, tag: "Supply Chain",
    color: "oklch(0.7 0.3 330)",
    headline: "Rastreabilidade total. Otimização automática.",
    desc: "Orquestração end-to-end da supply chain com rastreabilidade blockchain e otimização logística por reinforcement learning.",
    features: ["Track & trace blockchain", "Otimização de rotas RL", "Forecast de procura", "Compliance automático", "Marketplace de fornecedores"],
    stack: ["Hyperledger", "Go", "Kubernetes", "TimescaleDB", "GraphQL"],
    metrics: [{ k: "Custos logística", v: "−22%" }, { k: "Lead time", v: "−35%" }, { k: "OTIF", v: "98.7%" }],
  },
  {
    id: "gaming", name: "M.Gaming", icon: Gamepad2, tag: "AR / VR · Gamification",
    color: "oklch(0.75 0.2 200)",
    headline: "Treinar, vender e formar — em mundos novos.",
    desc: "Engine proprietário para gamificação corporativa, training imersivo e experiências AR/VR para enterprise.",
    features: ["Editor visual de cenários", "Multi-plataforma (Vision Pro, Quest, Web)", "Analytics de performance", "Multiplayer corporativo", "LMS integrado"],
    stack: ["Unity", "WebXR", "Three.js", "Node", "Cassandra"],
    metrics: [{ k: "Retenção formação", v: "4×" }, { k: "Custo por trainee", v: "−60%" }, { k: "Time-to-competency", v: "−50%" }],
  },
  {
    id: "ecom", name: "Ecommerce", icon: ShoppingBag, tag: "Commerce Suite",
    color: "oklch(0.7 0.25 60)",
    headline: "Comércio headless. Conversão sem fricção.",
    desc: "Plataforma headless de comércio com checkout otimizado, gestão omnichannel e analytics de conversão integrados.",
    features: ["Checkout one-page", "PIM multi-marketplace", "A/B testing nativo", "PWA & offline-first", "Pagamentos globais"],
    stack: ["Next.js", "Stripe", "Algolia", "GraphQL", "Edge functions"],
    metrics: [{ k: "Conversão", v: "+3.2×" }, { k: "LCP", v: "<1.2s" }, { k: "Cart abandonment", v: "−45%" }],
  },
];

function Produtos() {
  const [active, setActive] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number>(0);
  const expandedIdx = active ?? pinned;
  const sel = products[expandedIdx];
  const accent = sel.color;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-12 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-mono text-xs uppercase tracking-[0.3em] text-primary">/ Produtos Proprietários</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 font-display text-[clamp(2.8rem,7vw,6rem)] leading-[0.95] tracking-tight max-w-5xl">
            Um sistema orbital de <span className="text-gradient">tecnologia proprietária</span>.
          </motion.h1>
        </div>
      </section>

      {/* Orbital + showcase */}
      <section className="relative py-12 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
          {/* orbital */}
          <div className="relative aspect-square max-w-[600px] w-full mx-auto">
            {[0.55, 0.78, 1].map((s, i) => (
              <div key={i} className="absolute rounded-full border border-border/40" style={{ inset: `${(1 - s) * 50}%`, borderStyle: i === 1 ? "dashed" : "solid" }} />
            ))}
            <div className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full glass-elev grid place-items-center holo-border overflow-hidden dark:!bg-white dark:!border-white/80">
              <div className="absolute inset-0 rounded-full pointer-events-none dark:bg-[radial-gradient(circle,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.85)_60%,rgba(255,255,255,0.6)_100%)]" />
              <img src={mLogoAsset.url} alt="Moonlight" className="relative size-20 object-contain opacity-100" style={{ filter: "none" }} />
              <div className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: `0 0 60px ${accent}`, transition: "box-shadow 600ms" }} />
            </div>

            <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute inset-0">
              {products.map((p, i) => {
                const angle = (i / products.length) * Math.PI * 2;
                const r = 47;
                const x = 50 + Math.cos(angle) * r;
                const y = 50 + Math.sin(angle) * r;
                const isActive = i === expandedIdx;
                return (
                  <motion.button
                    key={p.id}
                    data-magnetic
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                    onClick={() => setPinned(i)}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${x}%`, top: `${y}%` }}
                    whileHover={{ scale: 1.15 }}
                  >
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                      className={`size-20 md:size-24 rounded-2xl glass grid place-items-center transition-all overflow-hidden p-2 dark:!bg-[rgba(216,197,255,0.18)] dark:hover:!bg-[rgba(216,197,255,0.26)] ${isActive ? "holo-border" : ""}`}
                      style={{ boxShadow: isActive ? `0 0 40px ${p.color}, inset 0 1px 0 oklch(1 0 0 / 0.1)` : undefined }}
                    >
                      <img src={productImages[p.id]} alt={p.name} className="max-w-full max-h-full object-contain" />
                    </motion.div>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          {/* showcase */}
          <div className="relative min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={sel.id}
                initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0)" }}
                exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="glass-elev rounded-3xl p-8 md:p-10 holo-border relative overflow-hidden"
              >
                <div className="absolute -top-20 -right-20 size-64 rounded-full pointer-events-none" style={{ background: sel.color, opacity: 0.2, filter: "blur(60px)" }} />
                <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {String(expandedIdx + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")} · {sel.tag}
                </div>
                <h3 className="mt-3 font-display text-4xl md:text-5xl tracking-tight">{sel.name}</h3>
                <p className="mt-2 text-lg text-primary">{sel.headline}</p>
                <p className="mt-5 text-muted-foreground leading-relaxed">{sel.desc}</p>

                {/* mock dashboard */}
                <div className="mt-8 glass rounded-2xl p-4 relative overflow-hidden">
                  <div className="absolute inset-0 scanline opacity-30" />
                  <div className="relative flex items-end gap-1.5 h-24">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${20 + Math.sin(i * 0.6 + expandedIdx) * 30 + Math.random() * 40}%` }}
                        transition={{ delay: i * 0.02, duration: 0.6 }}
                        className="flex-1 rounded-sm"
                        style={{ background: `linear-gradient(to top, ${sel.color}, transparent)` }}
                      />
                    ))}
                  </div>
                </div>

                {/* metrics */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {sel.metrics.map((m) => (
                    <div key={m.k} className="glass rounded-lg p-3 text-center">
                      <div className="font-display text-2xl text-gradient">{m.v}</div>
                      <div className="mt-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{m.k}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Detailed product expansion */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={sel.id + "-detail"}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <div className="glass-elev rounded-3xl p-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Capabilities</div>
                <ul className="space-y-3">
                  {sel.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="size-4 text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-elev rounded-3xl p-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Technology stack</div>
                <div className="flex flex-wrap gap-2">
                  {sel.stack.map((t) => (
                    <span key={t} className="rounded-md glass px-3 py-1.5 text-xs font-mono">{t}</span>
                  ))}
                </div>
                <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Business benefits</div>
                <p className="text-sm text-muted-foreground">
                  Implementação chave-na-mão em 6–12 semanas. Hospedagem em cloud privada
                  ou managed por nós. SLA 99.9% incluído.
                </p>
                <button data-magnetic className="mt-6 inline-flex items-center gap-2 text-sm text-primary group">
                  Pedir demo <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <CTABanner eyebrow="demo" title="Vê os produtos a funcionar em ambiente real." cta="Agendar demo" />
    </>
  );
}
