import { motion } from "framer-motion";
import { ArrowUpRight, AtSign, Globe, Send } from "lucide-react";
import { Link } from "@tanstack/react-router";

const Linkedin = AtSign;
const Twitter = Send;
const Github = Globe;

export function Footer() {
  return (
    <footer className="relative pt-20 pb-12 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 100%, black, transparent 70%)",
          opacity: 0.06,
        }}
      />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 size-[500px] rounded-full pointer-events-none" style={{ background: "var(--glow)", filter: "blur(120px)", opacity: 0.35 }} />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-4 gap-10 pt-12 border-t border-border/50">
          <div className="md:col-span-2">
            <Link to="/" className="font-display text-xl">Moonlight<span className="text-primary">.</span></Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Moonlight Comunicação Global LDA. Desde 1998 a construir o futuro —
              software, BI e consultoria. <span className="text-foreground">O futuro não espera.</span>
            </p>
            <motion.a
              href="mailto:suporte@moonlight.pt"
              data-magnetic
              className="mt-6 inline-flex items-center gap-3 text-sm font-mono group"
            >
              suporte@moonlight.pt
              <span className="size-8 rounded-full glass grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <ArrowUpRight className="size-3.5" />
              </span>
            </motion.a>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Navegar</div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/quem-somos" className="hover:text-primary transition-colors">Quem Somos</Link></li>
              <li><Link to="/servicos" className="hover:text-primary transition-colors">Serviços</Link></li>
              <li><Link to="/produtos" className="hover:text-primary transition-colors">Produtos</Link></li>
              <li><Link to="/case-studies" className="hover:text-primary transition-colors">Case Studies</Link></li>
              <li><Link to="/contacto" className="hover:text-primary transition-colors">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Sede</div>
            <p className="text-sm">
              Portugal<br />
              <a href="mailto:suporte@moonlight.pt" className="hover:text-primary transition-colors">suporte@moonlight.pt</a><br />
              moonlight.pt
            </p>
            <div className="mt-5 flex gap-3">
              {[Linkedin, Twitter, Github].map((Icon, i) => (
                <a key={i} href="#" data-magnetic className="size-9 rounded-full glass grid place-items-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Icon className="size-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <div>© 1998–2026 Moonlight Comunicação Global LDA. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
            <span className="text-primary">est. 1998 / online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
