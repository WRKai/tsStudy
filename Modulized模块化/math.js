function isOdd(num) {
    return num % 2 !== 0;
}
function add(...args) {
    return args.reduce((a, b) => a + b, 0);
}

module.exports = { isOdd, add }