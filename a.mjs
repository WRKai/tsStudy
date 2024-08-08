import _ from 'lodash'
const { random } = _
const rand = f => random(18, 25)
for (let i = 0; i < 4; i++) {
    console.log(`${rand()} ${rand()} ${rand()} ${rand()}`)
}