import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import split from "split";
 
console.log("Process allocated: ", process.pid);

process.on("message", async (msg) => {
    console.log(msg);
    process.send({ status: "fine" });
    // await pipeline(createReadStream(msg), split(), async function* (source) {
    //     for await (const chunk of source) {
    //         console.log("line/chunk ", chunk.toString());
    //     }
    // });
});

