import { readdir } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { fork } from "node:child_process";
import { Readable, PassThrough } from "node:stream";
import { pipeline } from "node:stream/promises";

const backgroundTaskPath = "./src/backgroundTask.js";

function merge(streams){
    let pass = new PassThrough();
    let pending = streams.length;
    for (const stream of streams) {
        pass = stream.pipe(pass, { end: false });
        stream.once("end", () => --pending === 0 && pass.emit("end"));
    };
    return pass;
};

function childProcessToStream(cp, file) {
    const stream = Readable({
        read(){}
    });

    cp.on("message", ({ status, message }) => {
        if(status === "error") {
            console.log({
                msg: "An error happened",
                file,
                pid: cp.pid,
                message: message.split("\n"),
            });
            // eliminate the stream
            stream.push(null);
            return;
        };
        stream.push(JSON.stringify({ ...message, pid: cp.pid, file }).concat("\n"));
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

const mergedStreams = merge(processStreams);

await pipeline(mergedStreams, async function* (source) {
        for await (const chunk of source) {
            for (const line of chunk.toString().trim().split("\n")) {
                const { file, ...data } = JSON.parse(line);
                yield JSON.stringify(data).concat("\n");
            }
        };
    },
    output
);