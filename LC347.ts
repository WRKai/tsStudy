function topKFrequent(nums: number[], k: number): number[] {
    const map = new Map<number, number>()
    nums.forEach(num => void map.set(num, (map.get(num) ?? 0) + 1))
    return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, k).map(item => item[0])
};

const res = topKFrequent([1, 1, 1, 2, 2, 3], 2)
console.log(res)

const l = [10, 9, 8];
const [a, b] = l
console.log(a, b)