const http = require("http");

const strings = ["Jokes are being prepared!"];

const server = http.createServer((req, res) => {
    const randomIndex = Math.floor(Math.random() * strings.length);
    const string = strings[randomIndex];

    const responsePayload = JSON.stringify({
        string,
        processId: process.pid,
    });

    console.log(`A string from ${process.pid}: ${string}`);
    

    res.writeHead(200, { "content-type": "application/json" });
    res.end(responsePayload);
})

server.listen(3000, () => {
    console.log(`Server is listening on port 3000`);
})