"use client";

import { useCallback, useMemo, useState } from "react";
import { mesmoDia, moeda } from "../lib/pdv/format";
import { lerVendas, registrarVenda } from "../lib/pdv/storage";
import {
  FORMAS_PAGAMENTO,
  type FormaPagamento,
  type ItemVenda,
  type Produto,
  type Venda,
} from "../lib/pdv/types";
import AreaImpressao from "./components/AreaImpressao";
import Moldura from "./components/Moldura";
import { usarPdv } from "./components/usarPdv";

const TODAS = "Todas";

export default function Caixa() {
  const { config, produtos, pronto } = usarPdv();

  const [categoria, setCategoria] = useState(TODAS);
  const [busca, setBusca] = useState("");
  const [itens, setItens] = useState<ItemVenda[]>([]);
  const [pagamento, setPagamento] = useState<FormaPagamento>("DINHEIRO");
  const [imprimindo, setImprimindo] = useState<Venda | null>(null);
  const [reimpressao, setReimpressao] = useState(false);
  const [ultima, setUltima] = useState<Venda | null>(null);

  const categorias = useMemo(() => {
    const nomes = new Set(produtos.filter((p) => p.ativo).map((p) => p.categoria));
    return [TODAS, ...Array.from(nomes)];
  }, [produtos]);

  const visiveis = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return produtos.filter(
      (p) =>
        p.ativo &&
        (categoria === TODAS || p.categoria === categoria) &&
        (!termo || p.nome.toLowerCase().includes(termo)),
    );
  }, [produtos, categoria, busca]);

  const total = itens.reduce((acc, i) => acc + i.precoCentavos * i.quantidade, 0);
  const totalTickets = itens.reduce((acc, i) => acc + i.quantidade, 0);

  const totalDoDia = useMemo(() => {
    if (!pronto) return 0;
    return lerVendas()
      .filter((v) => mesmoDia(v.criadaEm))
      .reduce((acc, v) => acc + v.totalCentavos, 0);
    // recalcula quando fecha uma venda
  }, [pronto, ultima]);

  function adicionar(produto: Produto) {
    setItens((atual) => {
      const existe = atual.find((i) => i.produtoId === produto.id);
      if (existe) {
        return atual.map((i) =>
          i.produtoId === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i,
        );
      }
      return [
        ...atual,
        {
          produtoId: produto.id,
          nome: produto.nome,
          precoCentavos: produto.precoCentavos,
          quantidade: 1,
        },
      ];
    });
  }

  function mudarQuantidade(produtoId: string, delta: number) {
    setItens((atual) =>
      atual
        .map((i) =>
          i.produtoId === produtoId
            ? { ...i, quantidade: i.quantidade + delta }
            : i,
        )
        .filter((i) => i.quantidade > 0),
    );
  }

  function finalizar() {
    if (!itens.length) return;
    const venda = registrarVenda(itens, pagamento, config);
    setUltima(venda);
    setReimpressao(false);
    setImprimindo(venda);
    setItens([]);
  }

  const fimImpressao = useCallback(() => setImprimindo(null), []);

  return (
    <>
      <Moldura estabelecimento={config.estabelecimento} terminal={config.terminal}>
        <h1>Caixa</h1>
        <p className="pdv-legenda">
          Toque nos produtos, escolha a forma de pagamento e finalize — sai um
          ticket por unidade, pronto pra trocar no balcão. Vendido hoje:{" "}
          <b>{moeda(totalDoDia)}</b>
        </p>

        <div className="caixa">
          <section className="painel">
            <input
              className="busca"
              type="text"
              placeholder="Buscar produto…"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />

            <div className="filtros">
              {categorias.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`chip${categoria === c ? " ativo" : ""}`}
                  onClick={() => setCategoria(c)}
                >
                  {c}
                </button>
              ))}
            </div>

            {visiveis.length === 0 ? (
              <p className="vazio">
                {pronto
                  ? "Nenhum produto ativo aqui. Cadastre em Configurações."
                  : "Carregando catálogo…"}
              </p>
            ) : (
              <div className="grade-produtos">
                {visiveis.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className="btn-produto"
                    onClick={() => adicionar(p)}
                  >
                    <b>{p.nome}</b>
                    <span>{moeda(p.precoCentavos)}</span>
                  </button>
                ))}
              </div>
            )}
          </section>

          <aside className="painel carrinho">
            <h2>Venda atual</h2>

            {itens.length === 0 ? (
              <p className="vazio">Nenhum item. Toque num produto ao lado.</p>
            ) : (
              <div className="carrinho-lista">
                {itens.map((i) => (
                  <div className="carrinho-item" key={i.produtoId}>
                    <b>{i.nome}</b>
                    <span className="valor">
                      {moeda(i.precoCentavos * i.quantidade)}
                    </span>
                    <span className="unit">{moeda(i.precoCentavos)} cada</span>
                    <div className="qtd">
                      <button
                        type="button"
                        onClick={() => mudarQuantidade(i.produtoId, -1)}
                        aria-label={`Remover um ${i.nome}`}
                      >
                        −
                      </button>
                      <b>{i.quantidade}</b>
                      <button
                        type="button"
                        onClick={() => mudarQuantidade(i.produtoId, 1)}
                        aria-label={`Adicionar um ${i.nome}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="total-linha">
              <span>
                {totalTickets} {totalTickets === 1 ? "ticket" : "tickets"}
              </span>
              <b>{moeda(total)}</b>
            </div>

            <div className="pagamentos">
              {FORMAS_PAGAMENTO.map((f) => (
                <button
                  key={f}
                  type="button"
                  className={`btn${pagamento === f ? " ativo" : ""}`}
                  onClick={() => setPagamento(f)}
                >
                  {f}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="btn btn-principal"
              disabled={!itens.length}
              onClick={finalizar}
            >
              Finalizar e imprimir
            </button>
            <button
              type="button"
              className="btn btn-secundario btn-perigo"
              onClick={() => setItens([])}
              disabled={!itens.length}
            >
              Limpar venda
            </button>

            {ultima && (
              <div className="aviso">
                Venda #{ultima.numero} fechada · {moeda(ultima.totalCentavos)} ·{" "}
                {ultima.tickets.length}{" "}
                {ultima.tickets.length === 1 ? "ticket" : "tickets"}
                <div className="acoes">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      setReimpressao(true);
                      setImprimindo(ultima);
                    }}
                  >
                    Reimprimir
                  </button>
                </div>
              </div>
            )}
          </aside>
        </div>
      </Moldura>

      <AreaImpressao
        venda={imprimindo}
        config={config}
        segundaVia={reimpressao}
        aoTerminar={fimImpressao}
      />
    </>
  );
}
