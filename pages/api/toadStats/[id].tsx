import { prisma } from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getToadById( req:NextApiRequest, res:NextApiResponse) {
    res.statusCode = 200;
    //get all the toad data
    const allToadz = await prisma.toadz.findMany()
    //grab only the toad data for /api/toadStats/i
    const selectedToad = allToadz.filter((data) => (data.toad_id).toString() === req.query.id)

    //pull feed data from another mySQL table
    //const feedData = await prisma.mechanics.findMany()

    //all props start at 10
    
    //feed: can't feed if full, sick

    const isFeedable = () => {
        if (selectedToad[0].full < 2000) {
            if (selectedToad[0].fitness > 0) {
                return true
            } else {
                res.status(500).json({message: `Toad is not feeling well, it can't eat at the momemt...`})
            }
        } else {
        res.status(500).json({message: 'It looks like toad is already full!'})
        }
    }

    const hamburger = async() => {
        if (isFeedable()) {
            const update = await prisma.toadz.update({
                where: { toad_id : selectedToad[0].toad_id },
                data: { full : selectedToad[0].full + 4,
                        fitness: selectedToad[0].fitness - 1 }
            })
        }
    }
    
    const iceCream = async() => {
        if (isFeedable()) {
            if (selectedToad[0].fitness == 1) {
                const update = await prisma.toadz.update({
                    where: { toad_id : selectedToad[0].toad_id },
                    data: { full : selectedToad[0].full + 2,
                            fitness : 0 }
                })
            } else {
                const update = await prisma.toadz.update({
                    where: { toad_id : selectedToad[0].toad_id },
                    data: { full : selectedToad[0].full + 2,
                            fitness : selectedToad[0].fitness - 2 }
                })
            }
        }
    }

    const gameLogic = async(propertiesToUpdate: string[], account: string) => {
        if (account === selectedToad[0].owner_id) {
            for (let i=0; i<propertiesToUpdate.length; i++) {
                if (propertiesToUpdate[i] === 'hamburger') {
                    hamburger()
                    res.status(200).json({message:'You fed toad a hamburger!'})
                } else if (propertiesToUpdate[i] === 'icecream') {
                    iceCream()
                    res.status(200).json({message:`You fed toad some ice cream!`})
                } else if (propertiesToUpdate[i] === 'happiness') {
                    if (selectedToad[0].happiness < 1000) {
                        const update = await prisma.toadz.update({
                            where: { toad_id : selectedToad[0].toad_id },
                            data: {happiness:30}
                        })
                        res.status(200).json({message: 'toad happiness updated to 30'})
                    } else {
                        res.status(404).json({message: 'cannot play'})
                    }
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