const str1="Hello"//类型：Hello
let str2="Hello"//类型：string
// 字面量类型
// let smallOdd:(1|3|5|7|9)=2//报错
let smallOdd:(1|3|5|7|9)=3//报错
// 比如：
function changeDirection(direction:("up"|"down"|"left"|"right")) {
    console.log(direction);
    
}
// changeDirection('')