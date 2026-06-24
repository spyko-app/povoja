import { values } from "../lib/data";

export default function Mission() {
  return (
    <section className="section">
      <div className="container mission">
        <span className="eyebrow">★ Nossa missão</span>
        <h2>
          Conteúdo que fala a língua do{" "}
          <span className="amarelo" style={{ WebkitTextStroke: "1px #c20019" }}>
            povo brasileiro.
          </span>
        </h2>
        <p>
          Não basta ter razão — tem que ter alcance. A gente entrega a ideia
          certa, com a estética certa, no tom certo e no formato certo pra cada
          plataforma. Porque a direita aprendeu a usar a internet, e a esquerda
          vai usar melhor.
        </p>
        <div className="values">
          {values.map((v) => (
            <span className="value" key={v}>
              {v}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
