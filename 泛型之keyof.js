function getKeys(obj) {
    // keyof表示这个类型的所有键，所以如果我们希望函数传入某个对象的某个键：
}
function getVals(o, k) {
    console.log(o[k]);
}
var person = {
    name: '张三',
    age: 18
};
getVals(person, 'name');
getVals(person, 'age');
