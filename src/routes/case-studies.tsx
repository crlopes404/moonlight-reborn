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
  { v: 28, l: "Anos de operação" },
  { v: 1998, l: "Fundação" },
  { v: 5, l: "Áreas de serviço" },
  { v: 99.9, suffix: "%", l: "SLA de suporte" },
];

const cases = [
  {
    client: "FCA / Fiat Chrysler", sector: "Automóvel", year: "Leads Management",
    challenge: "Captar, distribuir e acompanhar leads comerciais à escala de uma rede automóvel multimarca.",
    strategy: "Plataforma centralizada de leads management integrada com a rede de concessionários e canais digitais.",
    solution: "Sistema de captação, qualificação e encaminhamento de leads, com dashboards de acompanhamento comercial.",
    stack: ["Lead Management", "Integrações", "Dashboards", "Web"],
    kpis: [{ value: "360°", label: "Visão de leads" }, { value: "Multi", suffix: "-marca", label: "Rede de dealers" }, { value: "BI", label: "Acompanhamento" }],
    note: "Gestão de leads para uma das maiores redes automóveis do mundo.",
  },
  {
    client: "Homologacoes.net", sector: "Plataforma digital", year: "Web Platform",
    challenge: "Digitalizar e centralizar processos de homologação num portal acessível e fiável.",
    strategy: "Plataforma web chave-na-mão, com gestão documental e fluxos de processo online.",
    solution: "Portal aplicacional desenvolvido à medida, com integrações e suporte aplicacional contínuo.",
    stack: ["Web Platform", "Sistemas custom", "Integrações", "Suporte SLA"],
    kpis: [{ value: "100%", label: "Processo online" }, { value: "Self", suffix: "-service", label: "Acesso digital" }, { value: "SLA", label: "Suporte contínuo" }],
    note: "Plataforma digital chave-na-mão construída e mantida pela Moonlight.",
  },
  {
    client: "Rubisgás", sector: "Energia", year: "Business Systems",
    challenge: "Suportar a operação de distribuição de energia com sistemas de negócio robustos.",
    strategy: "Desenvolvimento e integração de sistemas aplicacionais alinhados com os processos do negócio.",
    solution: "Sistemas à medida com integração de dados e suporte SLA para operação crítica.",
    stack: ["Sistemas custom", "Integração de dados", "BI", "Suporte SLA"],
    kpis: [{ value: "B2B", label: "Operação crítica" }, { value: "Dados", label: "Integração" }, { value: "SLA", label: "Suporte" }],
    note: "Sistemas de negócio para um operador de referência no setor energético.",
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

            <div className="mt-12 border-l-2 border-primary pl-6 max-w-3xl">
              <p className="font-display text-xl md:text-2xl leading-snug">{c.note}</p>
              <div className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <span className="text-foreground">{c.client}</span> · Projeto Moonlight
              </div>
            </div>
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
