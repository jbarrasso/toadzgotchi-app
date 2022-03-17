import { prisma } from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next';

// const findUser = (owner_id:string) => {
//     return Prisma.validator<Prisma.ToadzWhereInput>() ({
//         owner_id
//     })
// }

export default async function getToadById( req:NextApiRequest, res:NextApiResponse) {
    res.statusCode = 200;
    //get all the toad data
    const allToadz = await prisma.toadz.findMany()
    //grab only the toad data for /api/toadStats/i
    const selectedToad = allToadz.filter((data) => (data.toad_id).toString() === req.query.id)

    const gameLogic = async(propertyToUpdate: string, updatedValue: string | number, newData: any) => {
        if (propertyToUpdate === 'owner_id') {
            const update = await prisma.toadz.update({
                where: { toad_id : selectedToad[0].toad_id },
                data: newData
            })
            res.status(200).json(update)
        } else if (propertyToUpdate === 'full') {
            //check that acc == owner_id?
            //update by FIXED AMOUNT, not by what is sent from frontend
            if (selectedToad[0].full < 100) {
                const update = await prisma.toadz.update({
                    where: { toad_id : selectedToad[0].toad_id },
                    data: newData
                })
                res.status(200).json(update)
            } else { res.status(404).json({message: 'cannot feed'})
            }
        } else if (propertyToUpdate === 'rest') {
            if (selectedToad[0].rest < 100) {
                const update = await prisma.toadz.update({
                    where: { toad_id : selectedToad[0].toad_id },
                    data: newData
                })
                res.status(200).json(update)
            } else { res.status(404).json({message: 'cannot sleep'})
            }
        } else if (propertyToUpdate === 'happiness') {
            if (selectedToad[0].happiness < 100) {
                const update = await prisma.toadz.update({
                    where: { toad_id : selectedToad[0].toad_id },
                    data: newData
                })
                res.status(200).json(update)
            } else { res.status(404).json({message: 'cannot play'})
            }
        }
    }

    if (selectedToad.length > 0) {
        if (req.method === 'PATCH') {
            const newData = JSON.parse(req.body)
            const propertyToUpdate= Object.keys(newData)[0]
            const updatedValue = newData[propertyToUpdate]

            gameLogic(propertyToUpdate, updatedValue, newData)

        } else if (req.method === 'GET') {
            res.status(200).json(selectedToad[0])
        }
    } else {
        res.status(404).json({message: 'not found'})
    }
}