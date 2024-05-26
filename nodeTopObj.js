// const buffer = Buffer.from('abcdefA')
// buffer.write('1234567890')
// console.log(buffer.at(-1))
// console.log(process);
console.log(process.cwd());//指的是运行终端的pwd，与文件无关
// setTimeout(() => {
//     console.log("等待结束");
// }, 2222);
// process.exit()//退出
console.log(process.argv)//dddd
console.log(process.platform)//dddd
// console.log(process.kill("id"))//dddd
// console.log(process.env);
const test = require("./test.json")
console.log(test);
const a = require('./a.mjs')
console.log(a);
console.log(exports === module.exports);
console.log(this === exports);
console.log(this);