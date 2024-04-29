function getKeys<t>(obj:t){
    // keyof表示这个类型的所有键，所以如果我们希望函数传入某个对象的某个键：
}
function getVals<obj,key extends keyof obj>(o:obj,k:key){
    console.log(o[k]);
}
const person={
    name:'张三',
    age:18
}
getVals(person,'name')
getVals(person,'age')
getVals(person,'name')
getVals([1,2,3,4,5],1)
getVals('moxin',1)//表示索引下标
