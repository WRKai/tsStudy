class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

function mergeNodes(head: ListNode | null): ListNode | null {
    let sum = 0, hasStart = false, nHead: ListNode | null = null, nLast: ListNode | null = null
    let cur = head
    while (cur) {
        if (cur.val === 0 && !hasStart) {
            hasStart = true
        } else if (cur.val === 0 && hasStart) {
            if (!nLast) {
                nHead = new ListNode(sum)
                nLast = nHead
            } else {
                nLast.next = new ListNode(sum)
                nLast = nLast.next
            }
            sum = 0
        } else {
            sum += cur.val
        }
        cur = cur.next
    }
    return nHead
};
// 1 0 3 0 5 0 7 0
// const llist =
//     new ListNode(0,
//         new ListNode(1,
//             new ListNode(0,
//                 new ListNode(3,
//                     new ListNode(0,
//                         new ListNode(2,
//                             new ListNode(2,
//                                 new ListNode(0))))))))
// let res = mergeNodes(llist)
// while (res) {
//     console.log(res.val)
//     res = res.next
// }
function getDecimalValue(head: ListNode | null): number {
    let res = 0
    while (head) {
        res *= 2
        res += head.val
        head = head.next
    }
    return res
};
function convertDateToBinary(date: string): string {
    const toBin = (num: number) => {
        let res = ''
        while (num) {
            res = num % 2 + res
            num >>= 1
        }
        return res
    }
    return date.split('-').map(e => toBin(parseInt(e))).join('-')
};
