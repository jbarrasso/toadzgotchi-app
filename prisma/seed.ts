import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
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
            spirit: number, 
            state: string
        }[] = []
let j = 1;

//use this with createMany instead of updateMany if creating rows, not updating.
//make sure data and type declarations are consistent with prisma schema 
for (let i=0; i<7025; i++) {
    if (i > 6968) {
        data[i]={toadId:j *1000000, toadName:'', vibing: false, level: 0, xp: 0, overall: 10, fed: 10, energy: 10, happiness: 10, health: 10, spirit: 10, state:''}
        j++
    } else {
        data[i]={toadId: i+1, toadName:'', vibing: false, level: 0, xp: 0, overall: 10, fed: 10, energy: 10, happiness: 10, health: 10, spirit: 10, state:''}
    }
}

async function main() {
    // await prisma.toadz.createMany({
    //     data 
    // })

    await prisma.toadz.updateMany({
        data : {
            fed: 5,
            energy: 5,
            happiness: 5,
            health: 5,
            spirit: 5
        }
    })

    // await prisma.user.delete({
    //     where: {
    //         address: '0xC385cAee082Bb0E900bCcbBec8bB2Fe650369ECB'
    //     }
    // })
}

main()
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })
    .finally(() => {
        prisma.$disconnect()
    })