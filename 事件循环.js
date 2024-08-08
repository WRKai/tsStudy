/**
 * 简易模型：单队列
 * 渲染主线程/消息队列
 * 正常就是在执行主线程，执行完之前都不会处理消息队列
 * 异步任务加到消息队列末尾
 */
// for (let i = 0; i < 1e10; i++) {

// }
// setTimeout((a, b, c) => a + b + c)
/**
 * **任务本身是没有优先级的**，但是可以多个队列，不同队列可以有不同优先级：
 * 每个任务都有一个任务类型，同类型任务必须在同一个队列（不同类型任务也可以选择在同一个队列）
 * 除了上述队列外，必须还有一个微队列，且它的优先级**必须最高**
 *
 * 一次事件循环，浏览器可以选择性地从不同队列取出任务
 *
 * 谷歌浏览器至少包含：微队列、交互队列、延时队列（从高到低优先级）
*/
// const timeoutFunc = n => console.log(`Timeout${n}`)
// const promFunc = n => console.log(`Promise${n}`)
// setTimeout(_ => timeoutFunc(1), 0)
// setTimeout(_ => timeoutFunc(2), 0)
// setTimeout(_ => timeoutFunc(3), 0)
// setTimeout(_ => timeoutFunc(4), 0)
// Promise.resolve().then(_ => promFunc(1))
// Promise.resolve().then(_ => promFunc(2))
// Promise.resolve().then(_ => promFunc(3))
// Promise.resolve().then(_ => promFunc(4))

; (async f => {
    const prom = Promise.resolve().then(_ => console.log('Promise1'))
    const VARNAM = 'moxin'
    // const VARNAME = await Moxin()
    const date = new Date()

})();
