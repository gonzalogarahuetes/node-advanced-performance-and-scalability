import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import split from "split";
 
console.log("Process allocated: ", process.pid);

process.on("message", async (msg) => {
    try {
            // await pipeline(createReadStream(msg), split(), async function* (source) {
    //     for await (const chunk of source) {
    //         console.log("line/chunk ", chunk.toString());
    //     }
    // });
    } catch (error) {
        process.send({ status: "error", message: error.message });
    }
});

