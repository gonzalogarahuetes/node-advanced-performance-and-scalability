import { calculateFactorial as originalCalculateFactorial } from "./factorial.js";

const CACHE_LIFE = 20 * 1000;
const cache = new Map();

export function calculateFactorial(num) {
    if(cache.has(num)){
        console.log("Getting from cache...");
        return cache.get(num);
    };

    const promise = originalCalculateFactorial(num);
    cache.set(num, promise);

    promise.then(() => {
        setTimeout(() => {
            cache.delete(num);
        }, CACHE_LIFE);
    }, err => {
        cache.delete(num);
        throw err;
    });
    
    return promise;
};