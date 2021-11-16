//import { formatEther } from "@ethersproject/units";
//import { parseBalance } from "../util";
//import ETHBalance from "../components/ETHBalance";
//import useETHBalance from "../hooks/useETHBalance";

import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Image from "next/image";
import Button from "../components/Button";
import Account from "../components/Account";
import useEagerConnect from "../hooks/useEagerConnect";
import ProgressBar from "../components/ProgressBar";
import { useState } from 'react'
import { ethers } from 'ethers'
import Toadzgotchi from '../artifacts/contracts/Toadzgotchi.sol/Toadzgotchi.json'

const toadzgotchiAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'

function Home() {
  const { account, library, active} = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;
  const updateProgressBar = () => {
    console.log('click')
  }

  const [hunger, setHunger] = useState(() => {
    return 50
  })
  const [mood, setMood] = useState(() => {
    return 50
  })
  const [rest, setRest] = useState(() => {
    return 50
  })

  //isConnected = true;
  //console.log(library.blockNumber)
  // store greeting in local state
  const [food, setFood] = useState(() => {
    return 50
  })

  function updateHunger() {
    setHunger(food)
  }

  // request access to the user's MetaMask account
  async function requestAccount() {
    await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
  }

  // call the smart contract, read the current greeting value
  async function readToadStats() {
    console.log(window.ethereum)
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(toadzgotchiAddress, Toadzgotchi.abi, signer)
      try {
        const data = await contract.readToadStats()
        console.log('data: ', data[0], data[1].toNumber(), data[2].toNumber(), data[3].toNumber())
      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }

  async function readMsgSender() {
    console.log(window.ethereum)                            
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      console.log(provider)
      console.log(signer)
      const contract = new ethers.Contract(toadzgotchiAddress, Toadzgotchi.abi, signer)
      try {
        const data = await contract.returnMsgSender()
        console.log('data: ', data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }

  // call the smart contract, send an update
  async function feedToad() {
    if (!food) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(toadzgotchiAddress, Toadzgotchi.abi, signer)
      const transaction = await contract.feedToad(food)
      await transaction.wait()
      await readToadStats()
    }
  }

  return (
    <div>
      <div className='bgWrap'>
        <Image
          alt='Swamp'
          src='/img/ToadzBG-Sample2.png'
          layout='fill'
          objectFit='fill'
          quality={100}
        />
      </div>

      <Head>
        <title>Toadzgotchi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav>
          {/* {isConnected && (
            <ETHBalance
              margin='0px'
              padding='10px'
            />
          )} */}
          <Account
            triedToEagerConnect={triedToEagerConnect}
            color='white'
            padding='10px'
            borderRadius='10px'
            fontFamily='Pixeled'
          />
        </nav>
      </header>

      <main>
        <div className='uiContainer'>
          <img src='/img/ToadzBG-Sample2.png'/>
          <div className='uiText'>
            <h1>
              TOADZGOTCHI
            </h1>
            <section className='playerActions'>
              <div className='feedDiv'>
                <Button
                  text='FEED'
                  display=''
                  flex=''
                  color='#332020'
                  backgroundColor='#b0a28d'
                  margin='10px'
                  padding='0px'
                  border=' 2px solid #673c37'
                  borderRadius='0px'
                  onClick={feedToad}
                />
                <ProgressBar
                  text='HUNGER'
                  display=''
                  flex=''
                  color='#332020'
                  backgroundColor='#b0a28d'
                  margin='10px'
                  padding='0px'
                  border=' 2px solid #673c37'
                  borderRadius='0px'
                  progressValue={hunger}
                  progressMaxValue={100}
                />
              </div>
              <div className='playDiv'>
                <Button
                  text='PLAY'
                  display=''
                  flex=''
                  color='#332020' 
                  backgroundColor='#b0a28d'
                  margin='10px'
                  padding='0px'
                  border=' 2px solid #673c37'
                  borderRadius='0px'
                  onClick={updateProgressBar}
                />
                <ProgressBar
                  text='MOOD'
                  display=''
                  flex=''
                  color='#332020'
                  backgroundColor='#b0a28d'
                  margin='10px'
                  padding='0px'
                  border=' 2px solid #673c37'
                  borderRadius='0px'
                  progressValue={mood}
                  progressMaxValue={100}
                />
              </div>
              <div className='sleepDiv'>
              <Button
                  text='SLEEP'
                  display=''
                  flex=''
                  color='#332020'
                  backgroundColor='#b0a28d'
                  margin='10px'
                  padding='0px'
                  border=' 2px solid #673c37'
                  borderRadius='0px'
                  onClick={updateProgressBar}
                />
              <ProgressBar
                  text='REST'
                  display=''
                  flex=''
                  color='#332020'
                  backgroundColor='#b0a28d'
                  margin='10px'
                  padding='0px'
                  border=' 2px solid #673c37'
                  borderRadius='0px'
                  progressValue={rest}
                  progressMaxValue={100}
                />
              </div>
            </section>
            <button onClick={readToadStats}>Read Toad Stats</button>
            <Button
                  text='Start Game'
                  display=''
                  flex=''
                  color='#332020'
                  backgroundColor='#b0a28d'
                  margin='10px'
                  padding='0px'
                  border=' 2px solid #673c37'
                  borderRadius='0px'
                  onClick={updateProgressBar}
                />
            <button onClick={feedToad}>Feed Toad</button>
            <button onClick={readMsgSender}>Read msg.sender</button>

          </div>
        </div>
      </main>

      <style jsx>{`
        header {
          font-family: Pixeled;
          text-align: center;
        }

        .bgWrap {
          position: fixed;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          z-index: -1;
        }

        main {
          font-family: Pixeled;

        }

        nav {
          height:5%;
          display: flex;
          justify-content: flex-end;
          padding: 10px;
        }
        
        .uiContainer{
          display: flex;
          align-content:center;
          justify-content:center;
          align-items:center;
          height:30vh;
          width:30vw;
          margin-left:10%;

        }
        img {
          width: 100%;
          height: 100%;
        }
        .uiText {
          position: absolute;
          text-align: center;
          font-size: 2vh;
        }
        
        .feedSection {
          display:inline-block;
        }
        .playSection {
          display:inline-block;
        }
        .sleepSection {
          display:inline-block;
        }

        section {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
          font-size: 1.5vh;
        }
      `}</style>
    </div>
  );
}

export default Home;
