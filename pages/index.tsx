import Toadzgotchi from '../artifacts/contracts/Toadzgotchi.sol/Toadzgotchi.json'
import Head from "next/head";
import Image from "next/image";
import Button from "../components/Button";
import Account from "../components/Account";
import ProgressBar from "../components/ProgressBar";
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

const toadzgotchiAddress = '0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82'
export let provider: ethers.providers.Web3Provider;
export let signer: ethers.providers.JsonRpcSigner;
export let address: string;

//Anonymous function expression to return a global object of Ethereum injection.
//provider, signer, address returns undefined unless called inside functions
export const ethereum = () => {
  return (window as any).ethereum
}
export const checkWeb3 = async(setIsWeb3Injected, setIsWalletConnected, setIsLoading) => {
  if (ethereum() == undefined || null) {
    setIsLoading(false)    
    console.log('Web3 is not injected')
    return
  } else {
    setIsWeb3Injected(true) //re-renders page
    console.log('Web3 is injected') //logs third
    try {
      const tryProvider = new ethers.providers.Web3Provider(ethereum())
      provider=tryProvider
      const trySigner = tryProvider.getSigner()
      signer = trySigner
      const tryAddress = await trySigner.getAddress()
      address = tryAddress
      setIsWalletConnected(true) //re-renders page
      console.log('Wallect is connected') //logs seventh
    } catch (err) {
      setIsLoading(false)
      console.log("Wallet is not connected. Cannot instantiate provider or get signer", err)
    }
  }
}
export const handleAccountsChanged = async(setIsWalletConnected) => {
  if (ethereum()) {
    ethereum().on("accountsChanged", (accounts) => {
      //length of accounts is always 1, no matter how many wallets connected to site.
      //if n>2, when disconnecting from n to n-1 accounts, the last connected acc
      //before the nth will be = to accounts[0]
      if (accounts.length > 0){
        address = accounts[0]
        //setIsWalletConnected(false) quick n dirty way to re-render Account when toggling between wallets
        setIsWalletConnected(true)
      } else {
        setIsWalletConnected(false)
      }
      window.location.reload()
    });
  }
}
export const requestAccount = async() => {
  await ethereum().request({ method: 'eth_requestAccounts' });
}

// This works but returns <promise> regardless if called outside or inside Home
// const ethereum = async() => {
//   const provider = new ethers.providers.Web3Provider(await (window as any).ethereum)
//   return provider
// }

