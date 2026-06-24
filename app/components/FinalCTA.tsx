"use client";

import { CountdownBig } from "./Countdown";
import { useCheckout } from "./Checkout";

export default function FinalCTA() {
  const { open } = useCheckout();
  return (
    <section className="section final-cta">
      <div className="container">
        <span className="eyebrow on-dark">★ A hora é agora</span>
        <h2 style={{ marginTop: 16 }}>O Brasil não pode esperar.</h2>
        <p>
          A extrema-direita já está nas redes todo santo dia. O povo também
          precisa estar. Pegue sua munição e entre na disputa antes do 1º turno.
        </p>
        <CountdownBig />
        <div>
          <button
            className="btn btn-amarelo btn-lg"
            onClick={() =>
              open({ name: "Kit Completo", price: "R$47", priceOld: "R$97" })
            }
          >
            Ver produtos →
          </button>
        </div>
      </div>
    </section>
  );
}
