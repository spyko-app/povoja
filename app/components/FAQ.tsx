"use client";

import { useRef, useState } from "react";
import { faqs } from "../lib/data";

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className={`faq-item ${open ? "open" : ""}`}>
      <button
        className="faq-q"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {q}
        <span className="ico">+</span>
      </button>
      <div
        className="faq-a"
        style={{ maxHeight: open ? ref.current?.scrollHeight ?? 400 : 0 }}
      >
        <div className="faq-a-inner" ref={ref}>
          {a}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="section faq-section" id="faq">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">★ Perguntas frequentes</span>
          <h2 className="section-title">Ficou alguma dúvida?</h2>
          <p className="section-sub">
            Transparência é coisa da esquerda. Aqui está tudo que você precisa
            saber antes de entrar na luta.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((f) => (
            <Item key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
