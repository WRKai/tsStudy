const str = 'md gfb,vdfgj.hnb daDSR..DGHF,DSC  XVV.NFD  TF.GH, NDVTD  '
const split = str.split(' ')
for (let i = 0; i < split.length; i++) {
    split[i] = split[i].replace(/[,.]/g, '')
}
console.log(split)
//
const rgbToHex = rgb => rgb.replace(/(rgb)|\(|\)/g, '').split(',').reduce((prev, cur) => prev + Number.parseInt(cur.trim()).toString(16), '#')

const rgb = 'rgb(255, 255, 255)'
console.log(rgbToHex(rgb))
//
const toCamel = str => {
    return str.split(/\s|_|\-/)
}
console.log(toCamel('has own property'))