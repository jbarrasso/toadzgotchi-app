import { prisma } from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next';

// function startDecay(toadid: number) {
//     setInterval(function() {decayStats(toadid)}, 1000*60)
// }

// async function decayStats(toadid: number) {
//     const allToadz = await prisma.toadz.findMany()
//     let fedValue: number
//     let energyValue: number
//     let happinessValue: number
//     let healthValue: number

//     return await prisma.$transaction(async (prisma) => {
//         if ( (allToadz[toadid-1].fed == 0) || (allToadz[toadid-1].energy == 0) || (allToadz[toadid-1].happiness == 0) || (allToadz[toadid-1].health == 0) ) {
//             if (allToadz[toadid-1].fed == 0) {
//                 fedValue = 0
//             } else {
//                 await prisma.toadz.update({
//                     where: { toadId : allToadz[toadid-1].toadId },
//                     data: { fed: allToadz[toadid-1].fed - 1 }
//                 })
//                 fedValue = allToadz[toadid-1].fed - 1
//             }
//             if (allToadz[toadid-1].energy == 0) {
//                 energyValue = 0
//             } else { 
//                 await prisma.toadz.update({
//                     where: { toadId : allToadz[toadid-1].toadId },
//                     data: { energy: allToadz[toadid-1].energy - 1 }
//                 })
//                 energyValue = allToadz[toadid-1].energy - 1
//             }
//             if (allToadz[toadid-1].happiness == 0) {
//                 happinessValue = 0
//             } else {
//                 await prisma.toadz.update({
//                     where: { toadId : allToadz[toadid-1].toadId },
//                     data: { happiness: allToadz[toadid-1].happiness - 1 }
//                 })
//                 happinessValue = allToadz[toadid-1].happiness - 1
//             }
//             if (allToadz[toadid-1].health == 0) {
//                 healthValue = 0
//             } else {
//                 await prisma.toadz.update({
//                     where: { toadId : allToadz[toadid-1].toadId },
//                     data: { health: allToadz[toadid-1].health - 1 }
//                 })
//                 healthValue = allToadz[toadid-1].health - 1
//             }
//         } else {
//             await prisma.toadz.update({
//                 where: { toadId : allToadz[toadid-1].toadId },
//                 data: { fed: allToadz[toadid-1].fed - 1,
//                         energy: allToadz[toadid-1].energy - 1,
//                         happiness: allToadz[toadid-1].happiness - 1,
//                         health: allToadz[toadid-1].health - 1 }
//             })
//             fedValue = allToadz[toadid-1].fed - 1
//             energyValue = allToadz[toadid-1].energy - 1
//             happinessValue = allToadz[toadid-1].happiness - 1
//             healthValue = allToadz[toadid-1].health - 1
//         }
           
//         const newOverall = Math.round(((fedValue + energyValue + happinessValue + healthValue) / 4))

//         await prisma.toadz.update({
//             where: { toadId : allToadz[toadid-1].toadId },
//             data: { overall: newOverall,
//                     lastDecay: new Date().toLocaleTimeString().toString() }
//         })
//     })
// }

