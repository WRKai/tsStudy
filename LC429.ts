; (f => {
    class Node {
        val: number
        children: Node[]
        constructor(val?: number) {
            this.val = (val === undefined ? 0 : val)
            this.children = []
        }
    }
    function levelOrder(root: Node | null): number[][] {
        const q: (Node | null)[] = [], res: number[][] = []
        if (!root) return res
        q.push(root)
        while (q.length) {
            let len = q.length, level: number[] = []
            while (len--) {
                let node = q.shift()
                if (!node) continue
                level.push(node.val)
                q.push(...node.children)
            }
            res.push(level)
        }
        return res
    };
})();
