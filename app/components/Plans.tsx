"use client";

import { plans } from "../lib/data";
import { useCheckout } from "./Checkout";

export default function Plans() {
  const { open } = useCheckout();

  return (
    <section className="section plans-section" id="kit-completo">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">★ Kit Completo</span>
          <h2 className="section-title">Leve tudo e economize.</h2>
          <p className="section-sub">
            Em vez de comprar item por item, junte tudo num pacote só e pague bem
            menos. Quanto mais completo, maior a economia.
          </p>
        </div>

        <div className="plans">
          {plans.map((plan) => (
            <article
              className={`plan ${plan.featured ? "featured" : ""}`}
              key={plan.id}
            >
              {plan.badge && <span className="plan-badge">{plan.badge}</span>}
              <h3>{plan.name}</h3>
              <p className="plan-tagline">{plan.tagline}</p>

              <div className="plan-price">
                <s>de {plan.priceOld}</s>
                <div className="plan-price-now">
                  <span>por</span>
                  <b>{plan.price}</b>
                </div>
                <span className="plan-save">economize {plan.save}</span>
              </div>

              <ul className="plan-features">
                {plan.features.map((f) => (
                  <li key={f.label} className={f.included ? "yes" : "no"}>
                    <span className="plan-ic">{f.included ? "✓" : "✕"}</span>
                    {f.label}
                  </li>
                ))}
              </ul>

              <button
                className={`btn btn-block btn-lg ${
                  plan.featured ? "btn-amarelo" : "btn-vermelho"
                }`}
                onClick={() =>
                  open({
                    name: plan.name,
                    price: plan.price,
                    priceOld: plan.priceOld,
                  })
                }
              >
                Quero esse →
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
