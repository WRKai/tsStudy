const http = require('http')
const PORT = 8899
// const req = http.request('http://www.baidu.com', {
//     method: 'GET',
// }, resp => {
//     console.log(`状态码：${resp.statusCode}`)
//     console.log(`响应头：${resp.headers['content-type']}`)
//     //
//     resp.on('data', chunk => {
//         // console.log(chunk.toString('utf-8'))
//         console.log(chunk)
//     })
// })
// //
// // req.write()写入消息
// req.end()

const server = http.createServer((req, resp) => {
    console.log(`收到请求：${req.method} ${req.url}`)
    console.log(`请求头`)
    console.log(req.headers)
    resp.setHeader('moxin', 'nb')
    resp.write("MOXINSHABBY")
    resp.end()
})
server.listen(PORT)
server.on('listening', f => {
    console.log(`server listening at port ${PORT}`)
})