import { calculateFactorial as originalCalculateFactorial } from "./factorial.js";

const pendingRequests = new Map();

export function calculateFactorial(num) {
    if(pendingRequests.has(num)){
        console.log("Batching requests...");
        return pendingRequests.get(num);
    };

    const promise = originalCalculateFactorial(num);
    pendingRequests.set(num, promise);

    promise.finally(() => {
        pendingRequests.delete(num);
    });
    
    return promise;
};