// console.log(name)
// const obj = {
//     '1': 1,
//     2: 3,
//     '4': 5,
// }
// console.log(obj[2])
// // console.log(obj)
// console.log(obj['2'])
// console.log(Array.prototype)
const add = (a, b) => {
    a = +a || 0, b = +b || 0
    return a + b
}

const isLeap = yr => (yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0


console.log(isLeap(2020))
console.log(add(2020))