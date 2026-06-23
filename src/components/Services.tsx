import { motion, useMotionValue, useTransform } from "framer-motion";
import { Code2, BrainCircuit, Boxes, Briefcase, Database } from "lucide-react";
import { useRef } from "react";
import { SectionHeader } from "./Products";

const services = [
  { icon: Code2, title: "Software Development", desc: "Aplicações web, mobile e desktop sob medida, com arquiteturas escaláveis e DevOps moderno.", n: "01" },
  { icon: BrainCircuit, title: "Business Intelligence", desc: "Transformamos dados em decisões — modelos preditivos, dashboards e cultura data-driven.", n: "02" },
  { icon: Boxes, title: "IoT / AR / VR", desc: "Experiências imersivas e dispositivos conectados que redefinem o produto físico.", n: "03" },
  { icon: Briefcase, title: "IT Consulting", desc: "Estratégia tecnológica, transformação digital e arquitetura empresarial.", n: "04" },
  { icon: Database, title: "Big Data", desc: "Pipelines de dados em larga escala, data lakes e processamento em tempo real.", n: "05" },
];

export function Services() {
  return (
    <section id="services" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="O que fazemos"
          title="Painéis holográficos de serviço"
          subtitle="Cinco áreas, uma filosofia: engenharia de excelência ao serviço do negócio."
        />

        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.n} {...s} delay={i * 0.08} />
          ))}
          <CTAPanel />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon: Icon, title, desc, n, delay }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useTransform(my, [0, 1], [8, -8]);
  const ry = useTransform(mx, [0, 1], [-8, 8]);
  const gx = useTransform(mx, [0, 1], ["0%", "100%"]);
  const gy = useTransform(my, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.6 }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => { mx.set(0.5); my.set(0.5); }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className="group relative glass-elev rounded-3xl p-8 overflow-hidden min-h-[300px]"
    >
      {/* mouse-reactive glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: useTransform([gx, gy], ([x, y]) => `radial-gradient(400px circle at ${x} ${y}, var(--glow), transparent 50%)`),
        }}
      />

      {/* animated border */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity holo-border pointer-events-none" />

      <div style={{ transform: "translateZ(30px)" }} className="relative h-full flex flex-col">
        <div className="flex items-start justify-between">
          <div className="size-14 rounded-2xl glass grid place-items-center group-hover:scale-110 transition-transform">
            <Icon className="size-6 text-primary" />
          </div>
          <span className="font-mono text-xs text-muted-foreground">{n}</span>
        </div>

        <h3 className="mt-8 font-display text-2xl tracking-tight">{title}</h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{desc}</p>

        {/* reveal layer */}
        <div className="mt-6 max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500">
          <div className="pt-4 border-t border-border/50 font-mono text-[10px] uppercase tracking-wider text-primary flex items-center gap-2">
            <span className="size-1 rounded-full bg-primary animate-pulse" />
            Ler mais →
          </div>
        </div>

        {/* tech grid bg */}
        <div
          className="absolute -bottom-12 -right-12 size-48 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }}
        />
      </div>
    </motion.div>
  );
}

function CTAPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative rounded-3xl p-8 overflow-hidden min-h-[300px] text-primary-foreground flex flex-col justify-between"
      style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))" }}
    >
      <div className="absolute inset-0 scanline" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 80% 20%, oklch(1 0 0 / 0.3), transparent 50%)" }} />

      <div className="relative">
        <div className="font-mono text-xs uppercase tracking-[0.3em] opacity-80">/ pronto?</div>
        <h3 className="mt-4 font-display text-3xl leading-tight">Vamos desenhar o teu próximo sistema.</h3>
      </div>
      <a href="#contact" className="relative inline-flex items-center gap-2 text-sm font-medium">
        Iniciar projeto
        <span className="inline-block size-8 rounded-full bg-white/20 grid place-items-center backdrop-blur-sm">→</span>
      </a>
    </motion.div>
  );
}
