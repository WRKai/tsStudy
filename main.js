// 使用 promise 模拟请求 + 3000ms后完成得到发射后结果
function createRequest(i) {
    return function () {
        return new Promise((resolve, reject) => {
            const start = Date.now();
            setTimeout(() => {
                if (Math.random() >= 0.05) {
                    resolve(
                        `第${i + 1}艘曲率飞船达到光速，成功逃离，用时${Date.now() - start}`
                    );
                } else {
                    reject(
                        `第${i + 1}艘曲率飞船出现故障，无法达到光速，用时${Date.now() - start
                        }`
                    );
                }
            }, 3000 + i * 100);
        });
    };
}

class RequestControl {
    constructor({ max, el }) {
        this.max = max;
        this.requestQueue = [];
        this.el = document.querySelector(el);
        setTimeout(() => {
            this.requestQueue.length > 0 && this.run();
        });
        this.startTime = Date.now();
    }
    addRequest(request) {
        this.requestQueue.push(request);
    }
    async run() {
        const queue = new Set();
        for (let task of this.requestQueue) {
            let p = task()
                .then((res) => this.render(res))
                .catch((err) => this.render(err))
                .finally((_) => queue.delete(p))
            queue.add(p);
            if (queue.size >= this.max) await Promise.race(queue);
        }
    }
    render(context) {
        const childNode = document.createElement("li");
        childNode.innerText = context;
        this.el.appendChild(childNode);
    }
}

let requestControl = new RequestControl({ max: 10, el: "#app" });
for (let i = 0; i < 25; i++) {
    const request = createRequest(i);
    requestControl.addRequest(request);
}


// module.exports = {
//     requestControl,
// };
// console.log(Promise.resolve().then(_ => console.log("fulfilled")))
// const createProm = time => new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(time)
//     }, time)
// })
// const queue = new Set()
// for (let i = 1000; i <= 5000; i += 1000) {
//     const task = createProm(i)
//         .then(res => {
//             console.log(`${i} fulfilled`)
//             console.log(queue);
//             return res
//         })
//         .catch(err => {
//             console.log(`${i} rejected`)
//         })
//         .finally(_ => queue.delete(task))
//     console.log(task);
//     queue.add(task)
// }
// // console.log(queue)
// (async () => {
//     const first = await Promise.race(queue)
//     console.log(first)
//     // console.log(queue.find(p => p === first));
// })()