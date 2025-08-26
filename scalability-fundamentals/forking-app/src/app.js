const http = require("http");
const port = parseInt(process.argv[2] || "3000");

const strings = ["a", "b", "c", "d", "e", "f"];

const server = http.createServer((req, res) => {
    const randomIndex = Math.floor(Math.random() * strings.length);
    const string = strings[randomIndex];

    const responsePayload = JSON.stringify({
        string,
        port,
        processId: process.pid,
    });

    res.writeHead(200, { "content-type": "application/json" });
    res.end(responsePayload);
})

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})