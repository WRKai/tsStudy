var ListNode = /** @class */ (function () {
    function ListNode(val, next) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
    return ListNode;
}());
function mergeNodes(head) {
    var sum = 0, hasStart = false, nHead = null, nLast = null;
    var cur = head;
    while (cur) {
        if (cur.val === 0 && !hasStart) {
            hasStart = true;
        }
        else if (cur.val === 0 && hasStart) {
            if (!nLast) {
                nHead = new ListNode(sum);
                nLast = nHead;
            }
            else {
                nLast.next = new ListNode(sum);
                nLast = nLast.next;
            }
            sum = 0;
        }
        else {
            sum += cur.val;
        }
        cur = cur.next;
    }
    return nHead;
}
;
// 1 0 3 0 5 0 7 0
var llist = new ListNode(0, new ListNode(1, new ListNode(0, new ListNode(3, new ListNode(0, new ListNode(2, new ListNode(2, new ListNode(0))))))));
var res = mergeNodes(llist);
while (res) {
    console.log(res.val);
    res = res.next;
}
