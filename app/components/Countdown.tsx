"use client";

import { useEffect, useState } from "react";
import { ELECTION_DATE } from "../lib/data";

type T = { d: number; h: number; m: number; s: number };

function diff(): T {
  const target = new Date(ELECTION_DATE).getTime();
  const now = Date.now();
  let delta = Math.max(0, Math.floor((target - now) / 1000));
  const d = Math.floor(delta / 86400);
  delta -= d * 86400;
  const h = Math.floor(delta / 3600);
  delta -= h * 3600;
  const m = Math.floor(delta / 60);
  const s = delta - m * 60;
  return { d, h, m, s };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Contagem em formato compacto, para chips no header/hero. */
export function CountdownInline() {
  const [t, setT] = useState<T | null>(null);
  useEffect(() => {
    setT(diff());
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!t) return <b>—</b>;
  return (
    <b>
      {t.d}d {pad(t.h)}h {pad(t.m)}m {pad(t.s)}s
    </b>
  );
}

/** Contagem grande em células, para o CTA final. */
export function CountdownBig() {
  const [t, setT] = useState<T | null>(null);
  useEffect(() => {
    setT(diff());
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);
  const cells: [string, number | string][] = [
    ["dias", t ? t.d : "—"],
    ["horas", t ? pad(t.h) : "—"],
    ["min", t ? pad(t.m) : "—"],
    ["seg", t ? pad(t.s) : "—"],
  ];
  return (
    <div className="countdown">
      {cells.map(([label, val]) => (
        <div className="cd-cell" key={label}>
          <b>{val}</b>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
