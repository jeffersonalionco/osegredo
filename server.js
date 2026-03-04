require('dotenv').config();
const http = require('http');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, 'public');
const EMAIL_TO = process.env.EMAIL_TO || 'jeffersonalionco@gmail.com';

let transporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
} else {
  console.warn('Aviso: EMAIL_USER e EMAIL_PASS não configurados no .env. E-mails de clique no checkout não serão enviados.');
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const pathname = req.url.split('?')[0].split('#')[0];
  const method = req.method;

  if (pathname === '/api/checkout-click' && method === 'POST') {
    res.setHeader('Content-Type', 'application/json');
    try {
      const raw = await readBody(req);
      const body = raw ? JSON.parse(raw) : {};
      const botao = body.botao || 'checkout';
      const data = body.data || new Date().toLocaleString('pt-BR');
      const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || '';
      const userAgent = req.headers['user-agent'] || '';
      const idioma = body.idioma || '';
      const tela = body.tela || '';
      const timezone = body.timezone || '';
      const origem = body.origem || '';

      if (!transporter) {
        res.writeHead(200);
        res.end(JSON.stringify({ ok: true, email: false, msg: 'E-mail não configurado' }));
        return;
      }

      const textLines = [
        'Alguém clicou para ir ao pagamento.',
        '',
        'Botão: ' + botao,
        'Data: ' + data,
        'IP: ' + ip,
        'Idioma: ' + idioma,
        'Tela: ' + tela,
        'Fuso: ' + timezone,
        'Origem: ' + origem,
        '',
        'Navegador: ' + userAgent,
      ];
      const html = [
        '<p><strong>Clique no checkout</strong></p>',
        '<p><strong>Botão:</strong> ' + botao + '<br><strong>Data:</strong> ' + data + '</p>',
        '<p><strong>IP:</strong> ' + ip + '<br><strong>Idioma:</strong> ' + idioma + '<br><strong>Tela:</strong> ' + tela + '<br><strong>Fuso:</strong> ' + timezone + '</p>',
        '<p><strong>Origem:</strong> ' + origem + '</p>',
        '<p><strong>Navegador:</strong><br><small>' + userAgent + '</small></p>',
      ].join('');

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: EMAIL_TO,
        subject: 'Clique no checkout - O Código de Deus',
        text: textLines.join('\n'),
        html: html,
      });

      res.writeHead(200);
      res.end(JSON.stringify({ ok: true, email: true }));
    } catch (err) {
      console.error('Erro ao enviar e-mail:', err.message);
      res.writeHead(500);
      res.end(JSON.stringify({ ok: false, error: 'Erro ao enviar e-mail' }));
    }
    return;
  }

  const url = pathname === '/' ? '/index.html' : pathname;
  const file = path.join(ROOT, path.normalize(url).replace(/^(\.\.(\/|\\|$))+/, ''));

  fs.readFile(file, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('Not Found');
        return;
      }
      res.writeHead(500);
      res.end('Server Error');
      return;
    }

    const ext = path.extname(file);
    res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
    res.setHeader('Cache-Control', ext === '.html' ? 'no-store, no-cache, must-revalidate' : 'public, max-age=86400');
    res.writeHead(200);
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  if (transporter) console.log('E-mail de checkout ativo para:', EMAIL_TO);
});
