class Moxin {
    x: number
    y: number
    private _z: number

    constructor(x: number, y: number, z: number = 0) {
        this.x = x
        this.y = y
        this._z = z
    }

    get z(): number {
        console.log('触发了getter')
        console.log('触发了getter111')
        return this._z
    }

    public set z(v: number) {
        console.log('触发了setter')
        console.log('触发了setter222')
        this._z = v;
    }

}

let moxin = new Moxin(1, 2)
moxin.z = 3
console.log(moxin.z)