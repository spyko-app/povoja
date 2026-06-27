import { strategy } from "../lib/data";

export default function Strategy() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">★ A estratégia completa</span>
          <h2 className="section-title">
            Tudo pra disputar as redes <span className="vermelho">num lugar só.</span>
          </h2>
          <p className="section-sub">
            Seis frentes de combate digital pra organizar o povo e não dar
            sossego pra desinformação da direita.
          </p>
        </div>
        <div className="strategy">
          {strategy.map((s) => (
            <div className="strat" key={s.title}>
              <div className="ico">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
