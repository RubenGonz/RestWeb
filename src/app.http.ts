import http from 'http';
import fs from 'fs';
import path from 'path';

const publicDir = path.join(__dirname, '../public');

const server = http.createServer((req, res) => {
  if (!req.url) {
    res.writeHead(400);
    res.end();
    return;
  }

  if (req.url === '/') {
    const htmlPath = path.join(publicDir, 'index.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fs.readFileSync(htmlPath, 'utf-8'));
    return;
  }

  if (req.url.startsWith('/.well-known')) {
    res.writeHead(204);
    res.end();
    return;
  }

  const filePath = path.join(publicDir, req.url);
  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  let contentType = 'text/plain';
  if (req.url.endsWith('.js')) contentType = 'application/javascript';
  else if (req.url.endsWith('.css')) contentType = 'text/css';
  else if (req.url.endsWith('.html')) contentType = 'text/html';

  res.writeHead(200, { 'Content-Type': contentType });
  res.end(fs.readFileSync(filePath));
});

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});
