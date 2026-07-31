"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/pdv", rotulo: "Caixa" },
  { href: "/pdv/validar", rotulo: "Validar ticket" },
  { href: "/pdv/vendas", rotulo: "Vendas" },
  { href: "/pdv/config", rotulo: "Configurações" },
];

/** Cabeçalho + área de conteúdo. Some na impressão (classe .pdv-tela). */
export default function Moldura({
  estabelecimento,
  terminal,
  children,
}: {
  estabelecimento: string;
  terminal: string;
  children: React.ReactNode;
}) {
  const caminho = usePathname();

  return (
    <div className="pdv-tela">
      <header className="pdv-topo">
        <div className="pdv-marca">
          <b>{estabelecimento || "PDV"}</b>
          <span>Terminal {terminal}</span>
        </div>
        <nav className="pdv-nav">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={caminho === l.href ? "ativo" : undefined}
            >
              {l.rotulo}
            </Link>
          ))}
        </nav>
      </header>
      <main className="pdv-conteudo">{children}</main>
    </div>
  );
}
