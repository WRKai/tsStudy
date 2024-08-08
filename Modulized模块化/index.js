// node天生支持Commonjs模块化
// var不会挂载到全局对象global

const math = require('./math') // 找到文件，运行一遍，获得对象
console.log(math) // 模块的导入会被缓存