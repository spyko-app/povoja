"use client";

import { useRef, useState } from "react";
import { dataHora, moeda } from "../../lib/pdv/format";
import {
  buscarTicket,
  marcarEntregue,
  type ResultadoValidacao,
} from "../../lib/pdv/storage";
import Moldura from "../components/Moldura";
import { usarPdv } from "../components/usarPdv";

/** Balcão: lê o código do ticket (leitor ou digitado) e dá baixa. */
export default function Validar() {
  const { config } = usarPdv();
  const [codigo, setCodigo] = useState("");
  const [resultado, setResultado] = useState<ResultadoValidacao | null>(null);
  const [baixado, setBaixado] = useState(false);
  const entrada = useRef<HTMLInputElement>(null);

  function consultar(e: React.FormEvent) {
    e.preventDefault();
    if (!codigo.trim()) return;
    setResultado(buscarTicket(codigo));
    setBaixado(false);
  }

  function entregar() {
    if (!resultado || resultado.status === "nao-encontrado") return;
    const r = marcarEntregue(resultado.ticket.codigo);
    setResultado(r);
    setBaixado(r.status === "ok");
    setCodigo("");
    entrada.current?.focus();
  }

  function limpar() {
    setCodigo("");
    setResultado(null);
    setBaixado(false);
    entrada.current?.focus();
  }

  return (
    <Moldura estabelecimento={config.estabelecimento} terminal={config.terminal}>
      <h1>Validar ticket</h1>
      <p className="pdv-legenda">
        Passe o leitor no código de barras (ou digite os números embaixo dele) e
        confirme a entrega. Cada ticket só pode ser entregue uma vez.
      </p>

      <div className="caixa">
        <section className="painel">
          <form onSubmit={consultar}>
            <div className="campo">
              <label htmlFor="codigo">Código do ticket</label>
              <input
                id="codigo"
                ref={entrada}
                type="text"
                inputMode="numeric"
                autoFocus
                autoComplete="off"
                placeholder="0000000000000"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
            </div>
            <div className="acoes">
              <button type="submit" className="btn">
                Consultar
              </button>
              <button type="button" className="btn" onClick={limpar}>
                Limpar
              </button>
            </div>
          </form>

          {resultado?.status === "nao-encontrado" && (
            <div className="aviso erro">
              Ticket não encontrado neste terminal.
            </div>
          )}

          {resultado && resultado.status !== "nao-encontrado" && (
            <>
              <div
                className={`aviso${
                  resultado.ticket.entregueEm && !baixado ? " erro" : ""
                }`}
              >
                {baixado
                  ? "Entrega confirmada — pode liberar o produto."
                  : resultado.ticket.entregueEm
                    ? `Já entregue em ${dataHora(resultado.ticket.entregueEm)} — não entregar de novo.`
                    : "Ticket válido — confirme a entrega."}
              </div>

              <table className="tabela" style={{ marginTop: 14 }}>
                <tbody>
                  <tr>
                    <th>Produto</th>
                    <td>{resultado.ticket.produtoNome}</td>
                  </tr>
                  <tr>
                    <th>Valor</th>
                    <td>{moeda(resultado.ticket.precoCentavos)}</td>
                  </tr>
                  <tr>
                    <th>Venda</th>
                    <td>
                      #{resultado.venda.numero} · {resultado.venda.formaPagamento}
                    </td>
                  </tr>
                  <tr>
                    <th>Emitido</th>
                    <td>{dataHora(resultado.venda.criadaEm)}</td>
                  </tr>
                  <tr>
                    <th>Ticket</th>
                    <td>
                      {resultado.ticket.indice} de{" "}
                      {resultado.venda.tickets.length}
                    </td>
                  </tr>
                </tbody>
              </table>

              {!resultado.ticket.entregueEm && (
                <button
                  type="button"
                  className="btn btn-principal"
                  style={{ marginTop: 14 }}
                  onClick={entregar}
                >
                  Confirmar entrega
                </button>
              )}
            </>
          )}
        </section>
      </div>
    </Moldura>
  );
}
