const arr = [1, 23, 4, 65, 7]
const obj = {
    name: "Moxin",
    age: 20,
    gender: "Male"

}
for (const idx in obj)
    console.log(idx, obj[idx])
for (const elem of obj)
    console.log(elem)