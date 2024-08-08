console.log(Object.prototype.__proto__)// Object的原型的隐式原型是null
console.log(Array.prototype.__proto__ === Object.prototype)//原型链
console.log(Array.prototype.__proto__.__proto__)//null
/*
太抽象了，之后再说
<null>
↑
<__proto__>
|
原型
↑
<__proto__> <-- Object
|               |
原型<- <new> <---
↑
<__proto__> <-- User
|               |
user<- <new> <---
*/
// 任何一个(函数，或者说，类型)的原型默认都是new Object()
function User() {
    this.name = 'user'
}
function func(params) {

}
console.log(User.prototype)
console.log(func.prototype)

const user = new User()
console.log(user.hasOwnProperty === Object.prototype.hasOwnProperty)//true
//
//但是，假如考虑函数本身也是一个对象呢？显然是由new Function()产生的
console.log(func.__proto__ === Function.prototype)//true
//那Function也是new Function()出来的吗？ 这样想下去没完了，其实不是。特别地，它的__proto__就是它的prototype
console.log(Function.prototype === Function.__proto__)//true，但是这没啥用

//
//
//总结：instance.__proto__ === (instance.constructor).prototype
console.log(func.constructor.prototype === func.__proto__)
//type.prototype 就是希望看到这个“类”的“公共成员”
console.log(func.call === Function.prototype.call)
// type.__proto__ 就是希望看到这个“类”的爹是谁？
//
// console.log(User.__proto__ === Function.prototype)
const arr = [1, 2, 3, 45, 56]
console.log(arr.toString === Object.prototype.toString)
console.log(arr.toString === Array.prototype.toString)
console.log(arr.toString())
console.log(Object.prototype.toString.call(arr))
// obj instanceof constructor：判断obj的原型链上，是否是存在constructor的原型
console.log(arr instanceof Array)
const fakeArray = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
}
console.log(fakeArray instanceof Array)
console.log(Array.isArray(fakeArray))
fakeArray.__proto__ = Array.prototype
console.log(fakeArray instanceof Array)
console.log(Array.isArray(fakeArray))
//
//
console.log(Object.getPrototypeOf(arr) === arr.__proto__)//true
//
//
//创建一个干净的对象
const pureObject = Object.create(null) //传入参数为创建对象的原型
pureObject.name = 'pure'
console.log(pureObject)
//修改原型链
const fakeArr2 = Object.create(Array.prototype) //传入参数为创建对象的原型
console.log(fakeArr2 instanceof Array)
// Object.setPrototypeOf(fakeArr2, Array.prototype)