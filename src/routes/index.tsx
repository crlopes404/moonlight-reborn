import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Code2, BrainCircuit, Boxes, Briefcase, Database, Target, BarChart3, Link2, Gamepad2, ShoppingBag } from "lucide-react";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { CTABanner } from "@/components/CTABanner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Moonlight — O futuro não espera · Desde 1998" },
      { name: "description", content: "Software house portuguesa: Software Development, BI, IoT/AR/VR, Big Data e produtos proprietários." },
    ],
  }),
  component: Index,
});

const servicesPreview = [
  { icon: Code2, title: "Software Development" },
  { icon: BrainCircuit, title: "Business Intelligence" },
  { icon: Boxes, title: "IoT / AR / VR" },
  { icon: Briefcase, title: "IT Consulting" },
  { icon: Database, title: "Big Data" },
];

const productsPreview = [
  { icon: Target, name: "M.Leads", tag: "Sales Intelligence" },
  { icon: BarChart3, name: "M.Analytics", tag: "Business Intelligence" },
  { icon: Link2, name: "M.Chain+", tag: "Supply Chain" },
  { icon: Gamepad2, name: "M.Gaming", tag: "AR/VR" },
  { icon: ShoppingBag, name: "Ecommerce", tag: "Commerce" },
];

const casesPreview = [
  { client: "Banco Atlântico", sector: "Banking", kpi: "−87% latência" },
  { client: "RetailCo Iberia", sector: "Retail", kpi: "3.2× conversão" },
  { client: "Lusiada Energy", sector: "Energy", kpi: "1.4M sensores" },
];

function Index() {
  return (
    <>
      <Hero />

      {/* Company Intro Preview */}
      <section className="relative py-32">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader eyebrow="Quem Somos" title="27 anos a desenhar o amanhã." />
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Fundada em 1998 em Lisboa, a Moonlight é uma software house obcecada por
              engenharia de excelência. Construímos plataformas, produtos próprios e
              infraestrutura crítica para empresas que recusam ser ontem.
            </p>
            <LearnMore to="/quem-somos">Conhecer a história</LearnMore>
          </div>
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 rounded-full glass-elev holo-border" />
            <div className="absolute inset-8 rounded-full border border-border/40 animate-[orbit-spin_30s_linear_infinite]" />
            <div className="absolute inset-16 rounded-full border border-dashed border-border/40 animate-[orbit-counter_40s_linear_infinite]" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <div className="font-display text-7xl text-gradient">27</div>
                <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mt-2">anos · 1998–2026</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="relative py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader eyebrow="Serviços" title="Engenharia transversal." subtitle="Seis disciplinas, uma filosofia." />
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {servicesPreview.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass rounded-2xl p-6 hover:holo-border transition-all group"
              >
                <s.icon className="size-6 text-primary group-hover:scale-110 transition-transform" />
                <div className="mt-4 font-display text-sm leading-tight">{s.title}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10"><LearnMore to="/servicos">Explorar serviços</LearnMore></div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="relative py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader eyebrow="Produtos Proprietários" title="Cinco módulos. Um sistema." subtitle="Tecnologia construída em casa, ao serviço de quem nos confia o futuro." />
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {productsPreview.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative glass-elev rounded-2xl p-6 group overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 size-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "var(--glow)", filter: "blur(40px)" }} />
                <p.icon className="size-7 text-primary relative" />
                <div className="mt-5 font-display text-lg relative">{p.name}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground relative">{p.tag}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10"><LearnMore to="/produtos">Explorar produtos</LearnMore></div>
        </div>
      </section>

      {/* Cases Preview */}
      <section className="relative py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader eyebrow="Case Studies" title="Transformações reais." />
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
                <div className="mt-6 font-display text-3xl text-gradient">{c.kpi}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10"><LearnMore to="/case-studies">Ver portfolio</LearnMore></div>
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
