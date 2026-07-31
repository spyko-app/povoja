import type { ConfigPdv } from "../../lib/pdv/types";

/**
 * Comprimento útil do arco (semicírculo de raio 72, com folga nas pontas).
 * O texto é esticado/comprimido pra caber sempre, qualquer que seja a frase.
 */
const ARCO = 200;

/**
 * Carimbo redondo do topo do ticket: texto em volta em cima e embaixo,
 * logo (ou sigla) no miolo. Tudo em preto puro pra sair bem na térmica.
 */
export default function Carimbo({
  config,
  tamanhoMm = 26,
}: {
  config: ConfigPdv;
  tamanhoMm?: number;
}) {
  const topo = config.carimboTopo.toUpperCase();
  const base = config.carimboBase.toUpperCase();

  return (
    <svg
      className="ticket-carimbo"
      viewBox="0 0 200 200"
      style={{ width: `${tamanhoMm}mm`, height: `${tamanhoMm}mm` }}
      role="img"
      aria-label={`${topo} ${base}`}
    >
      <defs>
        <path id="arco-topo" d="M 28,100 A 72,72 0 0 1 172,100" fill="none" />
        <path id="arco-base" d="M 28,104 A 72,72 0 0 0 172,104" fill="none" />
      </defs>

      <circle cx="100" cy="100" r="96" fill="none" stroke="#000" strokeWidth="4" />
      <circle cx="100" cy="100" r="88" fill="none" stroke="#000" strokeWidth="2" />

      {topo && (
        <text className="carimbo-arco" textAnchor="middle">
          <textPath
            href="#arco-topo"
            startOffset="50%"
            textLength={ARCO}
            lengthAdjust="spacingAndGlyphs"
          >
            {topo}
          </textPath>
        </text>
      )}
      {base && (
        <text className="carimbo-arco" textAnchor="middle">
          <textPath
            href="#arco-base"
            startOffset="50%"
            textLength={ARCO}
            lengthAdjust="spacingAndGlyphs"
          >
            {base}
          </textPath>
        </text>
      )}

      <circle
        cx="100"
        cy="100"
        r="52"
        fill={config.logoUrl ? "#fff" : "#000"}
        stroke="#000"
        strokeWidth={config.logoUrl ? 3 : 0}
      />
      {config.logoUrl ? (
        <image
          href={config.logoUrl}
          x="56"
          y="56"
          width="88"
          height="88"
          preserveAspectRatio="xMidYMid meet"
        />
      ) : (
        <text
          className="carimbo-centro"
          x="100"
          y="100"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {config.carimboCentro.toUpperCase().slice(0, 6)}
        </text>
      )}
    </svg>
  );
}
