import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useTheme } from "@/lib/theme";

const links = [
  { to: "/", label: "Início" },
  { to: "/quem-somos", label: "Quem Somos" },
  { to: "/servicos", label: "Serviços" },
  { to: "/produtos", label: "Produtos" },
  { to: "/case-studies", label: "Cases" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${scrolled ? "py-2.5" : "py-4"}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Always-on glass: sticky blur prevents content bleeding through in light mode */}
          <div className={`flex items-center justify-between rounded-2xl md:rounded-full px-4 md:px-6 py-2.5 nav-glass transition-all duration-500 ${scrolled ? "neon-shadow scale-[0.99]" : ""}`}>
            <Link to="/" className="flex items-center gap-2.5 group shrink-0" aria-label="Moonlight — início">
              <Logo />
              <span className="font-display text-lg tracking-tight">
                Moonlight<span className="text-primary">.</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-0.5" aria-label="Principal">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  className="relative px-3.5 py-2 text-sm font-medium text-muted-foreground rounded-full transition-colors duration-200 hover:text-foreground [&.active]:text-foreground"
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          className="absolute inset-0 rounded-full bg-primary/12 ring-1 ring-primary/25"
                        />
                      )}
                      <span className="relative z-10">{l.label}</span>
                    </>
                  )}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 shrink-0">
              <ThemeToggle theme={theme} toggle={toggle} />
              <button className="md:hidden text-foreground p-2 -mr-1" onClick={() => setOpen(true)} aria-label="Abrir menu">
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[120] md:hidden">
            <div className="absolute inset-0 bg-background/90 backdrop-blur-2xl" />
            <motion.div
              initial={{ clipPath: "circle(0% at 90% 5%)" }}
              animate={{ clipPath: "circle(150% at 90% 5%)" }}
              exit={{ clipPath: "circle(0% at 90% 5%)" }}
              transition={{ duration: 0.6, ease: [0.85, 0, 0.15, 1] }}
              className="absolute inset-0 flex flex-col p-8"
            >
              <div className="flex justify-end">
                <button onClick={() => setOpen(false)} className="p-2" aria-label="Close"><X className="size-6" /></button>
              </div>
              <nav className="mt-12 flex flex-col gap-6" aria-label="Mobile">
                {links.map((l, i) => (
                  <motion.div key={l.to} initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 + i * 0.05 }}>
                    <Link
                      to={l.to}
                      activeOptions={{ exact: l.to === "/" }}
                      onClick={() => setOpen(false)}
                      className="text-4xl font-display tracking-tight text-muted-foreground transition-colors [&.active]:text-foreground [&.active]:[text-shadow:0_0_30px_var(--glow)]"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Logo() {
  return (
    <div className="relative size-8 grid place-items-center">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent blur-md opacity-70" />
      <svg viewBox="0 0 32 32" className="relative size-7">
        <defs>
          <radialGradient id="moon-g" cx="35%" cy="35%">
            <stop offset="0%" stopColor="oklch(0.96 0.01 280)" />
            <stop offset="100%" stopColor="var(--color-primary)" />
          </radialGradient>
        </defs>
        <circle cx="16" cy="16" r="11" fill="url(#moon-g)" />
        <circle cx="20" cy="13" r="9" fill="var(--color-background)" />
      </svg>
    </div>
  );
}

function ThemeToggle({ theme, toggle }: { theme: "dark" | "light"; toggle: () => void }) {
  return (
    <button
      data-magnetic
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative h-9 w-16 rounded-full glass border border-border/60 overflow-hidden"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className={`absolute top-1 size-7 rounded-full grid place-items-center ${theme === "dark" ? "left-1 bg-gradient-to-br from-primary to-accent" : "left-8 bg-gradient-to-br from-amber-300 to-orange-400"}`}
        style={{ boxShadow: "0 0 20px var(--glow)" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === "dark" ? (
            <motion.span key="m" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <Moon className="size-3.5 text-white" />
            </motion.span>
          ) : (
            <motion.span key="s" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <Sun className="size-3.5 text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
}
