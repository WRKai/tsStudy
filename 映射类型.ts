// 关键字in
type PropsKeys = 'x' | 'y' | 'z';
type PropsObj = {
    a: number,
    b: string,
    c: Boolean
}
type Props = {
    [key in PropsKeys]: number
}
// 相当于
type Props2 = {
    [key in 'x' | 'y' | 'z']: number
}
// 相当于
type Props3 = {
    x: number,
    y: number,
    z: number
}
// 同时，也可以根据对象来映射
type Props4 = {
    [key in keyof PropsObj]: number
}
// 查询属性对应的类型：
type Props5 = {
    [key in keyof PropsObj]: PropsObj[key]
}
type Props6 = PropsObj['a' | 'c'] 