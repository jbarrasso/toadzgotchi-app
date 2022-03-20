import { prisma } from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next';
export default async function getToadById( req:NextApiRequest, res:NextApiResponse) {
    res.statusCode = 200;

    const allToadz = await prisma.toadz.findMany()

    //pull feed data from another mySQL table
    //const feedData = await prisma.mechanics.findMany()
    
    //grab only the toad data for /api/toadStats/i
    const selectedOwner = allToadz.filter((data) => (data.owner_id).toString() === req.query.id)
    const toadIdsOwned = []

    if (selectedOwner.length > 0) {
        for (let i=0; i<selectedOwner.length; i++) {
            toadIdsOwned[i] = selectedOwner[i].toad_id
        }
        res.status(200).json(`${selectedOwner} owns the following toads:${toadIdsOwned}`)
    } else {
        res.status(404).json(`${selectedOwner} does not own any toads`)
    }
}