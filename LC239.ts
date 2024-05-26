class MonoQueue<T> {
    private queue: T[];
    constructor() {
        this.queue = []
    }
    public push(val: T): void {
        while (this.queue.length && val > this.queue[this.queue.length - 1]) // 保证队列单调递减
            this.queue.pop()
        this.queue.push(val)
    }
    public pop(val: T): T | undefined {
        if (this.queue.length && val === this.queue[0])
            return this.queue.shift()!
    }
    public front(): T | undefined {
        return this.queue[0]
    }
}
function maxSlidingWindow(nums: number[], k: number): number[] {
    const q = new MonoQueue<number>(), res: number[] = []
    for (let i = 0; i < k; i++)
        q.push(nums[i])
    res.push(q.front()!)
    for (let i = k; i < nums.length; i++) {
        q.pop(nums[i - k])
        q.push(nums[i])
        res.push(q.front()!)
    }
    return res
}

; (main => {
    const res = maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)
    console.log(res)
})()