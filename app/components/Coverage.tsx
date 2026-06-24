import { coverage } from "../lib/data";

export default function Coverage() {
  return (
    <section className="section coverage-section">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">★ Cobertura</span>
          <h2 className="section-title">As pautas que importam pro povo.</h2>
          <p className="section-sub">
            Enquanto eles falam em ódio, a gente fala do que muda a vida das
            pessoas.
          </p>
        </div>
        <div className="tags" style={{ justifyContent: "center" }}>
          {coverage.map((c) => (
            <span className="tag-pill" key={c}>
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
