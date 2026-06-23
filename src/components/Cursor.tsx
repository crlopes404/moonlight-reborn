import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setHidden(false);
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      document.documentElement.style.setProperty("--mx", `${(mx / window.innerWidth) * 100}%`);
      document.documentElement.style.setProperty("--my", `${(my / window.innerHeight) * 100}%`);
      document.body.style.setProperty("--mx", `${(mx / window.innerWidth) * 100}%`);
      document.body.style.setProperty("--my", `${(my / window.innerHeight) * 100}%`);
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a,button,[data-magnetic]"));
    };
    const tick = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    const raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  if (hidden) return null;
  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full"
        style={{
          backgroundColor: "rgba(216, 197, 255, 0.22)",
          boxShadow: "0 0 10px rgba(216, 197, 255, 0.25), 0 0 3px rgba(216, 197, 255, 0.2)",
        }}
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full transition-[width,height,margin,opacity] duration-200"
        style={{
          width: hover ? 56 : 32,
          height: hover ? 56 : 32,
          marginLeft: hover ? -28 : -16,
          marginTop: hover ? -28 : -16,
          border: "1px solid rgba(216, 197, 255, 0.25)",
          backdropFilter: "invert(1) hue-rotate(180deg)",
          mixBlendMode: "difference",
          opacity: 0.85,
        }}
      />
    </>
  );
}
