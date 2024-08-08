/**
 * @param {Object} an object
 * @param {string|Array} path
 * @param {any} def
 * @return {any} 
 */
function get(obj, path, def) {
    if (typeof path === 'string')
        path = path.replace(/\[\w+\]/g, s => '.' + s.slice(1, s.length - 1)).split('.').filter(s => s.trim() !== '')
    for (const k of path) {
        if (obj[k] === void 0)
            return def
        obj = obj[k]
    }
    return obj
}


const res = get({ a: { b: "moxin" } }, ['a'], 114514)
console.log(res)
