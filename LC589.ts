; (f => {
    class Node {
        val: number
        children: Node[]
        constructor(val?: number) {
            this.val = (val === undefined ? 0 : val)
            this.children = []
        }
    }


    function preorder(root: Node | null): number[] {
        const res: number[] = []
        if (!root) return res
        for (const node of root.children) {
            if (node)
                res.push(...preorder(node))
        }
        return res
    };

    // 测试

})();