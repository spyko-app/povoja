"use client";

import { products } from "../lib/data";
import { useCheckout } from "./Checkout";

export default function Products() {
  const { open } = useCheckout();

  return (
    <section className="section products-section" id="produtos">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">★ Produtos</span>
          <h2 className="section-title">Escolha a sua munição.</h2>
          <p className="section-sub">
            Material pronto, no formato certo, pra cada rede e cada debate. Pague
            uma vez e use à vontade.
          </p>
        </div>

        <div className="products">
          {products.map((p) => (
            <div
              className={`product ${p.featured ? "featured" : ""}`}
              key={p.id}
            >
              {p.badge && <span className="badge">{p.badge}</span>}
              <h3>{p.name}</h3>
              <p className="product-desc">{p.desc}</p>
              <ul className="product-features">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className="product-foot">
                <div className="price">
                  <b>{p.price}</b>
                  {p.priceOld && <s>{p.priceOld}</s>}
                </div>
                <button
                  className={`btn btn-block ${
                    p.featured ? "btn-amarelo" : "btn-vermelho"
                  }`}
                  onClick={() =>
                    open({
                      name: p.name,
                      price: p.price,
                      priceOld: p.priceOld,
                    })
                  }
                >
                  Comprar agora
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
