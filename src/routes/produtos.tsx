import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Database, BarChart3, Cpu, Workflow, Bell, Plug, ArrowRight, Check } from "lucide-react";
import { CTABanner } from "@/components/CTABanner";
import mLogoAsset from "@/assets/mlogo0.png.asset.json";

export const Route = createFileRoute("/produtos")({
  head: () => ({
    meta: [
      { title: "B.Analytics — Produto Moonlight · Integração de Dados, BI & Decisão" },
      { name: "description", content: "B.Analytics: plataforma própria da Moonlight para integração de dados, dashboards de Business Intelligence e sistemas de apoio à decisão." },
      { property: "og:title", content: "B.Analytics — Moonlight" },
      { property: "og:description", content: "Integração de dados + BI dashboards + sistemas de decisão." },
    ],
  }),
  component: Produtos,
});

const accent = "oklch(0.6 0.22 245)";

const modules = [
  {
    id: "integration", name: "Data Integration", icon: Database,
    tag: "Integração de Dados",
    headline: "Todas as fontes. Uma verdade.",
    desc: "Conectores para ERPs, CRMs, ficheiros e APIs — dados consolidados, limpos e prontos a analisar, em tempo real.",
    features: ["Conectores nativos a múltiplas fontes", "ETL/ELT gerido", "Qualidade e validação de dados", "Sincronização em tempo real", "Modelo de dados unificado"],
  },
  {
    id: "dashboards", name: "BI Dashboards", icon: BarChart3,
    tag: "Business Intelligence",
    headline: "O negócio, à velocidade do olhar.",
    desc: "Dashboards executivos com KPIs em tempo real, drill-down a qualquer dimensão e relatórios self-service para todas as áreas.",
    features: ["KPIs e dashboards em tempo real", "Drill-down multi-dimensão", "Relatórios self-service", "Visualizações interativas", "Exportação e partilha"],
  },
  {
    id: "decision", name: "Decision Systems", icon: Cpu,
    tag: "Sistemas de Decisão",
    headline: "Da análise à ação.",
    desc: "Motores de regras, alertas inteligentes e apoio à decisão que transformam indicadores em recomendações acionáveis.",
    features: ["Motor de regras de negócio", "Alertas e thresholds inteligentes", "Cenários e simulação", "Recomendações acionáveis", "Workflows de decisão"],
  },
];

const metrics = [
  { k: "Fontes integráveis", v: "50+" },
  { k: "Tempo de insight", v: "−85%" },
  { k: "Decisão data-driven", v: "100%" },
];

const stack = ["Data Warehouse", "ETL/ELT", "REST APIs", "Dashboards", "Cloud / On-premise", "Single Sign-On"];

