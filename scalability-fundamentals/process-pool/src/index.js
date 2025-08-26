const cluster = require("cluster");
// outputs the number of CPUs available in the current machine
const cpus = require("os").cpus();
const http = require("http");

if(cluster.isMaster) {
    console.log("Inside a master process 👑", process.pid);

    for (let index = 0; index < cpus.length; index++) {
            cluster.fork();
    }
} else {
    http.createServer((req, res) => {
        const msg = `Inside a worker process ⚒️ with PID ${process.pid}`;
        console.log(msg);
        res.end(msg);
    }).listen(3000);
};

// try with loadtest -n 400 http://localhost:3000