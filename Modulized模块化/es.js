// console.log(123)
// var moxin = 'MOXIN' // 不污染全局变量
// function print(params) {
//     console.log(params)
//     return params
// }
// import * as math from './math-es.js' // 导入整个模块对象
// import constants, { add } from './math-es.js' // 导入默认、具名
// import { default as obj, add as plus } from './math-es.js' // 导入默认的另一方法
// // console.log(math)
// // console.log(constants)
// // console.log(constants)
// // console.log(obj)
// console.log(plus)
// console.log(constants === obj) // true

// 动态依赖

setTimeout(() => {
    import('./math-es.js').then(math => {
        console.log(math) // 相当于import * as math from './math-es.js' // 导入整个模块对象
    })
}, 1000);