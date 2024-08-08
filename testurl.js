// const url = require('url')
// const _urlObj = new url.URL('https://www.baidu.com:8888/index.html?id=123&username=zhangsan#hehe')
// const urlObj = url.parse('https://www.baidu.com:8888/index.html?id=123&username=zhangsan#hehe', true)
// console.log(url.format)//反向操作
CreatOverloadFunc.prototype.add = (inpFunc, ...types) => {
    if (typeof inpFunc !== 'function')
        throw new TypeError('the first param must be a function')
    const typeStr = types.join(',')
    if (typeMapping.has(typeStr))
        throw new Error('the types has been added')
    typeMapping.set(typeStr, inpFunc)
}
function CreatOverloadFunc() {
    const typeMapping = new Map();
    this = function (...args) {
        const typeStr = args.map(e => typeof e).join(',')
        if (!typeMapping.has(typeStr))
            throw new Error('cannot find matched args list')
        return typeMapping.get(typeStr).call(this, ...args)
    }
}

// const myCallable = new CallableObject('Hello');
// const result = myCallable(1, 2, 3);
// console.log(result);  // 输出: Hello: 1, 2, 3
//       Hello called!
const f = new CreatOverloadFunc()
console.log(f.add)