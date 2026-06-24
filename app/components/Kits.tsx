"use client";

import { kits } from "../lib/data";
import { useCheckout } from "./Checkout";

export default function Kits() {
  const { open } = useCheckout();

  return (
    <section className="section kits-section">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow on-dark">★ Kits temáticos</span>
          <h2 className="section-title">Um kit pra cada batalha.</h2>
          <p className="section-sub" style={{ color: "rgba(255,255,255,0.9)" }}>
            Pacotes organizados por pauta. Dispare uma frente inteira de uma vez
            só e não deixe nenhuma mentira sem resposta.
          </p>
        </div>

        <div className="kits">
          {kits.map((k) => (
            <button
              className="kit"
              key={k.name}
              onClick={() => open({ name: k.name, price: "R$16,90" })}
              style={{ textAlign: "left", cursor: "pointer" }}
            >
              <div className="count">
                {k.count}
                <span>peças</span>
              </div>
              <h3>{k.name}</h3>
              <p>{k.desc}</p>
            </button>
          ))}
        </div>

        <p className="kits-price">
          Cada kit por <b>R$16,90</b> · ou leve todos no Kit Completo
        </p>
      </div>
    </section>
  );
}
