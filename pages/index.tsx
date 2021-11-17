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
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import Toadzgotchi from '../artifacts/contracts/Toadzgotchi.sol/Toadzgotchi.json'

const toadzgotchiAddress = '0x4826533B4897376654Bb4d4AD88B7faFD0C98528'

function Home() {
  const { account, library, active} = useWeb3React();

  const triedToEagerConnect = useEagerConnect();
  
  const isConnected = typeof account === "string" && !!library;
  const updateProgressBar = () => {
    console.log('click')
  }
 
  const [isFed, setIsFed] = useState(() => {
    return 0
  })
  const [isHappy, setIsHappy] = useState(() => {
    return 0
  })
  const [isRested, setIsRested] = useState(() => {
    return 0
  })

  const [feedValue, setFeed] = useState(() => {
    return 5
  })
  const [playValue, setPlay] = useState(() => {
    return 5
  })
  const [sleepValue, setSleep] = useState(() => {
    return 5
  })

  useEffect(() => {
    async function getToadStats() {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(toadzgotchiAddress, Toadzgotchi.abi, signer)
        try {
          const data = await contract.readToadStats()
          setIsFed(data[1].toNumber())
          setIsHappy(data[2].toNumber())
          setIsRested(data[3].toNumber())
          console.log(`current state isFed is ${isFed}`)
          console.log(`current state isHappy is ${isHappy}`)
          console.log(`current state isRested is ${isRested}`)
          return (data)
        } catch (err) {
          console.log("Error: ", err)
        }
      }
    }
    getToadStats()
  }, [isFed, isHappy, isRested])

  function updateIsFed() {
    setIsFed(prevIsFed => prevIsFed + feedValue)
    //isFed updates only when parent function is done running
  }
  function updateIsHappy() {
    setIsHappy(prevIsHappy => prevIsHappy + playValue)
    //isHappy updates only when parent function is done running
  }
  function updateIsRested() {
    setIsRested(prevIsRested => prevIsRested + sleepValue)
    //isRested updates only when parent function is done running
  }

  // request access to the user's MetaMask account
  async function requestAccount() {
    await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function readToadStatsNext() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(toadzgotchiAddress, Toadzgotchi.abi, signer)
      try {
        const data = await contract.readToadStats()
        console.log('data: ', data[0], data[1].toNumber(), data[2].toNumber(), data[3].toNumber())
        return (data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }

  async function readMsgSender() {
    //console.log(window.ethereum)                            
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(toadzgotchiAddress, Toadzgotchi.abi, signer)
      try {
        const data = await contract.returnMsgSender()
        console.log('data: ', data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }

  async function feedToad() {
    if (!feedValue) return
    if (isFed >= 100){
      console.log('Toad is already well fed to 100! Reset to zero')
    } 
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(toadzgotchiAddress, Toadzgotchi.abi, signer)
      console.log(`commence feeding. current state isFed value is ${isFed}, being fed ${feedValue}`)
      const transaction = await contract.feedToad(feedValue)
      await transaction.wait()
      await readToadStatsNext()
      updateIsFed()
    }
  }
  async function playToad() {
    if (!playValue) return
    if (isHappy >= 100){
      console.log('Toad is already happy to 100! Reset to zero')
    } 
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(toadzgotchiAddress, Toadzgotchi.abi, signer)
      console.log(`commence play. current state isHappy is ${isHappy}, being played ${playValue}`)
      const transaction = await contract.playToad(playValue)
      await transaction.wait()
      await readToadStatsNext()
      updateIsHappy()
    }
  }
  async function sleepToad() {
    if (!sleepValue) return
    if (isRested >= 100){
      console.log('Toad is already well rested to 100! Reset to zero')
    } 
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(toadzgotchiAddress, Toadzgotchi.abi, signer)
      console.log(`commence sleep. current state isRested is ${isRested}, being slept ${sleepValue}`)
      const transaction = await contract.sleepToad(sleepValue)
      await transaction.wait()
      await readToadStatsNext()
      updateIsRested()
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
                  progressValue={isFed}
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
                  onClick={playToad}
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
                  progressValue={isHappy}
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
                  onClick={sleepToad}
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
                  progressValue={isRested}
                  progressMaxValue={100}
                />
              </div>
            </section>
            <button onClick={readToadStatsNext}>Read Toad Stats</button>
            {/* <Button
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
            <button onClick={readMsgSender}>Read msg.sender</button> */}

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
