import { prisma } from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function decayToadStats( req:NextApiRequest, res:NextApiResponse) {
    const date = req.rawHeaders
    const method = req.method
    
    if (method === 'GET') {

        // const vibingToadz = await prisma.toadz.findMany({
        //     where: {vibing: true}
        // })
        // let data = [1,2]
        // for (let i=0; i < vibingToadz.length; i++) {
        // }
        await prisma.toadz.updateMany({
            where: {
                lastDecay: {
                    contains: '8:00 pm'
                },
                vibing : true
            },
            data: {
                lastDecay: 'gotcha'
            }
        })
        res.status(200).json({message: `${date}`})

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