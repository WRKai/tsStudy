// function _curry(fn: Function, ...args: any[]) {
//     const length = fn.length;
//     return function (arg: any) {
//         args.push(arg)
//         if (args.length < length) {
//             return _curry.call(this, fn, ...args);
//         } else {
//             return fn.apply(this, args);
//         }
//     }
// }

type Curry<Args, Return> =
    Args extends [] ? () => Return :
    Args extends [infer FirstArg] ? (arg: FirstArg) => Return :
    Args extends [infer FirstArg, ...infer RestArgs] ? (arg: FirstArg) => Curry<RestArgs, Return> :
    never
// declare function curry<Args extends any[], Return>(fn: (...args: Args) => Return): Curry<Args, Return>
// declare function curry(fn: Function): Function

function curry<Args extends any[], Return>(fn: (...args: Args) => Return): Curry<Args, Return> {
    const { length } = fn, args: any[] = [], originalThis = this;
    function _curried(arg: any) {
        args.push(arg)
        if (args.length < length) return _curried
        else return fn.apply(originalThis, args)
    }
    return _curried as Curry<Args, Return>
}



// // 示例函数
function add3(a: number, b: number, c: number) {
    return a + b + c;
}
// // 使用柯里化函数
const curriedAdd3 = curry(add3);

// // 调用柯里化函数
let res = curriedAdd3(10)(20)(30)
console.log(res) // 输出 60
// const curriedAdd3 = _curry(add3);
// let res = curriedAdd3(10)(20)(30)
// console.log(res)