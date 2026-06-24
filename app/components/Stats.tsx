"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "../lib/data";

function useCountUp(target: number, run: boolean, ms = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    let start = 0;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / ms);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, ms]);
  return val;
}

function StatItem({
  value,
  suffix,
  label,
  run,
}: {
  value: number;
  suffix: string;
  label: string;
  run: boolean;
}) {
  const n = useCountUp(value, run);
  return (
    <div className="stat-item">
      <b>
        {n}
        {suffix}
      </b>
      <span>{label}</span>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setRun(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    // Fallback: garante que os números preencham mesmo se o observer não disparar.
    const fallback = setTimeout(() => setRun(true), 3000);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <section className="section stats-band">
      <div className="container">
        <div className="stats-grid" ref={ref}>
          {stats.map((s) => (
            <StatItem key={s.label} {...s} run={run} />
          ))}
        </div>
      </div>
    </section>
  );
}
