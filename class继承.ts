class Animal{
    move(){
        console.log("没病走两步");
    }
}
class Dog extends Animal{
    bark(){
        console.log("汪汪汪");
    }
}

const dog = new Dog();

dog.move();
dog.bark();