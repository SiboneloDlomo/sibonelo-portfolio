const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const HOST = '0.0.0.0';

// Get the directory where the script is located
const SCRIPT_DIR = path.dirname(__filename);
console.log('Script directory:', SCRIPT_DIR);

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // Remove query strings
    let urlPath = req.url.split('?')[0];
    
    // Default to pages/home/home.html
    if (urlPath === '/') {
        urlPath = '/pages/home/home.html';
    }
    
    // Build full path
    const fullPath = path.join(SCRIPT_DIR, urlPath);
    const ext = path.extname(fullPath).toLowerCase();
    const contentType = mimeTypes[ext] || 'text/plain';
    
    console.log('Request:', req.url, '->', fullPath);
    
    fs.readFile(fullPath, (err, content) => {
        if (err) {
            console.log('Error:', err.code);
            res.writeHead(404);
            res.end('File not found: ' + fullPath);
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(PORT, HOST, () => {
    const ip = getLocalIP();
    console.log('='.repeat(60));
    console.log('🚀 Power Automation Portfolio Server Started!');
    console.log('='.repeat(60));
    console.log('\n📍 Local Access:');
    console.log('   http://localhost:' + PORT + '/');
    console.log('\n🌐 Network Access:');
    console.log('   http://' + ip + ':' + PORT + '/');
    console.log('\n' + '='.repeat(60));
});

function getLocalIP() {
    const { networkInterfaces } = require('os');
    const nets = networkInterfaces();
    
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return 'localhost';
}
