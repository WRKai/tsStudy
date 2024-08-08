function minDistance(word1: string, word2: string): number {
    const map = new Map<number[], number>()
    const dfs = (i: number, j: number): number => {
        if (i == -1) return j + 1
        if (j == -1) return i + 1
        if (map.has([i, j])) return map.get([i, j])!
        if (word1[i] === word2[j]) {
            map.set([i, j], dfs(i - 1, j - 1))
        }
        else {
            map.set([i, j], Math.min(
                dfs(i - 1, j),
                dfs(i, j - 1),
                dfs(i - 1, j - 1)
            ) + 1)
        }
        return map.get([i, j])!
    }
    return dfs(word1.length - 1, word2.length - 1)
}
// console.log(minDistance("dinitrophenylhydrazine", "benzalphenylhydrazone"))
; (f => {
    function minDistance(word1: string, word2: string): number {
        const l1 = word1.length, l2 = word2.length
        const dp = new Array<Array<number>>(l1 + 1)
        console.log(dp)
        return 6

    }
    minDistance("12345", "5423")
})();