function Produtos() {
  const [active, setActive] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number>(1);
  const idx = active ?? pinned;
  const sel = modules[idx];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-12 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">/ Produto Proprietário</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 display-1 max-w-5xl">
            <span className="text-gradient">B.Analytics</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 lead text-muted-foreground measure">
            A plataforma de dados da Moonlight: integração de fontes, dashboards de Business
            Intelligence e sistemas de apoio à decisão — num único produto, construído em casa.
          </motion.p>
        </div>
      </section>

      {/* Orbital + showcase */}
      <section className="relative section-sm overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
          {/* orbital */}
          <div className="relative aspect-square max-w-[600px] w-full mx-auto">
            {[0.55, 0.78, 1].map((s, i) => (
              <div key={i} className="absolute rounded-full border border-border/40" style={{ inset: `${(1 - s) * 50}%`, borderStyle: i === 1 ? "dashed" : "solid" }} />
            ))}
            <div className="absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full glass-elev grid place-items-center holo-border overflow-hidden">
              <img src={mLogoAsset.url} alt="B.Analytics" className="relative size-16 object-contain" />
              <div className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: `0 0 60px ${accent}`, transition: "box-shadow 600ms" }} />
            </div>

            <motion.div animate={{ rotate: 360 }} transition={{ duration: 70, repeat: Infinity, ease: "linear" }} className="absolute inset-0">
              {modules.map((m, i) => {
                const angle = (i / modules.length) * Math.PI * 2 - Math.PI / 2;
                const r = 47;
                const x = 50 + Math.cos(angle) * r;
                const y = 50 + Math.sin(angle) * r;
                const isActive = i === idx;
                return (
                  <motion.button
                    key={m.id}
                    data-magnetic
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                    onClick={() => setPinned(i)}
                    aria-label={m.name}
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl"
                    style={{ left: `${x}%`, top: `${y}%` }}
                    whileHover={{ scale: 1.12 }}
                  >
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
                      className={`size-24 md:size-28 rounded-2xl glass grid place-items-center transition-all ${isActive ? "holo-border" : ""}`}
                      style={{ boxShadow: isActive ? `0 0 40px ${accent}, inset 0 1px 0 oklch(1 0 0 / 0.1)` : undefined }}
                    >
                      <div className="text-center px-2">
                        <m.icon className="size-6 mx-auto mb-1.5 text-primary" />
                        <div className="text-[10px] font-mono uppercase tracking-wider leading-tight">{m.name}</div>
                      </div>
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
                <div className="absolute -top-20 -right-20 size-64 rounded-full pointer-events-none" style={{ background: accent, opacity: 0.18, filter: "blur(60px)" }} />
                <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")} / {String(modules.length).padStart(2, "0")} · {sel.tag}
                </div>
                <h2 className="mt-3 heading-3 tracking-tight">{sel.name}</h2>
                <p className="mt-2 lead text-primary">{sel.headline}</p>
                <p className="mt-5 text-muted-foreground leading-relaxed">{sel.desc}</p>

                {/* mock dashboard */}
                <div className="mt-8 glass rounded-2xl p-4 relative overflow-hidden">
                  <div className="absolute inset-0 scanline opacity-30" />
                  <div className="relative flex items-end gap-1.5 h-24">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${20 + Math.sin(i * 0.6 + idx) * 30 + ((i * 13) % 40)}%` }}
                        transition={{ delay: i * 0.02, duration: 0.6 }}
                        className="flex-1 rounded-sm"
                        style={{ background: `linear-gradient(to top, ${accent}, transparent)` }}
                      />
                    ))}
                  </div>
                </div>

                {/* capabilities */}
                <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {sel.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="size-4 text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Why B.Analytics */}
      <section className="section">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-6">
          <div className="glass-elev rounded-3xl p-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">O que entrega</div>
            <ul className="space-y-3">
              {[
                { icon: Plug, t: "Integração de dados de qualquer fonte" },
                { icon: Workflow, t: "Pipelines de dados governados e auditáveis" },
                { icon: BarChart3, t: "Dashboards de BI para todas as áreas" },
                { icon: Bell, t: "Alertas inteligentes e proativos" },
                { icon: Cpu, t: "Sistemas de apoio à decisão" },
              ].map(({ icon: Icon, t }) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="size-8 rounded-lg glass grid place-items-center shrink-0"><Icon className="size-4 text-primary" /></span>
                  <span className="pt-1.5">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-elev rounded-3xl p-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Resultados típicos</div>
            <div className="grid grid-cols-3 gap-3">
              {metrics.map((m) => (
                <div key={m.k} className="glass rounded-xl p-4 text-center">
                  <div className="font-display text-2xl text-gradient">{m.v}</div>
                  <div className="mt-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{m.k}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Tecnologia & deployment</div>
            <div className="flex flex-wrap gap-2">
              {stack.map((t) => (
                <span key={t} className="rounded-md glass px-3 py-1.5 text-xs font-mono">{t}</span>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Disponível em cloud ou on-premise, com integração e suporte SLA da Moonlight.
            </p>
            <button data-magnetic className="mt-6 inline-flex items-center gap-2 text-sm text-primary group">
              Pedir demo <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      <CTABanner eyebrow="demo" title="Vê o B.Analytics a funcionar com os teus dados." cta="Agendar demo" />
    </>
  );
}
