function User(name, age) {
    this.name = name;
    this.age = age;
}
User.prototype.playFreeVideos = function () {
    console.log(this.name + " is playing free videos.");
}
// 继承
function VIPUser(name, age, expires) {
    // this = {}
    User.call(this, name, age);
    // User(name, age)
    this.expires = expires;
}
// VIPUser.prototype.playFreeVideos = function () {
//     console.log(this.name + " is playing free videos.");
// }
Object.setPrototypeOf(VIPUser.prototype, User.prototype);
VIPUser.prototype.playPaidVideos = function () {
    console.log("VIPUser:" + this.name + " is playing free videos.");
}

const vip = new VIPUser("张三", 20, "2020-12-31");
console.log(vip.name)
vip.playFreeVideos()
vip.playPaidVideos()