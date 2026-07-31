import { dataHora, moeda, saudacao } from "../../lib/pdv/format";
import type { ConfigPdv, Ticket as TicketVenda, Venda } from "../../lib/pdv/types";
import Carimbo from "./Carimbo";
import CodigoBarras from "./CodigoBarras";

type Props = {
  venda: Venda;
  ticket: TicketVenda;
  config: ConfigPdv;
  /** Marca "2ª VIA" no papel quando é reimpressão. */
  segundaVia?: boolean;
};

/** O papel que sai da impressora — layout de bobina térmica. */
export default function Ticket({ venda, ticket, config, segundaVia }: Props) {
  const total = venda.tickets.length;
  const carimboUnidade = config.umTicketPorUnidade;
  const quando = dataHora(venda.criadaEm);

  const estreito = config.larguraPapelMm <= 58;

  return (
    <div className={`ticket${estreito ? " ticket-estreito" : ""}`}>
      {config.mostrarCarimbo && (
        <div className="ticket-topo">
          <Carimbo config={config} />
        </div>
      )}

      {segundaVia && <div className="ticket-via">*** 2ª VIA ***</div>}

      {carimboUnidade ? (
        <>
          <div className="ticket-produto">{ticket.produtoNome}</div>
          <div className="ticket-preco">{moeda(ticket.precoCentavos)}</div>
        </>
      ) : (
        <div className="ticket-itens">
          {venda.itens.map((item) => (
            <div className="ticket-item" key={item.produtoId}>
              <span className="ticket-item-qtd">{item.quantidade}x</span>
              <span className="ticket-item-nome">{item.nome}</span>
              <span className="ticket-item-valor">
                {moeda(item.precoCentavos * item.quantidade)}
              </span>
            </div>
          ))}
          <div className="ticket-item ticket-item-total">
            <span className="ticket-item-nome">TOTAL</span>
            <span className="ticket-item-valor">
              {moeda(venda.totalCentavos)}
            </span>
          </div>
        </div>
      )}

      {config.mostrarCodigoBarras && (
        <div className="ticket-codigo">
          <CodigoBarras valor={ticket.codigo} />
        </div>
      )}

      <div className="ticket-data">{quando}</div>

      <div className="ticket-rodape">
        <div className="ticket-linha ticket-linha-dupla">
          <span>
            Nº {venda.numero}-{ticket.indice} {venda.terminal}
          </span>
          <span>{ticket.codigo}</span>
        </div>
        <div className="ticket-linha">
          TICKET {ticket.indice} DE {total} | {moeda(venda.totalCentavos)}{" "}
          {venda.formaPagamento}
        </div>
        <div className="ticket-linha">
          {quando} {config.mensagemRodape} {saudacao(venda.criadaEm)}
        </div>
        <div className="ticket-linha">
          TERMINAL {venda.terminal} VER {config.versao} {config.site}
        </div>
      </div>

      <div className="ticket-corte" aria-hidden="true" />
    </div>
  );
}
