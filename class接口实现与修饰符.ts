//理解： 接口 相当于 顶层抽象类
interface Animal {
    name: string
    speak(): void
}
class Dog implements Animal {
    name: string
    constructor(name: string) {
        this.name = name
    }
    speak() {
        console.log('wang wang')
    }
}

class Cat implements Animal {
    name: string
    constructor(name: string) {
        this.name = name
    }
    public speak() {
        console.log('miao miao')
    }
}
// public：默认
class Fox implements Animal {
    name: string
    constructor(name: string) {
        this.name = name
    }
    speak() {
        console.log('jin jin')
    }
    //受保护/
    protected eat() {
        console.log("我他妈吃吃吃");

    }
}
// protected在类与子类中(包括使用this)可用，但是类实例中不可用
const f = new Fox('jin')
// f.eat()报错
class Bird implements Animal {
    name: string
    constructor(name: string) {
        this.name = name
    }
    speak() {
        console.log('ji ji')
    }
    //私有
    private sleep() {
        console.log("我他妈睡睡睡");

    }
}
// private只在当前类中可用，(子类，实例都不行)
const b = new Bird('ji')
// b.sleep()报错
class Lion implements Animal {
    // 只读
    readonly name: string = 'wang wang'
    constructor(name: string) {
        this.name = name
    }
    // setName(name:string){
    //     this.name = name报错
    // }
    speak() {
        console.log('woooooooooooooooo~~~~~~~')
    }
}
// 只读，只可以修饰属性，表明该属性只能在构造方法中修改。注意readonly类似const，如果类型不明确，就把值当作类型了
const l = new Lion('wang')
// l.name = 'wang'报错
// readonly对接口与对象也ok
interface IPerson {
    readonly name: string
}
let person: IPerson = {
    name: 'ji'
}
// person.name='ji'//报错