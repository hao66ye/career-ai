// CareerAI Proxy Server
// 同时提供静态文件服务 + DeepSeek API 代理，解决 CORS 问题
var http = require('http');
var https = require('https');
var fs = require('fs');
var path = require('path');

var PORT = process.env.PORT || 3001;
var DEEPSEEK_KEY = process.env.DEEPSEEK_KEY;

// MIME 映射
var MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.png':  'image/png',
  '.svg':  'image/svg+xml',
  '.json': 'application/json'
};

function serveFile(res, filePath) {
  var ext = path.extname(filePath).toLowerCase();
  var mime = MIME[ext] || 'application/octet-stream';
  fs.readFile(filePath, function(err, data) {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
}

function proxyChat(req, res) {
  var body = '';
  req.on('data', function(chunk) { body += chunk; });
  req.on('end', function() {
    var payload;
    try {
      payload = JSON.parse(body);
    } catch (e) {
      res.writeHead(400);
      res.end('Invalid JSON');
      return;
    }

    var postData = JSON.stringify(payload);
    var options = {
      hostname: 'api.deepseek.com',
      port: 443,
      path: '/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + DEEPSEEK_KEY,
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    var proxyReq = https.request(options, function(proxyRes) {
      res.writeHead(proxyRes.statusCode, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      });
      proxyRes.pipe(res);
    });

    proxyReq.on('error', function(err) {
      console.error('Proxy error:', err.message);
      res.writeHead(502);
      res.end(JSON.stringify({ error: 'DeepSeek API unreachable: ' + err.message }));
    });

    proxyReq.write(postData);
    proxyReq.end();
  });
}

var server = http.createServer(function(req, res) {
  console.log(req.method + ' ' + req.url);

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  // API proxy
  if (req.method === 'POST' && req.url === '/api/chat') {
    proxyChat(req, res);
    return;
  }

  // Static files
  var filePath = req.url === '/' ? '/index.html' : req.url;
  serveFile(res, path.join(__dirname, filePath));
});

server.listen(PORT, function() {
  console.log('==================================');
  console.log('  CareerAI Server');
  console.log('  http://localhost:' + PORT);
  console.log('  Proxy -> DeepSeek API');
  console.log('==================================');
});
