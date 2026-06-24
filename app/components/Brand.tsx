export default function Brand() {
  return (
    <section className="brand-band" aria-label="Povo Já">
      <div className="container brand-band-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-povoja.png"
          alt="Povo Já — Trabalho, Justiça e Poder Popular"
          className="brand-band-img"
        />
        <p className="brand-band-line">
          A internet também é do povo. Entre na luta.
        </p>
      </div>
    </section>
  );
}
