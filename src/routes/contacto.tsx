import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, Plus, Minus } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Moonlight" },
      { name: "description", content: "Fala com a Moonlight. Sede em Lisboa. Resposta em 24h úteis." },
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

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at top, var(--glow), transparent 60%)" }} />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-mono text-xs uppercase tracking-[0.3em] text-primary">/ Contacto</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 font-display text-[clamp(2.8rem,8vw,7rem)] leading-[0.9] tracking-tight">
            Vamos<br /><span className="text-gradient italic font-light">conversar.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8 text-lg text-muted-foreground max-w-xl mx-auto">
            Conta-nos o desafio. Voltamos com arquitetura, prazos e orçamento em 24h úteis.
          </motion.p>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-4">
          {[
            { icon: Mail, label: "Email", value: "clopes@moonlight.pt" },
            { icon: Phone, label: "Website", value: "moonlight.pt" },
            { icon: MapPin, label: "Sede", value: "Portugal" },
          ].map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-elev rounded-2xl p-6 flex items-center gap-4 hover:holo-border transition-all"
            >
              <div className="size-12 rounded-xl glass grid place-items-center shrink-0">
                <c.icon className="size-5 text-primary" />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{c.label}</div>
                <div className="mt-1 font-medium">{c.value}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1.2fr_1fr] gap-8">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={(e) => { e.preventDefault(); alert("Obrigado! Voltamos em breve."); }}
            className="glass-elev rounded-3xl p-8 md:p-10 holo-border relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 size-64 rounded-full pointer-events-none" style={{ background: "var(--glow)", filter: "blur(60px)", opacity: 0.5 }} />

            <div className="relative">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">/ briefing form</div>
              <h2 className="mt-3 font-display text-3xl">Iniciar projeto</h2>

              <div className="mt-8 grid md:grid-cols-2 gap-5">
                <Field label="Nome" id="name" />
                <Field label="Empresa" id="company" />
                <Field label="Email" id="email" type="email" />
                <Field label="Telefone (opcional)" id="phone" />
              </div>

              <div className="mt-8">
                <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Serviços de interesse</label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {services.map((s) => (
                    <button
                      key={s}
                      type="button"
                      data-magnetic
                      onClick={() => toggle(s)}
                      className={`rounded-full px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all ${selected.includes(s) ? "bg-primary text-primary-foreground" : "glass hover:border-primary"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <label htmlFor="msg" className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Descreve o desafio</label>
                <textarea id="msg" rows={5} required className="mt-3 w-full rounded-2xl glass px-5 py-4 bg-transparent outline-none focus:border-primary transition-colors resize-none" placeholder="Contexto, objetivos, prazo..." />
              </div>

              <button data-magnetic type="submit" className="btn-magnetic btn-primary mt-8">
                <span style={{ transform: "translateZ(20px)" }} className="inline-flex items-center gap-2">
                  Enviar briefing <ArrowRight className="size-4" />
                </span>
              </button>
            </div>
          </motion.form>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="glass-elev rounded-3xl overflow-hidden relative min-h-[400px] holo-border"
          >
            <div className="absolute inset-0" style={{
              backgroundImage: "linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
              opacity: 0.15,
            }} />
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
              {[...Array(20)].map((_, i) => (
                <line key={i} x1={Math.random() * 400} y1={Math.random() * 400} x2={Math.random() * 400} y2={Math.random() * 400} stroke="var(--color-primary)" strokeOpacity="0.1" strokeWidth="0.5" />
              ))}
            </svg>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute inset-0 size-12 rounded-full bg-primary animate-ping opacity-30" />
                <div className="relative size-12 rounded-full bg-primary grid place-items-center" style={{ boxShadow: "0 0 40px var(--glow)" }}>
                  <MapPin className="size-5 text-primary-foreground" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/80 to-transparent">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">/ HQ</div>
              <div className="mt-2 font-display text-xl">Lisboa, Portugal</div>
              <div className="mt-1 text-sm text-muted-foreground">38.7223° N · 9.1393° W</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-24">
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
                  <button onClick={() => setOpenFaq(open ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                    <span className="font-display text-lg">{f.q}</span>
                    {open ? <Minus className="size-5 text-primary" /> : <Plus className="size-5 text-primary" />}
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

      <section className="relative py-24 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h3 className="font-display text-4xl md:text-5xl">Ou simplesmente <a href="mailto:clopes@moonlight.pt" data-magnetic className="text-gradient">manda-nos um email</a>.</h3>
        </div>
      </section>
    </>
  );
}

function Field({ label, id, type = "text" }: { label: string; id: string; type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</label>
      <input id={id} type={type} required className="mt-2 w-full rounded-xl glass px-4 py-3 bg-transparent outline-none focus:border-primary transition-colors" />
    </div>
  );
}
