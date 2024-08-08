const sum = (...args) => args.reduce((a, b) => a + b, 0)


// page, limit, kw
const getData = ({ page = 1, limit = 10, kw = '' } = {}) => {
    console.log(`产生请求第${page}页，每页${limit}项，关键字${kw}`)
}
