import { readdir } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { fork } from "node:child_process";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

const backgroundTaskPath = "./src/backgroundTask.js";

function childProcessToStream(cp, file) {
    const stream = Readable({
        read(){}
    });

    cp.on("message", (msg) => {
        stream.push(JSON.stringify({ ...msg, pid: cp.pid, file }));
    });

    cp.send(file);

    return stream;
};

const output = createWriteStream("./db/output-hotmail.ndjson");
const files = await readdir("./db");
const processStreams = [];

for (const file of files) {
    const cp = fork(backgroundTaskPath, [], { silent: false });

    const stream = childProcessToStream(cp, `./db/${file}`);
    processStreams.push(stream);
};

await pipeline(processStreams[0], async function* (source) {
    for await (const chunk of source) {
        console.log("chunk ", chunk.toString());
    };
});