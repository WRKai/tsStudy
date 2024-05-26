const fs = require('fs'), path = require('path'), os = require('os')

const filename = path.resolve(__dirname, './nothing.txt')
// const rStream = fs.createReadStream(filename, {
//     encoding: 'utf-8',
//     highWaterMark: 2, // 未指定编码，就是Buffer（Bytes），否则指的就是字符数量
//     autoClose: true, // 读取完毕，自动关闭
// })
// //流对象，可以绑定事件处理函数
// rStream.on('open', fd => {
//     // console.log(fd)
//     console.log('文件打开')
// })
// rStream.on('close', f => {
//     console.log('文件关闭')// 手动关闭,或者自动关闭
// })
// rStream.on('error', err => {
//     console.log('文件读取出错')
// })
// rStream.on('data', chunk => {//读取文件的事件
//     console.log(chunk)//只有注册了这个事件，才会真的开始读文件
// })
// rStream.on('end', () => {
//     console.log('文件读取完毕')//所有数据读取完毕
// })
// rStream.pause()//暂停读取
// rStream.resume()//恢复读取
/**
 * 
 */
const wStream = fs.createWriteStream(filename, {
    flags: 'a', // 写入模式/a追加模式
    encoding: 'utf-8',
    highWaterMark: 2, // 这里一定是字节数
    autoClose: true, // 读取完毕，自动关闭
})
//流对象，可以绑定事件处理函数
wStream.on('open', fd => {
    // console.log(fd)
    console.log('文件打开')
})
wStream.on('close', f => {
    console.log('文件关闭')// 手动关闭,或者自动关闭
})
wStream.on('error', err => {
    console.log('文件写入出错')
})
//
wStream.on('drain', () => {
    console.log('写入通道空了，继续吧！')
})
//写入
// const bool = wStream.write(`${os.EOL}hello, moxin!${os.EOL}`)
// console.log(bool)//返回布尔值，true表示本次写入通道（highWaterMark）未被填满
