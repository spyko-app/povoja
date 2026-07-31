// Tipos do PDV (frente de caixa + impressão de tickets).

export type Produto = {
  id: string;
  nome: string;
  categoria: string;
  precoCentavos: number;
  ativo: boolean;
};

export type FormaPagamento = "DINHEIRO" | "PIX" | "DEBITO" | "CREDITO";

export const FORMAS_PAGAMENTO: FormaPagamento[] = [
  "DINHEIRO",
  "PIX",
  "DEBITO",
  "CREDITO",
];

export type ItemVenda = {
  produtoId: string;
  nome: string;
  precoCentavos: number;
  quantidade: number;
};

/** Cada ticket é um papel impresso: uma unidade trocável no balcão. */
export type Ticket = {
  codigo: string;
  indice: number; // 1..total
  produtoNome: string;
  precoCentavos: number;
  entregueEm: string | null;
};

export type Venda = {
  id: string;
  numero: number;
  criadaEm: string; // ISO
  terminal: string;
  itens: ItemVenda[];
  totalCentavos: number;
  formaPagamento: FormaPagamento;
  tickets: Ticket[];
};

export type ConfigPdv = {
  estabelecimento: string;
  /** Texto que dá a volta em cima do carimbo. */
  carimboTopo: string;
  /** Texto que dá a volta embaixo do carimbo. */
  carimboBase: string;
  /** Sigla/palavra no miolo do carimbo (usada quando não há logo). */
  carimboCentro: string;
  /** Caminho de uma imagem em /public para o miolo do carimbo. */
  logoUrl: string;
  terminal: string;
  versao: string;
  site: string;
  mensagemRodape: string;
  larguraPapelMm: number;
  mostrarCarimbo: boolean;
  mostrarCodigoBarras: boolean;
  /** true = um papel por unidade (igual ao ticket de bar). */
  umTicketPorUnidade: boolean;
};

export const CONFIG_PADRAO: ConfigPdv = {
  estabelecimento: "BAR DO POVO",
  carimboTopo: "CARTÃO FIDELIDADE",
  carimboBase: "JUNTE, COMPRE E GANHE",
  carimboCentro: "BAR",
  logoUrl: "",
  terminal: "38279",
  versao: "1.0.0",
  site: "BARDOPOVO.COM.BR",
  mensagemRodape: "OBRIGADO! VOLTE SEMPRE",
  larguraPapelMm: 80,
  mostrarCarimbo: true,
  mostrarCodigoBarras: true,
  umTicketPorUnidade: true,
};
