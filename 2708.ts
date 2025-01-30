function maxStrength(nums: number[]): number {
    if (nums.length === 1) return nums[0]
    let prod: number | undefined
    nums.sort((a, b) => a - b)
    let i = 0, j = 1
    for (; i < j && j < nums.length; i += 2, j += 2) {
        if (nums[j] >= 0) break
        if (!prod) prod = 1
        prod *= (nums[i] * nums[j])
    }
    let posIdx = nums.findIndex(x => x > 0)
    if (posIdx !== -1) {
        for (let a = posIdx; a < nums.length; a++) {
            if (!prod) prod = 1
            prod *= nums[a]
        }
    }
    return prod ?? 0
};