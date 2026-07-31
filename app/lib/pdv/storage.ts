// Persistência local (localStorage). O PDV roda 100% no navegador do caixa,
// sem backend — o que já cobre o balcão offline.

import { PRODUTOS_PADRAO } from "./catalog";
import {
  CONFIG_PADRAO,
  type ConfigPdv,
  type FormaPagamento,
  type ItemVenda,
  type Produto,
  type Ticket,
  type Venda,
} from "./types";

const CHAVES = {
  config: "pdv.config",
  produtos: "pdv.produtos",
  vendas: "pdv.vendas",
  sequencia: "pdv.sequencia",
};

function ler<T>(chave: string, padrao: T): T {
  if (typeof window === "undefined") return padrao;
  try {
    const cru = window.localStorage.getItem(chave);
    if (!cru) return padrao;
    return JSON.parse(cru) as T;
  } catch {
    return padrao;
  }
}

function gravar(chave: string, valor: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    // cota estourada / modo privado: segue sem persistir
  }
}

export function lerConfig(): ConfigPdv {
  return { ...CONFIG_PADRAO, ...ler<Partial<ConfigPdv>>(CHAVES.config, {}) };
}

export function salvarConfig(config: ConfigPdv) {
  gravar(CHAVES.config, config);
}

export function lerProdutos(): Produto[] {
  return ler<Produto[]>(CHAVES.produtos, PRODUTOS_PADRAO);
}

export function salvarProdutos(produtos: Produto[]) {
  gravar(CHAVES.produtos, produtos);
}

export function lerVendas(): Venda[] {
  return ler<Venda[]>(CHAVES.vendas, []);
}

export function salvarVendas(vendas: Venda[]) {
  gravar(CHAVES.vendas, vendas);
}

function proximoNumero(): number {
  const atual = ler<number>(CHAVES.sequencia, 0) + 1;
  gravar(CHAVES.sequencia, atual);
  return atual;
}

const pad = (n: number, casas: number) => String(n).padStart(casas, "0");

/** Código do ticket: só dígitos, pra facilitar leitor e digitação. */
export function codigoTicket(
  terminal: string,
  numero: number,
  indice: number,
): string {
  const term = (terminal || "0").replace(/\D/g, "").slice(0, 5) || "0";
  return `${pad(Number(term), 5)}${pad(numero, 6)}${pad(indice, 2)}`;
}

/** Fecha a venda, gera os tickets e devolve o que deve ir pro papel. */
export function registrarVenda(
  itens: ItemVenda[],
  formaPagamento: FormaPagamento,
  config: ConfigPdv,
): Venda {
  const numero = proximoNumero();
  const criadaEm = new Date().toISOString();
  const totalCentavos = itens.reduce(
    (acc, i) => acc + i.precoCentavos * i.quantidade,
    0,
  );

  const tickets: Ticket[] = [];
  if (config.umTicketPorUnidade) {
    let indice = 0;
    for (const item of itens) {
      for (let n = 0; n < item.quantidade; n++) {
        indice++;
        tickets.push({
          codigo: codigoTicket(config.terminal, numero, indice),
          indice,
          produtoNome: item.nome,
          precoCentavos: item.precoCentavos,
          entregueEm: null,
        });
      }
    }
  } else {
    tickets.push({
      codigo: codigoTicket(config.terminal, numero, 1),
      indice: 1,
      produtoNome: itens.length === 1 ? itens[0].nome : "COMPRA",
      precoCentavos: totalCentavos,
      entregueEm: null,
    });
  }

  const venda: Venda = {
    id: `${numero}-${Date.parse(criadaEm)}`,
    numero,
    criadaEm,
    terminal: config.terminal,
    itens,
    totalCentavos,
    formaPagamento,
    tickets,
  };

  salvarVendas([venda, ...lerVendas()]);
  return venda;
}

export type ResultadoValidacao =
  | { status: "nao-encontrado" }
  | { status: "ok" | "ja-entregue"; venda: Venda; ticket: Ticket };

export function buscarTicket(codigo: string): ResultadoValidacao {
  const alvo = codigo.trim();
  for (const venda of lerVendas()) {
    const ticket = venda.tickets.find((t) => t.codigo === alvo);
    if (ticket) {
      return {
        status: ticket.entregueEm ? "ja-entregue" : "ok",
        venda,
        ticket,
      };
    }
  }
  return { status: "nao-encontrado" };
}

/** Dá baixa no ticket (troca do papel pela bebida no balcão). */
export function marcarEntregue(codigo: string): ResultadoValidacao {
  const vendas = lerVendas();
  for (const venda of vendas) {
    const ticket = venda.tickets.find((t) => t.codigo === codigo.trim());
    if (!ticket) continue;
    if (ticket.entregueEm) return { status: "ja-entregue", venda, ticket };
    ticket.entregueEm = new Date().toISOString();
    salvarVendas(vendas);
    return { status: "ok", venda, ticket };
  }
  return { status: "nao-encontrado" };
}

export function limparVendas() {
  salvarVendas([]);
}
