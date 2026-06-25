import { products } from "../lib/data";

export default function Products() {
  return (
    <section className="section products-section" id="produtos">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">★ Entregáveis</span>
          <h2 className="section-title">Escolha a sua munição.</h2>
          <p className="section-sub">
            Material pronto, no formato certo, pra cada rede e cada debate. Pague
            uma vez e use à vontade.
          </p>
        </div>

        <div className="products-grid">
          {products.map((p) => (
            <article className={`product-card product-${p.id}`} key={p.id}>
              <div className="product-media">
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt={p.name} />
                ) : (
                  <div className="product-media-demo">
                    <span className="demo-cat">{p.category}</span>
                    <span className="demo-label">imagem em breve</span>
                  </div>
                )}
              </div>
              <div className="product-card-body">
                <div className="product-eyebrow">
                  <span className="cat">{p.category}</span>
                  {p.badge && <span className="product-tag">{p.badge}</span>}
                </div>
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
                  <a
                    className="btn btn-vermelho btn-block"
                    href={p.checkoutUrl || "#"}
                  >
                    Comprar {p.price}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
