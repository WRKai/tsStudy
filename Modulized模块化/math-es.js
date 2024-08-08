// 导出结果是一个“类似对象”的东西：
/**
 * {
 * default: 默认导出
 * a:1,
 * b:2 具名导出
 * }
 */
// 下面都是具名，具名导出跟上一个“定义式”，要求其中体现出“名字”和“值”
// export const PI = 3.14
// export function isOdd(num) {
//     return num % 2 !== 0;
// }
// export function add(...args) {
//     return args.reduce((a, b) => a + b, 0);
// }
// const E = 2.718281828459045
// export { E } // 导出E，名字是E，val为上定义的E
// const STH = 114514
// export { STH as newName } // 导出STH，名字是newName

// 默认导出，后面跟一个值就行，默认有名字default
// export default 3.14
// export default function isOdd(num) {
//     return num % 2 !== 0;
// }
// const E = 2.718281828459045
// export { E as default }// 导出E，名字是default

export function isOdd(num) {
    return num % 2 !== 0;
}
export function add(...args) {
    return args.reduce((a, b) => a + b, 0);
}

export default { PI: 3.14, E: 2.71 }