// // console.log(name)
// // const obj = {
// //     '1': 1,
// //     2: 3,
// //     '4': 5,
// // }
// // console.log(obj[2])
// // // console.log(obj)
// // console.log(obj['2'])
// // console.log(Array.prototype)
// const add = (a, b) => {
//     a = +a || 0, b = +b || 0
//     return a + b
// }

// const isLeap = yr => (yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0


// console.log(isLeap(2020))
// console.log(add(2020))

// if (1) {
//     let a = 10
// }
// console.log(a)

// class Mayor {
//     constructor(name, age) {
//         this.name = name
//         this.age = age
//     }
//     say() {
//         console.log('say')
//     }
// }

// const mayor = new Mayor('mayor', 18)
// const mayor2 = new Mayor('mayor™', 18)
// console.log(Mayor.prototype === Object.prototype)
// console.log(Mayor.prototype.say === mayor.say)
// console.log(mayor2.say === mayor.say)

function Moxin(name, age) {
    // 使用new调用时候，this指向一个新的对象
    console.log(this)
    this.name = name
    this.age = age
    console.log(this === global)
}

const moxin = new Moxin('moxin', 18)
Moxin()