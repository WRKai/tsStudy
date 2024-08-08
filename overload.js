const creatOverload = _ => {
    const typeMapping = new Map();
    function func(...args) {
        const typeStr = args.map(e => typeof e).join(',')
        if (!typeMapping.has(typeStr))
            throw new Error('cannot find matched args list')
        return typeMapping.get(typeStr).call(this, ...args)
    }
    func.add = (inpFunc, ...types) => {
        if (typeof inpFunc !== 'function')
            throw new TypeError('the first param must be a function')
        const typeStr = types.join(',')
        if (typeMapping.has(typeStr))
            throw new Error('the types has been added')
        typeMapping.set(typeStr, inpFunc)
    }
    return func
}

const add = creatOverload()
add.add((a, b) => 'numberRes:' + a + b, 'number', 'number')
add.add((a, b) => 'strRes' + a + b, 'string', 'string')
var res = add(1, 2)
console.log(res)
var res = add('1', '2')
console.log(res)
var res = add('1', 2)
console.log(res)