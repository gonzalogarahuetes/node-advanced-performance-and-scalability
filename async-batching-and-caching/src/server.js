import { createServer } from "http";
import { calculateFactorial } from "./factorial.js";

createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");
    const numParam = url.searchParams.get("number");
    console.log(`Calculating factorial of: ${url.search}`);

    let num = parseInt(numParam, 10);
    if(isNaN(num) || num < 1) {
        num = 10; // default to 10 if invalid or missing
    };

    const result = await calculateFactorial(num);

    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify({ number: num, factorial: result }));
}).listen(3000, () => console.log("Server listening on port 3000"));