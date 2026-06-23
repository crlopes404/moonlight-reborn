import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Rocket, Shield, Sparkles, Users } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { CTABanner } from "@/components/CTABanner";

export const Route = createFileRoute("/quem-somos")({
  head: () => ({
    meta: [
      { title: "Quem Somos — Moonlight · Desde 1998" },
      { name: "description", content: "A história, missão e cultura da Moonlight — software house portuguesa fundada em 1998." },
      { property: "og:title", content: "Quem Somos — Moonlight" },
      { property: "og:description", content: "27 anos de engenharia de excelência em Portugal." },
    ],
  }),
  component: QuemSomos,
});

const timeline = [
  { year: "1998", title: "Fundação", desc: "Nasce a Moonlight Comunicação Global, em Portugal, focada em software à medida." },
  { year: "2004", title: "Foco em Business Intelligence", desc: "Consolidamos a prática de BI & Marketing — analytics e sistemas de leads." },
  { year: "2010", title: "Setor automóvel", desc: "Parcerias com o ecossistema automóvel — gestão de leads para grandes marcas." },
  { year: "2015", title: "Consultoria & TaaS", desc: "Equipas dedicadas em modelo Team as a Service e auditorias de arquitetura." },
  { year: "2019", title: "IoT / AR / VR", desc: "Expansão para dispositivos conectados e experiências imersivas enterprise." },
  { year: "2022", title: "B.Analytics", desc: "Maturação do produto próprio de integração de dados, BI e decisão." },
  { year: "2026", title: "O futuro não espera", desc: "Plataformas data-driven e suporte SLA ao serviço de quem antecipa o amanhã." },
];

const values = [
  { icon: Rocket, title: "Velocidade com profundidade", desc: "Iteramos rápido sem cortar na engenharia. Entregamos software que dura." },
  { icon: Shield, title: "Fiabilidade por defeito", desc: "Suporte com SLA, monitorização contínua e operação que não falha quando importa." },
  { icon: Sparkles, title: "Curiosidade radical", desc: "Investimos continuamente em I&D próprio — daí ter nascido o B.Analytics." },
  { icon: Users, title: "Parceria de longo prazo", desc: "Clientes connosco há anos. Não fazemos drive-by consulting." },
];

const stats = [
  { v: "28", l: "Anos de operação" },
  { v: "1998", l: "Fundação" },
  { v: "5", l: "Áreas de serviço" },
  { v: "SLA", l: "Suporte garantido" },
];

function QuemSomos() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle at 30% 30%, var(--glow), transparent 50%), radial-gradient(circle at 80% 60%, oklch(0.7 0.25 245 / 0.3), transparent 50%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-mono text-xs uppercase tracking-[0.3em] text-primary">/ Quem Somos</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 font-display text-[clamp(2.8rem,8vw,7rem)] leading-[0.95] tracking-tight max-w-5xl">
            Engenheiros do <span className="text-gradient">tempo presente</span>, obcecados pelo futuro.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8 lead text-muted-foreground measure">
            Somos a Moonlight Comunicação Global — software house portuguesa fundada em 1998.
            Há 28 anos a transformar empresas com produtos, plataformas e equipas que recusam
            o "suficiente".
          </motion.p>
        </div>
      </section>

      {/* Timeline */}
      <section ref={ref} className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader eyebrow="A nossa jornada" title="Desde 1998." />

          <div className="mt-20 relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border/50" />
            <motion.div style={{ height: lineH }} className="absolute left-4 md:left-1/2 top-0 w-px bg-gradient-to-b from-primary via-accent to-electric" />

            <div className="space-y-16">
              {timeline.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative grid md:grid-cols-2 gap-8 items-center ${i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"}`}
                >
                  <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-16" : "md:pl-16"}`}>
                    <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary">{t.year}</div>
                    <h3 className="mt-3 font-display text-3xl tracking-tight">{t.title}</h3>
                    <p className="mt-3 text-muted-foreground">{t.desc}</p>
                  </div>
                  <div className="hidden md:block" />
                  <div className="absolute left-4 md:left-1/2 size-4 -translate-x-1/2 rounded-full bg-background border-2 border-primary" style={{ boxShadow: "0 0 20px var(--glow)" }} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader eyebrow="Missão · Visão · Valores" title="O que nos move." />
          <div className="mt-16 grid md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-elev rounded-3xl p-8 hover:holo-border transition-all group relative overflow-hidden"
              >
                <div className="absolute -top-20 -right-20 size-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "var(--glow)", filter: "blur(60px)" }} />
                <div className="relative">
                  <div className="size-12 rounded-2xl glass grid place-items-center">
                    <v.icon className="size-5 text-primary" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl">{v.title}</h3>
                  <p className="mt-3 text-muted-foreground">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-8 text-center"
              >
                <div className="font-display text-5xl text-gradient">{s.v}</div>
                <div className="mt-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative py-32">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader eyebrow="Filosofia de equipa" title="Engenharia primeiro. Sempre." />
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Acreditamos que o futuro pertence às empresas que escolhem engenheiros, não
              vendedores. Cada decisão técnica é documentada, debatida e defendida.
              Cultivamos uma cultura de honestidade radical — onde dizer "não sei" é uma
              forma de excelência.
            </p>
            <ul className="mt-8 space-y-3 font-mono text-sm">
              {["Code reviews obrigatórios", "Pair programming semanal", "20% para investigação livre", "Open-source contribution"].map((x) => (
                <li key={x} className="flex items-center gap-3">
                  <span className="size-1.5 rounded-full bg-primary" /> {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 rounded-3xl glass-elev holo-border" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center px-8">
                <div className="font-display text-2xl italic leading-snug">"Construímos para que os nossos clientes ainda nos agradeçam em 2040."</div>
                <div className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">— Equipa Moonlight</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner eyebrow="vamos?" title="Pronto para trabalhar com pessoas que pensam em décadas?" cta="Falar connosco" />
    </>
  );
}
