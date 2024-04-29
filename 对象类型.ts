const person: { name: string, age: number, greeting(a:number):void,thanks:()=>void } ={//或者使用;分割
    name:"Mike",
    age:20,
    greeting(a){
        console.log("Hello, my name is "+this.name+a);
    },
    thanks() {
        console.log("Thank you!");
    },
}
function myAxios(config:{url:string,method?:string}){
    console.log(config);
    
}
myAxios({url:"www.baidu.com"})