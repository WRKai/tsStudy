function add(a: number, b: number): number {
    return a + b;
}
// add(1)
const minus = (a: number, b: number): number => (a - b);

// 函数表达式的抽象注解方法：
const times: (a: number, b: number) => number = (a, b) => (a * b)
const hi = (): void => console.log("hi")
