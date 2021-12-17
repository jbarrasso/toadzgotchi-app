import Toadzgotchi from '../artifacts/contracts/Toadzgotchi.sol/Toadzgotchi.json'
import Head from "next/head"
import Image from "next/image"
import Button from "../components/Button"
import Account from "../components/Account"
import ProgressBar from '../components/ProgressBar'
import { PopupButton } from '@typeform/embed-react'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

const toadzgotchiAddress = '0xdAd0c376B7d7fa7829F2B5Fc9873CCe14f2dF4FD'
export let provider: ethers.providers.Web3Provider;
export let signer: ethers.providers.JsonRpcSigner;
export let account: string;

//Anonymous function expression to return a global object of Ethereum injection.
//provider, signer, address returns undefined unless called inside functions
export const ethereum = () => {
  return (window as any).ethereum
}
export const checkWeb3 = async(setIsWeb3Injected, setIsWalletConnected, setIsLoading, setNetwork) => {
  console.log('Running useEffect checkweb3')
  if (ethereum() == undefined || null) {
    setIsLoading(false)    
    console.log('Web3 is not injected')
    return
  } else {
    setIsWeb3Injected(true)
    console.log('Web3 is injected')
    try {
      const tryProvider = new ethers.providers.Web3Provider(ethereum())
      provider=tryProvider
      const tryNetwork = (await tryProvider.getNetwork()).chainId
      setNetwork(tryNetwork)
      console.log(tryNetwork)
      const trySigner = tryProvider.getSigner()
      signer = trySigner
      const tryAccount = await trySigner.getAddress()
      account = tryAccount
      setIsWalletConnected(true)
      console.log('Wallect is connected')
      // if (network.chainId != 1337) {
      //   alert('Please connect to correct network: Hardhat Node, 1337')
      // }
    } catch (err) {
      setIsLoading(false)
      console.log("Wallet is not connected. Cannot instantiate provider or get signer", err)
    }
  }
}
export const handleChainChanged = async(setNetwork) => {
  console.log('running handleChainChanged')
  if (ethereum() != undefined || null) {
    ethereum().on('chainChanged', (chainId) => {
      console.log(chainId)
      if (chainId == 0x1) {
        setNetwork(1)
      } else if (chainId == 0x4) {
        setNetwork(4)
      } else if (chainId == 0x539) {
        setNetwork(1337)
      } else if (chainId == 0x3) {
        setNetwork(3)
      } else if (chainId == 0x42) {
        setNetwork(42)
      }
      window.location.reload()
    })
  }
}
export const handleAccountsChanged = async(setIsWalletConnected) => {
  console.log('running handleAccountsChanged')
  if (ethereum() != undefined || null) {
    ethereum().on("accountsChanged", (accounts) => {
      //length of accounts is always 1, no matter how many wallets connected to site.
      //if n>2, when disconnecting from n to n-1 accounts, the last connected acc
      //before the nth will be = to accounts[0]
      if (accounts.length > 0){
        account = accounts[0]
        setIsWalletConnected(false) //quick n dirty way to re-render Account when toggling between wallets
        setIsWalletConnected(true)
        console.log('wallet accounts changed')
      } else {
        account = ''
        setIsWalletConnected(false)
        console.log('wallet disconnected')
      }
    });
  }
}
export const requestAccount = async() => {
  await ethereum().request({ method: 'eth_requestAccounts' });
}
export const gethours = async() => {
  const contract = new ethers.Contract(toadzgotchiAddress, Toadzgotchi.abi, signer)
  const data = await contract.gethours()
  console.log(`currentblock ${await provider.getBlockNumber()} hourselapsed${data.toNumber()}`)
  return data
}
export const calcDecay = async(i: number) => {
  if (ethereum() !== undefined || null) {
    const contract = new ethers.Contract(toadzgotchiAddress, Toadzgotchi.abi, signer)
    const data = await contract.readToadStats()
    const currentBlock = await provider.getBlockNumber()
    const hoursElapsed = (((currentBlock - data[i])*15)/60)/60

    const x = await contract.calcDecay(data[i].toNumber(), data[i-1].toNumber())
    console.log(x.toNumber())
    let decayBy = (4 * hoursElapsed)
    let decayedValue
    if (decayBy > data[i-1].toNumber()) {
      decayedValue = 0
    } else {
      decayedValue = data[i-1].toNumber() - decayBy
    }
    console.log(`currentblock: ${currentBlock} hrselapsed: ${hoursElapsed} decayedvalue: ${decayedValue}`)
    return (decayedValue)
  }
}

