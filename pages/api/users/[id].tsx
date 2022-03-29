import { prisma } from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next';
import { userInfo } from 'os';
import { account } from '../..';
import { ethers } from 'ethers';
import { ethereum } from '../..';
import { cryptoadzAddress } from '../..';
import CrypToadz from '../../../artifacts/contracts/CrypToadz.sol/CrypToadz.json'
import { signer } from '../..';

// async function callme() {
//     if ((ethereum() != undefined || null)) {

//     const contract = new ethers.Contract(cryptoadzAddress, CrypToadz.abi, signer)
    
//     if (await contract.balanceOf(account) > 0) {
//         const numberOfToadzOwned = await contract.balanceOf(account)
//         const arrayOfToadIds = []

//         for (let i=0; i<numberOfToadzOwned; i++) {
//         let id = await contract.tokenOfOwnerByIndex(account, i)

//         arrayOfToadIds[i] = id.toNumber()
//         }

//     } else {
//     }
//     }
// }

export default async function getUserByAddress( req:NextApiRequest, res:NextApiResponse) {
    res.statusCode = 200;

    //await callme().then(() =>{ res.status(200).json({message: 'asdf'})})
   
    const allOwners = await prisma.user.findMany({
        include: {toadz:true},
        where: {address: '0xC385cAee082Bb0E900bCcbBec8bB2Fe650369ECB'}
        //grabs all the users that own toadz with this address
    })
    //before continuing, check that the array of toads passed in matches with toads in db
    //res.status(200).json(`${allOwners[0].toadz[0].toadId}`)
    //returns array of objects, each an address that holds n amount of toads

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
        
        res.status(200).json({message:`${selectedOwner[0].toadz[0].userId} owns the following toads: `})
    } else {
        res.status(404).json(`${selectedOwner[0].toadz[0].userId} does not own any toads`)
    }
}