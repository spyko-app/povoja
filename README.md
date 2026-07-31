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

## PDV · venda de bebidas com impressão de ticket

Rota separada da landing page, em **`/pdv`**: frente de caixa para vender
bebidas/comidas e imprimir um ticket por unidade em bobina térmica (o papel que
o cliente troca no balcão).

| Tela | O que faz |
| --- | --- |
| `/pdv` | Caixa: catálogo, carrinho, forma de pagamento, finalizar e imprimir |
| `/pdv/validar` | Balcão: lê o código do ticket e dá baixa (só entrega uma vez) |
| `/pdv/vendas` | Fechamento de caixa, 2ª via, exportação em CSV |
| `/pdv/config` | Identidade do ticket, largura do papel e catálogo de produtos |

### Como o ticket é montado

Cópia do formato de ticket de bar: carimbo redondo no topo, nome do produto em
destaque, preço, **código de barras Code 128**, data/hora e o rodapé miúdo
(`TICKET 1 DE 2 | R$14,00 CREDITO`, terminal, versão, site) com a linha
pontilhada de corte. Cada unidade vendida vira um papel — 3 refrigerantes saem
3 tickets, numerados `1 DE 3`, `2 DE 3`, `3 DE 3`.

O código de barras é gerado no próprio projeto (`app/lib/pdv/code128.ts`, sem
dependências) e cada ticket carrega um código único de 13 dígitos:
`terminal(5) + venda(6) + ticket(2)`.

### Impressão

O papel sai pela impressão do navegador, então funciona com qualquer térmica
instalada no sistema (Epson, Elgin, Bematech, Daruma, Tanca…) e também com
impressora comum.

1. Em `/pdv/config`, escolha a largura da bobina (**58 mm** ou **80 mm**) e use
   **Imprimir teste** pra conferir.
2. Na caixa de impressão do navegador: selecione a térmica, **margens
   nenhuma/zero** e **escala 100%**.
3. Pra não abrir a caixa de impressão a cada venda, rode o Chrome com
   `--kiosk-printing` (ele imprime direto na impressora padrão):

   ```bash
   google-chrome --kiosk-printing --app=http://localhost:3000/pdv
   ```

### Dados

Tudo roda no navegador e fica salvo em `localStorage` do próprio aparelho do
caixa — funciona offline, sem backend. Consequência: os dados são **por
aparelho e por navegador**, então exporte o CSV em `/pdv/vendas` antes de
limpar o histórico ou trocar de máquina.

```
app/pdv/
  page.tsx              # caixa
  config/, vendas/, validar/
  components/           # Ticket, Carimbo, CodigoBarras, AreaImpressao, Moldura
  pdv.css               # tela do caixa + layout do papel (@media print)
app/lib/pdv/
  types.ts, catalog.ts  # tipos e catálogo inicial
  code128.ts            # gerador do código de barras
  storage.ts            # vendas, tickets e configurações (localStorage)
  format.ts             # moeda e datas em pt-BR
```

## Aviso

Projeto de caráter informativo e de mobilização política. Iniciativa
independente, **sem vínculo oficial com partidos ou candidaturas**. As marcas e
referências citadas pertencem aos seus respectivos donos.
