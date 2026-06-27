"use client";

import { CountdownBig } from "./Countdown";

export default function FinalCTA() {
  return (
    <section className="section final-cta">
      <div className="container">
        <span className="eyebrow on-dark">★ A hora é agora</span>
        <h2 style={{ marginTop: 16 }}>O Brasil não pode esperar.</h2>
        <p className="final-cta-lead">
          <span className="l1">
            A extrema-direita já está nas redes todo santo dia.
          </span>
          <span className="l2">
            O povo também precisa estar. Pegue sua munição e entre na disputa
            antes do 1º turno.
          </span>
        </p>
        <CountdownBig />
        <div>
          <a href="#produtos" className="btn btn-amarelo btn-lg">
            Ver produtos →
          </a>
        </div>
      </div>
    </section>
  );
}
