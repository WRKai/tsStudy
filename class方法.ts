class Point{
    x=1
    y=2
    constructor(x:number,y:number){
        this.x=x
        this.y=y
    }
    scale(times:number){
        this.x*=times
        this.y*=times
        return this
    }
}
const p=new Point(10,10)
p.scale(10)
console.log(p.scale(2).x,p.scale(2).y)
console.log(p.x,p.y);
