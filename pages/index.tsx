import Toadzgotchi from '../artifacts/contracts/Toadzgotchi.sol/Toadzgotchi.json'
import Head from "next/head"
import Image from "next/image"
import Button from "../components/Button"
import Account from "../components/Account"
import ProgressBar from '../components/ProgressBar'
import Sound from 'react-sound'
import { PopupButton } from '@typeform/embed-react'
import { useState, useEffect, useRef } from 'react'
import { ethers } from 'ethers'

const toadzgotchiAddress = '0xdAd0c376B7d7fa7829F2B5Fc9873CCe14f2dF4FD'
export let provider: ethers.providers.Web3Provider;
export let signer: ethers.providers.JsonRpcSigner;
export let account: string;
export let dynamicBG: string;
export let currentToad: string;
export let songPlaylist = ['/img/a-fly.mp3','/img/no-worries.mp3','/img/city-over-clouds.mp3','/img/big-helmet.mp3','/img/ninja-toad.mp3']

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
      window.location.reload()
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
export const calcDecay = async(stats, i) => {
  if (ethereum() !== undefined || null) {
    const contract = new ethers.Contract(toadzgotchiAddress, Toadzgotchi.abi, signer)
    //const data = await contract.readToadStats()
    const currentBlock = await provider.getBlockNumber()
    const hoursElapsed = (((currentBlock - stats[i])*15)/60)/60
    // const x = await contract.calcDecay(data[i].toNumber(), data[i-1])
    // console.log(x.toNumber())
    let decayBy = (4 * hoursElapsed)
    let decayedValue: number
    if (decayBy > stats[i-1].toNumber()) {
      decayedValue = 0
    } else {
      decayedValue = stats[i-1].toNumber() - decayBy
    }
    console.log(`currentblock: ${currentBlock} hrselapsed: ${hoursElapsed} decayedvalue: ${decayedValue}`)
    return (decayedValue)
  }
}

