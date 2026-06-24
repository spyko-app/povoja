import { steps } from "../lib/data";

export default function HowItWorks() {
  return (
    <section className="section" id="como-funciona">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">★ Como funciona</span>
          <h2 className="section-title">
            Munição pronta. <span className="vermelho">Você só posta.</span>
          </h2>
          <p className="section-sub">
            Em três passos você sai do zero pro ataque. Sem precisar criar nada
            do zero, sem perder tempo enquanto a direita dispara fake news.
          </p>
        </div>
        <div className="steps">
          {steps.map((s) => (
            <div className="step" key={s.n}>
              <div className="num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
