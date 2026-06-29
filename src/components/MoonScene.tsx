export function MoonScene() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Single sweeping orbit ellipses (static) */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <ellipse cx="1170" cy="430" rx="600" ry="400" transform="rotate(-20 1170 430)" fill="none" stroke="var(--color-primary)" strokeOpacity="0.18" strokeWidth="1" />
        <ellipse cx="1170" cy="430" rx="760" ry="320" transform="rotate(-28 1170 430)" fill="none" stroke="var(--color-electric)" strokeOpacity="0.1" strokeWidth="1" />
      </svg>

      {/* Ambient glow behind the moon */}
      <div
        aria-hidden
        className="absolute top-1/2 right-[-4%] -translate-y-1/2 rounded-full opacity-70"
        style={{
          width: "min(92vmin, 920px)",
          height: "min(92vmin, 920px)",
          background: "radial-gradient(circle, var(--glow), transparent 62%)",
          filter: "blur(44px)",
        }}
      />

      {/* Faint stars */}
      {[
        { t: "16%", l: "52%", s: 3 },
        { t: "28%", l: "70%", s: 2 },
        { t: "62%", l: "57%", s: 2 },
        { t: "73%", l: "78%", s: 3 },
        { t: "44%", l: "88%", s: 2 },
        { t: "22%", l: "82%", s: 2 },
      ].map((st, i) => (
        <span key={i} aria-hidden className="absolute rounded-full bg-foreground/55 hidden md:block" style={{ top: st.t, left: st.l, width: st.s, height: st.s }} />
      ))}

      {/* The moon — bottom-right on mobile, centred-right on larger screens */}
      <div
        className="absolute right-[-20%] bottom-[-8%] sm:right-[-8%] sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 lg:right-[-4%]"
        style={{ width: "min(74vmin, 760px)", height: "min(74vmin, 760px)" }}
      >
        {/* bottom haze / clouds under the moon */}
        <div
          aria-hidden
          className="absolute -bottom-[6%] left-[6%] right-[-6%] h-[42%] rounded-[50%]"
          style={{ background: "radial-gradient(closest-side, oklch(0.9 0.07 300 / 0.5), transparent)", filter: "blur(32px)" }}
        />

        <div className="relative h-full w-full rounded-full overflow-hidden" style={{ boxShadow: "0 0 90px 14px var(--glow)" }}>
          <img
            src="/moon.jpg"
            alt=""
            draggable={false}
            className="h-full w-full object-cover scale-[1.18] select-none"
            style={{ filter: "brightness(1.02) contrast(1.07) saturate(1.05)" }}
          />
          {/* directional terminator — lit upper-left, violet shadow lower-right */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "radial-gradient(125% 125% at 24% 26%, transparent 30%, oklch(0.46 0.22 295 / 0.42) 68%, oklch(0.17 0.08 285 / 0.8) 100%)" }}
          />
          {/* violet grade */}
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-overlay"
            style={{ background: "linear-gradient(120deg, transparent 38%, oklch(0.5 0.25 295 / 0.55))" }}
          />
          {/* warm glowing rim at the bottom edge */}
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-screen"
            style={{ background: "radial-gradient(58% 42% at 58% 104%, oklch(0.96 0.06 70 / 0.6), transparent 62%)" }}
          />
        </div>
      </div>
    </div>
  );
}
