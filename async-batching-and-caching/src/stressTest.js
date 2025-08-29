import superagent from "superagent";

const start = Date.now();
let count = 30;
let pending = count;
const interval = 50;
const query = "number=10";

function sendRequest() {
    superagent
        .get(`http://localhost:3000?${query}`)
        .then((result) => {
            console.log(result.status, result.body);
            if(!--pending) {
                console.log(`All completed in: ${Date.now() - start}ms`);
            };
        })
        .catch((error) => console.error(error));
    
    if (--count) {
        setTimeout(sendRequest, interval);
    };
};

sendRequest();