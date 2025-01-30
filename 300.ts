function lengthOfLIS(nums: number[]): number {
    if (!nums.length) return 0
    const dp = new Array(nums.length).fill(0)
    dp[0] = 1
    let res = 1
    for (let i = 1; i < nums.length; i++) {
        dp[i] = 1
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
        res = Math.max(res, dp[i])
    }
    return res
};