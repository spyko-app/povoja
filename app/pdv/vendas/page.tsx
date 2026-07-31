"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { dataHora, hora, mesmoDia, moeda, paraReais } from "../../lib/pdv/format";
import { lerVendas, limparVendas } from "../../lib/pdv/storage";
import type { FormaPagamento, Venda } from "../../lib/pdv/types";
import AreaImpressao from "../components/AreaImpressao";
import Moldura from "../components/Moldura";
import { usarPdv } from "../components/usarPdv";

type Periodo = "hoje" | "tudo";

export default function Vendas() {
  const { config } = usarPdv();
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [periodo, setPeriodo] = useState<Periodo>("hoje");
  const [imprimindo, setImprimindo] = useState<Venda | null>(null);

  useEffect(() => {
    setVendas(lerVendas());
  }, []);

  const lista = useMemo(
    () => (periodo === "hoje" ? vendas.filter((v) => mesmoDia(v.criadaEm)) : vendas),
    [vendas, periodo],
  );

  const resumo = useMemo(() => {
    const porPagamento = new Map<FormaPagamento, number>();
    const porProduto = new Map<string, { qtd: number; total: number }>();
    let total = 0;
    let tickets = 0;
    let entregues = 0;

    for (const v of lista) {
      total += v.totalCentavos;
      porPagamento.set(
        v.formaPagamento,
        (porPagamento.get(v.formaPagamento) ?? 0) + v.totalCentavos,
      );
      for (const t of v.tickets) {
        tickets++;
        if (t.entregueEm) entregues++;
      }
      for (const i of v.itens) {
        const atual = porProduto.get(i.nome) ?? { qtd: 0, total: 0 };
        porProduto.set(i.nome, {
          qtd: atual.qtd + i.quantidade,
          total: atual.total + i.quantidade * i.precoCentavos,
        });
      }
    }

    return {
      total,
      tickets,
      entregues,
      porPagamento: Array.from(porPagamento.entries()),
      porProduto: Array.from(porProduto.entries()).sort(
        (a, b) => b[1].total - a[1].total,
      ),
    };
  }, [lista]);

  function exportarCsv() {
    const linhas = [
      ["venda", "data", "hora", "produto", "quantidade", "unitario", "subtotal", "pagamento"],
      ...lista.flatMap((v) =>
        v.itens.map((i) => [
          String(v.numero),
          dataHora(v.criadaEm).split(" ")[0],
          dataHora(v.criadaEm).split(" ")[1],
          i.nome,
          String(i.quantidade),
          paraReais(i.precoCentavos),
          paraReais(i.precoCentavos * i.quantidade),
          v.formaPagamento,
        ]),
      ),
    ];
    const csv = linhas.map((l) => l.join(";")).join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vendas-${periodo}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function apagarTudo() {
    if (!window.confirm("Apagar todo o histórico de vendas deste aparelho?")) return;
    limparVendas();
    setVendas([]);
  }

  const fimImpressao = useCallback(() => setImprimindo(null), []);

  return (
    <>
      <Moldura estabelecimento={config.estabelecimento} terminal={config.terminal}>
        <h1>Vendas e fechamento de caixa</h1>
        <p className="pdv-legenda">
          Tudo fica salvo neste aparelho (offline). Exporte o CSV antes de
          limpar o histórico.
        </p>

        <div className="filtros">
          <button
            type="button"
            className={`chip${periodo === "hoje" ? " ativo" : ""}`}
            onClick={() => setPeriodo("hoje")}
          >
            Hoje
          </button>
          <button
            type="button"
            className={`chip${periodo === "tudo" ? " ativo" : ""}`}
            onClick={() => setPeriodo("tudo")}
          >
            Tudo
          </button>
        </div>

        <div className="resumo">
          <div className="resumo-card">
            <span>Faturamento</span>
            <b>{moeda(resumo.total)}</b>
          </div>
          <div className="resumo-card">
            <span>Vendas</span>
            <b>{lista.length}</b>
          </div>
          <div className="resumo-card">
            <span>Tickets impressos</span>
            <b>{resumo.tickets}</b>
          </div>
          <div className="resumo-card">
            <span>Tickets entregues</span>
            <b>{resumo.entregues}</b>
          </div>
        </div>

        <div className="caixa">
          <section className="painel">
            <h2>Vendas</h2>
            {lista.length === 0 ? (
              <p className="vazio">Nenhuma venda no período.</p>
            ) : (
              <table className="tabela">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Hora</th>
                    <th>Itens</th>
                    <th>Pgto</th>
                    <th className="num">Total</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {lista.map((v) => (
                    <tr key={v.id}>
                      <td>{v.numero}</td>
                      <td>{hora(v.criadaEm)}</td>
                      <td>
                        {v.itens
                          .map((i) => `${i.quantidade}x ${i.nome}`)
                          .join(", ")}
                      </td>
                      <td>{v.formaPagamento}</td>
                      <td className="num">{moeda(v.totalCentavos)}</td>
                      <td className="num">
                        <button
                          type="button"
                          className="btn"
                          onClick={() => setImprimindo(v)}
                        >
                          2ª via
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          <aside className="painel">
            <h2>Por produto</h2>
            {resumo.porProduto.length === 0 ? (
              <p className="vazio">Sem dados.</p>
            ) : (
              <table className="tabela">
                <tbody>
                  {resumo.porProduto.map(([nome, d]) => (
                    <tr key={nome}>
                      <td>{nome}</td>
                      <td className="num">{d.qtd}</td>
                      <td className="num">{moeda(d.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <h2 style={{ marginTop: 20 }}>Por pagamento</h2>
            {resumo.porPagamento.length === 0 ? (
              <p className="vazio">Sem dados.</p>
            ) : (
              <table className="tabela">
                <tbody>
                  {resumo.porPagamento.map(([forma, valor]) => (
                    <tr key={forma}>
                      <td>{forma}</td>
                      <td className="num">{moeda(valor)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="acoes" style={{ marginTop: 18 }}>
              <button type="button" className="btn" onClick={exportarCsv}>
                Exportar CSV
              </button>
              <button
                type="button"
                className="btn btn-perigo"
                onClick={apagarTudo}
              >
                Limpar histórico
              </button>
            </div>
          </aside>
        </div>
      </Moldura>

      <AreaImpressao
        venda={imprimindo}
        config={config}
        segundaVia
        aoTerminar={fimImpressao}
      />
    </>
  );
}
