import http from 'http';
import fs from 'fs';
import path from 'path';

const port = process.env.PORT || 3000;
const distDir = './dist';

const server = http.createServer((req, res) => {
  const cutUrl = req.url.replace(/\/vite-react\/?/, '/');
  const isAssets = cutUrl.startsWith('/assets');
  const filePath = path.join(distDir, isAssets ? cutUrl : 'index.html');
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 Not Found</h1>');
    } else {
      const extname = path.extname(filePath);
      let contentType = 'text/html';
      if (extname === '.js') contentType = 'application/javascript';
      if (extname === '.css') contentType = 'text/css';
      if (extname === '.png') contentType = 'image/png';
      if (extname === '.svg') contentType = 'image/svg+xml';
      if (extname === '.jpg' || extname === '.jpeg') contentType = 'image/jpeg';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
