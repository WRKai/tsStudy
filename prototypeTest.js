Object.prototype.print = function () {
    for (const k in this) {
        if (!this.hasOwnProperty(k)) continue
        console.log(k, this[k])
    }
}




const obj = {
    name: '张三',
    age: 18,
}
obj.print()
console.log(obj.__proto__)