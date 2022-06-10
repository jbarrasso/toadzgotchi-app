import { prisma } from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next';

function startDecay(toadid: number) {
    setInterval(function() {decayStats(toadid)}, 1000*60*60*4)
}

async function decayStats(toadid: number) {
    const allToadz = await prisma.toadz.findMany()
    let fedValue: number
    let energyValue: number
    let happinessValue: number
    let healthValue: number

    return await prisma.$transaction(async (prisma) => {
        if ( (allToadz[toadid-1].fed == 0) || (allToadz[toadid-1].energy == 0) || (allToadz[toadid-1].happiness == 0) || (allToadz[toadid-1].health == 0) ) {
            if (allToadz[toadid-1].fed == 0) {
                fedValue = 0
            } else {
                await prisma.toadz.update({
                    where: { toadId : allToadz[toadid-1].toadId },
                    data: { fed: allToadz[toadid-1].fed - 1 }
                })
                fedValue = allToadz[toadid-1].fed - 1
            }
            if (allToadz[toadid-1].energy == 0) {
                energyValue = 0
            } else { 
                await prisma.toadz.update({
                    where: { toadId : allToadz[toadid-1].toadId },
                    data: { energy: allToadz[toadid-1].energy - 1 }
                })
                energyValue = allToadz[toadid-1].energy - 1
            }
            if (allToadz[toadid-1].happiness == 0) {
                happinessValue = 0
            } else {
                await prisma.toadz.update({
                    where: { toadId : allToadz[toadid-1].toadId },
                    data: { happiness: allToadz[toadid-1].happiness - 1 }
                })
                happinessValue = allToadz[toadid-1].happiness - 1
            }
            if (allToadz[toadid-1].health == 0) {
                healthValue = 0
            } else {
                await prisma.toadz.update({
                    where: { toadId : allToadz[toadid-1].toadId },
                    data: { health: allToadz[toadid-1].health - 1 }
                })
                healthValue = allToadz[toadid-1].health - 1
            }
        } else {
            await prisma.toadz.update({
                where: { toadId : allToadz[toadid-1].toadId },
                data: { fed: allToadz[toadid-1].fed - 1,
                        energy: allToadz[toadid-1].energy - 1,
                        happiness: allToadz[toadid-1].happiness - 1,
                        health: allToadz[toadid-1].health - 1 }
            })
            fedValue = allToadz[toadid-1].fed - 1
            energyValue = allToadz[toadid-1].energy - 1
            happinessValue = allToadz[toadid-1].happiness - 1
            healthValue = allToadz[toadid-1].health - 1
        }
           
        const newOverall = Math.round(((fedValue + energyValue + happinessValue + healthValue) / 4))

        await prisma.toadz.update({
            where: { toadId : allToadz[toadid-1].toadId },
            data: { overall: newOverall,
                    lastDecay: new Date().toLocaleTimeString().toString() }
        })
    })
}

