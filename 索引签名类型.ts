// 如果无法确定对象中应当会有哪些属性（多少个属性）：
interface anyObj {
    [k: string]: number//表示存在任意个键值对，类型是key:string->val:number
}
const obj: anyObj = {
    // name:'xiaoming',
    age: 18,
    // sex:'man'
    a: 1,
    b: 1,
    c: 1,
    d: 1,
}
// 其实数组也是对象，其键是number类型
interface MyArr<t> {
    [n: number]: t
}
const myarr: MyArr<number> = [1, 2, 3, 4, 5]
for (let i in myarr) {
    console.log(myarr[i])
}