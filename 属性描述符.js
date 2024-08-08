const obj = {
    name: 'moxin',
    age: 10
};
const gd = Object.getOwnPropertyDescriptors
const desc = Object.getOwnPropertyDescriptors(obj)
console.log(desc)
/**
 *
 {
  name: {
    value: 'moxin',
    writable: true, 可否更改
    enumerable: true, 可否被遍历（for in）
    configurable: true 该描述符是否可以修改
  },
  age: { value: 10, writable: true, enumerable: true, configurable: true }
}
 */
// Object.defineProperty(obj, 'name', {
//     writable: false, enumerable: false, configurable: true
// })
// console.log(gd(obj))
// obj.name = 'klsafbusbnui'
// console.log(obj.name)
// Object.defineProperty(obj, 'name', {
//     writable: true, enumerable: true, configurable: true
// })
// console.log(
//     gd(obj)
// )
// console.log(obj)
// Object.defineProperty(obj, 'name', {
//     get() {
//         console.log('Getter trigger')
//         return 'moxin'
//     },
//     set(val) {
//         console.log('Setter trigger')
//         console.log(val)
//     }
// })

// console.log(obj.name)
// obj.name = 10
// console.log(obj.name)
for (const val of Object.values(obj)) {
    console.log(val)
}
console.log(NaN === NaN)
console.log(Object.is(NaN, NaN))
console.log(+0 === -0)
console.log(Object.is(+0, -0))
const { name: _, ...nobj } = obj
console.log(nobj);
// const _ = 10
(function func() {
    console.log(arguments);
    (() => {
        // console.log(this === globalThis)
        console.log(arguments)
    })(1, 2, 3);
})(1, 2, 3);
// () => {} /this/不能new/没有arugments(也就是用外层arguments)/没有prototype