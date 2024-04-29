class Person {
    name: string
    age: number
    gender = "男"//指定初始值
    // 构造函数 
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
}
const p = new Person("张三", 18);
console.log(p.name, p.age, p.gender);
