import type { Metadata } from "next";
import "./pdv.css";

export const metadata: Metadata = {
  title: "PDV · Venda e impressão de tickets",
  description:
    "Frente de caixa para venda de bebidas com impressão de tickets em bobina térmica.",
  robots: { index: false, follow: false },
};

export default function PdvLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="pdv">{children}</div>;
}
