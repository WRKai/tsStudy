const net = require('net')
const server = net.createServer()
server.listen(8899)
server.on('listening', f => {
    console.log("OK")
})
server.on('connection', socket => {
    console.log("有客户端链接", socket)
    socket.on('data', data => {
        console.log("客户端发送的数据", data.toString())
    })
})
