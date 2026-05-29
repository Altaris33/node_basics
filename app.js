const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);

    // header (meta-data) for the response
    res.setHeader('Content-Type', 'text/html');

    // response that Node will send back to the client
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>Hello from my Node.js server.</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);