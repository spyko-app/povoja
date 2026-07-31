// Code 128 (subconjunto B) sem dependências externas.
// Cada padrão são larguras alternadas barra/espaço, começando por barra.

const PADROES = [
  "212222", "222122", "222221", "121223", "121322", "131222", "122213",
  "122312", "132212", "221213", "221312", "231212", "112232", "122132",
  "122231", "113222", "123122", "123221", "223211", "221132", "221231",
  "213212", "223112", "312131", "311222", "321122", "321221", "312212",
  "322112", "322211", "212123", "212321", "232121", "111323", "131123",
  "131321", "112313", "132113", "132311", "211313", "231113", "231311",
  "112133", "112331", "132131", "113123", "113321", "133121", "313121",
  "211331", "231131", "213113", "213311", "213131", "311123", "311321",
  "331121", "312113", "312311", "332111", "314111", "221411", "431111",
  "111224", "111422", "121124", "121421", "141122", "141221", "112214",
  "112412", "122114", "122411", "142112", "142211", "241211", "221114",
  "413111", "241112", "134111", "111242", "121142", "121241", "114212",
  "124112", "124211", "411212", "421112", "421211", "212141", "214121",
  "412121", "111143", "111341", "131141", "114113", "114311", "411113",
  "411311", "113141", "114131", "311141", "411131", "211412", "211214",
  "211232", "2331112",
];

const INICIO_B = 104;
const PARADA = 106;

/**
 * Codifica um texto ASCII imprimível (32..126) e devolve a sequência de
 * módulos: "1" = barra, "0" = espaço.
 */
export function code128B(texto: string): string {
  const valores: number[] = [];
  for (const ch of texto) {
    const c = ch.charCodeAt(0);
    valores.push(c >= 32 && c <= 126 ? c - 32 : 0);
  }

  let soma = INICIO_B;
  valores.forEach((v, i) => {
    soma += v * (i + 1);
  });
  const checksum = soma % 103;

  const codigos = [INICIO_B, ...valores, checksum, PARADA];

  let modulos = "";
  for (const codigo of codigos) {
    const padrao = PADROES[codigo];
    for (let i = 0; i < padrao.length; i++) {
      const largura = Number(padrao[i]);
      modulos += (i % 2 === 0 ? "1" : "0").repeat(largura);
    }
  }
  return modulos;
}

export type BarraDesenho = { x: number; largura: number };

/** Agrupa módulos consecutivos em retângulos prontos pro SVG. */
export function barras(modulos: string): BarraDesenho[] {
  const lista: BarraDesenho[] = [];
  let i = 0;
  while (i < modulos.length) {
    if (modulos[i] === "1") {
      let j = i;
      while (j < modulos.length && modulos[j] === "1") j++;
      lista.push({ x: i, largura: j - i });
      i = j;
    } else {
      i++;
    }
  }
  return lista;
}
