import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import { SectionHeader } from "./Products";

const items = [
  { quote: "A Moonlight não entrega software. Entrega vantagem competitiva. Em 6 meses redesenharam a nossa stack analítica.", who: "Mariana Costa", role: "CTO, Banco Atlântico" },
  { quote: "Pensam em décadas. É raro encontrar parceiros que combinam engenharia de elite com sensibilidade de negócio.", who: "Pedro Vasconcelos", role: "CEO, RetailCo Iberia" },
  { quote: "O M.Analytics tornou-se infraestrutura crítica do nosso grupo. Não há reunião de board sem ele.", who: "Inês Marques", role: "CDO, Lusiada Energy" },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, []);
  const c = items[i];
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Vozes" title="Confiados por líderes." />

        <div className="mt-16 relative glass-elev rounded-3xl p-10 md:p-16 overflow-hidden min-h-[340px] holo-border">
          <Quote className="absolute top-8 right-8 size-32 text-primary/10" />
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={c.who}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-3xl"
            >
              <p className="font-display text-2xl md:text-4xl leading-tight tracking-tight">
                "{c.quote}"
              </p>
              <footer className="mt-8 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <span className="text-foreground">{c.who}</span> · {c.role}
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="absolute bottom-8 left-8 md:left-16 flex gap-3">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                className={`h-1 transition-all rounded-full ${idx === i ? "w-10 bg-primary" : "w-4 bg-border"}`}
                aria-label={`Testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
