import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Mail, ArrowRight, Plus, Minus, FileText, Sparkles, Clock, ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { RobotScene } from "@/components/RobotScene";

// Published Spline embed (my.spline.design). Frameless + transparent.
const SPLINE_EMBED = "https://my.spline.design/r4xbot-bBE9p93DM1BWoNlh78sfpezt/";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Moonlight" },
      { name: "description", content: "Fala com a Moonlight. Conta-nos o desafio e voltamos com arquitetura, prazos e orçamento em 24h úteis." },
      { property: "og:title", content: "Contacto — Moonlight" },
      { property: "og:description", content: "Vamos desenhar o teu próximo sistema." },
    ],
  }),
  component: Contacto,
});

const services = ["Software Development", "BI & Marketing", "IT Consulting", "IoT / AR / VR", "Suporte SLA", "B.Analytics", "Outro"];

const faqs = [
  { q: "Qual é o vosso prazo típico de resposta?", a: "Respondemos em até 24h úteis. Para projetos urgentes, agendamos call em 48h." },
  { q: "Trabalham com empresas fora de Portugal?", a: "Sim. Trabalhamos com clientes nacionais e internacionais, incluindo grandes grupos automóveis e enterprise." },
  { q: "Oferecem equipas dedicadas?", a: "Sim. No modelo TaaS (Team as a Service) montamos equipas dedicadas que integram a sua operação." },
  { q: "Como funciona o suporte?", a: "Disponibilizamos help desk e suporte aplicacional com SLA, monitorização contínua e manutenção evolutiva." },
  { q: "O B.Analytics é licenciável?", a: "Sim. O B.Analytics está disponível em cloud ou on-premise, com integração e suporte da Moonlight." },
];

