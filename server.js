const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.txt': 'text/plain; charset=utf-8'
};

function resolveFilePath(reqUrl) {
  const parsedUrl = new URL(reqUrl, 'http://localhost');
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Clean URL mappings
  if (pathname === '/' || pathname === '/home' || pathname === '/index' || pathname === '/index.html') {
    return path.join(ROOT_DIR, 'index.html');
  }
  if (pathname === '/checkout' || pathname === '/checkout/' || pathname === '/checkout.html') {
    return path.join(ROOT_DIR, 'checkout.html');
  }

  // Next.js fallback alias mappings
  if (pathname.startsWith('/_next/static/chunks/')) {
    const filename = pathname.replace('/_next/static/chunks/', '');
    return path.join(ROOT_DIR, 'js', filename);
  }
  if (pathname.startsWith('/_next/static/media/')) {
    const filename = pathname.replace('/_next/static/media/', '');
    return path.join(ROOT_DIR, 'fonts', filename);
  }
  if (pathname.startsWith('/_next/static/css/')) {
    const filename = pathname.replace('/_next/static/css/', '');
    return path.join(ROOT_DIR, 'css', filename);
  }
  if (pathname.startsWith('/_next/image')) {
    const targetUrl = parsedUrl.searchParams.get('url');
    if (targetUrl) {
      const cleanImgPath = targetUrl.startsWith('/') ? targetUrl.slice(1) : targetUrl;
      return path.join(ROOT_DIR, cleanImgPath);
    }
  }

  // Standard static files
  const cleanPath = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  const targetPath = path.join(ROOT_DIR, cleanPath);

  // Safety check against directory traversal
  if (!targetPath.startsWith(ROOT_DIR)) {
    return null;
  }

  // If directly exists as file
  if (fs.existsSync(targetPath) && fs.statSync(targetPath).isFile()) {
    return targetPath;
  }

  // If directory with index.html
  const indexPath = path.join(targetPath, 'index.html');
  if (fs.existsSync(indexPath) && fs.statSync(indexPath).isFile()) {
    return indexPath;
  }

  // If file exists with .html extension
  const htmlPath = `${targetPath}.html`;
  if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
    return htmlPath;
  }

  return null;
}

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
    return;
  }

  const filePath = resolveFilePath(req.url);

  if (!filePath || !fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>404 - Page Not Found | Quetta Arfat Hotel</title>
        <style>
          body { font-family: system-ui, sans-serif; background: #8B0000; color: #fff; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; text-align: center; }
          .card { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); padding: 40px; border-radius: 20px; max-width: 420px; }
          h1 { font-size: 48px; margin: 0; color: #FF4D4D; }
          p { color: rgba(255,255,255,0.85); margin: 15px 0 25px; line-height: 1.5; }
          a { display: inline-block; background: #FF4D4D; color: #ffffff; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 12px; transition: transform 0.2s; }
          a:hover { transform: scale(1.05); }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>404</h1>
          <p>The page or resource you requested could not be found.</p>
          <a href="/">Back to Home</a>
        </div>
      </body>
      </html>
    `);
    return;
  }

  const stat = fs.statSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  // Cache policy
  if (ext === '.html') {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  } else {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // Video Streaming Range Request Support (for herovideo.mp4)
  const range = req.headers.range;
  if (range && stat.isFile()) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;

    if (start >= stat.size) {
      res.writeHead(416, {
        'Content-Range': `bytes */${stat.size}`,
        'Content-Type': contentType
      });
      res.end();
      return;
    }

    const chunksize = end - start + 1;
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${stat.size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': contentType
    });

    if (req.method === 'HEAD') {
      res.end();
      return;
    }

    const stream = fs.createReadStream(filePath, { start, end });
    stream.pipe(res);
    return;
  }

  res.writeHead(200, {
    'Content-Length': stat.size,
    'Content-Type': contentType,
    'Accept-Ranges': 'bytes'
  });

  if (req.method === 'HEAD') {
    res.end();
    return;
  }

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
});

server.listen(PORT, HOST, () => {
  console.log('\n==================================================');
  console.log('  ☕ Quetta Arfat Hotel - Web Server Running');
  console.log('==================================================');
  console.log(`  Local URL:    http://localhost:${PORT}`);
  console.log(`  Network URL:  http://${HOST === '0.0.0.0' ? '127.0.0.1' : HOST}:${PORT}`);
  console.log(`  Home Page:    http://localhost:${PORT}/`);
  console.log(`  Checkout:     http://localhost:${PORT}/checkout`);
  console.log('==================================================\n');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  server.close(() => {
    console.log('Server stopped.');
    process.exit(0);
  });
});
