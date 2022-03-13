let toadz = []
let j = 1;

for (let i=0; i<7025; i++) {
    if (i > 6968) {
        toadz[i]={toad_id:j *1000000, toad_name:'', owner_id:'', level: 0, xp: 0, health: 10, full: 10, rest: 10, happiness: 10, fitness: 10, fulfillment: 10}
        j++
    } else {
        toadz[i]={toad_id:i+1, toad_name:'', owner_id:'', level: 0, xp: 0, health: 10, full: 10, rest: 10, happiness: 10, fitness: 10, fulfillment: 10}
    }
}

let toadzJSON = JSON.stringify(toadz)
let obj = JSON.parse(toadzJSON)
let len = Object.keys(obj).length
let fs = require('fs')
fs.writeFile("toadz.json", toadzJSON, function(err, result) {
    if(err) console.log('error', err);})

console.log(len)