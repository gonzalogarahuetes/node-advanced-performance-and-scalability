import { faker } from "@faker-js/faker";
import { createWriteStream } from "node:fs";

const fileA = createWriteStream("db/fileA.ndjson");
const fileB = createWriteStream("db/fileB.ndjson");
const fileC = createWriteStream("db/fileC.ndjson");

function buildFakeUser(){
    return {
        name: faker.internet.username(),
        email: faker.internet.email(),
        phone: faker.phone.number()
    }
};

[ fileA, fileB, fileC ].forEach((file, index) => {
    const currentFileName = `file${["A", "B", "C"][index]}`;

    for (let index = 0; index < 1000; index++) {
        file.write(`${JSON.stringify(buildFakeUser())}\n`);
    };

    file.end();
})

