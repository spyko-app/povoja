import { kits } from "../lib/data";

export default function Kits() {
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
            <article className="kit" key={k.name}>
              <div className="kit-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={k.image} alt={k.name} />
              </div>
              <div className="kit-body">
                <h3>{k.name}</h3>
                <div className="kit-count">{k.count} peças</div>
                <p>{k.desc}</p>
                <a className="btn btn-amarelo btn-block" href={k.checkoutUrl || "#"}>
                  Comprar R$16,90
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="kits-price">
          Cada kit por <b>R$16,90</b> · ou leve todos no Kit Completo
        </p>
      </div>
    </section>
  );
}
