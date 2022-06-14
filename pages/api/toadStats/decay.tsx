import { prisma } from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function decayToadStats( req:NextApiRequest, res:NextApiResponse) {
    const {method} = req
    
    if (method === 'GET') {
        res.status(200).json({message: "No toad id specified"})

    } else if (method === 'PATCH') {
        const data = JSON.parse(req.body)

        if (data.length > 1) {
            // let action: string = data[0]           
            res.status(200).json({message: `${data}`})

        } else {
            res.status(404).json({message: 'No data sent'})
        }
    } else {
        res.status(404).json({message: 'Invalid request method'}) 
    }
}