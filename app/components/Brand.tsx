import Logo from "./Logo";

export default function Brand() {
  return (
    <section className="brand-band" aria-label="Povo Já">
      <div className="container brand-band-inner">
        <Logo tone="cream" tagline className="logo-xl" />
        <p className="brand-band-line">
          A internet também é do povo. Entre na luta.
        </p>
      </div>
    </section>
  );
}
