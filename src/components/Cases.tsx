import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "./Products";

const cases = [
  {
    client: "Banco Atlântico",
    sector: "Banking",
    year: "2024",
    challenge: "Modernização do core analytics",
    stack: ["Kafka", "Snowflake", "React", "Kubernetes"],
    kpis: [
      { value: 87, suffix: "%", label: "Redução de latência" },
      { value: 12, prefix: "€", suffix: "M", label: "Poupança anual" },
      { value: 240, suffix: "+", label: "Dashboards entregues" },
    ],
  },
  {
    client: "RetailCo Iberia",
    sector: "Retail",
    year: "2023",
    challenge: "Plataforma omnichannel headless",
    stack: ["Next.js", "Shopify", "M.Analytics", "GCP"],
    kpis: [
      { value: 3.2, suffix: "x", label: "Conversão checkout" },
      { value: 65, suffix: "%", label: "Time-to-market" },
      { value: 18, suffix: "M", prefix: "€", label: "GMV adicional" },
    ],
  },
  {
    client: "Lusiada Energy",
    sector: "Energy / IoT",
    year: "2024",
    challenge: "Rede IoT para smart grid",
    stack: ["MQTT", "TimescaleDB", "Edge AI", "AR"],
    kpis: [
      { value: 1.4, suffix: "M", label: "Sensores ativos" },
      { value: 42, suffix: "%", label: "Eficiência energética" },
      { value: 99.99, suffix: "%", label: "Uptime garantido" },
    ],
  },
];

export function Cases() {
  const [active, setActive] = useState(0);
  const c = cases[active];
  return (
    <section id="cases" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Case Studies"
          title="Transformações em tempo real"
          subtitle="Engenharia que move ponteiros de negócio. Selecionados de 450+ projetos entregues."
        />

        <div className="mt-16">
          <div className="flex flex-wrap gap-2">
            {cases.map((cs, i) => (
              <button
                key={cs.client}
                onClick={() => setActive(i)}
                data-magnetic
                className={`rounded-full px-5 py-2.5 text-sm font-mono transition-all ${
                  i === active
                    ? "bg-primary text-primary-foreground"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {String(i + 1).padStart(2, "0")} · {cs.client}
              </button>
            ))}
          </div>

          <motion.div
            key={c.client}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-10 glass-elev rounded-3xl p-8 md:p-12 holo-border relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 size-96 rounded-full pointer-events-none" style={{ background: "var(--glow)", filter: "blur(80px)", opacity: 0.5 }} />

            <div className="relative grid lg:grid-cols-[1.2fr_1fr] gap-12">
              <div>
                <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  <span>{c.sector}</span>
                  <span className="size-1 rounded-full bg-primary" />
                  <span>{c.year}</span>
                </div>
                <h3 className="mt-4 font-display text-4xl md:text-5xl tracking-tight">{c.client}</h3>
                <p className="mt-4 text-lg text-muted-foreground">{c.challenge}</p>

                <div className="mt-8">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {c.stack.map((t, i) => (
                      <motion.span
                        key={t}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        className="rounded-md glass px-3 py-1.5 text-xs font-mono"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* timeline */}
                <div className="mt-10">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Timeline</div>
                  <div className="relative h-1 rounded-full bg-border/50 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.4, ease: "easeOut" }}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-electric"
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-[10px] font-mono text-muted-foreground">
                    <span>Discovery</span><span>Design</span><span>Build</span><span>Scale</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 content-start">
                {c.kpis.map((k) => (
                  <KpiCard key={k.label} {...k} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function KpiCard({ value, suffix, prefix, label }: { value: number; suffix?: string; prefix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) { setN(0); return; }
    const dur = 1200;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setN(value * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  const formatted = value % 1 === 0 ? Math.round(n).toString() : n.toFixed(2);

  return (
    <div ref={ref} className="glass rounded-2xl p-6 relative overflow-hidden">
      <div className="font-display text-5xl tracking-tight">
        {prefix}<span className="text-gradient">{formatted}</span>{suffix}
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
