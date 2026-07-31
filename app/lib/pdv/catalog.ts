import type { Produto } from "./types";

/** Catálogo inicial — o operador edita tudo em /pdv/config. */
export const PRODUTOS_PADRAO: Produto[] = [
  {
    id: "agua-500",
    nome: "ÁGUA 500 ML",
    categoria: "Bebidas",
    precoCentavos: 700,
    ativo: true,
  },
  {
    id: "agua-gas-500",
    nome: "ÁGUA C/ GÁS 500 ML",
    categoria: "Bebidas",
    precoCentavos: 800,
    ativo: true,
  },
  {
    id: "refri-lata",
    nome: "REFRIGERANTE LATA",
    categoria: "Bebidas",
    precoCentavos: 1000,
    ativo: true,
  },
  {
    id: "suco-lata",
    nome: "SUCO LATA",
    categoria: "Bebidas",
    precoCentavos: 1000,
    ativo: true,
  },
  {
    id: "energetico",
    nome: "ENERGÉTICO 250 ML",
    categoria: "Bebidas",
    precoCentavos: 1500,
    ativo: true,
  },
  {
    id: "cerveja-long",
    nome: "CERVEJA LONG NECK",
    categoria: "Cervejas",
    precoCentavos: 1400,
    ativo: true,
  },
  {
    id: "cerveja-lata",
    nome: "CERVEJA LATA 350 ML",
    categoria: "Cervejas",
    precoCentavos: 1200,
    ativo: true,
  },
  {
    id: "chopp-300",
    nome: "CHOPP 300 ML",
    categoria: "Cervejas",
    precoCentavos: 1600,
    ativo: true,
  },
  {
    id: "combo-cerveja",
    nome: "COMBO 4 CERVEJAS",
    categoria: "Combos",
    precoCentavos: 4000,
    ativo: true,
  },
  {
    id: "cachorro-quente",
    nome: "CACHORRO-QUENTE",
    categoria: "Comidas",
    precoCentavos: 1500,
    ativo: true,
  },
  {
    id: "pipoca",
    nome: "PIPOCA",
    categoria: "Comidas",
    precoCentavos: 1000,
    ativo: true,
  },
  {
    id: "batata-frita",
    nome: "BATATA FRITA",
    categoria: "Comidas",
    precoCentavos: 1800,
    ativo: true,
  },
];
