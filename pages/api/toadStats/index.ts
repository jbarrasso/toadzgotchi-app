import { prisma } from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next';
export default async function getAllToadz( req:NextApiRequest, res:NextApiResponse) {
    res.statusCode = 200;
    const data = await prisma.toadz.findMany()
    if (data.length > 0 ) {
        res.status(200).json(data)
    } else {
        res.status(404).json({message: 'not found'})
    }
}