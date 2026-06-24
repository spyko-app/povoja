export default function Community() {
  return (
    <section className="section community-section" id="grupo">
      <div className="container">
        <div className="community-card">
          <div className="community-banner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/banner-grupo.jpg"
              alt="Faça parte do maior grupo de WhatsApp do povo"
            />
          </div>
          <div className="community-content">
            <span className="eyebrow">★ Mutirão digital</span>
            <h2>Entre no mutirão pelo povo brasileiro</h2>
            <p>
              Grupo gratuito no WhatsApp e no Telegram. Receba conteúdo em
              primeira mão, combine as respostas com a galera e ajude a furar a
              bolha da extrema-direita. A internet também é do povo.
            </p>
            <div className="community-actions">
              <a className="btn btn-vermelho btn-lg" href="#produtos">
                Entrar no grupo grátis →
              </a>
            </div>
            <p className="community-disclaimer">
              Grupo gratuito · sem spam · saia quando quiser
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
