const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    const routes = {
        '/': 'index.html',
        '/about': 'about.html',
        '/contact': 'contact-me.html',
    };

    let filePath = routes[req.url]
        ? path.join(__dirname, 'public', routes[req.url])
        : path.join(__dirname, 'public', req.url);

    const extName = path.extname(filePath);

    let contentType = 'text/html';

    switch (extName) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                // Page not found
                fs.readFile(
                    path.join(__dirname, 'public', '404.html'),
                    (err, content) => {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf8');
                    }
                );
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success, serve the file
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