export default async function getToadById( req:NextApiRequest, res:NextApiResponse) {
    const {method} = req
    //
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
            const thisOwner = await prisma.user.findUnique({
                where: { address: selectedToad[0].userId }
            })

            async function updateOverallStats(fedValue: number, energyValue: number, happinessValue: number, healthValue: number) {
                if (fedValue < 0) {
                    await prisma.toadz.update({
                        where: { toadId : selectedToad[0].toadId },
                        data: { fed : 0}
                    })
                    fedValue = 0
                } else if (fedValue > 1000) {
                    await prisma.toadz.update({
                        where: { toadId : selectedToad[0].toadId },
                        data: { fed : 1000}
                    })
                    fedValue = 1000
                }
                if (energyValue < 0) {
                    await prisma.toadz.update({
                        where: { toadId : selectedToad[0].toadId },
                        data: { energy : 0}
                    })
                    energyValue = 0
                } else if (energyValue > 1000) {
                    await prisma.toadz.update({
                        where: { toadId : selectedToad[0].toadId },
                        data: { energy : 1000}
                    })
                    energyValue = 1000
                }
                if (happinessValue < 0) {
                    await prisma.toadz.update({
                        where: { toadId : selectedToad[0].toadId },
                        data: { happiness : 0}
                    })
                    happinessValue = 0
                } else if (happinessValue > 1000) {
                    await prisma.toadz.update({
                        where: { toadId : selectedToad[0].toadId },
                        data: { happiness : 1000}
                    })
                    happinessValue = 1000
                }
                if (healthValue < 0) {
                    await prisma.toadz.update({
                        where: { toadId : selectedToad[0].toadId },
                        data: { health : 0}
                    })
                    healthValue = 0
                } else if (healthValue > 1000) {
                    await prisma.toadz.update({
                        where: { toadId : selectedToad[0].toadId },
                        data: { health : 1000}
                    })
                    healthValue = 1000
                }
        
                const newOverall = Math.round(((fedValue + energyValue + happinessValue + healthValue) / 4))
                await prisma.toadz.update({
                    where: { toadId : selectedToad[0].toadId },
                    data: { overall: newOverall}
                })
            }
        
            async function grantXp(actionXp: number) {
                //add exponential feature
                let currentXp = selectedToad[0].xp
                let newXp: number
        
                if ((currentXp + actionXp) >= 100) {
                    let leftoverXp = (currentXp + actionXp) - 100
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
                    newXp = currentXp + actionXp
                    await prisma.toadz.update({
                        where: { toadId : selectedToad[0].toadId },
                        data: { xp : newXp }
                    })
                    await prisma.user.update({
                        where: { address: selectedToad[0].userId },
                        data: { points: {increment: 10}}
                    })
                }
            }
        
            const canFeed = () => {
                if (selectedToad[0].vibing == true) {
                    if (selectedToad[0].fed < 1000) {
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
                    if (selectedToad[0].energy < 1000) {
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
                    if (selectedToad[0].happiness < 1000) {
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
                        
                        updateOverallStats(fedValue, energyValue, happinessValue, healthValue)
                        grantXp(40)
                    })
                    res.status(200).json(
                        {
                            message: `You fed toad some pizza... Delicious!`,
                            animation: 'pizza',
                            points: thisOwner.points
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
                    
                        updateOverallStats(fedValue, energyValue, happinessValue, healthValue)
                        grantXp(20)

                    })
                    res.status(200).json(
                        {
                            message:`ZZZ..ZZzzz....`,
                            animation: 'sleep',
                            points: thisOwner.points
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
        
                        updateOverallStats(fedValue, energyValue, happinessValue, healthValue)
        
                        grantXp(60)
                    })
                    res.status(200).json(
                        {
                            message:`*Turns on Gameboy*`,
                            animation: 'gameboy',
                            points: thisOwner.points
                        }
                    )
                }
            }
        
            const vibe = async() => {
                if (selectedToad[0].vibing != true) {
                    const update = await prisma.toadz.update({
                        where: { toadId : selectedToad[0].toadId },
                        data: { vibing : true, 
                                level: 1,
                                vibeStart: new Date().toISOString() }
                    })
                    startDecay(selectedToad[0].toadId)
                    res.status(200).json(
                        {
                            message:`Toad is now vibin'. Try some actions!`,
                            animation: ''
                        }
                    )
                } else {
                    res.status(500).json({message: `Toad is already vibing`})
                }
            }
        
            const gameLogic = async(action: string, account: string) => {
                if (account === selectedToad[0].userId) {
                    if (action == 'vibe') {
                        vibe()
                    } else if (action === 'eat') {
                        eat()
                    } else if (action === 'sleep') {
                        sleep()
                    } else if (action === 'gameboy') {
                        play()
                    } else {
                        res.status(404).json({message: 'Not a valid action.'})
                    }
                } else {
                    res.status(404).json({message: 'You are not the owner of this toad.'})
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