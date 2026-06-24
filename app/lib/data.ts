// Conteúdo / copy da landing page PovoJá
// Iniciativa independente de comunicação popular.

export type Product = {
  id: string;
  name: string;
  category: string;
  badge?: string;
  desc: string;
  features: string[];
  priceOld?: string;
  price: string;
  image?: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "ebook",
    name: "Arsenal de Argumentos",
    category: "Ebook",
    badge: "Mais baixado",
    desc: "5 grandes temas destrinchados com tese, dados oficiais e o passo a passo pra rebater a direita ponto a ponto.",
    features: [
      "5 temas com tese, números e fontes",
      'Dossiê "Como responder ao bolsonarismo"',
      "Mitos da direita desmontados um por um",
      "PDF + leitura online no celular",
    ],
    priceOld: "R$47",
    price: "R$23,90",
  },
  {
    id: "cards",
    name: "Pack de Cards",
    category: "Cards",
    desc: '"Eles mentem, você responde." Cards de resposta rápida pra cada fake news da direita, prontos pra postar.',
    features: [
      "Formato Feed 1:1 e Story 9:16",
      "Legendas prontas pra copiar e colar",
      "Uma resposta pra cada mentira do dia",
      "Atualizado toda semana",
    ],
    price: "R$13,90",
  },
  {
    id: "videos",
    name: "Pack de Vídeos",
    category: "Vídeos",
    desc: "Vídeos verticais curtos, editados e legendados, prontos pra viralizar e furar a bolha da extrema-direita.",
    features: [
      "Vídeos 9:16 de 20 a 60 segundos",
      "Editados, legendados e com gancho",
      "Prontos pra Reels, Shorts e TikTok",
      "Cortes e trilha já inclusos",
    ],
    price: "R$15,90",
  },
];

export type Kit = {
  name: string;
  icon: string;
  count: number;
  desc: string;
};

export const kits: Kit[] = [
  { name: "Kit Trabalho", icon: "✊", count: 24, desc: "Direitos trabalhistas, CLT, salário mínimo e emprego com carteira." },
  { name: "Kit Saúde", icon: "➕", count: 20, desc: "Defesa do SUS, vacina e saúde pública de qualidade pra todo mundo." },
  { name: "Kit Educação", icon: "📚", count: 16, desc: "Escola pública, universidade, cotas e ciência pro país." },
  { name: "Kit Direitos", icon: "⚖️", count: 18, desc: "Igualdade, diversidade, combate à fome e justiça social." },
];

// Planos / ancoragem de preço (Kit Completo Básico x Premium)
export type PlanFeature = { label: string; included: boolean };
export type Plan = {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  features: PlanFeature[];
  priceOld: string; // soma dos itens (preço cheio)
  price: string; // preço promocional
  save: string; // economia
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    id: "basico",
    name: "Kit Completo Básico",
    tagline: "Os 3 materiais essenciais pra começar a disputa nas redes.",
    features: [
      { label: "Ebook Arsenal de Argumentos", included: true },
      { label: "Pack de Cards", included: true },
      { label: "Pack de Vídeos", included: true },
      { label: "4 Kits temáticos (Trabalho, Saúde, Educação e Direitos)", included: false },
      { label: "Atualizações semanais por 1 ano", included: false },
      { label: "Grupo VIP da militância", included: false },
    ],
    priceOld: "R$53,70",
    price: "R$43,90",
    save: "R$9,80",
  },
  {
    id: "premium",
    name: "Kit Completo Premium",
    tagline: "Tudo num pacote só: o arsenal completo pra não parar nunca.",
    badge: "Mais popular",
    features: [
      { label: "Ebook Arsenal de Argumentos", included: true },
      { label: "Pack de Cards", included: true },
      { label: "Pack de Vídeos", included: true },
      { label: "4 Kits temáticos (Trabalho, Saúde, Educação e Direitos)", included: true },
      { label: "Atualizações semanais por 1 ano", included: true },
      { label: "Grupo VIP da militância", included: true },
    ],
    priceOld: "R$121,30",
    price: "R$79,90",
    save: "R$41,40",
    featured: true,
  },
];

