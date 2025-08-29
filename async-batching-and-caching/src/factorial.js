function computeFactorial(n) {
    let result = 1;
    for (let index = 2; index <= n; index++) {
        result *= index;
    };
    return result
};

export function calculateFactorial(num) {
    const start = Date.now();
    return new Promise((resolve) => {
        // Simulate delay to allow batching
        setTimeout(() => {
            const result = computeFactorial(num);
            console.log(`calculateFactorial took: ${Date.now( - start)}ms`);
            resolve(result);
        }, 300);
    });
};