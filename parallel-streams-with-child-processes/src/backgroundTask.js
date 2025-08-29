import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import split from "split";
 
console.log("Process allocated: ", process.pid);

process.on("message", async (msg) => {
    try {
        await pipeline(createReadStream(msg), split(), async function* (source) {
        for await (const chunk of source) {
            // skip the last empty line
            if(!chunk.length) continue;

            const record = JSON.parse(chunk);
            if(!record.email.includes("hotmail")) continue;

            process.send({
                status: "ok",
                message: record,
            })
        }
    });
    } catch (error) {
        process.send({ status: "error", message: error.message });
    }
});

