export function MoonScene() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Single sweeping orbit ellipses (static) */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <ellipse cx="1170" cy="430" rx="600" ry="400" transform="rotate(-20 1170 430)" fill="none" stroke="var(--color-primary)" strokeOpacity="0.18" strokeWidth="1" />
        <ellipse cx="1170" cy="430" rx="760" ry="320" transform="rotate(-28 1170 430)" fill="none" stroke="var(--color-electric)" strokeOpacity="0.1" strokeWidth="1" />
      </svg>

      {/* Soft glow behind the moon to integrate it in both themes */}
      <div
        aria-hidden
        className="absolute top-1/2 right-[-2%] -translate-y-1/2 rounded-full opacity-60"
        style={{
          width: "min(86vmin, 860px)",
          height: "min(86vmin, 860px)",
          background: "radial-gradient(circle, var(--glow), transparent 60%)",
          filter: "blur(50px)",
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

      {/* The moon — transparent PNG. Bottom-right (clear of centred text) until
          the lg split layout puts the text on the left and the moon on the right. */}
      <div
        className="absolute right-[-18%] bottom-[-12%] lg:right-[2%] lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2"
        style={{ width: "min(72vmin, 740px)", height: "min(72vmin, 740px)" }}
      >
        <img
          src="/moonhd.png"
          alt=""
          draggable={false}
          className="h-full w-full object-contain select-none"
          style={{ filter: "drop-shadow(0 0 28px var(--glow)) drop-shadow(0 0 70px var(--glow))" }}
        />
      </div>
    </div>
  );
}
