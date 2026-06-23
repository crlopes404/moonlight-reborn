import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Code2, BarChart3, Briefcase, Boxes, Headphones, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { CTABanner } from "@/components/CTABanner";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços — Moonlight" },
      { name: "description", content: "Software Development, BI & Marketing, IT Consulting, IoT/AR/VR e Suporte SLA — engenharia de excelência desde 1998." },
      { property: "og:title", content: "Serviços — Moonlight" },
      { property: "og:description", content: "Cinco disciplinas, uma filosofia." },
    ],
  }),
  component: Servicos,
});

const services = [
  {
    icon: Code2, title: "Software Development", n: "01",
    desc: "Aplicações móveis híbridas, plataformas SaaS e sistemas à medida com arquiteturas escaláveis e DevOps moderno.",
    tech: ["Mobile híbrido", "SaaS", "Sistemas custom", "React", "Node", "Cloud"],
    process: ["Discovery", "Architecture", "Build", "Ship", "Iterate"],
    benefits: ["Apps híbridas multi-plataforma", "Plataformas SaaS multi-tenant", "Sistemas à medida do negócio"],
    cases: "ERPs, portais, super-apps, plataformas SaaS, sistemas internos",
  },
  {
    icon: BarChart3, title: "BI & Marketing", n: "02",
    desc: "Analytics, sistemas de geração e gestão de leads e operações de contact center — dados que convertem.",
    tech: ["Analytics", "Lead systems", "Contact center", "B.Analytics", "Dashboards"],
    process: ["Audit", "Data modeling", "Dashboards", "Lead ops", "Adoption"],
    benefits: ["Analytics e KPIs em tempo real", "Sistemas de gestão de leads", "Contact center integrado"],
    cases: "Lead management, reporting executivo, campanhas data-driven",
  },
  {
    icon: Briefcase, title: "IT Consulting", n: "03",
    desc: "Arquitetura de sistemas, auditorias técnicas e equipas dedicadas em modelo TaaS (Team as a Service).",
    tech: ["Arquitetura", "Auditorias", "TaaS", "Cloud", "Segurança"],
    process: ["Diagnóstico", "Roadmap", "Auditoria", "Execução", "Handover"],
    benefits: ["Arquitetura empresarial sólida", "Auditorias técnicas e de segurança", "Equipas TaaS dedicadas"],
    cases: "Migração cloud, modernização legacy, reforço de equipas",
  },
  {
    icon: Boxes, title: "IoT / AR / VR", n: "04",
    desc: "Dispositivos conectados, edge computing e experiências imersivas de realidade aumentada e virtual.",
    tech: ["IoT", "Edge", "AR", "VR", "WebXR", "Unity"],
    process: ["PoC", "Spec", "Build", "Integrar", "Operar"],
    benefits: ["Telemetria e dispositivos conectados", "Experiências AR/VR enterprise", "Visualização 3D e simulação"],
    cases: "Indústria 4.0, formação imersiva, smart devices",
  },
  {
    icon: Headphones, title: "Suporte", n: "05",
    desc: "Help desk e suporte aplicacional com acordos de nível de serviço (SLA) e monitorização contínua.",
    tech: ["Help desk", "SLA", "Monitorização", "Manutenção", "On-call"],
    process: ["Onboarding", "Triagem", "Resolução", "SLA", "Melhoria"],
    benefits: ["Help desk multi-canal", "SLA garantido e mensurável", "Manutenção evolutiva contínua"],
    cases: "Suporte aplicacional, manutenção de plataformas, operação 24/7",
  },
];

function Servicos() {
  return (
    <>
      {/* Hero with network */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-mono text-xs uppercase tracking-[0.3em] text-primary">/ Serviços</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 font-display text-[clamp(2.8rem,8vw,7rem)] leading-[0.95] tracking-tight max-w-5xl">
            Engenharia que <span className="text-gradient">resolve</span>.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8 lead text-muted-foreground measure">
            Cinco disciplinas integradas, ao serviço de empresas que recusam soluções genéricas.
          </motion.p>

          {/* Network visualization */}
          <div className="mt-20 relative h-64 hidden md:block">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 250">
              <defs>
                <linearGradient id="netg" x1="0" x2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="var(--color-electric)" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              {services.map((_, i) => {
                const x = 100 + (i * 1000) / (services.length - 1);
                return (
                  <g key={i}>
                    {services.map((__, j) => j > i && (
                      <line key={j} x1={x} y1={125} x2={100 + (j * 1000) / (services.length - 1)} y2={125} stroke="url(#netg)" strokeWidth="1" />
                    ))}
                    <circle cx={x} cy={125} r="8" fill="var(--color-primary)" />
                    <circle cx={x} cy={125} r="20" fill="none" stroke="var(--color-primary)" strokeOpacity="0.3">
                      <animate attributeName="r" from="8" to="30" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.6" to="0" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                    </circle>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </section>

      {/* Service panels */}
      {services.map((s, i) => (
        <ServicePanel key={s.title} {...s} reverse={i % 2 === 1} />
      ))}

      <CTABanner eyebrow="brief" title="Conta-nos o teu desafio. Voltamos com arquitetura." cta="Pedir consulta" />
    </>
  );
}

function ServicePanel({ icon: Icon, title, n, desc, tech, process, benefits, cases, reverse }: any) {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="glass-elev rounded-3xl p-8 md:p-12 holo-border relative overflow-hidden"
        >
          <div className={`absolute size-96 rounded-full pointer-events-none ${reverse ? "-top-20 -left-20" : "-top-20 -right-20"}`} style={{ background: "var(--glow)", filter: "blur(100px)", opacity: 0.4 }} />

          <div className={`relative grid lg:grid-cols-[1fr_1.2fr] gap-12 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">{n} · serviço</div>
              <div className="mt-4 inline-flex size-16 rounded-2xl glass items-center justify-center">
                <Icon className="size-7 text-primary" />
              </div>
              <h2 className="mt-6 font-display text-4xl md:text-5xl tracking-tight">{title}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{desc}</p>

              <div className="mt-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Stack</div>
                <div className="flex flex-wrap gap-2">
                  {tech.map((t: string) => (
                    <span key={t} className="rounded-md glass px-3 py-1.5 text-xs font-mono">{t}</span>
                  ))}
                </div>
              </div>

              <button data-magnetic className="mt-8 inline-flex items-center gap-2 text-sm text-primary group">
                Discutir projeto <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Process flow</div>
                <div className="grid grid-cols-5 gap-2">
                  {process.map((p: string, idx: number) => (
                    <div key={p} className="relative">
                      <div className="glass rounded-lg p-3 text-center">
                        <div className="font-mono text-[10px] text-primary">{String(idx + 1).padStart(2, "0")}</div>
                        <div className="mt-1 text-[11px] font-medium">{p}</div>
                      </div>
                      {idx < process.length - 1 && <div className="absolute top-1/2 -right-1 w-2 h-px bg-primary/50" />}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Benefícios</div>
                <ul className="space-y-2">
                  {benefits.map((b: string) => (
                    <li key={b} className="flex items-start gap-3 text-sm">
                      <span className="size-1.5 mt-2 rounded-full bg-primary shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">Casos típicos</div>
                <p className="text-sm text-muted-foreground">{cases}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
