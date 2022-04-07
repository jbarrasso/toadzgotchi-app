import { prisma } from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import { cryptoadzAddress } from '../..';
import CrypToadz from '../../../artifacts/contracts/CrypToadz.sol/CrypToadz.json'

async function queryToadContract(account: string) {
    //const defProvider = ethers.getDefaultProvider() rate-limited
    const provider = new ethers.providers.InfuraProvider("homestead", "33719c306ed84d0c824bbe1fee3cd025")
    const contract = new ethers.Contract(cryptoadzAddress, CrypToadz.abi, provider)
    const arrayOfToadIds = []
    
    if (await contract.balanceOf(account) > 0) {
        const numberOfToadzOwned = await contract.balanceOf(account)

        for (let i=0; i<numberOfToadzOwned; i++) {
            let id = await contract.tokenOfOwnerByIndex(account, i)
            arrayOfToadIds[i] = id.toNumber()
        }
    }
    return (arrayOfToadIds)
}

export default async function getUserByAddress( req:NextApiRequest, res:NextApiResponse) {
    res.statusCode = 200;
    const account = JSON.parse(req.body)
    const toadIdsOwned = await queryToadContract(account)

    if (toadIdsOwned.length == 0) {
        res.status(500).json({message: "This account doesn't own toadz"})
    } else {
        const array = [{}]
        for (let i=0; i<toadIdsOwned.length; i++) {
            array[i] = {toadId:toadIdsOwned[i]}
        }
        const thisOwner = await prisma.user.findUnique({
            where: {address: req.query.id}
        })

        if (thisOwner == null) {
            await prisma.user.create({
                data: {
                    address: account,
                    toadz: { 
                        connect: array
                    }
                }    
            })
            res.status(200).json({message:`New user ${account} created. The account owns the following toads: ${toadIdsOwned}`, newPlayer: true})
        } else {
            await prisma.user.update({
                where: {address: account},
                data: {
                    toadz: {
                        set: array
                    }
                }
            }) 
            res.status(200).json({message:`User ${account} already exists. The account owns the following toads: ${toadIdsOwned}`, newPlayer: false})
        }
    }
}