export default async function getToadById( req:NextApiRequest, res:NextApiResponse) {
    const {method} = req
    
    if (req.method === 'GET') {
        res.status(200).json({message: "No toad id specified"})

    } else if (method === 'PATCH') {
        const data = JSON.parse(req.body)

        if (data.length > 1) {
            let action: string = data[0]
            let account: string = data[1]
            let toad: string = data[2]

            const allToadz = await prisma.toadz.findMany()
            const selectedToad = allToadz.filter((data) => (data.toadId).toString() === toad)
            let thisOwner: any

            if (selectedToad[0].userId == null) {
                thisOwner = 'none'
            } else {
                thisOwner = await prisma.user.findUnique({
                    where: { address: selectedToad[0].userId }
                })
            }
      
            const canFeed = () => {
                if (selectedToad[0].vibing == true) {
                    if (selectedToad[0].fed < 10) {
                        if (selectedToad[0].health > 0) {
                            return true
                        } else {
                            res.status(500).json({message: `Toad is not feeling well, it can't eat right now.`})
                        }
                    } else {
                    res.status(500).json({message: 'It looks like toad is already full!'})
                    return
                    }
                } else {
                    res.status(500).json({message: `Toad must be vibing before it can eat`})
                }
            }
        
            const canSleep = () => {
                if (selectedToad[0].vibing == true) {
                    if (selectedToad[0].energy < 10) {
                        if (selectedToad[0].fed > 0) {
                            return true
                        } else {
                            res.status(500).json({message: `Toad can't sleep while starving!`})
                        }
                    } else {
                    res.status(500).json({message: `Toad is already well rested, it can't sleep!`})
                    }
                } else {
                    res.status(500).json({message: `Toad must be vibing in order to sleep`})
                }
            }
        
            const canPlay = () => {
                if (selectedToad[0].vibing == true) {
                    if (selectedToad[0].happiness < 10) {
                         if (selectedToad[0].energy > 0) {
                            return true
                        } else {
                            res.status(500).json({message: `Toad is exhausted, it can't play right now...`})
                        }
                    } else {
                        res.status(500).json({message: `Toad needs a break from playing...`})
                    }
                } else {
                    res.status(500).json({message: `Toad must be vibing in order to play`})
                }
            }
        
            const eat = async() => {
                let fedValue: number
                let energyValue: number
                let happinessValue: number
                let healthValue: number
        
                if (canFeed()) {
                    let currentXp = selectedToad[0].xp
                    let actionXp = Math.round( 140 / selectedToad[0].level)
                    let newXp = currentXp + actionXp

                    await prisma.$transaction(async (prisma) => {
                        await prisma.toadz.update({
                            where: { toadId : selectedToad[0].toadId },
                            data: { fed : selectedToad[0].fed + 3,
                                    happiness: selectedToad[0].happiness + 1,
                                    health: selectedToad[0].health + 1 }
                        })
                        fedValue = selectedToad[0].fed + 3
                        energyValue = selectedToad[0].energy
                        happinessValue = selectedToad[0].happiness + 1
                        healthValue = selectedToad[0].health + 1
                        
                        if (fedValue > 10) {
                            await prisma.toadz.update({
                                where: { toadId : selectedToad[0].toadId },
                                data: { fed : 10}
                            })
                            fedValue = 10
                        }
                        if (happinessValue > 10) {
                            await prisma.toadz.update({
                                where: { toadId : selectedToad[0].toadId },
                                data: { happiness : 10}
                            })
                            happinessValue = 10
                        }
                        if (healthValue > 10) {
                            await prisma.toadz.update({
                                where: { toadId : selectedToad[0].toadId },
                                data: { health : 10}
                            })
                            healthValue = 10
                        }
                
                        const newOverall = Math.round(((fedValue + energyValue + happinessValue + healthValue) / 4))

                        await prisma.toadz.update({
                            where: { toadId : selectedToad[0].toadId },
                            data: { overall: newOverall}
                        })

                        if (newXp >= 100) {
                            let leftoverXp = newXp - 100
                            await prisma.toadz.update({
                                where: { toadId : selectedToad[0].toadId },
                                data: { xp : leftoverXp,
                                        level: selectedToad[0].level + 1 }
                            })
                            await prisma.user.update({
                                where: { address: selectedToad[0].userId },
                                data: { points: {increment: 100}}
                            })
                        } else {
                            await prisma.toadz.update({
                                where: { toadId : selectedToad[0].toadId },
                                data: { xp : newXp}
                            })
                            await prisma.user.update({
                                where: { address: selectedToad[0].userId },
                                data: { points: {increment: 10}}
                            })
                        }
                    },
                    {
                        maxWait: 5000, // default: 2000
                        timeout: 10000, // default: 5000
                    })
                    res.status(200).json(
                        {
                            message: `You fed toad some pizza... Delicious!`,
                            animation: 'pizza',
                            points: thisOwner.points,
                            overall: selectedToad[0].overall
                        }
                    )
                }
            }
        
            const sleep = async() => {
                let fedValue: number
                let energyValue: number
                let happinessValue: number
                let healthValue: number
        
                if (canSleep()) {
                    let currentXp = selectedToad[0].xp
                    let actionXp = Math.round( 120 / selectedToad[0].level)
                    let newXp = currentXp + actionXp

                    await prisma.$transaction(async (prisma) => {
                        await prisma.toadz.update({
                            where: { toadId : selectedToad[0].toadId },
                            data: { energy : selectedToad[0].energy + 2,
                                    health: selectedToad[0].health + 1 }
                        })
                        fedValue = selectedToad[0].fed
                        energyValue = selectedToad[0].energy + 2
                        happinessValue = selectedToad[0].happiness
                        healthValue = selectedToad[0].health + 1

                        if (energyValue > 10) {
                            await prisma.toadz.update({
                                where: { toadId : selectedToad[0].toadId },
                                data: { energy : 10}
                            })
                            energyValue = 10
                        }
                        if (healthValue > 10) {
                            await prisma.toadz.update({
                                where: { toadId : selectedToad[0].toadId },
                                data: { health : 10}
                            })
                            healthValue = 10
                        }
                
                        const newOverall = Math.round(((fedValue + energyValue + happinessValue + healthValue) / 4))
                        await prisma.toadz.update({
                            where: { toadId : selectedToad[0].toadId },
                            data: { overall: newOverall}
                        })

        
                        if (newXp >= 100) {
                            let leftoverXp = newXp - 100
                            await prisma.toadz.update({
                                where: { toadId : selectedToad[0].toadId },
                                data: { xp : leftoverXp,
                                        level: selectedToad[0].level + 1 }
                            })
                            await prisma.user.update({
                                where: { address: selectedToad[0].userId },
                                data: { points: {increment: 100}}
                            })
                        } else {
                            await prisma.toadz.update({
                                where: { toadId : selectedToad[0].toadId },
                                data: { xp : newXp}
                            })
                            await prisma.user.update({
                                where: { address: selectedToad[0].userId },
                                data: { points: {increment: 10}}
                            })
                        }

                    },
                    {
                        maxWait: 5000, // default: 2000
                        timeout: 10000, // default: 5000
                    })
                    res.status(200).json(
                        {
                            message:`ZZZ..ZZzzz....`,
                            animation: 'sleep',
                            points: thisOwner.points,
                            overall: selectedToad[0].overall
                        }
                    )
                }
            }
        
            const play = async() => {
                let fedValue: number
                let energyValue: number
                let happinessValue: number
                let healthValue: number
                
                if (canPlay()) {
                    let currentXp = selectedToad[0].xp
                    let actionXp = Math.round( 160 / selectedToad[0].level)
                    let newXp = currentXp + actionXp

                    await prisma.$transaction(async (prisma) => {
                        await prisma.toadz.update({
                            where: { toadId : selectedToad[0].toadId },
                            data: { happiness : selectedToad[0].happiness + 3,
                                    fed: selectedToad[0].fed - 1,
                                    energy: selectedToad[0].energy - 1 }
                        })
                        fedValue = selectedToad[0].fed - 1
                        energyValue = selectedToad[0].energy - 1
                        happinessValue = selectedToad[0].happiness + 3
                        healthValue = selectedToad[0].health

                        if (fedValue < 0) {
                            await prisma.toadz.update({
                                where: { toadId : selectedToad[0].toadId },
                                data: { fed : 0}
                            })
                            fedValue = 0
                        }
                        if (energyValue < 0) {
                            await prisma.toadz.update({
                                where: { toadId : selectedToad[0].toadId },
                                data: { energy : 0}
                            })
                            energyValue = 0
                        }
                        if (happinessValue > 10) {
                            await prisma.toadz.update({
                                where: { toadId : selectedToad[0].toadId },
                                data: { happiness : 10}
                            })
                            happinessValue = 10
                        }
                
                        const newOverall = Math.round(((fedValue + energyValue + happinessValue + healthValue) / 4))

                        await prisma.toadz.update({
                            where: { toadId : selectedToad[0].toadId },
                            data: { overall: newOverall}
                        })

                        if (newXp >= 100) {
                            let leftoverXp = newXp - 100
                            await prisma.toadz.update({
                                where: { toadId : selectedToad[0].toadId },
                                data: { xp : leftoverXp,
                                        level: selectedToad[0].level + 1 }
                            })
                            await prisma.user.update({
                                where: { address: selectedToad[0].userId },
                                data: { points: {increment: 100}}
                            })
                        } else {
                            await prisma.toadz.update({
                                where: { toadId : selectedToad[0].toadId },
                                data: { xp : newXp}
                            })
                            await prisma.user.update({
                                where: { address: selectedToad[0].userId },
                                data: { points: {increment: 10}}
                            })
                        }
                    },
                    {
                        maxWait: 5000, // default: 2000
                        timeout: 10000, // default: 5000
                    })
                    res.status(200).json(
                        {
                            message:`*Turns on Gameboy*`,
                            animation: 'gameboy',
                            points: thisOwner.points,
                            overall: selectedToad[0].overall
                        }
                    )
                }
            }
        
            const vibe = async() => {
                if (selectedToad[0].vibing != true) {
                    await prisma.toadz.update({
                        where: { toadId : selectedToad[0].toadId },
                        data: { vibing : true, 
                                level: 1,
                                vibeStart: new Date().toISOString() }
                    })
                    const { REPO_OWNER: owner, REPO_NAME: repo, GITHUB_TOKEN: token } = process.env

                    const callGithubAction = await fetch(`https://api.github.com/repos/jbarrasso/toadzgotchi-app/dispatches`, {
                        method: 'POST',
                        headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Accept': 'application/vnd.github.v3+json'
                                },
                        body: JSON.stringify({
                                                "event-type": "run_decay",
                                                "client_payload": {
                                                                    "command": "decay",
                                                                    "toadId" : `${selectedToad[0].toadId}`
                                                                }
                                            })
                    })

                    res.status(200).json(
                        {
                            message:`Toad is now vibin'. Try some actions!`,
                            animation: '',
                            points: thisOwner.points,
                            ga: callGithubAction.status
                        }
                    )
                } else {
                    res.status(500).json({message: `Toad is already vibing`})
                }
            }
        
            const gameLogic = async(action: string, account: string) => {
                if (account == thisOwner.address) {
                    if (action == 'vibe') {
                        vibe()
                    } else if (action === 'eat') {
                        eat()
                    } else if (action === 'sleep') {
                        sleep()
                    } else if (action === 'gameboy') {
                        play()
                    } else {
                        res.status(500).json({message: 'Not a valid action.'})
                    }
                } else {
                    res.status(500).json({message: `You are not the owner of this toad.`})
                }
            }

            gameLogic(action, account)
        } else {
            res.status(404).json({message: 'No data sent'})
        }
    } else {
        res.status(404).json({message: 'Invalid request method'}) 
    }
}