function Home() {
  const [renderCount, setrenderCount] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isWeb3Injected, setIsWeb3Injected] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [isVibing, setIsVibing] = useState(false)
  const [network, setNetwork] = useState()
  const [toadLevel, setToadLevel] = useState(1)
  const [toadXP, setToadXP] = useState(0)
  const [isDead, setIsDead] = useState(false)
  const [isFed, setIsFed] = useState(() => { return 96 })
  const [isHappy, setIsHappy] = useState(() => { return 96 })
  const [isRested, setIsRested] = useState(() => { return 96 })
  
  useEffect(() => {
    setIsLoading(true)
    checkWeb3(setIsWeb3Injected, setIsWalletConnected, setIsLoading, setNetwork)
    .then(() => {readToadStats()})
    handleAccountsChanged(setIsWalletConnected)
    handleChainChanged(setNetwork)
  }, [])

  //runs no matter what on page hard reload
  useEffect(() => {
    if (network == 4) {
      readToadStats()
    }
  }, [isFed, isHappy, isRested, account])

  async function startVibing() {
    if (network == 4) {
      if (isVibing) {
        return
      } else {
        const contract = new ethers.Contract(toadzgotchiAddress, Toadzgotchi.abi, signer)
        console.log('commence vibing')
        try {
          const transaction = await contract.startVibing()
          await transaction.wait()
          setIsVibing(true)
          setIsDead(false)
          //await readToadStats()
          window.location.reload()
        } catch(err) {
          console.log(err)
        }
      }
    } else {
      console.log(`Error: Network is set to ${network}. Set network to 4 (Rinkeby)`)
    }
  }
  async function readToadStats() {
    console.log('running useEffect readtoadstats') //logs fourth
    if (network == 4) {
      if (ethereum()) {
        try {
          const contract = new ethers.Contract(toadzgotchiAddress, Toadzgotchi.abi, signer)
          const data = await contract.readToadStats()
          const updatedFedValue = await calcDecay(3)
          const updatedHappyValue = await calcDecay(5)
          const updatedSleepValue = await calcDecay(7)
          if ( (updatedFedValue == 0) && (updatedHappyValue==0) && (updatedSleepValue==0) ) {
            setIsDead(true)
          }
          console.log(`${updatedFedValue}`)
          setIsVibing(data[0])
          setIsFed(updatedFedValue)
          setIsHappy(updatedHappyValue)
          setIsRested(updatedSleepValue)
          setToadXP(data[8].toNumber())
          setToadLevel(data[9].toNumber())
          setIsLoading(false)
          console.log(`isVibing: ${data[0]}
          startVibingBlock: ${data[1].toNumber()}
          lastFeedBlock: ${data[3].toNumber()}
          lastPlayBlock: ${data[5].toNumber()}
          lastSleepBlock: ${data[7].toNumber()}
          toadXP: ${data[8].toNumber()}
          toadLevel: ${data[9].toNumber()}
          isDead: ${data[10]}`)
          console.log(`just completed block number: ${await provider.getBlockNumber()}`)
          return (data)
        } catch (err) {
          console.log('Cannot read toad stats', err)
        }
      }
    } else {
      console.log(`Error: Network is set to ${network}. Set network to 4 (Rinkeby)`)
    }
  }
  async function feedToad() {
    if (network == 4) {
      if (isWalletConnected) {
        try {
          const contract = new ethers.Contract(toadzgotchiAddress, Toadzgotchi.abi, signer)
          console.log(`commence feeding. current state isFed value is ${isFed}`)
          const transaction = await contract.feedToad()
          await transaction.wait()
          setIsFed(96)
        } catch(err) {
            console.log(err)
        }
      }
    } else {
      console.log(`Error: Network is set to ${network}. Set network to 4 (Rinkeby)`)
    }
  }
  async function playToad() {
    if (network == 4) {
      if (isWalletConnected) {
        try {
          const contract = new ethers.Contract(toadzgotchiAddress, Toadzgotchi.abi, signer)
          console.log(`commence play. current state isHappy is ${isHappy}`)
          const transaction = await contract.playToad()
          await transaction.wait()
          setIsHappy(96)
        } catch(err) {
            console.log(err)
        }
      }
    } else {
      console.log(`Error: Network is set to ${network}. Set network to 4 (Rinkeby)`)
    }
  }
  async function sleepToad() {
    if (network == 4) {
      if (isWalletConnected) {
        try {
          const contract = new ethers.Contract(toadzgotchiAddress, Toadzgotchi.abi, signer)
          console.log(`commence sleep. current state isRested is ${isRested}`)
          const transaction = await contract.sleepToad()
          await transaction.wait()
          setIsRested(96)
        } catch(err) {
            console.log(err)
        }
      }
    } else {
      console.log(`Error: Network is set to ${network}. Set network to 4 (Rinkeby)`)
    }
  }
  return (
    <div>
      {false ? (<div>Loading{console.log(`isLoading? ${isLoading}`)}</div>) :
      (<div>
        {console.log(`isLoading? ${isLoading}`)}
        <div className='bgWrap'>
          <Image
            alt='Swamp'
            src='/img/ToadzgotchiBG.gif'
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
            <Account
              isWalletConnected={isWalletConnected}
              isWeb3Injected={isWeb3Injected}
              color='white'
              padding='10px'
              borderRadius='10px'
              fontFamily='Pixeled'
            />
            <PopupButton id='pxed2IPk' 
              style={{fontFamily: 'Pixeled', 
              color: '#332020',
              backgroundColor: '#b0a28d',
              border: ' 2px solid #673c37'}}
              className='feedbackButton'
              size={75}
              hideHeaders={true}>
              FEEDBACK
            </PopupButton>

            {/* <button onClick={tryMint}>try mint</button>
            <button onClick={tryFlipMint}>try flip mint</button>
            <button onClick={tryFlipPrivateSale}>try flip private sale</button>
            <button onClick={toadzgotchisOwned}>toadzgotchisOwned</button>
            <button onClick={tryTransfer}>try transfer</button> */}

          </nav>
        </header>

        <main>
          <div className='uiContainer'>
            <img src='/img/ui-box.png'/>
            <div className='uiText'>
              <h1>
                TOADZGOTCHI
              </h1>
              <div id="modal-root"></div>

              {(isVibing && isWalletConnected) &&
              //request rinkeby eth button?
              //FAQ button
              (!isDead ? (<section className='playerActions'>
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
                    width=''
                    padding='0px'
                    border=' 2px solid #673c37'
                    borderRadius='0px'
                    progressValue={isFed}
                    progressMaxValue={96}
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
                    width=''
                    padding='0px'
                    border=' 2px solid #673c37'
                    borderRadius='0px'
                    progressValue={isHappy}
                    progressMaxValue={96}
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
                  width=''
                  padding='0px'
                  border=' 2px solid #673c37'
                  borderRadius='0px'
                  progressValue={isRested}
                  progressMaxValue={96}
                />
                </div>
              </section>) : <h1> TOAD IS DEAD!</h1> )}

              {/* <button onClick={ () => {gethours()} }>get hours</button> */}

              {(!isVibing || !isWalletConnected) &&

              (<Button
                text={ !isWeb3Injected ? ("INSTALL METAMASK") : 
                (!isWalletConnected ? ("CONNECT METAMASK") : ((network == 4) ? ("START VIBIN'") : ('CHANGE NETWORK TO RINKEBY'))) }
                display=''
                flex=''
                color='#332020'
                backgroundColor='#b0a28d'
                margin='10px'
                padding='0px'
                border=' 2px solid #673c37'
                borderRadius='0px'
                onClick={!isWeb3Injected ? 
                  (() => {window.open('https://metamask.io/download','_blank')}) : 
                  (!isWalletConnected ? requestAccount : startVibing)}
              />)}

              {(isVibing && isWalletConnected) &&

              (<div className='toadLevelXP'>
                <p> Lv. {toadLevel} </p>
                <ProgressBar
                  text='XP'
                  display=''
                  flex=''
                  color='#332020'
                  backgroundColor='#b0a28d'
                  margin='10px'
                  width='100%'
                  padding='0px'
                  border=' 2px solid #673c37'
                  borderRadius='0px'
                  progressValue={toadXP}
                  progressMaxValue={100}
                />
              </div>)}
            </div>
          </div>
        </main>
        {console.log('done running html')}
      </div>)}
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
            font-family: Pixeled;
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
            margin-top:3%;
            margin-left:7%;

          }
          img {
            width: 150%;
            height: 225%;
          }
          .uiText {
            position: absolute;
            text-align: center;
            font-size: 1.5vh;
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
            font-size: 1.25vh;
          }
      `}</style>
    </div>
  );
}

export default Home;
