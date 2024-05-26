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