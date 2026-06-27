"use client";

import { CountdownInline } from "./Countdown";

export default function Hero() {
  return (
    <section className="hero" id="topo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="hero-mobile-banner"
        src="/bg-mobile.jpg"
        alt="Lula com o punho erguido e o povo"
      />
      <div className="container hero-inner">
        <div className="hero-content">
          <div className="hero-chip">
            <span className="pulse" />
            1º turno 2026 · faltam <CountdownInline />
          </div>

          <h1>
            O povo <span className="hl">age agora.</span>
          </h1>

          <p className="hero-sub">
            Tenha resposta pra cada fake news da direita, defenda o SUS, o
            trabalho e a democracia e vença o debate em qualquer rede — com dado
            e verdade, na hora.{" "}
            <strong>
              A extrema-direita tem milícia digital; a esquerda tem o povo
              organizado.
            </strong>
          </p>

          <div className="hero-actions">
            <a href="#produtos" className="btn btn-amarelo btn-lg">
              Ver produtos · R$13,90 →
            </a>
            <a href="#como-funciona" className="btn btn-outline-light btn-lg">
              Como funciona
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <b>300+</b>
              <span>peças prontas pra postar</span>
            </div>
            <div className="hero-stat">
              <b>R$13,90</b>
              <span>a partir de</span>
            </div>
            <div className="hero-stat">
              <b>Imediato</b>
              <span>acesso na hora</span>
            </div>
            <div className="hero-stat">
              <b>Sem</b>
              <span>mensalidade</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Marquee() {
  const words = [
    "Trabalho",
    "Saúde pra todos",
    "Educação pública",
    "Direitos",
    "Democracia",
    "Soberania",
    "Justiça social",
    "Brasil do povo",
  ];
  const line = (
    <span>
      {words.map((w) => (
        <span key={w}>{w}</span>
      ))}
    </span>
  );
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {line}
        {line}
      </div>
    </div>
  );
}
