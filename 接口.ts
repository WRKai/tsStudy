// 用接口来描述一个对象的类型
interface IPerson {
    name: string,
    age: number
}

let person: IPerson = {
    name: 'Tom',
    age: 20,
    // gender: 'male',
    // skills: ['JavaScript', 'TypeScript', 'CSS', 'HTML'],
};
type TPerson = {//type有等号，相当于赋值，而且type更加“泛用”，其它变量也行
    name: string,
    age: number
}
// 接口可以继承，使用extends关键字
interface IStudent extends IPerson {
    campus: string
}
const stu: IStudent = {
    name: 'Tom',
    age: 20,
    campus: 'beijing'
}