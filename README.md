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

## E-mail quando alguém clica no checkout (Nodemailer)

Quando alguém clica em qualquer botão de checkout, o servidor envia um e-mail para **jeffersonalionco@gmail.com** e o Google Analytics registra o evento `checkout_click`.

**Para ativar o e-mail:**

1. Copie **.env.example** para **.env** na raiz do projeto.
2. No **.env**, preencha **EMAIL_USER** (seu Gmail) e **EMAIL_PASS** (senha de app do Gmail).
3. Senha de app: Conta Google, Segurança, Verificação em 2 etapas, Senhas de app, Gerar. Use os 16 caracteres em EMAIL_PASS.
4. Rode **npm install** e **npm start**. Deve aparecer no terminal: E-mail de checkout ativo para jeffersonalionco@gmail.com

Cada clique “ir ao pagamento” gera um e-mail com assunto **"Clique no checkout - O Código de Deus"** e os dados do clique (botão, data/hora). O evento também continua sendo registrado no Google Analytics (evento `checkout_click`).

## CTA

Os botões já apontam para o checkout da Hotmart. Para alterar, edite o `href` dos links no `public/index.html`.

## SEO para redes sociais

A página já tem **Open Graph** (Facebook, WhatsApp, LinkedIn) e **Twitter Card** configurados. A imagem de preview é **imagem_produto1536x1024.png**.

**Antes de publicar:** no `public/index.html`, na área de comentário "SEO Redes Sociais", substitua **SEU_DOMINIO** pela URL do seu site **sem barra no final** (ex: `https://osegredo.com.br`). Assim o preview funcionará ao compartilhar o link.

- **Título no preview:** O Código de Deus — O Mapa do Código | Acesso Vitalício  
- **Descrição:** Descubra o mapa que revela o código invisível da prosperidade e da paz. Para quem nasceu para mais. Acesso vitalício — ative seu código agora.
