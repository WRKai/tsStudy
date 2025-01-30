const obj = (function () {
    const obj = {
        name: "sai",
        age: 23
    }
    return {
        get: k => obj[k]
    }
})();
Object.defineProperty(Object.prototype, 'self', {
    get: function () {
        return this
    }
})
console.log(obj.get('self'))


// const user = {
//     name: "sai",
//     age: 23,
//     getName: function () {
//         return this.name
//     }
// }
// console.log(user.valueOf())