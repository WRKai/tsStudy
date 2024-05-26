import { PriorityQueue } from 'priority-queue-typed'

class Node {
    x: number
    y: number
    c: number
    w: number
    comb: number[]
    constructor(x: number = 0, y: number = 0, c: number = 0, w: number = 0, comb: number[] = []) {
        this.x = x
        this.y = y
        this.c = c
        this.w = w
        this.comb = comb
    }
}
const pq = new PriorityQueue<Node>(void 0, { comparator: (a, b) => a.w - b.w })
const node = new Node()
