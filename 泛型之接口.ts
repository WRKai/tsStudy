interface IFn1<t>{
    id:(val:t)=>t
    ids:()=>t[]
}
const obj:IFn1<number>={
    id:(val)=>val,
    ids:()=>[1,2,3]
}
// 数组是泛型接口
const strs=['a','b','c']
// strs.forEach
const nums=[1,2,4]
// nums.forEach