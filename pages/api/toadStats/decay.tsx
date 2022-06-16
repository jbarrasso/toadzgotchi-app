import { prisma } from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function decayToadStats( req:NextApiRequest, res:NextApiResponse) {
    const method = req.method
    
    if (method === 'PATCH') {
        // const passwordJSON = JSON.parse(req.body)
        // const passwordKey = Object.keys(passwordJSON)[0]
        // const password = passwordJSON[passwordKey]

        // if (password != process.env.DECAY_API_TOKEN) {

            const timestamp = new Date().toLocaleTimeString().toString().split(" ")
            const time = timestamp[0]
            let amPM = timestamp[1]
            let lastAMPM = amPM
            let hour = time.substring(0, time.indexOf(':'))
            
            if (hour === '4' || hour === '8' || hour === '12') {
                if (hour === '12') {
                    if (amPM === 'AM') {
                        lastAMPM = 'PM'
                    } else {
                        lastAMPM = 'AM'
                    }
                }
        
                let lastDecayHour = parseInt(hour) - 4

                if (lastDecayHour == 0) {
                    lastDecayHour = 12
                }
        
                await prisma.$transaction(async (prisma) => {
                    await prisma.toadz.updateMany({
                        where: {
                            lastDecay: {
                                contains: `${lastDecayHour.toString()}` + ' ' + `${lastAMPM}`
                            },
                            vibing : true,
                            overall: { not: 0}
                        },
                        data: {
                            overall: {decrement: 1},
                            fed: {decrement: 1},
                            energy: {decrement: 1},
                            happiness: {decrement: 1},
                            health: {decrement: 1},
                            lastDecay: `${hour}` + ' ' + `${amPM}`
                        }
                    })

                    await prisma.toadz.updateMany({
                        where: { fed: { lt: 0 } },
                        data: {
                            fed: 0,
                        }
                    })
                    await prisma.toadz.updateMany({
                        where: { energy: { lt: 0 } },
                        data: {
                            energy: 0,
                        }
                    })
                    await prisma.toadz.updateMany({
                        where: { happiness: { lt: 0 } },
                        data: {
                            happiness: 0,
                        }
                    })
                    await prisma.toadz.updateMany({
                        where: { health: { lt: 0 } },
                        data: {
                            health: 0,
                        }
                    })
                },
                {
                    maxWait: 5000, // default: 2000
                    timeout: 10000, // default: 5000
                })
                res.status(200).json({message: `${timestamp}: Successfully decayed all eligible toad stats by 1`})
                
            } else {
                res.status(500).json({message: 'Decay function can only be called at hours 4, 8, or 12'})
            }
        // } else {
        //     res.status(500).json({message: 'Unauthorized request'})
        // }       
    } else {
        res.status(500).json({message: 'Invalid request method'}) 
    }
}