function Contacto() {
  const [selected, setSelected] = useState<string[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggle = (s: string) => setSelected((cur) => cur.includes(s) ? cur.filter(x => x !== s) : [...cur, s]);

  const scrollToForm = () => {
    document.getElementById("form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative pt-32 md:pt-40 pb-12 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 70% 50% at 80% 30%, var(--glow), transparent 60%)" }} />

        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-8 items-center">
          {/* Text — left on desktop, top on mobile/tablet */}
          <div className="text-center lg:text-left order-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="eyebrow lg:justify-start">/ Contacto</motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 font-display text-[clamp(2.8rem,8vw,6rem)] leading-[0.92] tracking-tight"
            >
              Vamos <span className="text-gradient italic font-light">conversar</span>.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-7 lead text-muted-foreground measure mx-auto lg:mx-0"
            >
              Conta-nos o desafio. Voltamos com arquitetura, prazos e orçamento em
              <span className="text-foreground font-medium"> 24h úteis</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <button data-magnetic onClick={scrollToForm} className="btn-magnetic btn-primary">
                <span className="inline-flex items-center gap-2">Iniciar projeto <ArrowRight className="size-4" /></span>
              </button>
              <a href="mailto:clopes@moonlight.pt" data-magnetic className="btn-magnetic btn-ghost">
                <span className="inline-flex items-center gap-2"><Mail className="size-4" /> clopes@moonlight.pt</span>
              </a>
            </motion.div>
          </div>

          {/* Robot — right on desktop, below text on mobile/tablet. min-h prevents head/arms clipping. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 relative w-full h-[340px] sm:h-[420px] lg:h-[560px]"
          >
            <RobotScene embed={SPLINE_EMBED} />
          </motion.div>
        </div>
      </section>

      {/* ───────────────────── Premium briefing CTA ───────────────────── */}
      <section className="relative section-sm">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-[2rem] glass-elev holo-border p-8 md:p-14"
          >
            {/* discrete gradient wash + soft glows */}
            <div className="absolute inset-0 -z-10 opacity-90" style={{ background: "linear-gradient(120deg, color-mix(in oklch, var(--color-primary) 14%, transparent), transparent 55%)" }} />
            <div className="absolute -top-24 -right-16 size-72 rounded-full pointer-events-none transition-opacity duration-500 opacity-60 group-hover:opacity-100" style={{ background: "var(--glow)", filter: "blur(80px)" }} />
            <div className="absolute -bottom-24 -left-16 size-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, oklch(0.7 0.22 245 / 0.25), transparent 70%)", filter: "blur(80px)" }} />
            {/* decorative grid lines */}
            <div className="absolute inset-0 -z-10 pointer-events-none opacity-[0.06]" style={{ backgroundImage: "linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)", backgroundSize: "44px 44px", maskImage: "radial-gradient(ellipse 70% 80% at 30% 0%, black, transparent 75%)" }} />

            <div className="relative grid lg:grid-cols-[1.2fr_auto] gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                  <Sparkles className="size-3.5" /> Proposta personalizada
                </div>
                <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-tight">
                  Projetos maiores?<br />
                  <span className="text-gradient">Preenche o briefing.</span>
                </h2>
                <p className="mt-5 lead text-muted-foreground measure">
                  Descreve objetivos, contexto e prazo. A nossa equipa responde com uma
                  proposta à medida — arquitetura, roadmap e orçamento.
                </p>

                <ul className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
                  <li className="inline-flex items-center gap-2"><Clock className="size-4 text-primary" /> Resposta em 24h úteis</li>
                  <li className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> Confidencial · NDA disponível</li>
                  <li className="inline-flex items-center gap-2"><FileText className="size-4 text-primary" /> Sem compromisso</li>
                </ul>
              </div>

              {/* prominent action */}
              <div className="flex flex-col items-center lg:items-end gap-4">
                <div className="relative">
                  <div className="absolute -inset-3 rounded-full opacity-60 group-hover:opacity-100 transition-opacity" style={{ background: "var(--glow)", filter: "blur(28px)" }} />
                  <button
                    data-magnetic
                    onClick={scrollToForm}
                    className="relative inline-flex items-center gap-3 rounded-full px-8 py-4 font-medium text-primary-foreground transition-transform hover:scale-[1.03] active:scale-[0.98]"
                    style={{ background: "linear-gradient(120deg, var(--color-primary), var(--color-magenta))", boxShadow: "0 14px 50px -12px var(--glow), inset 0 1px 0 oklch(1 0 0 / 0.25)" }}
                  >
                    <FileText className="size-5" />
                    Preencher briefing
                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">2 min · 100% online</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────── Main form ───────────────────────── */}
      <section id="form" className="relative section-sm scroll-mt-28">
        <div className="mx-auto max-w-3xl px-6">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            onSubmit={(e) => { e.preventDefault(); alert("Obrigado! Voltamos em breve."); }}
            className="glass-elev rounded-3xl p-8 md:p-12 holo-border relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 size-72 rounded-full pointer-events-none" style={{ background: "var(--glow)", filter: "blur(70px)", opacity: 0.45 }} />

            <div className="relative">
              <div className="eyebrow">/ Formulário</div>
              <h2 className="mt-3 font-display text-3xl md:text-4xl tracking-tight">Iniciar projeto</h2>
              <p className="mt-3 text-muted-foreground">Preenche e enviamos uma resposta em 24h úteis.</p>

              <div className="mt-9 grid sm:grid-cols-2 gap-5">
                <Field label="Nome" id="name" delay={0} />
                <Field label="Empresa" id="company" delay={0.05} />
                <Field label="Email" id="email" type="email" delay={0.1} />
                <Field label="Telefone (opcional)" id="phone" required={false} delay={0.15} />
              </div>

              <div className="mt-8">
                <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Serviços de interesse</label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {services.map((s) => {
                    const active = selected.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        data-magnetic
                        aria-pressed={active}
                        onClick={() => toggle(s)}
                        className={`rounded-full px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-200 ${active ? "bg-primary text-primary-foreground shadow-[0_8px_24px_-10px_var(--glow)]" : "glass text-muted-foreground hover:text-foreground hover:border-primary"}`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8">
                <label htmlFor="msg" className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Descreve o desafio</label>
                <textarea
                  id="msg"
                  rows={5}
                  required
                  className="mt-3 w-full rounded-2xl glass px-5 py-4 bg-transparent outline-none resize-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/30"
                  placeholder="Contexto, objetivos, prazo..."
                />
              </div>

              <button data-magnetic type="submit" className="btn-magnetic btn-primary mt-9 w-full sm:w-auto justify-center">
                <span style={{ transform: "translateZ(20px)" }} className="inline-flex items-center gap-2">
                  Enviar briefing <ArrowRight className="size-4" />
                </span>
              </button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* ───────────────────────── FAQ ───────────────────────── */}
      <section className="relative section">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeader eyebrow="FAQ" title="Perguntas frequentes." />
          <div className="mt-12 space-y-3">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <motion.div
                  key={f.q}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="glass rounded-2xl overflow-hidden"
                >
                  <button onClick={() => setOpenFaq(open ? null : i)} aria-expanded={open} className="w-full flex items-center justify-between gap-4 p-5 text-left">
                    <span className="font-display text-lg">{f.q}</span>
                    {open ? <Minus className="size-5 text-primary shrink-0" /> : <Plus className="size-5 text-primary shrink-0" />}
                  </button>
                  <AnimatePresence>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="px-5 pb-5 text-muted-foreground">{f.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────────── Email CTA ───────────────────────── */}
      <section className="relative section-sm text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h3 className="font-display text-4xl md:text-5xl tracking-tight">
            Ou simplesmente <a href="mailto:clopes@moonlight.pt" data-magnetic className="text-gradient">manda-nos um email</a>.
          </h3>
        </div>
      </section>
    </>
  );
}

function Field({ label, id, type = "text", required = true, delay = 0 }: { label: string; id: string; type?: string; required?: boolean; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <label htmlFor={id} className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</label>
      <input
        id={id}
        type={type}
        required={required}
        className="mt-2 w-full rounded-xl glass px-4 py-3 bg-transparent outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/30"
      />
    </motion.div>
  );
}
