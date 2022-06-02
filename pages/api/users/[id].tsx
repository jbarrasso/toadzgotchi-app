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

export default async function getUserByAddress(request, response) {
    response.setHeader('Access-Control-Allow-Credentials', true)
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    response.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    response.setHeader('Content-Type', 'application/json')
    const account = request.body
    response.json({message:'hi'})
    //Double check the requester (account) owns toadz or not
    const toadIdsOwned = await queryToadContract(account)

    if (toadIdsOwned.length == 0) {
        //Respond with error if requester doesn't own toadz (toadIdsOwned = [])
        response.status(500).json({message: "This account doesn't own toadz"})
    } else {
        const array = [{}]
        for (let i=0; i<toadIdsOwned.length; i++) {
            array[i] = {toadId:toadIdsOwned[i]}
        }
        //If requester does own toadz, check if they are in the db already or not
        const thisOwner = await prisma.user.findUnique({
            where: {address: request.query.id}
        })
        //If requester does own toadz AND is not in the db, create an entry and connect their toad IDs owned
        if (thisOwner == null) {
            await prisma.user.create({
                data: {
                    address: account,
                    toadz: { 
                        connect: array
                    }
                }    
            })
            response.status(200).json({message:`New user ${account} created. The account owns the following toads: ${toadIdsOwned}`, newPlayer: true, firstToad: toadIdsOwned[0]})
        } else {
        //If requester does own toadz AND they are in the db, update their toad IDs owned (will still run even if IDs owned haven't changed)
            await prisma.user.update({
                where: {address: account},
                data: {
                    toadz: {
                        set: array
                    }
                }
            }) 
            response.status(200).json({message:`User ${account} already exists. The account owns the following toads: ${toadIdsOwned}`, newPlayer: false, firstToad: toadIdsOwned[0]})
        }
    }
}