function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [globalMessage, setGlobalMessage] = useState('')
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isWeb3Injected, setIsWeb3Injected] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [songStatus, setSongStatus] = useState(Sound.status.STOPPED)
  const [currentSong, setCurrentSong] = useState(songPlaylist[0])
  const [isVibing, setIsVibing] = useState(false)
  const [network, setNetwork] = useState()
  const [toadLevel, setToadLevel] = useState(null)
  const levelChange = useRef(0)
  const [toadXP, setToadXP] = useState(0)
  const [isDead, setIsDead] = useState(false)
  const [isFed, setIsFed] = useState(() => { return 96 })
  const [isHappy, setIsHappy] = useState(() => { return 96 })
  const [isRested, setIsRested] = useState(() => { return 96 })

  getTime()
  displayCurrentToad()
  
  useEffect(() => {
    setIsLoading(true)
    checkWeb3(setIsWeb3Injected, setIsWalletConnected, setIsLoading, setNetwork)
    //.then(() => {readToadStats()})
    //set level here
    handleAccountsChanged(setIsWalletConnected)
    handleChainChanged(setNetwork)
  }, [])

  useEffect(() => {
    levelChange.current = levelChange.current + 1
    if (levelChange.current > 2) {
      document.getElementById('levelUpAnimation').classList.add('bgWrap')
      document.getElementById('levelUpAnimation').classList.remove('hidden')
      setTimeout(() => {
        document.getElementById('levelUpAnimation').classList.remove('bgWrap')
        document.getElementById('levelUpAnimation').classList.add('hidden')
      }, 4000);
    }
  }, [toadLevel])

  //runs no matter what on page hard reload
  useEffect(() => {
    if (network == 4) {
      readToadStats()
      .then(async(stats) => {
        setIsVibing(stats[0])
        setToadXP(stats[8].toNumber())
        setToadLevel(stats[9].toNumber())
        setIsLoading(false)
        setIsFed(await calcDecay(stats, 3))
        setIsHappy(await calcDecay(stats, 5))
        setIsRested(await calcDecay(stats, 7))
      })
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
          setGlobalMessage('')
          document.getElementById('animated').classList.remove('globalMessage')
          setTimeout(() => {
            setGlobalMessage("Oops! Toad can't vibe right now")
            document.getElementById('animated').classList.add('globalMessage')
          }, 100);
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
          const stats = await contract.readToadStats()
          // console.log(`isVibing: ${data[0]}
          // startVibingBlock: ${data[1].toNumber()}
          // lastFeedBlock: ${data[3].toNumber()}
          // lastPlayBlock: ${data[5].toNumber()}
          // lastSleepBlock: ${data[7].toNumber()}
          // toadXP: ${data[8].toNumber()}
          // toadLevel: ${data[9].toNumber()}
          // isDead: ${data[10]}`)
          console.log(`just completed block number: ${await provider.getBlockNumber()}`)
          return (stats)
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
          //if contract call succeeds, clear current message
          setGlobalMessage('')
          //and remove the class that adds the typewriter effect
          document.getElementById('typewriterText').classList.remove('globalMessage')
          //add the class that superimposes animation on scene
          document.getElementById('feedAnimation').classList.add('bgWrap')
          //remove the class that hides the animation
          document.getElementById('feedAnimation').classList.remove('hidden')
          //wait for the transaction to finish, then hide the animation
          await transaction.wait().then(() => {
            document.getElementById('feedAnimation').classList.add('hidden')
            document.getElementById('feedAnimation').classList.remove('bgWrap')
          })
          setIsFed(96)
        } catch(err) {
            console.log(err)
            //if contract call fails, clear the current message (from possible previous error)
            setGlobalMessage('')
            document.getElementById('typewriterText').classList.remove('globalMessage')
            setTimeout(() => {
              try {
                //and after .1s, add the new message and keep it on screen
                setGlobalMessage(`Hmmm.. It seems that ${err.error.message.slice(20)}...`)
                document.getElementById('typewriterText').classList.add('globalMessage')
              } catch {
                return
              }
            }, 100);
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
          setGlobalMessage('')
          document.getElementById('typewriterText').classList.remove('globalMessage')
          document.getElementById('playAnimation').classList.add('bgWrap')
          document.getElementById('playAnimation').classList.remove('hidden')
          await transaction.wait().then(() => {
            document.getElementById('playAnimation').classList.add('hidden')
            document.getElementById('playAnimation').classList.remove('bgWrap')
          })
          setIsHappy(96)
        } catch(err) {
            console.log(err)
            setGlobalMessage('')
            document.getElementById('typewriterText').classList.remove('globalMessage')
            setTimeout(() => {
              try {
                setGlobalMessage(`Hmmm.. It seems that ${err.error.message.slice(20)}...`)
                document.getElementById('typewriterText').classList.add('globalMessage')
              } catch {
                return
              }
            }, 100);
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
          setGlobalMessage('')
          document.getElementById('typewriterText').classList.remove('globalMessage')
          document.getElementById('sleepAnimation').classList.add('bgWrap')
          document.getElementById('sleepAnimation').classList.remove('hidden')
          await transaction.wait().then(() => {
            document.getElementById('sleepAnimation').classList.add('hidden')
            document.getElementById('sleepAnimation').classList.remove('bgWrap')
          })
          setIsRested(96)
        } catch(err) {
            console.log(err)
            setGlobalMessage('')
            document.getElementById('typewriterText').classList.remove('globalMessage')
            setTimeout(() => {
              try {
                setGlobalMessage(`Hmmm.. It seems that ${err.error.message.slice(20)}...`)
                document.getElementById('typewriterText').classList.add('globalMessage')
              } catch {
                return
              }
            }, 100);
        }
      }
    } else {
      console.log(`Error: Network is set to ${network}. Set network to 4 (Rinkeby)`)
    }
  }
  function getTime() {
    if ((new Date().getHours() > 18) || (new Date().getHours() < 6)) {
      dynamicBG = '/img/nightswamp.gif'
    } else {
      dynamicBG = '/img/swamp.gif'
    }
  }
  function displayCurrentToad() {
    if (toadLevel < 3) {
      currentToad = '/img/yellow.png'
    } else if (toadLevel >= 3 && toadLevel <= 4) {
      currentToad = '/img/doge.png'
    } else if (toadLevel >= 5 && toadLevel <= 6) {
      currentToad = '/img/nounish.png'
    } else if (toadLevel >= 7 && toadLevel <= 8) {
      currentToad = '/img/robo.png'
    } else if (toadLevel >= 9 && toadLevel <= 11) {
      currentToad = '/img/alien.png'
    } else if (toadLevel >= 12 && toadLevel <= 15) {
      currentToad = '/img/bones.png'
    } else if (toadLevel >= 16 && toadLevel <= 19) {
      currentToad = '/img/denza.png'
    } else if (toadLevel >= 20 && toadLevel <= 24) {
      currentToad = '/img/ghost.png'
    } else if (toadLevel >= 25) {
      currentToad = '/img/hoodie.png'
    }
  }
  function togglePlaySong(setSongStatus) {
    if (songStatus == 'PLAYING') {
      setSongStatus(Sound.status.STOPPED)
    } else {
      setSongStatus(Sound.status.PLAYING)
    }
  }
  async function skipSong(setCurrentSong) {
    if (songStatus == 'PLAYING') {
      console.log(currentSong)
      for (let i=0; i<songPlaylist.length; i++) {
        if (currentSong == songPlaylist[i]) {
          if (i == (songPlaylist.length-1)) {
            setCurrentSong(songPlaylist[0])
            return
          } else {
            setCurrentSong(songPlaylist[i+1])
            return
          }
        }
      }
    }
  }
  return (
    <div>
      {false ? (<div>Loading</div>) :
      (<div>
        {/* {console.log(`isLoading? ${isLoading}`)} */}
        <div className='bgWrap'>
          <Image
            alt='Swamp'
            src={dynamicBG}
            layout='fill'
            objectFit='fill'
            quality={100}
          />
          <Sound
            url={currentSong}
            playStatus={songStatus}
            loop={true}
          />
        </div>
        <div id='yellow' className='bgWrap'>
          <Image
            alt='Swamp'
            src={currentToad}
            layout='fill'
            objectFit='fill'
            quality={100}
          />
        </div>
        <div id='feedAnimation' className='hidden'>
          <Image
            alt='Swamp'
            src='/img/feed.gif'
            layout='fill'
            objectFit='fill'
            quality={100}
          />
        </div>
        <div id='playAnimation' className='hidden'>
          <Image
            alt='Swamp'
            src='/img/feed.gif'
            layout='fill'
            objectFit='fill'
            quality={100}
          />
        </div>
        <div id='sleepAnimation' className='hidden'>
          <Image
            alt='Swamp'
            src='/img/sleep.gif'
            layout='fill'
            objectFit='fill'
            quality={100}
          />
        </div>
        <div id='levelUpAnimation' className='hidden'>
          <Image
            alt='Swamp'
            src='/img/level-up.gif'
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
            {/* <Modal
              show={showModal}
              ownsToadzgotchis={ownsToadzgotchis}
              imageURL={imageURL}
              onClose={ () => { setShowModal(false) } }>
                Hello!
            </Modal> */}
            <Button
              text='🎵'
              display=''
              flex='flex'
              color='#332020'
              backgroundColor='#b0a28d'
              margin='0px'
              padding='0px'
              border=' 2px solid #673c37'
              borderRadius='0px'
              cursor= 'pointer'
              onClick={() => togglePlaySong(setSongStatus)}
            />
            <Button
              text='Skip'
              display=''
              flex='flex'
              color='#332020'
              backgroundColor='#b0a28d'
              margin='0px'
              padding='0px'
              border=' 2px solid #673c37'
              borderRadius='0px'
              cursor= 'pointer'
              onClick={ () => skipSong(setCurrentSong).then(() => {
                  if (songStatus == 'PLAYING') {
                    setSongStatus(Sound.status.PLAYING)
                  }
                }
              )}
            />
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
              border: ' 2px solid #673c37',
              cursor: 'pointer'}}
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
                    cursor='pointer'
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
                    cursor='pointer'
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
                    cursor='pointer'
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
                cursor= 'pointer'
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

          {/* <button onClick={getTime()}>play song</button>
          <button onClick={getTime()}>skip song</button> */}

          <div className='globalMessageContainer'>
            <img className='globalMessagesImg' src='/img/global-messages.png'></img>
            <p id='typewriterText'>{globalMessage}</p>
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
          .hidden {
            position: fixed;
            height: 100vh;
            width: 100vw;
            overflow: hidden;
            z-index: -2;
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
          .fill{
            position: relative;
            margin-top:50px;
            margin-left:70px;
          }
          .globalMessage {
            overflow: hidden;
            // border-right: .15em solid orange;
            white-space: nowrap;
            margin: 0 auto;
            letter-spacing: .15em;
            display: inline-block;
            animation:
            typing 2s steps(40, end) forwards;
            position: absolute;
            width:100%;
            margin-top:50px;
            margin-left:120px;
          }
          @keyframes typing {
            from { width: 0% }
            to { width: 120% } 
          }
          .globalMessagesImg {
            height:100%;
            position: absolute;
          }
          .globalMessageContainer {
            position: relative;
            margin-top: 150px;
            height:150px;
            width:65%;
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
