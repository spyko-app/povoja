"use client";

import { useState } from "react";
import { CountdownInline } from "./Countdown";
import { useCheckout } from "./Checkout";
import Logo from "./Logo";

const links = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#produtos", label: "Produtos" },
  { href: "#grupo", label: "Grupo" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { open: openCheckout } = useCheckout();

  const buy = () =>
    openCheckout({ name: "Kit Completo", price: "R$47", priceOld: "R$97" });

  return (
    <>
      <div className="topbar">
        🔥 Campanha de lançamento: materiais a partir de{" "}
        <strong>R$16,90</strong> · acesso imediato
      </div>
      <header className="header">
        <div className="container header-inner">
          <a href="#topo" className="brand-link" aria-label="PovoJá">
            <Logo tone="red" size={30} />
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
            <button className="btn btn-vermelho" onClick={buy}>
              Ver produtos
            </button>
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
          <button
            className="btn btn-vermelho"
            onClick={() => {
              setOpen(false);
              buy();
            }}
          >
            Ver produtos
          </button>
        </div>
      </header>
    </>
  );
}
