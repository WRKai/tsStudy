// const prom = new Promise((resolve, reject) => {
//     let a = 100;
//     let b = 20;
//     if (a < b) {
//         resolve("a is less than b");
//     }
//     else {
//         reject("a is not less than b");
//     }
// })
// // prom.then(onFulfilled, onRejected).catch(onReject)
// // 如果reject, then执行了（只要不是undefined）就不会执行catch
// prom.then(data => console.log(`onfulfilled:${data}`), (reason => console.log(`then onrejected:${reason}`))).catch(reason => console.log(`catch onrejected:${reason}`))
// ; (async f => {
//     const res = await fetch('https://study.duyiedu.com/api/citylist')
//     console.log(res)
// })();
// new Promise((resolve, reject) => {
//     console.log('start')
//     resolve(1)// 不会return，只是忽略
//     reject(2)
//     reject(3)
//     console.log('end')
// })

/**
 * .then/.catch方法会返回一个新的Promise，可以理解该Promise为：对原任务完成后，的后续处理，的“新任务封装”
 * 假如原任务的某个情况未被对应方法作后续处理，则新Promise会以原任务的最终状态（成功或失败）作为自己的状态
 * （例如，原任务成功，但是仅仅调用了catch处理，那么该catch方法返回的就是“原任务的最终状态”，并继承相关信息的新Promise）
 */
// const p1 = new Promise((resolve, reject) => {
//     resolve(1)
// })
// const p2 = p1.catch(err => {
//     console.log(err)
// })

// setTimeout(() => {
//     console.log(p2)
//     console.log(p1 === p2)
// }, 200);
/**
 * 如果后续处理出现异常，产生的新Promise rejected，相关数据是异常对象
 * 如果后续处理无异常，产生的新Promise fulfilled，相关数据是返回值
 * （就例如，原任务失败了，但是使用catch成功处理了，其产生的新Promise就是fulfilled）
 * 特别地，后续处理又返回一个Promise，那么产生的新Promise与其返回的Promise状态一致
 */
// const p1 = new Promise((resolve, reject) => {
//     resolve(1)
// })
// const p2 = p1.then(d => {
//     return 114514
// })

// setTimeout(() => {
//     console.log(p2) // 114514
// }, 200);

// const p3 = new Promise((resolve, reject) => {
//     resolve(1)
// })
// const p4 = p3.then(d => {
//     throw new TypeError('error')
// })
// setTimeout(() => {
//     console.log(p4) // TypeError: error
// }, 0)


// const p5 = Promise.reject('就是失败了，咋的')
// const p6 = p5.catch(err => {
//     console.log('好吧，失败就是失败咯')
//     return 'ok'
// })
// setTimeout(() => {
//     console.log(p6)
// });
// let innerPromise
// const p5 = Promise.resolve('咋的')
// const p6 = p5.then(_ => {
//     return (innerPromise = new Promise((resolve, reject) => {
//         resolve('ok')
//     }))
// })
// setTimeout(() => {
//     console.log(p6)
//     console.log(innerPromise)
//     console.log(p6 === innerPromise)//并不一样，但是状态完全一致
// });

const dugou = num => new Promise((resolve, reject) => {
    let str = ''
    setTimeout(() => {
        if (Math.random() <= 0.8) {
            str = `${num}：赌输了`
            reject(str)
        }
        else {
            str = `${num}：赌赢了`
            resolve(str)
        }
        console.log(str)
    }, Math.random() * 100);
})
/**
 * Promise.all()方法接受一个Promise实例的数组，返回一个新的Promise实例。数组中全部成功则返回Prom成功，信息为Promise成功信息数组；有一个失败则失败，信息为第一个失败的失败信息
 * Promise.any()数组中全部失败则返回Prom失败，信息为Promise失败信息数组；有一个成功则成功，信息为第一个成功的成功信息
 */
// const res = Promise.any([dugou(1), dugou(2), dugou(3)])
// res.then(data => console.log(`最后赌赢了：`, data)).catch(err => console.log(`最后赌输了：`, err.errors))
// const res = Promise.all([dugou(1), dugou(2), dugou(3)]) q
// res.then(data => console.log(`最后赌赢了：`, data)).catch(err => console.log(`最后赌输了：`, err))
/**
 * Promise.allSettled()全部已决则成功，不会失败。信息为所有promise的特殊封装对象：
 *   { status: 'rejected', reason: '2：赌输了' },
  { status: 'fulfilled', value: '3：赌赢了' }
 * 

  Promise.race()一个已决则已决，返回状态一致。
 */
// Promise.race([dugou(1), dugou(2), dugou(3)]).then(data => console.log(data)).catch(err => console.log(err))



/**
 * async：修饰函数，被它修饰的函数，一定返回Promise。若返回值不是Promise，它被包装为Promise；是Promise，则返回同状态Promise。顺利返回，其Promise的状态就是fulfilled；报错，就是rejected（数据是错误对象）
 *  await：等待Promise完成，返回结果为Promise的完成结果。若Promise rejected，则抛出错误，async函数后续代码不会执行
 * 
 * await等待某个其他表达式，就封装成一个Promise.resolve(data) 
 */
async function test() {
    await Promise.reject('error')
    console.log('ok')
}
test()



Promise.resolve(1)
    .catch(_ => { 2 })
    .catch(_ => { 3 })
    .catch(_ => { 4 })
    .then(_ => '成功')
    .catch(_ => '失败')