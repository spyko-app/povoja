"use client";

import { CountdownInline } from "./Countdown";
import { useCheckout } from "./Checkout";

export default function Hero() {
  const { open } = useCheckout();

  return (
    <section className="hero" id="topo">
      <span className="blob a" />
      <span className="blob b" />
      <div className="container hero-grid">
        <div>
          <div className="hero-chip">
            <span className="pulse" />
            1º turno 2026 · faltam <CountdownInline />
          </div>

          <h1>
            O povo <span className="hl">age agora.</span>
          </h1>

          <p className="hero-sub">
            Ebook com argumentos que desmontam a direita, cards de resposta
            rápida e vídeos prontos pro debate. A partir de R$16,90, com acesso
            imediato.{" "}
            <strong>
              A extrema-direita tem milícia digital — a esquerda tem o povo
              organizado.
            </strong>
          </p>

          <div className="hero-actions">
            <button
              className="btn btn-amarelo btn-lg"
              onClick={() =>
                open({ name: "Kit Completo", price: "R$47", priceOld: "R$97" })
              }
            >
              Ver produtos · R$16,90 →
            </button>
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
              <b>R$16,90</b>
              <span>a partir de</span>
            </div>
            <div className="hero-stat">
              <b>Imediato</b>
              <span>acesso na hora</span>
            </div>
            <div className="hero-stat">
              <b>7 dias</b>
              <span>de garantia</span>
            </div>
          </div>
        </div>

        <div className="hero-card">
          <span className="tag">Mais baixado</span>
          <h3>Arsenal de Argumentos</h3>
          <p className="muted">
            O ebook que vira o jogo no debate. Tese, dados oficiais e a resposta
            pronta pra cada lorota.
          </p>
          <ul>
            <li>5 temas com dados e fontes</li>
            <li>Como responder ao bolsonarismo</li>
            <li>Mitos da direita desmontados</li>
          </ul>
          <div className="price">
            <b>R$22</b>
            <s>R$47</s>
          </div>
          <button
            className="btn btn-vermelho btn-block"
            onClick={() =>
              open({
                name: "Ebook Arsenal de Argumentos",
                price: "R$22",
                priceOld: "R$47",
              })
            }
          >
            Quero meu arsenal →
          </button>
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
