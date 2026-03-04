const http = require('http');
const fs = require('fs');
const path = require('path');

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

const server = http.createServer((req, res) => {
  const url = req.url === '/' ? '/index.html' : req.url;
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
    // HTML sempre atualizado; imagens podem ser cacheadas
    res.setHeader('Cache-Control', ext === '.html' ? 'no-store, no-cache, must-revalidate' : 'public, max-age=86400');
    res.writeHead(200);
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
