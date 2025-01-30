function findNumberOfLIS(nums: number[]): number {
    if (!nums.length) return 1
    const dp = new Array(nums.length).fill(1), cnt = new Array(nums.length).fill(1)
    let maxLen = 1
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                if (dp[j] + 1 > dp[i]) {
                    dp[i] = dp[j] + 1
                    cnt[i] = cnt[j]
                }
                else if (dp[j] + 1 === dp[i]) {
                    cnt[i] += cnt[j]
                }
            }
        }
        maxLen = Math.max(maxLen, dp[i])
    }
    let res = 0
    for (const i in dp) {
        if (dp[i] === maxLen) res += cnt[i]
    }
    return res
    // return cnt.reduce((prev, cur) => prev + (cur === maxLen ? cur : 0), 0)
};

function lengthOfLIS(nums: number[]): number {
    if (!nums.length) return 0
    const dp = new Array(nums.length).fill(1)
    let res = 1
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j])
                dp[i] = Math.max(dp[i], dp[j] + 1)
        }
        res = Math.max(res, dp[i])
    }
    return res
};