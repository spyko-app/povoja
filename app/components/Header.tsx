"use client";

import { useState } from "react";
import { CountdownInline } from "./Countdown";

const links = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#produtos", label: "Produtos" },
  { href: "#grupo", label: "Grupo" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="topbar">
        🔥 Campanha de lançamento: materiais a partir de{" "}
        <strong>R$13,90</strong> · acesso imediato
      </div>
      <header className="header">
        <div className="container header-inner">
          <a href="#topo" className="brand-link" aria-label="PovoJá">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-povoja.png" alt="Povo Já" className="brand-img" />
          </a>

          <nav className="nav">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="header-cta">
            <div className="header-count">
              <CountdownInline />
              <span>pro 1º turno</span>
            </div>
            <a href="#produtos" className="btn btn-vermelho">
              Ver produtos
            </a>
            <button
              className={`burger ${open ? "open" : ""}`}
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <div className={`mobile-nav ${open ? "show" : ""}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            href="#produtos"
            className="btn btn-vermelho"
            onClick={() => setOpen(false)}
          >
            Ver produtos
          </a>
        </div>
      </header>
    </>
  );
}
