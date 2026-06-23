import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { CTABanner } from "@/components/CTABanner";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — Moonlight" },
      { name: "description", content: "Portfólio de transformações digitais entregues pela Moonlight." },
      { property: "og:title", content: "Case Studies — Moonlight" },
      { property: "og:description", content: "450+ projetos. Engenharia que move ponteiros de negócio." },
    ],
  }),
  component: CasesPage,
});

const stats = [
  { v: 450, suffix: "+", l: "Projetos entregues" },
  { v: 27, l: "Anos de operação" },
  { v: 99.99, suffix: "%", l: "SLA médio" },
  { v: 18, l: "Setores ativos" },
];

const cases = [
  {
    client: "Banco Atlântico", sector: "Banking", year: "2024",
    challenge: "Core analytics legado incapaz de suportar reporting regulatório em tempo real.",
    strategy: "Migração para lakehouse com camada semântica unificada e dashboards self-service.",
    solution: "Kafka + Snowflake + dbt + React frontend com 240 dashboards executivos.",
    stack: ["Kafka", "Snowflake", "dbt", "React", "Kubernetes"],
    kpis: [{ value: 87, suffix: "%", label: "Redução de latência" }, { value: 12, prefix: "€", suffix: "M", label: "Poupança anual" }, { value: 240, suffix: "+", label: "Dashboards" }],
    testimonial: { quote: "A Moonlight redesenhou a nossa stack analítica em 6 meses. Sem teatro.", who: "Mariana Costa", role: "CTO" },
  },
  {
    client: "RetailCo Iberia", sector: "Retail", year: "2023",
    challenge: "Plataforma monolítica a limitar expansão omnichannel ibérica.",
    strategy: "Headless commerce com PIM unificado e edge rendering para LCP <1.2s.",
    solution: "Next.js + Shopify + M.Analytics + edge cache global GCP.",
    stack: ["Next.js", "Shopify", "M.Analytics", "GCP", "Algolia"],
    kpis: [{ value: 3.2, suffix: "x", label: "Conversão checkout" }, { value: 65, suffix: "%", label: "Time-to-market" }, { value: 18, suffix: "M", prefix: "€", label: "GMV adicional" }],
    testimonial: { quote: "Pensam em décadas. Raro encontrar este nível de parceria.", who: "Pedro Vasconcelos", role: "CEO" },
  },
  {
    client: "Lusiada Energy", sector: "Energy / IoT", year: "2024",
    challenge: "Smart grid nacional com 1.4M sensores e zero observabilidade unificada.",
    strategy: "Plataforma IoT edge-first com AI on-device e digital twin AR para manutenção.",
    solution: "MQTT broker geo-distribuído, TimescaleDB hypertables, modelos preditivos.",
    stack: ["MQTT", "TimescaleDB", "Edge AI", "AR", "Rust"],
    kpis: [{ value: 1.4, suffix: "M", label: "Sensores ativos" }, { value: 42, suffix: "%", label: "Eficiência energética" }, { value: 99.99, suffix: "%", label: "Uptime garantido" }],
    testimonial: { quote: "Infraestrutura crítica. Não há board sem o M.Analytics aberto.", who: "Inês Marques", role: "CDO" },
  },
];

function CasesPage() {
  return (
    <>
      <section className="relative pt-40 pb-16">
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-mono text-xs uppercase tracking-[0.3em] text-primary">/ Case Studies</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 font-display text-[clamp(2.8rem,8vw,7rem)] leading-[0.95] tracking-tight max-w-5xl">
            <span className="text-gradient">Portfólio</span> de inovação digital.
          </motion.h1>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <Counter key={s.l} {...s} />
            ))}
          </div>
        </div>
      </section>

      {cases.map((c, i) => (
        <CaseStudy key={c.client} c={c} index={i} />
      ))}

      <CTABanner eyebrow="próximo" title="O teu projeto pode ser o próximo aqui." cta="Falar connosco" />
    </>
  );
}

function Counter({ v, suffix, prefix, l }: { v: number; suffix?: string; prefix?: string; l: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / 1400, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setN(v * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, v]);

  const f = v % 1 === 0 ? Math.round(n).toString() : n.toFixed(2);
  return (
    <div ref={ref} className="glass rounded-2xl p-6">
      <div className="font-display text-4xl md:text-5xl">
        {prefix}<span className="text-gradient">{f}</span>{suffix}
      </div>
      <div className="mt-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">{l}</div>
    </div>
  );
}

function CaseStudy({ c, index }: { c: any; index: number }) {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="glass-elev rounded-3xl p-8 md:p-12 holo-border relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 size-96 rounded-full pointer-events-none" style={{ background: "var(--glow)", filter: "blur(80px)", opacity: 0.4 }} />

          <div className="relative">
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span className="size-1 rounded-full bg-primary" />
              <span>{c.sector}</span>
              <span className="size-1 rounded-full bg-primary" />
              <span>{c.year}</span>
            </div>
            <h2 className="mt-4 font-display text-4xl md:text-6xl tracking-tight">{c.client}</h2>

            <div className="mt-10 grid lg:grid-cols-3 gap-8">
              <Block label="Challenge" body={c.challenge} />
              <Block label="Strategy" body={c.strategy} />
              <Block label="Solution" body={c.solution} />
            </div>

            <div className="mt-10 grid md:grid-cols-2 gap-8">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Technology stack</div>
                <div className="flex flex-wrap gap-2">
                  {c.stack.map((t: string) => (
                    <motion.span key={t} whileHover={{ y: -3 }} className="rounded-md glass px-3 py-1.5 text-xs font-mono">{t}</motion.span>
                  ))}
                </div>
                <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Timeline</div>
                <div className="relative h-1 rounded-full bg-border/50 overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 1.4 }} className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-electric" />
                </div>
                <div className="mt-2 flex justify-between text-[10px] font-mono text-muted-foreground">
                  <span>Discovery</span><span>Design</span><span>Build</span><span>Scale</span>
                </div>
              </div>

              <div className="grid gap-3">
                {c.kpis.map((k: any) => (
                  <div key={k.label} className="glass rounded-xl p-5 flex items-baseline justify-between">
                    <div className="font-display text-3xl">
                      {k.prefix}<span className="text-gradient">{k.value}</span>{k.suffix}
                    </div>
                    <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{k.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <blockquote className="mt-12 border-l-2 border-primary pl-6 max-w-3xl">
              <p className="font-display text-xl md:text-2xl leading-snug italic">"{c.testimonial.quote}"</p>
              <footer className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <span className="text-foreground">{c.testimonial.who}</span> · {c.testimonial.role}, {c.client}
              </footer>
            </blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Block({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3">/ {label}</div>
      <p className="text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}
