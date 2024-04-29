function curry(fn, ...args) {
    const length = fn.length;
    return function (arg) {
        args.push(arg)
        if (args.length < length) {
            return curry.call(this, fn, ...args);
        } else {
            return fn.apply(this, args);
        }
    }
}

// 示例函数
function add3(a, b, c) {
    return a + b + c;
}
const curriedAdd3 = curry(add3);
let res = curriedAdd3(10)(20)(30)
console.log(res)