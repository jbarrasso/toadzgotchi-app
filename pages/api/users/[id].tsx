import { prisma } from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next';
import { userInfo } from 'os';
import { account } from '../..';
import { ethers } from 'ethers';
import { ethereum } from '../..';
import { cryptoadzAddress } from '../..';
import CrypToadz from '../../../artifacts/contracts/CrypToadz.sol/CrypToadz.json'
import { signer } from '../..';
import { provider } from '../..';
import { InfuraProvider } from '@ethersproject/providers';

async function queryToadContract(account: string) {
    //if ((ethereum() != undefined || null)) {
    const prov = ethers.getDefaultProvider()
    const p = new ethers.providers.InfuraProvider("homestead", "33719c306ed84d0c824bbe1fee3cd025")
    const contract = new ethers.Contract(cryptoadzAddress, CrypToadz.abi, p)
    const arrayOfToadIds = []
    
    if (await contract.balanceOf('0xb75F87261a1FAC3a86f8A48d55597A622BA3CC48') > 0) {
        const numberOfToadzOwned = await contract.balanceOf('0xb75F87261a1FAC3a86f8A48d55597A622BA3CC48')

        for (let i=0; i<numberOfToadzOwned; i++) {
            let id = await contract.tokenOfOwnerByIndex('0xb75F87261a1FAC3a86f8A48d55597A622BA3CC48', i)
            arrayOfToadIds[i] = id.toNumber()
        }
    }
    return (arrayOfToadIds)
}

export default async function getUserByAddress( req:NextApiRequest, res:NextApiResponse) {
    res.statusCode = 200;

    queryToadContract('0xC385cAee082Bb0E900bCcbBec8bB2Fe650369ECB')
    // .then( async(data) => {
    //     if (data.length > 0) {
    //         pushOwnerToDb(data)
    //         //res.status(200).json({message: 'sajdfh'})
    //     } else {
    //         res.status(404).json({message: 'user odesnt own toadz'})
    //     }
    // })
   
    // async function pushOwnerToDb() {
        const allOwners = await prisma.user.findMany({
            //include: {toadz:true},
            //where: {address: '0xC385cAee082Bb0E900bCcbBec8bB2Fe650369ECB'}
            //grabs all the users that own toadz with this address
        })
        //before continuing, check that the array of toads passed in matches with toads in db
        //res.status(200).json(`${allOwners[0].toadz[0].toadId}`)
        //returns array of objects, each an address that holds n amount of toads

        //selectedOwner won't return anything if acc is not in db (aka new player)
        const selectedOwner = allOwners.filter((data) => (data.address).toString() === req.query.id)
        const newToadIds = JSON.parse(req.body)
        const array = [{}]
 
        for (let i=0; i<newToadIds.length; i++) {
            array[i] = {toadId:newToadIds[i]}
        }

        if (selectedOwner.length > 0) {
            const update = await prisma.user.update({
                where: {address: selectedOwner[0].address},
                data: {
                    toadz: {
                        set: array
                    }
                }
            })    
            res.status(200).json({message:`${selectedOwner[0].address} owns the following toads: ${newToadIds}`})
        } else { 
            const update = await prisma.user.create({
                data: {
                    address: "0xC385cAee082Bb0E900bCcbBec8bB2Fe650369ECB",
                    toadz: { 
                        connect: array
                    }
                }    
            })
            res.status(200).json({message:`new user created and owns the following toads: `})
        }
    //}
}