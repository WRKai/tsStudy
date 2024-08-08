// 枚举声明：{枚举命名常量(枚举成员),...args}
enum Direction { Up, Down, Left, Right }
// 本质是number
function move(direction: Direction) {
    console.log(direction);

}
// 访问枚举成员？
move(Direction.Up);//0
console.log(Direction.Up);//枚举成员的值：0,...,i++
console.log(typeof Direction.Up);//number

// 自己初始化值
enum gender {
    male = 100,
    female
}
// 全部初始化，也可以用字符串，但是就没有自增长行为了
enum campus {
    zjut = 'zjut',
    zjut2 = 'zjut2',
    zjut3 = 'zjut3'
}
// 整个枚举本质上（在js中）是一个对象

