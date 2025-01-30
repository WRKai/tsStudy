function longestOnes(nums: number[], k: number): number {
    let l = 0, r = 0, modifyCnt = 0, res = 0
    while (r < nums.length) {
        if (nums[r++] === 0)
            modifyCnt++
        while (modifyCnt > k) {
            if (nums[l++] === 0)
                modifyCnt--
        }
        res = Math.max(res, r - l)
    }
    return res
};