import { prisma } from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { useState } from 'react'

function callme(toadid: number) {
    setInterval(function() {decay(toadid)}, 1000*60*60*4)
}

async function decay(toadid: number) {
    const allToadz = await prisma.toadz.findMany()

    await prisma.toadz.update({
        where: { toad_id: allToadz[toadid-1].toad_id },
        data: { fed: allToadz[toadid-1].fed - 1,
                energy: allToadz[toadid-1].energy - 1,
                happiness: allToadz[toadid-1].happiness - 1,
                health: allToadz[toadid-1].health - 1,
                spirit: allToadz[toadid-1].spirit - 1 }
                
    })
}

export default async function getToadById( req:NextApiRequest, res:NextApiResponse) {
    res.statusCode = 200;
    //get all the toad data
    const allToadz = await prisma.toadz.findMany()
    //grab only the toad data for /api/toadStats/i
    const selectedToad = allToadz.filter((data) => (data.toad_id).toString() === req.query.id)

    //pull feed data from another mySQL table
    //const feedData = await prisma.mechanics.findMany()

    const canFeed = () => {
        if (selectedToad[0].fed < 10) {
            if (selectedToad[0].health > 0) {
                return true
            } else {
                res.status(500).json({message: `TOAD IS NOT FEELING WELL, IT CAN'T EAT RIGHT NOW`})
            }
        } else {
        res.status(500).json({message: 'IT LOOKS LIKE TOAD IS ALREADY FULL!'})
        }
    }

    const canRest = () => {
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
            if (selectedToad[0].health > 0) {
                return true
            } else {
                res.status(500).json({message: `Toad is not feeling well at the moment, it can't play`})
            }
        } else {
        res.status(500).json({message: `Toad is exhausted, it can't play right now`})
        }
    }

    const eatFlies = async() => {
        if (canFeed()) {
            const update = await prisma.toadz.update({
                where: { toad_id : selectedToad[0].toad_id },
                data: { fed : selectedToad[0].fed + 1 }
            })
        }
    }

    const eatHamburger = async() => {
        if (canFeed()) {
            const update = await prisma.toadz.update({
                where: { toad_id : selectedToad[0].toad_id },
                data: { fed : selectedToad[0].fed + 4,
                        health: selectedToad[0].health - 1 }
            })
        }
    }
    
    const eatIceCream = async() => {
        if (canFeed()) {
            if (selectedToad[0].health == 1) {
                const update = await prisma.toadz.update({
                    where: { toad_id : selectedToad[0].toad_id },
                    data: { fed : selectedToad[0].fed + 2,
                            health : 0 }
                })
            } else {
                const update = await prisma.toadz.update({
                    where: { toad_id : selectedToad[0].toad_id },
                    data: { fed : selectedToad[0].fed + 2,
                            health : selectedToad[0].health - 2 }
                })
            }
        }
    }

    const eatVeggies = async() => {
        if (canFeed()) {
            const update = await prisma.toadz.update({
                where: { toad_id : selectedToad[0].toad_id },
                data: { fed : selectedToad[0].fed + 1,
                        health : selectedToad[0].health + 3,
                        happiness : selectedToad[0].happiness - 1 }
            })
        }
    }

    const takeNap = async() => {
        if (canRest()) {
            const update = await prisma.toadz.update({
                where: { toad_id : selectedToad[0].toad_id },
                data: { energy : selectedToad[0].energy + 2,
                        health : selectedToad[0].health + 1 }
            })
        }
    }

    const goToSleep = async() => {
        if (canRest()) {
            const update = await prisma.toadz.update({
                where: { toad_id : selectedToad[0].toad_id },
                data: { energy : selectedToad[0].energy + 6,
                        health : selectedToad[0].health + 2 }
            })
        }
    }

    const playGameboy = async() => {
        if (canPlay()) {
            const update = await prisma.toadz.update({
                where: { toad_id : selectedToad[0].toad_id },
                data: { happiness : selectedToad[0].happiness + 3,
                        fed : selectedToad[0].fed - 1 }
            })
        }
    }

    const playBall = async() => {
        if (canPlay()) {
            const update = await prisma.toadz.update({
                where: { toad_id : selectedToad[0].toad_id },
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
                where: { toad_id : selectedToad[0].toad_id },
                data: { vibing : true }
            })
            callme(selectedToad[0].toad_id)
        } else {
            res.status(500).json({message: `Toad is already vibing`})
        }
    }

    const gameLogic = async(propertiesToUpdate: string[], account: string) => {
        if (account === selectedToad[0].owner_id) {
            for (let i=0; i<propertiesToUpdate.length; i++) {
                if (propertiesToUpdate[i] == 'vibe') {
                    vibe()
                    res.status(200).json({message:'Toad is vibing', animation: ''})
                } else if (propertiesToUpdate[i] === 'flies') {
                    eatFlies()
                    res.status(200).json({message:'YOU FED TOAD SOME FLIES.', animation: ''})
                } else if (propertiesToUpdate[i] === 'hamburger') {
                    eatHamburger()
                    res.status(200).json({message:'YOU FED TOAD SOME PIZZA.', animation: ''})
                } else if (propertiesToUpdate[i] === 'icecream') {
                    eatIceCream()
                    res.status(200).json({message:`YOU FED TOAD SOME ICE CREAM!`, animation: ''})
                } else if (propertiesToUpdate[i] === 'veggies') {
                    eatVeggies()
                    res.status(200).json({message:`YOU FED TOAD SOME VEGGIES.`, animation: ''})
                } else if (propertiesToUpdate[i] === 'nap') {
                    takeNap()
                    res.status(200).json({message:`TOAD IS RESTING IT'S EYES FOR A LITTLE`, animation: ''})
                } else if (propertiesToUpdate[i] === 'sleep') {
                    goToSleep()
                    res.status(200).json({message:`ZZZ..ZZzzz`, animation: ''})
                } else if (propertiesToUpdate[i] === 'gameboy') {
                    playGameboy()
                    res.status(200).json({message:`*BOOTS UP GAMEBOY*`, animation: ''})
                } else if (propertiesToUpdate[i] === 'ball') {
                    playBall()
                    res.status(200).json({message:`boing boing boing`, animation: ''})
                } else {
                    res.status(404).json({message: 'Not a valid action'})
                }
            }
        } else {
            res.status(404).json({message: 'You are not the owner of this toad.'})
        }
    }

    if (selectedToad.length > 0) {
        if (req.method === 'GET') {
            res.status(200).json(selectedToad[0])
        } else {
            let account: string = ''
            const propertiesToUpdate = JSON.parse(req.body)

            if (propertiesToUpdate.length > 0) {

                if (req.method === 'PATCH') {
                    for (let i=0; i<propertiesToUpdate.length; i++) {
                        if (i == (propertiesToUpdate.length - 1)) {
                            account = propertiesToUpdate[i]
                        }
                    }
                    gameLogic(propertiesToUpdate, account)

                } else if (req.method === 'PUT') {

                    //check user key against db first
                    account = propertiesToUpdate[0]
                    if (account != selectedToad[0].owner_id) {
                        const update = await prisma.toadz.update({
                            where: { toad_id : selectedToad[0].toad_id },
                            data: { owner_id: propertiesToUpdate[0]}
                        })
                        res.status(200).json({message: `toad id ${selectedToad[0].toad_id} updated with new owner ${account}`})
                    } else {
                        res.status(200).json({message:'toad owner is the same'})
                    }

                }
            } else {
                res.status(404).json({message: 'No data sent'})
            }
        }
    } else {
        res.status(404).json({message: 'Toad id not found'})
    }
}