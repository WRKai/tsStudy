let arr:number[]=[1,3,5]
// let arr2:number[]=[1,3,5,"6"]报错
//或者 let arr2:Array<number>=[1,3,5]
const arr2:(number|string)[]=[1,3,5,"6"]//联合类型|