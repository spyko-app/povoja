"use client";

import { useCallback, useEffect, useState } from "react";
import { paraCentavos, paraReais } from "../../lib/pdv/format";
import {
  codigoTicket,
  lerConfig,
  lerProdutos,
  salvarConfig,
  salvarProdutos,
} from "../../lib/pdv/storage";
import { PRODUTOS_PADRAO } from "../../lib/pdv/catalog";
import {
  CONFIG_PADRAO,
  type ConfigPdv,
  type Produto,
  type Venda,
} from "../../lib/pdv/types";
import AreaImpressao from "../components/AreaImpressao";
import Moldura from "../components/Moldura";
import Ticket from "../components/Ticket";

type ProdutoEdit = Produto & { precoTexto: string };

const paraEdit = (p: Produto): ProdutoEdit => ({
  ...p,
  precoTexto: paraReais(p.precoCentavos),
});

/** Venda fictícia usada na prévia e no teste de impressão. */
function vendaExemplo(config: ConfigPdv, criadaEm: string): Venda {
  const produto = { nome: "ÁGUA 500 ML", precoCentavos: 700 };
  return {
    id: "exemplo",
    numero: 1,
    criadaEm,
    terminal: config.terminal,
    itens: [
      {
        produtoId: "exemplo",
        nome: produto.nome,
        precoCentavos: produto.precoCentavos,
        quantidade: 2,
      },
    ],
    totalCentavos: produto.precoCentavos * 2,
    formaPagamento: "CREDITO",
    tickets: [1, 2].map((i) => ({
      codigo: codigoTicket(config.terminal, 1, i),
      indice: i,
      produtoNome: produto.nome,
      precoCentavos: produto.precoCentavos,
      entregueEm: null,
    })),
  };
}

