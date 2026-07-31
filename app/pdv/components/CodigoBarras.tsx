"use client";

import { useMemo } from "react";
import { barras, code128B } from "../../lib/pdv/code128";

type Props = {
  valor: string;
  /** Altura em milímetros no papel. */
  alturaMm?: number;
  /** Largura de um módulo, em milímetros (0,33mm ≈ 8 dots/mm). */
  moduloMm?: number;
};

export default function CodigoBarras({
  valor,
  alturaMm = 12,
  moduloMm = 0.33,
}: Props) {
  const { desenho, total } = useMemo(() => {
    const modulos = code128B(valor);
    return { desenho: barras(modulos), total: modulos.length };
  }, [valor]);

  // Em papel estreito o código encolhe até caber, em vez de estourar a margem.
  const estilo = {
    width: `min(${(total * moduloMm).toFixed(1)}mm, 100%)`,
    height: `${alturaMm}mm`,
  };

  return (
    <svg
      className="ticket-barcode"
      viewBox={`0 0 ${total} 100`}
      preserveAspectRatio="none"
      style={estilo}
      role="img"
      aria-label={`Código de barras ${valor}`}
    >
      <rect x="0" y="0" width={total} height="100" fill="#fff" />
      {desenho.map((b) => (
        <rect
          key={b.x}
          x={b.x}
          y="0"
          width={b.largura}
          height="100"
          fill="#000"
        />
      ))}
    </svg>
  );
}
