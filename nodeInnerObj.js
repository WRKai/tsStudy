const os = require('os')
const TRANS = 1024
console.log(os.EOL)
// console.log(os.cpus())
console.log(os.arch())
console.log(os.freemem() / TRANS ** 3)
console.log(os.homedir())
console.log(os.hostname())
console.log(os.tmpdir())
/**
 * 
 */
const path = require('path')
console.log(path.basename('/home/nodejs/test.js'))//获取基名
console.log(path.basename('/home/nodejs/test.js', '.js'))//获取基名-扩展名
console.log(path.sep)
console.log(path.delimiter)
// console.log(process.env.PATH.split(path.delimiter))
console.log(path.dirname('/home/nodejs/test.js'))//获取目录名
console.log(path.extname('/home/nodejs/test.json'))//获取扩展名
console.log(path.join('/home/nodejs/test.js', '../', '../test.json'))
console.log(path.normalize('/home/nodejs/test.js/../test.json'))//获取扩展名
console.log(path.relative('/home/nodejs/test.js', '/home/nodejs/test.json'))//(A,B)，从A寻找B的相对路径`
console.log(path.resolve('/home/nodejs/test.js', '../', '../test.json'))//解析，根据系统返回合法的路径
/**
 * 
 */
const URL = require('url')
const urlObj = new URL.URL('https://www.baidu.com:8888/index.html?id=123&username=zhangsan#hehe')
// const urlObj2 = URL.parse('https://www.baidu.com:8888/index.html?id=123&username=zhangsan#hehe')
console.log(URL.format)//反向操作
console.log(urlObj.searchParams)
/**
 * 
 */
const util = require('util')
const sleep = async time => new Promise(resolve => setTimeout(resolve, time))
// sleep(2000).then(f => console.log('sleep 2s'))
// const sleepCb = util.callbackify(sleep)
// sleepCb(2000, (err, data) => console.log('sleep 2s'))
//
const mySleepCb = (time, cb) => setTimeout(cb, time)
// mySleepCb(2000, f => console.log("MOXIN"))
const sleepProm = util.promisify(mySleepCb)
// sleepProm(2000).then(f => console.log("MOXIN"))

const obj1 = {
    a: 1,
    b: {
        c: 3,
        d: 7
    }
}
const obj2 = {
    a: 1,
    b: {
        c: 3,
        d: "7"
    }
}
console.log(util.isDeepStrictEqual(obj1, obj2))