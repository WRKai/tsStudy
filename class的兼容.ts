class Point3D {
    x: number
    y: number
    z: number
}
class Point2D {
    x: number
    y: number
}
// 多的赋值给少的，没毛病
const p2: Point2D = new Point3D();
// const p3:Point3D = new Point2D();报错