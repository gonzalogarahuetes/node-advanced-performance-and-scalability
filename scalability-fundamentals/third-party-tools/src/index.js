const { fork } = require("child_process");

const processes = [
    fork("./src/app.js", ["3001"]),
    fork("./src/app.js", ["3002"]),
    fork("./src/app.js", ["3003"]),
];

console.log(`Forked ${processes.length} processes.`);
