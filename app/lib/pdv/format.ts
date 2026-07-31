// Formatação pt-BR usada na tela e no papel.

export function moeda(centavos: number): string {
  return (
    "R$" +
    (centavos / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

export function dataHora(iso: string): string {
  const d = new Date(iso);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function hora(iso: string): string {
  const d = new Date(iso);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function saudacao(iso: string): string {
  const h = new Date(iso).getHours();
  if (h < 12) return "BOM DIA";
  if (h < 18) return "BOA TARDE";
  return "BOA NOITE";
}

/** Converte "12,50" / "12.5" / "1250" (com vírgula) em centavos. */
export function paraCentavos(texto: string): number {
  const limpo = texto.replace(/[^\d,.-]/g, "").replace(",", ".");
  const n = Number.parseFloat(limpo);
  if (!Number.isFinite(n)) return 0;
  return Math.round(n * 100);
}

export function paraReais(centavos: number): string {
  return (centavos / 100).toFixed(2).replace(".", ",");
}

export function mesmoDia(iso: string, ref = new Date()): boolean {
  const d = new Date(iso);
  return (
    d.getDate() === ref.getDate() &&
    d.getMonth() === ref.getMonth() &&
    d.getFullYear() === ref.getFullYear()
  );
}
