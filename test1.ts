const reg = /(<i>|<\/i>)/g
const str = 'This is a <i>test</i> string with <i>multiple</i> <i>tags</i>'

const matches = str.replace(reg, '')
console.log(matches)