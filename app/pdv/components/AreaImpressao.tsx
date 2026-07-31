"use client";

import { useEffect } from "react";
import type { ConfigPdv, Venda } from "../../lib/pdv/types";
import Ticket from "./Ticket";

type Props = {
  venda: Venda | null;
  config: ConfigPdv;
  segundaVia?: boolean;
  /** Chamado quando a caixa de impressão fecha (imprimindo ou cancelando). */
  aoTerminar: () => void;
};

/**
 * Só existe pra impressão: fica escondida na tela e, no @media print, é a
 * única coisa visível. Cada ticket cai numa página/pedaço de bobina.
 */
export default function AreaImpressao({
  venda,
  config,
  segundaVia,
  aoTerminar,
}: Props) {
  useEffect(() => {
    if (!venda) return;

    const fim = () => aoTerminar();
    window.addEventListener("afterprint", fim);

    // Espera o layout aplicar antes de abrir a caixa de impressão.
    const id = window.setTimeout(() => window.print(), 120);

    return () => {
      window.clearTimeout(id);
      window.removeEventListener("afterprint", fim);
    };
  }, [venda, aoTerminar]);

  if (!venda) return null;

  return (
    <div className="area-impressao">
      <style>{`
        @page { size: ${config.larguraPapelMm}mm auto; margin: 0; }
        .ticket { width: ${config.larguraPapelMm}mm; }
      `}</style>
      {venda.tickets.map((t) => (
        <Ticket
          key={t.codigo}
          venda={venda}
          ticket={t}
          config={config}
          segundaVia={segundaVia}
        />
      ))}
    </div>
  );
}
