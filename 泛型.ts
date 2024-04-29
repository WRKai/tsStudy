// const id=(val:number):number=>val
// 泛型：某个确定的类型，由函数调用的时候指定，相当于一个“占位符”
function rep<type>(params:type):type {
    return params
}
const id =<type>(val:type):type=>val
rep<number>(100)
id<string>("China")
// 其实也可以省略
let retVal= rep(666)
// 泛型约束
// 比如说，对于泛型，我希望访问参数中的某个属性是做不到的
// function fn<t>(val:t):t{
//     return val.length报错
// }
// 但是我就希望访问到它的某些属性呢？就可以给上面的<t>中的类型t“扩展”一些属性，比如：
interface ILength{
    length:number
}
// 这样写，显然类型t中必然有属性length了，也相当于“约束”了传入的t的类型必须含有length属性
function fn<t extends ILength>(val:t):number{
    return val.length
}
