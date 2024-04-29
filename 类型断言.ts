// const aLink = document.getElementById('a-label')
// aLink.href报错：HTMLElement过于宽泛，需要程序员来“断言”
const aLink = document.getElementById('a-label') as HTMLAnchorElement//a标签
//或者： const aLink = <HTMLAnchorElement>document.getElementById('a-label') //
const bLink = document.getElementById('a-label')
//a标签
aLink.href