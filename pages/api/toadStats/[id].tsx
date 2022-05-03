import { prisma } from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { useState } from 'react'

function startDecay(toadid: number) {
    setInterval(function() {decayStats(toadid)}, 1000*60)
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
            data: { overall: newOverall }
        })
    })
}

export default async function getToadById( req:NextApiRequest, res:NextApiResponse) {
    res.statusCode = 200;
    const allToadz = await prisma.toadz.findMany()
    const selectedToad = allToadz.filter((data) => (data.toadId).toString() === req.query.id)

    async function checkValues() {
        //need to put local vals in here
        if (selectedToad[0].fed < 0) {
            await prisma.toadz.update({
                where: { toadId : selectedToad[0].toadId },
                data: { fed : 0}
            })
        } else if (selectedToad[0].fed > 10) {
            await prisma.toadz.update({
                where: { toadId : selectedToad[0].toadId },
                data: { fed : 10}
            })
        }
        if (selectedToad[0].energy < 0) {
            await prisma.toadz.update({
                where: { toadId : selectedToad[0].toadId },
                data: { energy : 0}
            })
        } else if (selectedToad[0].energy > 10) {
            await prisma.toadz.update({
                where: { toadId : selectedToad[0].toadId },
                data: { energy : 10}
            })
        }
        if (selectedToad[0].happiness < 0) {
            await prisma.toadz.update({
                where: { toadId : selectedToad[0].toadId },
                data: { happiness : 0}
            })
        } else if (selectedToad[0].happiness > 10) {
            await prisma.toadz.update({
                where: { toadId : selectedToad[0].toadId },
                data: { happiness : 10}
            })
        }
        if (selectedToad[0].health < 0) {
            await prisma.toadz.update({
                where: { toadId : selectedToad[0].toadId },
                data: { health : 0}
            })
        } else if (selectedToad[0].health > 10) {
            await prisma.toadz.update({
                where: { toadId : selectedToad[0].toadId },
                data: { health : 10}
            })
        }
    }

    const canFeed = () => {
        if (selectedToad[0].fed < 10) {
            if (selectedToad[0].health > 0) {
                return true
            } else {
                res.status(500).json({message: `Toad is not feeling well, it can't eat right now.`})
            }
        } else {
        res.status(500).json({message: 'It looks like toad is already full!'})
        }
    }

    const canSleep = () => {
        if (selectedToad[0].energy < 10) {
            if (selectedToad[0].fed > 0) {
                return true
            } else {
                res.status(500).json({message: `Toad can't sleep while starving!`})
            }
        } else {
        res.status(500).json({message: `Toad is already well rested, it can't sleep!`})
        }
    }

    const canPlay = () => {
        if (selectedToad[0].energy > 0) {
            // if (selectedToad[0].health > 0) {
                return true
            } else {
                res.status(500).json({message: `Toad is exhausted, it can't play right now...`})
            }
        }
        // else {
        // res.status(500).json({message: `Toad is exhausted, it can't play right now`})
        // }
    // }
        
    const eatFlies = async() => {
        if (canFeed()) {
            const update = await prisma.toadz.update({
                where: { toadId : selectedToad[0].toadId },
                data: { fed : selectedToad[0].fed + 1 }
            })
        }
    }
    
    const eatIceCream = async() => {
        if (canFeed()) {
            if (selectedToad[0].health == 1) {
                const update = await prisma.toadz.update({
                    where: { toadId : selectedToad[0].toadId },
                    data: { fed : selectedToad[0].fed + 2,
                            health : 0 }
                })
            } else {
                const update = await prisma.toadz.update({
                    where: { toadId : selectedToad[0].toadId },
                    data: { fed : selectedToad[0].fed + 2,
                            health : selectedToad[0].health - 2 }
                })
            }
        }
    }

    const eatVeggies = async() => {
        if (canFeed()) {
            const update = await prisma.toadz.update({
                where: { toadId : selectedToad[0].toadId },
                data: { fed : selectedToad[0].fed + 1,
                        health : selectedToad[0].health + 3,
                        happiness : selectedToad[0].happiness - 1 }
            })
        }
    }

    const takeNap = async() => {
        if (canSleep()) {
            const update = await prisma.toadz.update({
                where: { toadId : selectedToad[0].toadId },
                data: { energy : selectedToad[0].energy + 2,
                        health : selectedToad[0].health + 1 }
            })
        }
    }

    const eatPizza = async() => {
        let fedValue: number
        let happinessValue: number
        let healthValue: number

        if (canFeed()) {
            return await prisma.$transaction(async (prisma) => {
                await prisma.toadz.update({
                    where: { toadId : selectedToad[0].toadId },
                    data: { fed : selectedToad[0].fed + 3,
                            happiness: selectedToad[0].happiness + 1,
                            health: selectedToad[0].health + 1 }
                })
                fedValue = selectedToad[0].fed + 3
                happinessValue = selectedToad[0].happiness + 1
                healthValue = selectedToad[0].health + 1
                
                checkValues()

                const newOverall = Math.round(((fedValue + selectedToad[0].energy + happinessValue + healthValue) / 4))

                await prisma.toadz.update({
                    where: { toadId : selectedToad[0].toadId },
                    data: { overall: newOverall }
                })
            })
        }
    }

    const goToSleep = async() => {
        let energyValue: number
        let healthValue: number

        if (canSleep()) {
            return await prisma.$transaction(async (prisma) => {
                await prisma.toadz.update({
                    where: { toadId : selectedToad[0].toadId },
                    data: { energy : selectedToad[0].energy + 2,
                            health: selectedToad[0].health + 1 }
                })
                energyValue = selectedToad[0].energy + 2
                healthValue = selectedToad[0].health + 1
            
                checkValues()

                const newOverall = Math.round(((selectedToad[0].fed + energyValue + selectedToad[0].happiness + healthValue) / 4))

                await prisma.toadz.update({
                    where: { toadId : selectedToad[0].toadId },
                    data: { overall: newOverall }
                })
            })
        }
    }

    const playGameboy = async() => {
        let fedValue: number
        let energyValue: number
        let happinessValue: number
        
        if (canPlay()) {
            return await prisma.$transaction(async (prisma) => {
                await prisma.toadz.update({
                    where: { toadId : selectedToad[0].toadId },
                    data: { happiness : selectedToad[0].happiness + 3,
                            fed: selectedToad[0].fed - 1,
                            energy: selectedToad[0].energy - 1 }
                })
                happinessValue = selectedToad[0].happiness + 3
                fedValue = selectedToad[0].fed - 1
                energyValue = selectedToad[0].energy - 1

                checkValues()
                const newOverall = Math.round(((fedValue + energyValue + happinessValue + selectedToad[0].health) / 4))

                await prisma.toadz.update({
                    where: { toadId : selectedToad[0].toadId },
                    data: { overall: newOverall }
                })
            })
        }
    }

    const playBall = async() => {
        if (canPlay()) {
            const update = await prisma.toadz.update({
                where: { toadId : selectedToad[0].toadId },
                data: { happiness : selectedToad[0].happiness + 2,
                        fed : selectedToad[0].fed - 4,
                        energy : selectedToad[0].energy - 3,
                        health : selectedToad[0].health + 6 }
            })
        }
    }

    const vibe = async() => {
        if (selectedToad[0].vibing != true) {
            const update = await prisma.toadz.update({
                where: { toadId : selectedToad[0].toadId },
                data: { vibing : true, 
                        level: 1 }
            })
            startDecay(selectedToad[0].toadId)
        } else {
            res.status(500).json({message: `Toad is already vibing`})
        }
    }

    const gameLogic = async(action: string, account: string) => {
        if (account === selectedToad[0].userId) {
            if (action == 'vibe') {
                vibe()
                res.status(200).json({message:'Toad is ~vibing~', animation: ''})
            } else if (action === 'flies') {
                eatFlies()
                res.status(200).json({message:'You fed toad some flies.', animation: ''})
            } else if (action === 'pizza') {
                eatPizza()
                res.status(200).json({message:'You fed toad some pizza.', animation: 'pizza'})
            } else if (action === 'icecream') {
                eatIceCream()
                res.status(200).json({message:`Youd fed toad some ice cream.`, animation: ''})
            } else if (action === 'veggies') {
                eatVeggies()
                res.status(200).json({message:`You fed toad some veggies.`, animation: ''})
            } else if (action === 'nap') {
                goToSleep()
                res.status(200).json({message:`Toad is taking a quick power nap...`, animation: 'sleep'})
            } else if (action === 'sleep') {
                goToSleep()
                res.status(200).json({message:`ZZZ..ZZzzz....`, animation: 'sleep'})
            } else if (action === 'gameboy') {
                playGameboy()
                res.status(200).json({message:`*Turns on Gameboy*`, animation: 'gameboy'})
            } else if (action === 'ball') {
                playBall()
                res.status(200).json({message:`boing boing boing`, animation: 'ball'})
            } else {
                res.status(404).json({message: 'Not a valid action.'})
            }
        } else {
            res.status(404).json({message: 'You are not the owner of this toad.'})
        }
    }

    if (selectedToad.length > 0) {
        if (req.method === 'GET') {
            res.status(200).json(selectedToad[0])
        } else if (req.method === 'PATCH') {
            const data = JSON.parse(req.body)
            if (data.length > 1) {
                let action: string = data[0]
                let account: string = data[1]
                gameLogic(action, account)
            } else {
                res.status(404).json({message: 'No data sent'})
            }
        } else {
            res.status(404).json({message: 'Invalid request method'}) 
        }
    } else {
        res.status(404).json({message: 'Toad id not found'})
    }
}