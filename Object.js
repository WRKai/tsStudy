const obj1 = { a: 1, b: 90, c: "Moxin" }
const obj2 = { b: 10, c: "Moxin", mayor: "sb" }
const obj3 = {
    ...obj1,
    ...obj2
}
Object.assign(obj1, obj2)// 混合对象，后者覆盖前者
console.log(obj1)
console.log(obj3)