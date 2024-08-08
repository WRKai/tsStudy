
function calc() {
    let sum = 0
    for (let i = 0; i < 1e10; i++) {
        sum += i
    }
    console.log('计算完成')
}
this.onmessage = function (e) {
    console.log(e)
    // calc()
    // postMessage('计算完成')
}