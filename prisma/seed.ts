import { prisma } from '../lib/prisma'

let data: { toadId: number,
            toadName: string,
            vibing: boolean, 
            level: number, 
            xp: number, 
            overall: number, 
            fed: number, 
            energy: number, 
            happiness: number, 
            health: number,
            vibeStart: string,
            lastDecay: string
        }[] = []
let j = 1;

//use this with createMany instead of updateMany if creating rows, not updating.
//make sure data and type declarations are consistent with prisma schema 
for (let i=3000; i<7025; i++) {
    if (i > 6968) {
        data[i]={toadId:j *1000000, toadName:'', vibing: false, level: 0, xp: 0, overall: 5, fed: 5, energy: 5, happiness: 5, health: 5, vibeStart: '', lastDecay: ''}
        j++
    } else {
        data[i]={toadId: i+1, toadName:'', vibing: false, level: 0, xp: 0, overall: 5, fed: 5, energy: 5, happiness: 5, health: 5, vibeStart: '', lastDecay: ''}
    }
}

async function main() {
    //deletes all toad ids (use if overwriting toad properties, need to change prisma.schema as well)
    // await prisma.toadz.deleteMany({})
    // console.log('deleted toad records')

    // await prisma.user.deleteMany({})
    // console.log('deleted user records')
    
    // await prisma.toadz.createMany({
    //     data 
    // })
    // console.log('created toad ids')

    // await prisma.toadz.updateMany({
    //     data : {
    //         overall: 50,
    //         fed: 50,
    //         energy: 50,
    //         happiness: 50,
    //         health: 50,
    //     }
    // })
    // console.log('updated all toad stats')

    // await prisma.toadz.updateMany({
    //     where: {toadId: {in: [4670,6764,442] }},
    //     data : {
    //         vibing:false,
    //         level:0,
    //         xp:0,
    //         overall:50,
    //         fed:50,
    //         energy:50,
    //         happiness:50,
    //         health:50,
    //         vibeStart:'',
    //         lastDecay:''
    //     }
    // })
    // console.log('updated one toad stats')

    await prisma.toadz.updateMany({
        where: {toadId: 3860},
        data : {
            fed:0,
            energy:0,
            happiness:0,
            health:0
        }
    })
    console.log('updated one toad stats')

    // await prisma.user.update({
    //     where: {address: '0x948D95fE4404790bc05BebD10D3C99629E79579B'},
    //     data: { points: 1480}
    // })

    // await prisma.toadz.updateMany({
    //     data : {
    //         vibeStart: new Date().toLocaleTimeString().toString()
    //     }
    // })

    // await prisma.user.delete({
    //     where: {
    //         address: '0xb75F87261a1FAC3a86f8A48d55597A622BA3CC48'
    //     }
    // })
    // console.log('deleted user')
}

main()
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })
    .finally(() => {
        prisma.$disconnect()
    })