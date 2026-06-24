type Tone = "cream" | "ink" | "red";

export default function Logo({
  tone = "ink",
  size = 30,
  tagline = false,
  underline = true,
}: {
  tone?: Tone;
  size?: number;
  tagline?: boolean;
  underline?: boolean;
}) {
  return (
    <span
      className={`logo logo--${tone}`}
      style={{ fontSize: size }}
      role="img"
      aria-label="Povo Já"
    >
      <span className="logo-main">
        <span className={`logo-word ${underline ? "is-underline" : ""}`}>
          <span className="logo-povo">Povo</span>
          <span className="logo-ja">Já</span>
        </span>
        <svg className="logo-burst" viewBox="0 0 100 100" aria-hidden="true">
          {/* cauda/swoosh varrendo por baixo do "JÁ" */}
          <path
            className="logo-swoosh"
            d="M2 78 C 30 72 54 64 78 40 C 73 58 67 66 58 73 C 41 86 21 92 5 92 Z"
          />
          {/* estrela */}
          <polygon
            className="logo-star"
            points="74,4 84,33 100,34 87,52 92,80 74,64 56,80 61,52 48,34 64,33"
          />
        </svg>
      </span>
      {tagline && (
        <span className="logo-tag">Trabalho, Justiça e Poder Popular</span>
      )}
    </span>
  );
}
