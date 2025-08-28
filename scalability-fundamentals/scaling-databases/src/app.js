const http = require("http");
const { LocalStorage } = require("node-localstorage");

const db = new LocalStorage("./db");

const server = http.createServer((req, res) => {
    if(req.url ===  "/") {
        let requestCount = db.getItem("count");
        db.setItem("count", ++requestCount);

        console.log(`Process ID: ${process.pid}, Total Requests: ${requestCount}`);

        res.writeHead(200, {"content-type" : "application/json"});
        res.end(JSON.stringify({ totalRequests: requestCount }));
    } else {
        res.writeHead(404, {"content-type" : "application/json"});
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(3000, () => {
    console.log("Server is running on port 3000 and counting requests.");
})