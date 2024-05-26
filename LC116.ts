; (f => {
    class Node {
        val: number
        left: Node | null
        right: Node | null
        next: Node | null
        constructor(val?: number, left?: Node, right?: Node, next?: Node) {
            this.val = (val === undefined ? 0 : val)
            this.left = (left === undefined ? null : left)
            this.right = (right === undefined ? null : right)
            this.next = (next === undefined ? null : next)
        }
    }

    function connect(root: Node | null): Node | null {
        if (!root) return null
        const q = [root]
        while (q.length) {
            const len = q.length
            let prev: (Node | null) = null
            for (let i = 1; i <= len; i++) {
                const node = q.shift()!
                if (!prev) prev = node
                else {
                    prev.next = node
                    prev = node
                }
                if (node.left) q.push(node.left)
                if (node.right) q.push(node.right)
            }
        }
        return root
    };
})();