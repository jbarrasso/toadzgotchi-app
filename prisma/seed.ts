import { PrismaClient } from "@prisma/client"
//import { toadzCreateManyInput } from "@prisma/client"

const prisma = new PrismaClient()
let data: { toad_id: number,
            toad_name: string,
            owner_id: string, 
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

for (let i=0; i<7025; i++) {
    if (i > 6968) {
        data[i]={toad_id:j *1000000, toad_name:'', owner_id:'', vibing: false, level: 0, xp: 0, overall: 10, fed: 10, energy: 10, happiness: 10, health: 10, spirit: 10, state:''}
        j++
    } else {
        data[i]={toad_id:i+1, toad_name:'', owner_id:'', vibing: false, level: 0, xp: 0, overall: 10, fed: 10, energy: 10, happiness: 10, health: 10, spirit: 10, state:''}
    }
}
async function main() {
    await prisma.toadz.updateMany({
        data: { level: 0,
                vibing: false,
                overall: 10,
                fed: 10,
                energy: 10,
                happiness: 10,
                health: 10,
                spirit: 10 }
                
    })
}

main()
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })
    .finally(() => {
        prisma.$disconnect()
    })