export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-povoja.png"
                alt="Povo Já — Trabalho, Justiça e Poder Popular"
                className="footer-logo-img"
              />
            </div>
            <p className="footer-about">
              Movimento independente de comunicação popular. Conteúdo pronto pra
              defender o trabalho, a saúde, a educação, os direitos e a
              democracia nas redes. Feito pelo povo, pro povo.
            </p>
          </div>

          <div className="footer-col">
            <h4>Produtos</h4>
            <a href="#produtos">Ebook de Argumentos</a>
            <a href="#produtos">Pack de Cards</a>
            <a href="#produtos">Pack de Vídeos</a>
            <a href="#produtos">Kit Completo</a>
          </div>

          <div className="footer-col">
            <h4>Institucional</h4>
            <a href="#topo">Sobre nós</a>
            <a href="#faq">Perguntas frequentes</a>
            <a href="#topo">Termos de uso</a>
            <a href="#topo">Privacidade</a>
          </div>

          <div className="footer-col">
            <h4>Contato</h4>
            <a href="#grupo">WhatsApp</a>
            <a href="#grupo">Telegram</a>
            <a href="#grupo">Instagram</a>
            <a href="#grupo">E-mail</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 PovoJá · Feito pelo povo, pro povo. ✊</span>
          <span>O povo unido jamais será vencido.</span>
        </div>
        <p className="footer-disclaimer">
          Iniciativa independente de comunicação popular, sem vínculo oficial com
          partidos ou candidaturas. As marcas e referências citadas pertencem aos
          seus respectivos donos. Conteúdo de caráter informativo e de
          mobilização política.
        </p>
      </div>
    </footer>
  );
}
