# O Código de Deus — Landing Page

Landing page moderna, responsiva e otimizada para conversão do produto **O Código de Deus – Acesso Vitalício**.

## Como rodar

1. Instale o Node.js (v18 ou superior) se ainda não tiver.
2. No terminal, na pasta do projeto:

```bash
npm start
```

3. Acesse no navegador: **http://localhost:3000**

## Estrutura

- **server.js** — Servidor Node.js mínimo (sem Express), serve arquivos estáticos da pasta `public`.
- **public/index.html** — Página única com HTML e CSS embutido para carregamento rápido.

## Características

- **Performance:** HTML + CSS puro, sem frameworks; uma requisição principal.
- **Mobile-first:** Layout vertical e toques otimizados para smartphone.
- **Design:** Fundo escuro, detalhes em dourado, tipografia Cormorant Garamond + Outfit.
- **Conversão:** Hero, seção de dor, método com benefícios e CTA final com botão grande no mobile.

## Pasta `public/imagens`

Coloque aqui as imagens do projeto. A página usa as seguintes (se não existirem, o layout esconde o elemento e continua funcionando):

| Arquivo       | Uso |
|---------------|-----|
| **logo.png** ou **logo.svg** | Logo no topo do hero, na seção de CTA e no rodapé. |
| **capa.jpg** | Imagem de fundo do hero (opacidade suave sobre o gradiente). |
| **dor.jpg**  | Imagem na seção “A gente te enxerga” (identificação emocional). |
| **mapa.jpg** | Imagem na seção “O problema não é você” (esperança / mapa). |
| **decisao.jpg** | Imagem na seção “Daqui a um ano” (decisão). |

Recomendações: imagens em boa resolução, leves (otimize para web). Para a logo, prefira SVG para nitidez em qualquer tamanho.

## CTA

Os botões já apontam para o checkout da Hotmart. Para alterar, edite o `href` dos links no `public/index.html`.
