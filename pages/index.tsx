import Toadzgotchi from '../artifacts/contracts/Toadzgotchi.sol/Toadzgotchi.json'
import ToadzgotchiNFT from '../artifacts/contracts/ToadzgotchiNFT.sol/ToadzgotchiNFT.json'
import Head from "next/head"
import Image from "next/image"
import Button from "../components/Button"
import Account from "../components/Account"
import Sound from "react-sound"
import MyToadz from "../components/MyToadz"
import ProgressBar from '../components/ProgressBar'
import { PopupButton } from '@typeform/embed-react'
import { useState, useEffect, useRef } from 'react'
import { ethers } from 'ethers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FoodMenu from '../components/FoodMenu'
import RestMenu from '../components/RestMenu'
import PlayMenu from '../components/PlayMenu'
import Leaderboard from '../components/Leaderboard'

const ipfsURL = 'https://ipfs.io/ipfs/'
const cryptoadzMetadataID = 'QmWEFSMku6yGLQ9TQr66HjSd9kay8ZDYKbBEfjNi4pLtrr/'
const toadzgotchiAddress = '0x624754b1cDD431b6b92acf5bA5D9539DBE9b3707'
const toadzgotchiNFTAddress = '0x5f5Cc7BC9BFe1e6319BDE9E30d883ECE36D00cAd'
export let provider: ethers.providers.Web3Provider;
export let signer: ethers.providers.JsonRpcSigner;
export let account: string;
export let dynamicBG: string;
export let currentToad: string;
export let songPlaylist = ['/img/a-fly.mp3','/img/no-worries.mp3','/img/city-over-clouds.mp3','/img/big-helmet.mp3','/img/ninja-toad.mp3']
export let welcomeMessages = ['We kept the log warm for you.',
                              'Welcome back to the swamp!',
                              'Sit a while and relax...',
                              'Toad is happy to see you again...',
                              'A cool breeze rolls in...',
                              'For miles nothing can be heard but ribbits...',
                              '*Croak* ... *Ribbit*...']
