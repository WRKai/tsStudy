// 枚举声明：{枚举命名常量(枚举成员),...args}
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
// 本质是number
function move(direction) {
    console.log(direction);
}
// 访问枚举成员？
move(Direction.Up); //0
console.log(Direction.Up); //0
console.log(typeof Direction.Up); //number
