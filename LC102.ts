; (f => {
    class TreeNode {
        val: number
        left: TreeNode | null
        right: TreeNode | null
        constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
            this.val = (val === undefined ? 0 : val)
            this.left = (left === undefined ? null : left)
            this.right = (right === undefined ? null : right)
        }
    }


    function levelOrder(root: TreeNode | null): number[][] {
        const q: (TreeNode | null)[] = [], res: number[][] = []
        if (!root) return res
        q.push(root)
        while (q.length) {
            const len = q.length, level: number[] = []
            for (let i = 1; i <= len; i++) {
                const node = q.shift()!
                level.push(node.val)
                if (node.left) q.push(node.left)
                if (node.right) q.push(node.right)
            }
            res.push(level)
        }
        return res.reverse()
    };

    function rightSideView(root: TreeNode | null): number[] {
        const q: (TreeNode | null)[] = [], res: number[] = []
        if (!root) return res
        q.push(root)
        while (q.length) {
            const len = q.length
            for (let i = 1; i <= len; i++) {
                const node = q.shift()!
                if (i === len) res.push(node.val)
                if (node.left) q.push(node.left)
                if (node.right) q.push(node.right)
            }
        }
        return res
    };
    function averageOfLevels(root: TreeNode | null): number[] {
        const q: (TreeNode | null)[] = [], res: number[] = []
        if (!root) return res
        q.push(root)
        while (q.length) {
            const len = q.length
            let sum = 0
            for (let i = 1; i <= len; i++) {
                const node = q.shift()!
                sum += node.val
                if (i === len) res.push(sum / len)
                if (node.left) q.push(node.left)
                if (node.right) q.push(node.right)
            }
        }
        return res
    };
    function largestValues(root: TreeNode | null): number[] {
        const q: (TreeNode | null)[] = [], res: number[] = []
        if (!root) return res
        q.push(root)
        while (q.length) {
            const len = q.length, level: number[] = []
            for (let i = 1; i <= len; i++) {
                const node = q.shift()!
                level.push(node.val)
                if (i === len) res.push(Math.max(...level))
                if (node.left) q.push(node.left)
                if (node.right) q.push(node.right)
            }
        }
        return res
    };
    function maxDepth(root: TreeNode | null): number {
        if (!root) return 0
        const q: (TreeNode | null)[] = [root]
        let res = 0
        while (q.length) {
            ++res
            const len = q.length
            for (let i = 1; i <= len; i++) {
                const node = q.shift()!
                if (node.left) q.push(node.left)
                if (node.right) q.push(node.right)
            }
        }
        return res
    };
    function minDepth(root: TreeNode | null): number {
        if (!root) return 0
        const q: (TreeNode | null)[] = [root]
        let res = 0
        outer:
        while (q.length) {
            ++res
            const len = q.length
            for (let i = 1; i <= len; i++) {
                const node = q.shift()!
                if (node.left) q.push(node.left)
                if (node.right) q.push(node.right)
                if (!node.left && !node.right) break outer
            }
        }
        return res
    };
    function invertTree(root: TreeNode | null): TreeNode | null {
        if (!root) return root
        const q = [root]
        while (q.length) {
            const len = q.length
            for (let i = 1; i <= len; i++) {
                const node = q.shift()!;
                [node.left, node.right] = [node.right, node.left];
                if (node.left) q.push(node.left);
                if (node.right) q.push(node.right);
            }
        }
        return root
    };
    function isSymmetric(root: TreeNode | null): boolean {
        const check = (arr: (TreeNode | null)[]) => {
            for (let i = 0, j = arr.length - 1; i < j; i++, j--) {
                if (arr[i] && arr[j] && arr[i]?.val !== arr[j]?.val) {
                    return false
                }
                else if ((!arr[i] && arr[j]) || (!arr[j] && arr[i]))
                    return false

            }
            return true
        }
        const q: (TreeNode | null)[] = []
        if (!root) return true
        q.push(root)
        while (q.length) {
            const len = q.length
            if (!check(q)) return false
            for (let i = 1; i <= len; i++) {
                const node = q.shift()
                if (node) q.push(node.left, node.right)
            }
        }
        return true
    };
    // const root = new TreeNode(1)
    // root.left = new TreeNode(2)
    // root.right = new TreeNode(2)
    // const res = isSymmetric(root)
    // console.log(res)
    const _check = (p: TreeNode | null, q: TreeNode | null): boolean => {
        if (!p && !q) return true;//都是null
        if (!p || !q) return false;//某一个是null（都是null已经判断）
        return p.val === q.val && _check(p.left, q.right) && _check(p.right, q.left);
    }
    var _isSymmetric = function (root: TreeNode | null): boolean {
        return _check(root, root);
    };

    function __isSymmetric(root: TreeNode | null): boolean {
        const q: (TreeNode | null)[] = []
        let u = root, v = root
        q.push(u, v)
        while (q.length) {
            u = q.shift()!, v = q.shift()!
            if (!u && !v) continue;
            if ((!u || !v) || u.val !== v.val) return false
            q.push(u.left, v.right, u.right, v.left)
        }
        return true
    }
    function countNodes(root: TreeNode | null): number {
        let res = 0
        if (!root) return res
        const q: (TreeNode | null)[] = [root]
        while (q.length) {
            for (let i = 1; i <= q.length; i++) {
                ++res
                const node = q.shift()!
                if (node.left) q.push(node.left)
                if (node.right) q.push(node.right)
            }
        }
        return res
    };

    function isBalanced(root: TreeNode | null): boolean {
        const dfs = (node: TreeNode | null): [boolean, number] => {
            if (!node) return [true, 0]
            let [lflag, l] = dfs(node.left)
            let [rflag, r] = dfs(node.right)
            let maxx = Math.max(l, r)
            return [lflag && rflag && Math.abs(l - r) <= 1, 1 + maxx]
        }
        return dfs(root)[0]
    };
    "1Kbits"
    "2**10bits"
    function binaryTreePaths(root: TreeNode | null): string[] {
        
    };
})();