export default function Configuracoes() {
  const [config, setConfig] = useState<ConfigPdv>(CONFIG_PADRAO);
  const [produtos, setProdutos] = useState<ProdutoEdit[]>([]);
  const [agora, setAgora] = useState<string | null>(null);
  const [salvo, setSalvo] = useState(false);
  const [imprimindo, setImprimindo] = useState<Venda | null>(null);

  useEffect(() => {
    setConfig(lerConfig());
    setProdutos(lerProdutos().map(paraEdit));
    setAgora(new Date().toISOString());
  }, []);

  function campo<K extends keyof ConfigPdv>(chave: K, valor: ConfigPdv[K]) {
    setConfig((c) => ({ ...c, [chave]: valor }));
    setSalvo(false);
  }

  function editar(id: string, mudanca: Partial<ProdutoEdit>) {
    setProdutos((lista) =>
      lista.map((p) => (p.id === id ? { ...p, ...mudanca } : p)),
    );
    setSalvo(false);
  }

  function adicionarProduto() {
    setProdutos((lista) => [
      ...lista,
      {
        id: `p${Date.now().toString(36)}`,
        nome: "NOVO PRODUTO",
        categoria: lista[lista.length - 1]?.categoria ?? "Bebidas",
        precoCentavos: 0,
        ativo: true,
        precoTexto: "0,00",
      },
    ]);
    setSalvo(false);
  }

  function removerProduto(id: string) {
    setProdutos((lista) => lista.filter((p) => p.id !== id));
    setSalvo(false);
  }

  function salvar() {
    const limpos: Produto[] = produtos.map((p) => ({
      id: p.id,
      nome: p.nome.trim().toUpperCase(),
      categoria: p.categoria.trim() || "Geral",
      precoCentavos: paraCentavos(p.precoTexto),
      ativo: p.ativo,
    }));
    salvarProdutos(limpos);
    salvarConfig(config);
    setProdutos(limpos.map(paraEdit));
    setSalvo(true);
  }

  function restaurarCatalogo() {
    if (!window.confirm("Substituir o catálogo atual pelo catálogo de exemplo?"))
      return;
    setProdutos(PRODUTOS_PADRAO.map(paraEdit));
    setSalvo(false);
  }

  const fimImpressao = useCallback(() => setImprimindo(null), []);

  return (
    <>
      <Moldura estabelecimento={config.estabelecimento} terminal={config.terminal}>
        <h1>Configurações</h1>
        <p className="pdv-legenda">
          Identidade do ticket, formato do papel e catálogo de produtos. Tudo
          fica salvo neste aparelho.
        </p>

        <div className="colunas">
          <div>
            <section className="painel" style={{ marginBottom: 20 }}>
              <h2>Ticket</h2>

              <div className="campo-linha">
                <div className="campo">
                  <label htmlFor="estab">Estabelecimento</label>
                  <input
                    id="estab"
                    type="text"
                    value={config.estabelecimento}
                    onChange={(e) => campo("estabelecimento", e.target.value)}
                  />
                </div>
                <div className="campo">
                  <label htmlFor="terminal">Terminal (só números)</label>
                  <input
                    id="terminal"
                    type="text"
                    value={config.terminal}
                    onChange={(e) =>
                      campo("terminal", e.target.value.replace(/\D/g, ""))
                    }
                  />
                </div>
              </div>

              <div className="campo-linha">
                <div className="campo">
                  <label htmlFor="topo">Carimbo — texto de cima</label>
                  <input
                    id="topo"
                    type="text"
                    value={config.carimboTopo}
                    onChange={(e) => campo("carimboTopo", e.target.value)}
                  />
                </div>
                <div className="campo">
                  <label htmlFor="base">Carimbo — texto de baixo</label>
                  <input
                    id="base"
                    type="text"
                    value={config.carimboBase}
                    onChange={(e) => campo("carimboBase", e.target.value)}
                  />
                </div>
              </div>

              <div className="campo-linha">
                <div className="campo">
                  <label htmlFor="centro">Carimbo — miolo (sigla)</label>
                  <input
                    id="centro"
                    type="text"
                    value={config.carimboCentro}
                    onChange={(e) => campo("carimboCentro", e.target.value)}
                  />
                </div>
                <div className="campo">
                  <label htmlFor="logo">Logo no miolo (arquivo em /public)</label>
                  <input
                    id="logo"
                    type="text"
                    placeholder="/logo-povoja.png"
                    value={config.logoUrl}
                    onChange={(e) => campo("logoUrl", e.target.value)}
                  />
                </div>
              </div>

              <div className="campo-linha">
                <div className="campo">
                  <label htmlFor="rodape">Mensagem do rodapé</label>
                  <input
                    id="rodape"
                    type="text"
                    value={config.mensagemRodape}
                    onChange={(e) => campo("mensagemRodape", e.target.value)}
                  />
                </div>
                <div className="campo">
                  <label htmlFor="site">Site / contato</label>
                  <input
                    id="site"
                    type="text"
                    value={config.site}
                    onChange={(e) => campo("site", e.target.value)}
                  />
                </div>
              </div>

              <div className="campo-linha">
                <div className="campo">
                  <label htmlFor="papel">Largura do papel</label>
                  <select
                    id="papel"
                    value={config.larguraPapelMm}
                    onChange={(e) =>
                      campo("larguraPapelMm", Number(e.target.value))
                    }
                  >
                    <option value={58}>58 mm</option>
                    <option value={80}>80 mm</option>
                  </select>
                </div>
                <div className="campo">
                  <label htmlFor="versao">Versão exibida no rodapé</label>
                  <input
                    id="versao"
                    type="text"
                    value={config.versao}
                    onChange={(e) => campo("versao", e.target.value)}
                  />
                </div>
              </div>

              <label className="check">
                <input
                  type="checkbox"
                  checked={config.mostrarCarimbo}
                  onChange={(e) => campo("mostrarCarimbo", e.target.checked)}
                />
                Imprimir o carimbo redondo no topo
              </label>
              <label className="check">
                <input
                  type="checkbox"
                  checked={config.mostrarCodigoBarras}
                  onChange={(e) => campo("mostrarCodigoBarras", e.target.checked)}
                />
                Imprimir código de barras (Code 128)
              </label>
              <label className="check">
                <input
                  type="checkbox"
                  checked={config.umTicketPorUnidade}
                  onChange={(e) => campo("umTicketPorUnidade", e.target.checked)}
                />
                Um papel por unidade vendida (desmarcado: um papel por venda)
              </label>

              <div className="acoes">
                <button type="button" className="btn btn-principal" onClick={salvar}>
                  Salvar configurações
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => agora && setImprimindo(vendaExemplo(config, agora))}
                >
                  Imprimir teste
                </button>
              </div>
              {salvo && <div className="aviso">Configurações salvas.</div>}
            </section>

            <section className="painel">
              <h2>Catálogo</h2>
              <table className="tabela">
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Categoria</th>
                    <th className="num">Preço (R$)</th>
                    <th>Ativo</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {produtos.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <input
                          type="text"
                          value={p.nome}
                          onChange={(e) => editar(p.id, { nome: e.target.value })}
                          aria-label="Nome do produto"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={p.categoria}
                          onChange={(e) =>
                            editar(p.id, { categoria: e.target.value })
                          }
                          aria-label="Categoria"
                        />
                      </td>
                      <td className="num">
                        <input
                          type="text"
                          inputMode="decimal"
                          value={p.precoTexto}
                          onChange={(e) =>
                            editar(p.id, { precoTexto: e.target.value })
                          }
                          aria-label="Preço"
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={p.ativo}
                          onChange={(e) => editar(p.id, { ativo: e.target.checked })}
                          aria-label="Produto ativo"
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-perigo"
                          onClick={() => removerProduto(p.id)}
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="acoes">
                <button type="button" className="btn" onClick={adicionarProduto}>
                  Adicionar produto
                </button>
                <button type="button" className="btn btn-principal" onClick={salvar}>
                  Salvar catálogo
                </button>
                <button type="button" className="btn" onClick={restaurarCatalogo}>
                  Restaurar exemplo
                </button>
              </div>
            </section>
          </div>

          <aside>
            <h2>Prévia do papel</h2>
            <style>{`.previa .ticket { width: ${config.larguraPapelMm}mm; }`}</style>
            <div className="previa">
              {agora ? (
                (() => {
                  const exemplo = vendaExemplo(config, agora);
                  return (
                    <Ticket
                      venda={exemplo}
                      ticket={exemplo.tickets[0]}
                      config={config}
                    />
                  );
                })()
              ) : (
                <p className="vazio">Carregando…</p>
              )}
            </div>
          </aside>
        </div>
      </Moldura>

      <AreaImpressao venda={imprimindo} config={config} aoTerminar={fimImpressao} />
    </>
  );
}