export type Step = { n: string; title: string; desc: string };

export const steps: Step[] = [
  { n: "01", title: "Escolha o material", desc: "Ebook, cards, vídeos ou o kit completo. Você decide a munição que vai usar." },
  { n: "02", title: "Baixe na hora", desc: "Pague com Pix ou cartão e receba o acesso na mesma hora, sem espera." },
  { n: "03", title: "Poste e dispute", desc: "Publique nas redes e vença o debate com argumento, dado e verdade." },
];

export type Strategy = { icon: string; title: string; desc: string };

export const strategy: Strategy[] = [
  { icon: "📚", title: "Argumentos", desc: "Ebook com tese, dados oficiais e contra-ataque já preparado." },
  { icon: "🗯️", title: "Cards de resposta", desc: '"Eles dizem, você desmonta", nos formatos 1:1 e 9:16.' },
  { icon: "🎬", title: "Vídeos prontos", desc: "Reels e Shorts editados, legendados e prontos pra subir." },
  { icon: "🐦", title: "Tweets prontos", desc: "Threads e posts pro X já redigidos pra disparar na hora." },
  { icon: "🧰", title: "Kits temáticos", desc: "Tudo organizado pela pauta que está em alta no dia." },
  { icon: "🔄", title: "Atualização semanal", desc: "A gente acompanha a notícia e manda a resposta toda semana." },
];

export const coverage: string[] = [
  "Trabalho",
  "Saúde / SUS",
  "Educação",
  "Direitos",
  "Soberania",
  "Justiça Social",
  "Democracia",
  "Cultura",
];

export const values: string[] = [
  "Trabalho",
  "Igualdade",
  "Saúde",
  "Educação",
  "Direitos",
  "Democracia",
  "Soberania",
  "Justiça",
  "Diversidade",
  "Solidariedade",
  "Dignidade",
  "Esperança",
  "Povo",
  "União",
];

export type Stat = { value: number; suffix: string; label: string };

export const stats: Stat[] = [
  { value: 300, suffix: "+", label: "peças prontas pra postar" },
  { value: 8, suffix: "", label: "temas cobertos" },
  { value: 50, suffix: "/sem", label: "novas peças por semana" },
  { value: 4, suffix: "", label: "formatos diferentes" },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Quanto custa e como eu pago?",
    a: "Os materiais começam em R$13,90. O pagamento é via Pix (com liberação na hora) ou cartão. Não tem mensalidade: você paga uma vez e o conteúdo é seu pra sempre.",
  },
  {
    q: "Funciona em todas as redes?",
    a: "Sim. O conteúdo já vem nos formatos certos para Instagram, TikTok, X (Twitter), WhatsApp e Facebook. É só baixar e postar.",
  },
  {
    q: "Quem produz o conteúdo?",
    a: "Uma equipe de comunicadores, jornalistas e militantes da causa popular. Tudo com revisão e dados de fontes oficiais, como IBGE, DIEESE e ministérios.",
  },
  {
    q: "Com que frequência tem atualização?",
    a: "Toda semana subimos de 30 a 50 peças novas, acompanhando o noticiário e respondendo na hora às mentiras que a direita espalha.",
  },
  {
    q: "O que é o kit de campanha?",
    a: "É um pacote temático (Trabalho, Saúde, Educação ou Direitos) com tudo organizado pra você disparar uma pauta inteira de uma vez só.",
  },
  {
    q: "Meus dados estão seguros?",
    a: "Sim. Seguimos a LGPD. Não vendemos nem compartilhamos seus dados com ninguém. Sua privacidade e a da militância vêm em primeiro lugar.",
  },
];

// Data do 1º turno das eleições de 2026 (horário de Brasília)
export const ELECTION_DATE = "2026-10-04T08:00:00-03:00";
