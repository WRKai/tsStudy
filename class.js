var Person = /** @class */ (function () {
    // 构造函数 
    function Person(name, age) {
        this.gender = "男"; //指定初始值
        this.name = name;
        this.age = age;
    }
    return Person;
}());
var p = new Person("张三", 18);
console.log(p.name, p.age, p.gender);
