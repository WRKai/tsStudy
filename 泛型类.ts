class GNumber<t>{
    defaultValue:t
    add:(a:t,b:t)=>t
}
const mynum=new GNumber<number>()
mynum.defaultValue=0
mynum.add=function(a:number,b:number){
    return a+b
}
// 如果由构造函数给t类型的值赋值，就可以省略传入泛型类型
class GNumber2<t>{
    defaultValue: t
    add: (a: t, b: t) => t
    constructor(val:t) {
        this.defaultValue=val
    }
}
const mynum2 = new GNumber2('100')
