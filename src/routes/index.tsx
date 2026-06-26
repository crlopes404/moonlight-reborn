import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Code2, BarChart3, Briefcase, Boxes, Headphones, Database, LineChart, Cpu } from "lucide-react";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { CTABanner } from "@/components/CTABanner";
import { TiltCard } from "@/components/TiltCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Moonlight Comunicação Global — O Futuro Não Espera · Desde 1998" },
      { name: "description", content: "Software house portuguesa desde 1998: Software Development, BI & Marketing, IT Consulting, IoT/AR/VR e Suporte SLA. Produto próprio B.Analytics." },
    ],
  }),
  component: Index,
});

const servicesPreview = [
  { icon: Code2, title: "Software Development" },
  { icon: BarChart3, title: "BI & Marketing" },
  { icon: Briefcase, title: "IT Consulting" },
  { icon: Boxes, title: "IoT / AR / VR" },
  { icon: Headphones, title: "Suporte SLA" },
];

const productPillars = [
  { icon: Database, name: "Data Integration", tag: "Fontes unificadas em tempo real" },
  { icon: BarChart3, name: "BI Dashboards", tag: "Visualização e KPIs executivos" },
  { icon: Cpu, name: "Decision Systems", tag: "Apoio à decisão orientado a dados" },
];

const casesPreview = [
  { client: "FCA / Fiat Chrysler", sector: "Automotive", kpi: "Leads Management" },
  { client: "Homologacoes.net", sector: "Plataforma digital", kpi: "Plataforma chave-na-mão" },
  { client: "Rubisgás", sector: "Energia", kpi: "Sistemas de negócio" },
];

export function Index() {
  const anos = new Date().getFullYear() - 1998;
  return (
    <>
      <Hero />

      {/* Company Intro Preview */}
      <section className="section">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader eyebrow="Quem Somos" title={`${anos} anos a desenhar o amanhã.`} />
            <p className="mt-6 lead text-muted-foreground measure">
              Fundada em 1998, a <span className="text-foreground font-medium">Moonlight Comunicação
              Global</span> é uma software house portuguesa focada em desenvolvimento à medida,
              Business Intelligence e transformação digital. Construímos sistemas, plataformas e
              o produto próprio <span className="text-foreground font-medium">B.Analytics</span>
              para empresas que recusam esperar pelo futuro.
            </p>
            <div className="mt-8"><LearnMore to="/quem-somos">Conhecer a história</LearnMore></div>
          </div>
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 rounded-full glass-elev holo-border" />
            <div className="absolute inset-8 rounded-full border border-border/40 animate-[orbit-spin_30s_linear_infinite]" />
            <div className="absolute inset-16 rounded-full border border-dashed border-border/40 animate-[orbit-counter_40s_linear_infinite]" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <div className="font-display text-7xl text-gradient">{anos}</div>
                <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mt-2">anos · 1998–2026</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader eyebrow="Serviços" title="Engenharia transversal." subtitle="Cinco disciplinas, uma filosofia: do código à operação." />
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {servicesPreview.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <TiltCard className="glass rounded-2xl p-6 hover:holo-border transition-all group h-full">
                  <div style={{ transform: "translateZ(30px)" }}>
                    <s.icon className="size-6 text-primary group-hover:scale-110 transition-transform" />
                    <div className="mt-4 font-display text-sm leading-tight">{s.title}</div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
          <div className="mt-10"><LearnMore to="/servicos">Explorar serviços</LearnMore></div>
        </div>
      </section>

      {/* Product Spotlight — B.Analytics */}
      <section className="section">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="Produto Proprietário"
            title="B.Analytics"
            subtitle="O nosso produto de dados: integração de fontes, dashboards de BI e sistemas de apoio à decisão — numa só plataforma."
          />
          <div className="mt-16 grid sm:grid-cols-3 gap-4">
            {productPillars.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <TiltCard className="relative glass-elev rounded-2xl p-7 group overflow-hidden h-full">
                  <div className="absolute -top-10 -right-10 size-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "var(--glow)", filter: "blur(40px)" }} />
                  <div style={{ transform: "translateZ(40px)" }}>
                    <div className="size-12 rounded-xl glass grid place-items-center relative group-hover:scale-110 transition-transform">
                      <p.icon className="size-6 text-primary" />
                    </div>
                    <div className="mt-5 font-display text-xl relative">{p.name}</div>
                    <div className="mt-2 text-sm text-muted-foreground relative">{p.tag}</div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
          <div className="mt-10"><LearnMore to="/produtos">Explorar o B.Analytics</LearnMore></div>
        </div>
      </section>

      {/* Cases Preview */}
      <section className="section">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader eyebrow="Case Studies" title="Transformações reais." subtitle="Projetos entregues para líderes da indústria automóvel e enterprise." />
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {casesPreview.map((c, i) => (
              <motion.div
                key={c.client}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-elev rounded-3xl p-8 group relative overflow-hidden"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{c.sector}</div>
                <div className="mt-4 font-display text-2xl">{c.client}</div>
                <div className="mt-6 font-display text-2xl text-gradient">{c.kpi}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10"><LearnMore to="/case-studies">Ver portfolio</LearnMore></div>
        </div>
      </section>

      {/* Clients */}
      <section className="section-sm">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="eyebrow">Confiança de líderes</div>
          <p className="mt-4 text-muted-foreground measure mx-auto">
            Ecossistema automóvel e enterprise — do grupo Stellantis a marcas premium.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {["BMW", "Volkswagen", "Stellantis", "Peugeot", "Audi", "Fiat Chrysler", "Rubisgás"].map((c) => (
              <span key={c} className="font-display text-xl md:text-2xl tracking-tight text-foreground/55 hover:text-foreground transition-colors">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

function LearnMore({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} data-magnetic className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.2em] text-primary group">
      {children}
      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