function Home() {
  const [renderCount, setrenderCount] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isWeb3Injected, setIsWeb3Injected] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    console.log('Running useEffect checkweb3') //logs second
    checkWeb3(setIsWeb3Injected, setIsWalletConnected, setIsLoading)
    handleAccountsChanged(setIsWalletConnected)
  }, [])

  const [isVibing, setIsVibing] = useState(false)
  const [isFed, setIsFed] = useState(() => { return 0 })
  const [isHappy, setIsHappy] = useState(() => { return 0 })
  const [isRested, setIsRested] = useState(() => { return 0 })
  const [feedValue, setFeed] = useState(() => { return 25 })
  const [playValue, setPlay] = useState(() => { return 25 })
  const [sleepValue, setSleep] = useState(() => { return 25 })

  useEffect(() => {
    async function readToadStats() {
      if (ethereum()) {
        console.log('running useEffect readtoadstats') //logs fourth
        const contract = new ethers.Contract(toadzgotchiAddress, Toadzgotchi.abi, signer)
        try {
          const data = await contract.readToadStats()
          setIsVibing(data[0])
          setIsFed(data[1].toNumber())
          setIsHappy(data[2].toNumber())
          setIsRested(data[3].toNumber())
          setIsLoading(false)
          console.log(`is toad vibing?: ${data[0]}
            current state isFed: ${isFed},
            isHappy: ${isHappy},
            isRested: ${isRested}`)
          return (data)
        } catch (err) {
          console.log('Cannot read toad stats', err)
        }
      }
    }
    readToadStats()
  }, [isFed, isHappy, isRested, address])

  function updateIsFed() {
    setIsFed(prevIsFed => prevIsFed + feedValue)
    //isFed updates only when top parent function is done running
  }
  function updateIsHappy() {
    setIsHappy(prevIsHappy => prevIsHappy + playValue)
    //isHappy updates only when top parent function is done running
  }
  function updateIsRested() {
    setIsRested(prevIsRested => prevIsRested + sleepValue)
    //isRested updates only when top parent function is done running
  } 

  async function readToadStats() {
    if (ethereum()) {
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
  // async function readMsgSender() {
  //   //console.log(window.ethereum)                            
  //   if (ethereum()) {
  //     const contract = new ethers.Contract(toadzgotchiAddress, Toadzgotchi.abi, signer)
  //     try {
  //       const data = await contract.returnMsgSender()
  //       console.log('data: ', data)
  //     } catch (err) {
  //       console.log("Error: ", err)
  //     }
  //   }    
  // }
  async function startVibing() {
    if (isVibing) {
      return
    } else {
      const contract = new ethers.Contract(toadzgotchiAddress, Toadzgotchi.abi, signer)
      console.log('commence vibing')
      try {
        const transaction = await contract.startVibing()
        await transaction.wait()
        setIsVibing(true)
      } catch(err) {
        console.log(err)
      }
    }
  }
  async function feedToad() {
    if (!feedValue) return
    if (isWalletConnected) {
      const contract = new ethers.Contract(toadzgotchiAddress, Toadzgotchi.abi, signer)
      console.log(`commence feeding. current state isFed value is ${isFed}, being fed ${feedValue}`)
      const transaction = await contract.feedToad(feedValue)
      await transaction.wait()
      await readToadStats()
      updateIsFed()
    }
  }
  async function playToad() {
    if (!playValue) return
    if (isWalletConnected) {
      const contract = new ethers.Contract(toadzgotchiAddress, Toadzgotchi.abi, signer)
      console.log(`commence play. current state isHappy is ${isHappy}, being played ${playValue}`)
      const transaction = await contract.playToad(playValue)
      await transaction.wait()
      await readToadStats()
      updateIsHappy()
    }
  }
  async function sleepToad() {
    if (!sleepValue) return
    if (isWalletConnected) {
      const contract = new ethers.Contract(toadzgotchiAddress, Toadzgotchi.abi, signer)
      console.log(`commence sleep. current state isRested is ${isRested}, being slept ${sleepValue}`)
      const transaction = await contract.sleepToad(sleepValue)
      await transaction.wait()
      await readToadStats()
      updateIsRested()
    }
  }

  return (
    <div>
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
      {/* logs first, then fifth & sixth*/}
      {isLoading ? (<div>Loading{console.log(isLoading)}</div>) :
      (<div>
        {console.log(isLoading)}
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
            {/* add fider feedback button */}
            <Account
              isWalletConnected={isWalletConnected}
              isWeb3Injected={isWeb3Injected}
              color='white'
              padding='10px'
              borderRadius='10px'
              fontFamily='Pixeled'
            />
          </nav>
        </header>

        <main>
          <div className='uiContainer'>
            <img src='/img/ui-box.png'/>
            <div className='uiText'>
              <h1>
                TOADZGOTCHI
              </h1>
              {isVibing &&
              (<section className='playerActions'>
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
              </section>)}
              {/* <button onClick={readToadStats}>Read Toad Stats</button> */}
              {!isVibing && (
              <Button
                    text="START VIBIN'"
                    display=''
                    flex=''
                    color='#332020'
                    backgroundColor='#b0a28d'
                    margin='10px'
                    padding='0px'
                    border=' 2px solid #673c37'
                    borderRadius='0px'
                    onClick={startVibing}
                  />)}
            </div>
          </div>
        </main>
        {console.log('done running html')}
      </div>)}
    </div>
  );
}

export default Home;
