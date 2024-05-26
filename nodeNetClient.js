const net = require('net')
const socket = net.createConnection({
    host: 'www.baidu.com',
    port: 80
}, f => console.log("链接成功"))
// socket在node中表现为一个读写流

socket.on('data', chunk => {
    console.log(chunk.toString('utf-8'))
    socket.end()//主动关闭链接
})
socket.write(`GET / HTTP/1.1
Host: www.baidu.com
Connection: keep-alive

`)

socket.on('close', f => console.log("结束！"))