export let feedingMessages = ['You fed Toad a hot dog! Mmmm Toad loves hot dogs...',
                              'You fed Toad a carrot! Nice...',
                              'You fed Toad some candy! Toad is now hyper',
                              'You fed Toad some flies... Toads favorite!',
                              'You fed Toad a steak... it was cooked to perfection..']


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
      const trySigner = tryProvider.getSigner()
      signer = trySigner
      const tryAccount = await trySigner.getAddress()
      account = tryAccount
      setIsWalletConnected(true)
      console.log('Wallect is connected')
    } catch (err) {
      setIsLoading(false)
      console.log("Wallet is not connected. Cannot instantiate provider or get signer", err)
    }
  }
}
export const handleAccountsChanged = async(setIsWalletConnected, checkOwnsToadzgotchis, setOwnsToadzgotchis, setShowMyToadz) => {
  console.log('running handleAccountsChanged')
  if (ethereum() != undefined || null) {
    ethereum().on("accountsChanged", (accounts) => {
      //length of accounts is always 1, no matter how many wallets connected to site.
      //if n>2, when disconnecting from n to n-1 accounts, the last connected acc
      //before the nth will be = to accounts[0]
      checkOwnsToadzgotchis(setOwnsToadzgotchis)
      setShowMyToadz(false)
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
    const currentBlock = await provider.getBlockNumber()
    const hoursElapsed = (((currentBlock - stats[i])*15)/60)/60
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
export async function checkOwnsToadzgotchis(setOwnsToadzgotchis, setStats) {
  console.log('Running useEffect checkOwnsToadzgotchis')
  if (ethereum() != undefined || null) {
    try {
      const contract = new ethers.Contract(toadzgotchiAddress, Toadzgotchi.abi, signer)
      if (await contract.ownsToadzgotchis()) {
        setOwnsToadzgotchis(true)
        const data = await contract.toadzgotchiIdsOwned()
        const cryptoadzMetadataURL = []
        const toadzImagesURL = []
        for (let i=0; i<data.length; i++) {
          cryptoadzMetadataURL[i] = ipfsURL + cryptoadzMetadataID + data[i].toString() //this goes away
          fetch(cryptoadzMetadataURL[i]) //https link of mapped IDs to ipfs hashes
          .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
          .then((imageID) => {toadzImagesURL[i] = ipfsURL + imageID.image.substring(7)})
          //.then((imageID => {toadzImagesURL[i] = ipfsURL + imageID.(data[i].toString())})
        }
        setStats(toadzImagesURL)
      } else {
        setOwnsToadzgotchis(false)
      }
    } catch(err) {
      console.log(err)
    }
  }
}
export async function getToadzStats(ownsToadzgotchis) {
  console.log('running getToadzMetadata')
  if (ethereum()) {
    if (ownsToadzgotchis) {
      console.log(`inside getToadzMetadata: owns toadszgotchis? ${ownsToadzgotchis}`)
      try {
        const contract = new ethers.Contract(toadzgotchiAddress, Toadzgotchi.abi, signer)
        //setStats(toadzImages)
        // setIsVibing(data[0])
        // setIsFed(await calcDecay(3))
        // setIsHappy(await calcDecay(5))
        // setIsRested(await calcDecay(7))
        // setToadXP(data[8].toNumber())
        // setToadLevel(data[9].toNumber())
        // setIsLoading(false)
        // console.log(`isVibing: ${data[0]}
        // startVibingBlock: ${data[1].toNumber()}
        // isFed: ${data[2].toNumber()}
        // lastFeedBlock: ${data[3].toNumber()}
        // isHappy: ${data[4].toNumber()}
        // lastPlayBlock: ${data[5].toNumber()}
        // isRested: ${data[6].toNumber()}
        // lastSleepBlock: ${data[7].toNumber()}
        // toadXP: ${data[8].toNumber()}
        // toadLevel: ${data[9].toNumber()}
        // isDead: ${data[10]}`)
        // console.log(`just completed block number: ${await provider.getBlockNumber()}`)
        //return(toadzImages)
      } catch (err) {
        console.log('Cannot read toad stats', err)
      }
    } else {
      return []
    }
  }
}

function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [globalMessage, setGlobalMessage] = useState('')
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isWeb3Injected, setIsWeb3Injected] = useState(false)
  const [showMyToadz, setShowMyToadz] = useState(false);
  const [showFood, setShowFood] = useState(false);
  const [showRest, setShowRest] = useState(false);
  const [showPlay, setShowPlay] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [songStatus, setSongStatus] = useState(Sound.status.STOPPED)
  const [currentSong, setCurrentSong] = useState(songPlaylist[0])
  const [imageURL, setImageURL] = useState([])
  const [ownsToadzgotchis, setOwnsToadzgotchis] = useState(false)
  const [isVibing, setIsVibing] = useState(false)
  const [network, setNetwork] = useState()
  const [toadLevel, setToadLevel] = useState(1)
  const levelChange = useRef(0)
  const [toadXP, setToadXP] = useState(0)
  const [isFed, setIsFed] = useState(() => { return 96 })
  const [isHappy, setIsHappy] = useState(() => { return 96 })
  const [isRested, setIsRested] = useState(() => { return 96 })
  const [isDead, setIsDead] = useState(false)
  const [selectedToad, setSelectedToad] = useState('/img/1-smoke.gif')

  getTime()

  useEffect(() => {
    setIsLoading(true)
    checkWeb3(setIsWeb3Injected, setIsWalletConnected, setIsLoading, setNetwork)
    .then(() => {checkOwnsToadzgotchis(setOwnsToadzgotchis, setImageURL)})
    handleAccountsChanged(setIsWalletConnected, checkOwnsToadzgotchis, setOwnsToadzgotchis, setShowMyToadz)
    handleChainChanged(setNetwork)
    setTimeout(() => {
      let rand = Math.floor(Math.random() * welcomeMessages.length);
      setGlobalMessage(welcomeMessages[rand])
      document.getElementById('globalMessageContainer').classList.remove('hidden')
      document.getElementById('typewriterText').classList.remove('hidden')
      document.getElementById('typewriterText').classList.add('typewriterEffect')
    }, 1000);
  }, [])

  //runs no matter what on page hard reload
  useEffect(() => {
    console.log('one of 4 variables changed, running useeffect')
    checkOwnsToadzgotchis(setOwnsToadzgotchis, setImageURL)
  }, [isFed, isHappy, isRested, account])

  async function startVibing() {
    if (network == 1) {
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
          window.location.reload()
        } catch(err) {
          console.log(err)
          setGlobalMessage('')
          document.getElementById('typewriterText').classList.remove('globalMessage')
          setTimeout(() => {
            setGlobalMessage("Oops! Toad can't vibe right now")
            document.getElementById('typewriterText').classList.add('globalMessage')
          }, 100);
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
    if ((new Date().getHours() >= 18) || (new Date().getHours() < 6)) {
      dynamicBG = '/img/nightswamp.gif'
    } else {
      dynamicBG = '/img/swamp.gif'
    }
  }
  async function tryMint() {
    if (isWalletConnected) {
      const contract = new ethers.Contract(toadzgotchiNFTAddress, ToadzgotchiNFT.abi, signer)
      const transaction = await contract.tryMint([1,2,3,4,5,6,7], { value: ethers.utils.parseEther("0.035") })
      //await transaction.wait()
    } 
  }
  async function tryFlipMint() {
    if (isWalletConnected) {
      const contract = new ethers.Contract(toadzgotchiNFTAddress, ToadzgotchiNFT.abi, signer)
      const transaction = await contract.flipMintState()
      await transaction.wait()
    } 
  }
  async function tryFlipPrivateSale() {
    if (isWalletConnected) {
      const contract = new ethers.Contract(toadzgotchiNFTAddress, ToadzgotchiNFT.abi, signer)
      const transaction = await contract.flipPrivateSale()
      await transaction.wait()
    } 
  }
  async function toadzgotchisOwned() {
    if (isWalletConnected) {
      const contract = new ethers.Contract(toadzgotchiNFTAddress, ToadzgotchiNFT.abi, signer)
      const owned = await contract.toadzgotchisOwned(account)
      //const transactions = await contract.balanceOf('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
      //const acc = await contract.ownerOf(4368)
      console.log(owned)
    } 
  }
  async function tryTransfer() {
    if (isWalletConnected) {
      const contract = new ethers.Contract(toadzgotchiNFTAddress, ToadzgotchiNFT.abi, signer)
      const transaction = await contract["safeTransferFrom(address,address,uint256)"]('0x70997970C51812dc3A010C7d01b50e0d17dc79C8','0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', 3)
      await transaction.wait()
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
  function displayCurrentToad() {
  }
  function closeAllOtherMenus(onlyShowMe) {
    const allMenus = [setShowFood, setShowRest, setShowLeaderboard, setShowPlay]
    for (let i=0; i<allMenus.length; i++) {
      if (allMenus[i] == onlyShowMe) {
        allMenus[i](true)
      } else {
        allMenus[i](false)
      }
    }
  }

  return (
    <div>
      <Sound
        url={currentSong}
        playStatus={songStatus}
        loop={true}
      />
      <img className='case' src={'/img/gameboy.png'}/>
      <div className='game'>
        <img className='gameScene' src={dynamicBG} style={{}}/>
        <img src={selectedToad} style={{height:'100px', width:'100px', zIndex:1, position:'absolute', top:'35%', right:'35%'}}/>
        <div className='topActionBar'>
          <FontAwesomeIcon icon='store-alt'/>
          <FontAwesomeIcon icon='heartbeat'/>
          <div id='test' onClick={() => { showLeaderboard ? setShowLeaderboard(false) : closeAllOtherMenus(setShowLeaderboard) }}>
            <FontAwesomeIcon icon='crown'/>
          </div>
          <FontAwesomeIcon icon='cog'/>
        </div>
        <div className='bottomActionBar'>
          <div id='test' onClick={() => {
            document.getElementById('globalMessageContainer').classList.remove('hidden') }}>
            <FontAwesomeIcon icon='comment-dots'/>
          </div>
          <div id='test' onClick={() => { {/*showFood ? setShowFood(false) : closeAllOtherMenus(setShowFood)*/}
                            setGlobalMessage('')
                            setSelectedToad('/img/1-gameboy.gif')
                            document.getElementById('typewriterText').classList.remove('typewriterEffect')
                            document.getElementById('typewriterText').classList.add('hidden')
                            setTimeout(() => {
                                setGlobalMessage(`Mmmm toad loves pizza...`)
                                document.getElementById('globalMessageContainer').classList.remove('hidden')
                                document.getElementById('typewriterText').classList.add('typewriterEffect')
                                document.getElementById('typewriterText').classList.remove('hidden')
                            }, 100); 
                            setTimeout(() => {
                              //make button unclickable until after animation is done running
                              setSelectedToad('/img/1-smoke.gif')
                            }, 3700); }}>
            <FontAwesomeIcon icon='hamburger'/>
          </div>
          <div id='test' onClick={() => { showRest ? setShowRest(false) : closeAllOtherMenus(setShowRest) }}>
            <FontAwesomeIcon icon='bed'/>
          </div>
          <div id='test' onClick={() => { showPlay ? setShowPlay(false) : closeAllOtherMenus(setShowPlay) }}>
            <FontAwesomeIcon icon='laugh-wink'/>
          </div>
        </div>
        {/*place roots as direct children of game screen*/}
        <div id="foodMenuRoot">
          <FoodMenu
            show={showFood}
            propSetGlobalMessage={setGlobalMessage}
            onClose={() => { setShowFood(false) }}
          />
        </div>
        <div id="restMenuRoot">
          <RestMenu
            show={showRest}
            propSetGlobalMessage={setGlobalMessage}
            onClose={() => { setShowRest(false) }}
          />
        </div>
        <div id="playMenuRoot">
          <PlayMenu
            show={showPlay}
            propSetGlobalMessage={setGlobalMessage}
            onClose={() => { setShowPlay(false) }}
          />
        </div>
        <div id="myToadzRoot">
          <MyToadz
            show={showMyToadz}
            ownsToadzgotchis={ownsToadzgotchis}
            imageURL={imageURL}
            propSelectedToad={setSelectedToad}
            onClose={ () => { setShowMyToadz(false) } }>
          </MyToadz>
        </div>
        <div id='leaderboardRoot'>
          <Leaderboard
            show={showLeaderboard}
            ownsToadzgotchis={ownsToadzgotchis}
            imageURL={imageURL}
            propSelectedToad={setSelectedToad}
            onClose={ () => { setShowLeaderboard(false) } }>
          </Leaderboard>
        </div>
        <div id='globalMessageContainer' className='hidden'>
          <img id='globalMessageImg' className='globalMessageImg' src='/img/global-messages.png'/>
          <p id='typewriterText' className='hidden'>{globalMessage}</p>
          <div id='closeMessageButton' className='closeMessageButton' onClick={() => {
            document.getElementById('globalMessageContainer').classList.add('hidden') }}>
            x
          </div>
        </div>
      </div>
      <div style={{border:'2px red solid', position:'absolute', top:'75%', left:'33.33%', width:'33vw',display:'flex', justifyContent:'space-between', textAlign:'center'}}>
        <div style={{display:'flex', flexDirection:'column'}}>
          <Button
            text='Connect' 
            position=''
            display=''
            flex=''
            color='#332020'
            backgroundColor=''
            fontfamily='Pixeled'
            top='85%'
            left='38%'
            height='auto'
            width=''
            margin='0px'
            padding='0px'
            border='2px blue solid'
            borderRadius=''
            cursor= 'pointer'
            onClick={!isWeb3Injected ? 
            (() => { window.open('https://metamask.io/download','_blank') }) : 
            (!isWalletConnected ? requestAccount : null)}
          />
          <div style={{border:'2px solid green', fontFamily:'Pixeled', cursor:'default'}}>
            Connect
          </div>
        </div>
        <div style={{display:'flex', flexDirection:'column'}}>
          <Button
            text='My Toadz' 
            position=''
            display=''
            flex=''
            color='#332020'
            backgroundColor=''
            fontfamily='Pixeled'
            top='85%'
            left='47%'
            height='100%'
            width=''
            margin='0px'
            padding='0px'
            border='2px blue solid'
            borderRadius=''
            cursor= 'pointer'
            onClick={isWalletConnected ? 
            (() => { showMyToadz ? setShowMyToadz(false) : setShowMyToadz(true) }) : null }
          />
          <div style={{border:'2px solid green', fontFamily:'Pixeled', cursor:'default'}}>
            My NFTz
          </div>
        </div>
        <div style={{display:'flex', flexDirection:'column'}}>
          <Button
            text='About' 
            position=''
            display=''
            flex=''
            color='#332020'
            backgroundColor=''
            fontfamily='Pixeled'
            top='85%'
            left='56%' v
            height='100%'
            width=''
            margin='0px'
            padding='0px'
            border='2px blue solid'
            borderRadius=''
            cursor= 'pointer'
            onClick={!isWeb3Injected ? 
            (() => { window.open('https://metamask.io/download','_blank') }) : 
            (!isWalletConnected ? requestAccount : null)}
          />
          <div style={{border:'2px solid green', fontFamily:'Pixeled', cursor:'default'}}>
              About
          </div>
        </div>
      </div>
      <style jsx>{`
          header {
            font-family: Pixeled;
            text-align: center;
          }
          #test{
            display: flex;
            align-items: center;
          }
          .closeMessageButton {
            position: absolute;
            bottom: 17%;
            right: 3%;
            font-size: 30px;
            cursor: pointer;
          }
          .case {
            position: fixed;
            width:100vw;
            height:100vh;
            z-index:-10;
          }
          .game {
            font-family: Pixeled;
            position: relative;
            width: 41vw;
            height: 52.2vh;
            top: 15.4vh;
            left: 29.5vw;
          }
          .gameScene {
            position: absolute;
            top:15%;
            width: 100%;
            height: 70%;
            z-index:-10;
          }
          .topActionBar {
            display: flex;
            align-items: center;
            justify-content: space-around;
            font-size: 50px;
            position: absolute;
            top:0px;
            width: 100%;
            height: 15%;
          }
          .bottomActionBar {
            display: flex;
            align-items: center;
            justify-content: space-around;
            font-size: 50px;
            position: absolute;
            bottom:0px;
            width: 100%;
            height: 15%;
          }
          .globalMessageImg {
            position: absolute;
            margin-left: .5%;
            bottom: 16%;
            width: 99%;
            height: 15%;
          }
          #toad {
            top:35%;
            left:60%;
          }
          .hidden {
            position: fixed;
            overflow: hidden;
            z-index: -10;
            visibility: hidden;
          }
          #modal-root {
            z-index: 10;
          }
          main {
            font-family: Pixeled;
          }
          nav {
            font-family: Pixeled;
            height:5%;
            margin-top:10%;
            display: flex;
            justify-content: flex-end;
            padding: 10px;
          }
          .fill{
            position: relative;
            margin-top:50px;
            margin-left:70px;
          }
          .typewriterEffect {
            overflow: hidden;
            white-space: nowrap;
            margin: 0 auto;
            letter-spacing: .15em;
            display: inline-block;
            animation:
            typing 2s steps(40, end) forwards;
            position: absolute;
            font-size: 1.25vw;
            width:10%;
            bottom: 20%;
            left: 5%;
          }
          @keyframes typing {
            from { width: 0% }
            to { width: 100% } 
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