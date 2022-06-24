import { prisma } from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import { cryptoadzAddress } from '../../index';
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

export default async function getUserByAddress(req:NextApiRequest, res:NextApiResponse) {
    const {method} = req

    if (method === "PUT") {
        res.statusCode = 200
        const account = JSON.parse(req.body)

        //Double check the reqer (account) owns toadz or not
        const toadIdsOwned = await queryToadContract(account)
    
        if (toadIdsOwned.length == 0) {
            //Respond with error if reqer doesn't own toadz (toadIdsOwned = [])
            res.status(500).json({message: "This account doesn't own toadz"})
        } else {
            //If reqer does own toadz, check if they are in the db already or not
            const array = [{}]
            for (let i=0; i<toadIdsOwned.length; i++) {
                array[i] = {toadId:toadIdsOwned[i]}
            }
            const thisOwner = await prisma.user.findUnique({
                where: {address: account}
            })
            //If reqer does own toadz AND is not in the db, create an entry and connect their toad IDs owned
            if (thisOwner == null) {
                await prisma.user.create({
                    data: {
                        address: account,
                        toadz: { 
                            connect: array
                        },
                        points: 0
                    }    
                })
                res.status(200).json(
                    {
                        message:`New user ${account} created. The account owns the following toads: ${toadIdsOwned}`,
                        newPlayer: true,
                        firstToad: toadIdsOwned[0],
                        points: 0
                    }
                )
            } else {
            //If reqer does own toadz AND they are in the db, update their toad IDs owned (will still run even if IDs owned haven't changed)
                await prisma.user.update({
                    where: {address: account},
                    data: {
                        toadz: {
                            set: array
                        }
                    }
                }) 
                res.status(200).json(
                    {
                        message: `User ${account} already exists. The account owns the following toads: ${toadIdsOwned}`,
                        newPlayer: false,
                        firstToad: toadIdsOwned[0],
                        points: thisOwner.points
                    }
                )
            }
        }
    } else {
        res.json({message: 'error'})
    }
}