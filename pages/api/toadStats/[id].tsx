import { prisma } from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next';
export default async function getToadById( req:NextApiRequest, res:NextApiResponse) {
    res.statusCode = 200;
    const data = await prisma.toadz.findMany()
    const filtered = data.filter((data) => (data.toad_id).toString() === req.query.id)
    if (filtered.length > 0 ) {
        try {
            const contactData = JSON.parse(req.body);
            const newData = await prisma.toadz.update({
                where: { toad_id: filtered[0].toad_id },
                data: { owner_id: contactData}
            })
        } catch (err) {
            console.log(err)
        }
        res.status(200).json(filtered[0])
    } else {
        res.status(404).json({message: 'not found'})
    }
}