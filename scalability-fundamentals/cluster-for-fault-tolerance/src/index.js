const cluster = require("cluster");
// outputs the number of CPUs available in the current machine
const cpus = require("os").cpus();
const http = require("http");

if(cluster.isMaster) {
    console.log("Inside a master process 👑", process.pid);

    for (let index = 0; index < cpus.length; index++) {
            cluster.fork();
    };

    cluster.on("exit", (worker) => {
        console.log(`Worker process ${process.pid} just killed. 💀`);
        console.log(`🔢 ${Object.keys(cluster.workers).length} are remaining.`);

        console.log("starting a new process worker.");
        cluster.fork();
    });
} else {
    console.log(`started a worker process at ${process.pid}.`);
    
    http.createServer((req, res) => {
        res.end(`Process: ${process.pid}.`)

        if(req.url === "/kill") {
            process.exit();
        } else if (req.url === "/") {
            console.log(`Serving requests from ${process.pid}.`);
        }
    }).listen(3000);
};