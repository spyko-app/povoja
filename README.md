# PovoJá · Arsenal de conteúdo popular

Landing page de uma iniciativa **independente de comunicação popular** da
esquerda brasileira. Vende "munição digital" (ebook de argumentos, packs de
cards, vídeos e kits temáticos) pra militância disputar as redes e bater de
frente com a desinformação da direita.

É o contraponto, pela esquerda, a páginas de "kit patriótico" da direita —
mesma estrutura de landing page de produto, identidade visual inspirada nos
sites do PT/Lula (**vermelho, branco e detalhes amarelos**, estética de cartaz
militante).

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- CSS puro (sem framework), com a paleta em variáveis CSS
- Fontes: **Anton** (títulos) + **Inter** (corpo), via Google Fonts
- Sem backend: o checkout é um **modal de demonstração** (não cobra nada)

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:3000
```

Build de produção:

```bash
npm run build
npm run start
```

## Estrutura

```
app/
  layout.tsx          # metadata, fontes
  page.tsx            # monta as seções dentro do CheckoutProvider
  globals.css         # identidade visual completa
  lib/data.ts         # todo o conteúdo/copy (produtos, kits, FAQ, etc.)
  components/         # Header, Hero, Products, Kits, FAQ, Footer, ...
```

Para editar textos, preços ou perguntas do FAQ, mexa em `app/lib/data.ts`.

## Aviso

Projeto de caráter informativo e de mobilização política. Iniciativa
independente, **sem vínculo oficial com partidos ou candidaturas**. As marcas e
referências citadas pertencem aos seus respectivos donos.
