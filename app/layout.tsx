import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PovoJá · Arsenal de conteúdo popular",
  description:
    "Ebook de argumentos, cards de resposta rápida e vídeos prontos pra disputar as redes e defender o povo. A direita tem milícia digital — a esquerda tem o povo organizado.",
  keywords: [
    "esquerda",
    "conteúdo político",
    "redes sociais",
    "trabalho",
    "SUS",
    "educação",
    "direitos",
    "democracia",
  ],
  openGraph: {
    title: "PovoJá · Arsenal de conteúdo popular",
    description:
      "Munição digital pronta pra defender o povo e bater de frente com a direita nas redes.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#c20019",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
