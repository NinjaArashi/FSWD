const http = require('http');
const fs = require('fs');

// Create a simple HTTP server
const server = http.createServer((req, res) => {
    // Serve static HTML file for homepage
    if (req.url === '/') {
        fs.readFile('index.html', (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });
    } 
    // Serve simple dynamic content
    else if (req.url === '/dynamic') {
        const dynamicContent = `
            <html>
                <body>
                    <h1>Dynamic Page</h1>
                    <p>Current Time: ${new Date()}</p>
                </body>
            </html>
        `;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(dynamicContent);
    }
    // Basic 404 response
    else {
        res.writeHead(404);
        res.end('Page not found');
    }
});

// Start server on port 3001
server.listen(3001, () => {
    console.log('Server is running on port 3001');
});
