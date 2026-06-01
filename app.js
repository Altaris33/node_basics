const http = require('http');
const fs = require('fs');

// This is the raw logic for creating an HTTP server
// Reading and parsing a request and writing a response
// Express JS will automatically help us write less raw code for this purpose
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message:</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        // Get the request data
        // Register to an event listener -> we listen to an event called data event
        // This event will start whenver a new chunk of data is ready to be read
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        // Once all chunks have been read, we register to another event called 'end'
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(parsedBody);
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>Hello from my Node.js server.</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);