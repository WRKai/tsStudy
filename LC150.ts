function evalRPN(tokens: string[]): number {
    const isNum = (s: string) => !isNaN(+s)
    const stack: number[] = []
    for (const token of tokens) {
        if (isNum(token))
            stack.push(+token)
        else {
            const b = stack.pop()!
                , a = stack.pop()!
            let res = 0
            switch (token) {
                case "+":
                    res = a + b
                    break
                case "-":
                    res = a - b
                    break
                case "*":
                    res = a * b
                    break
                case "/":
                    res = parseInt(a / b + '')
            }
            stack.push(res)
        }
    }
    return stack[0]
}

// test
(main => {
    const sol = evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"])
    console.log(sol)
})()
