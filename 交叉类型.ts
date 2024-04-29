interface Person{name:string}
interface Contact{phone:string}
// 组合多个类型为一个类型
type PersonDetail = Person & Contact
// 接口继承的错误不兼容情况
// interface A{
//     fn:(val:string)=>string
// }
// interface B extends A{
//     fn:(val:number)=>string
// }
// 相对的，交叉类型就没事
interface A{
    fn:(val:string)=>string
}
interface B{
    fn:(val:number)=>string
}
type C=A&B
let c:C={
    // 相当于或?
    fn:(val:string|number)=>''
}
let d:C
// d.fn()本质上是函数重载