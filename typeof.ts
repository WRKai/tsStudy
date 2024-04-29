// 新功能：通过上下文，typeof推断出类型，进而进行类型注解
let p={x:1,y:2}
function getReversePoint(point:typeof p) {
    return {x:point.y,y:point.x}
}
getReversePoint(p)
// getReversePoint()