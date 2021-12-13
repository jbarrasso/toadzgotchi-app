import Toadzgotchi from '../artifacts/contracts/Toadzgotchi.sol/Toadzgotchi.json'
import ToadzgotchiPets from '../artifacts/contracts/ToadzgotchiPets.sol/ToadzgotchiPets.json'
import Head from "next/head"
import Image from "next/image"
import Button from "../components/Button"
import Account from "../components/Account"
import Modal from "../components/Modal"
import ProgressBar from '../components/ProgressBar'
import { PopupButton } from '@typeform/embed-react'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

const test = []
const ipfsURL = 'https://ipfs.io/ipfs/'
const cryptoadzMetadataID = 'QmWEFSMku6yGLQ9TQr66HjSd9kay8ZDYKbBEfjNi4pLtrr/'
const toadzgotchiAddress = '0x1c9fD50dF7a4f066884b58A05D91e4b55005876A'
const toadzgotchiPetsAddress = '0xcC4c41415fc68B2fBf70102742A83cDe435e0Ca7'
export let provider: ethers.providers.Web3Provider;
export let signer: ethers.providers.JsonRpcSigner;
export let account: string;

//Anonymous function expression to return a global object of Ethereum injection.
//provider, signer, address returns undefined unless called inside functions
export const ethereum = () => {
  return (window as any).ethereum
}
export const checkWeb3 = async(setIsWeb3Injected, setIsWalletConnected, setIsLoading) => {
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
export const handleAccountsChanged = async(setIsWalletConnected, checkOwnsToadzgotchis, setOwnsToadzgotchis, setShowModal) => {
  console.log('running handleAccountsChanged')
  if (ethereum() != undefined || null) {
    ethereum().on("accountsChanged", (accounts) => {
      //length of accounts is always 1, no matter how many wallets connected to site.
      //if n>2, when disconnecting from n to n-1 accounts, the last connected acc
      //before the nth will be = to accounts[0]
      checkOwnsToadzgotchis(setOwnsToadzgotchis)
      setShowModal(false)
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
export const calcDecay = async(i: number) => {
  if (ethereum() !== undefined || null) {
    const contract = new ethers.Contract(toadzgotchiAddress, Toadzgotchi.abi, signer)
    const data = await contract.readToadStats()
    const currentBlock = await provider.getBlockNumber()
    const timeElapsed = currentBlock - data[i]
    let decayBy: number
    let decayedValue: number
    if (timeElapsed <= 1) {
      decayBy = 0;
    } else if (timeElapsed >= 2 && timeElapsed <= 4) {
      decayBy = 10;
    } else if (timeElapsed >= 5 && timeElapsed <= 7) {
      decayBy = 20;
    } else if (timeElapsed >= 8 && timeElapsed <= 10) {
      decayBy = 30;
    } else if (timeElapsed >= 11 && timeElapsed <= 13) {
      decayBy = 40;
    } else if (timeElapsed >= 14 && timeElapsed <= 16) {
      decayBy = 50;
    } else if (timeElapsed >= 17 && timeElapsed <= 19) {
      decayBy = 60;
    } else if (timeElapsed >= 20 && timeElapsed <= 22) {
      decayBy = 70;
    } else if (timeElapsed >= 23 && timeElapsed <= 25) {
      decayBy = 80;
    } else if (timeElapsed >= 26 && timeElapsed <= 28) {
      decayBy = 90;
    } else {
      //call some function?
      decayBy = 110;
    }
    decayedValue = data[i-1].toNumber() - decayBy
    if (decayedValue < 0) {
      decayedValue = 0
    }
    return (decayedValue)
  }
}
export async function checkOwnsToadzgotchis(setOwnsToadzgotchis, setStats) {
  console.log('Running useEffect checkOwnsToadzgotchis')
  if (ethereum() != undefined || null) {
    try{
      const contract = new ethers.Contract(toadzgotchiAddress, Toadzgotchi.abi, signer)
      if (await contract.ownsToadzgotchis()){
        setOwnsToadzgotchis(true)
        const data = await contract.toadzgotchiIdsOwned()
        const metadataURL = []
        const toadzImagesURL = []
        for (let i=0; i<data.length; i++) {
          metadataURL[i] = ipfsURL + cryptoadzMetadataID + data[i].toString()
          fetch(metadataURL[i])
          .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
          .then((imageID) => {toadzImagesURL[i] = ipfsURL + imageID.image.substring(7)})
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
  const [renderCount, setrenderCount] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isWeb3Injected, setIsWeb3Injected] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState([])
  const [ownsToadzgotchis, setOwnsToadzgotchis] = useState(false)
  const [isVibing, setIsVibing] = useState(false)
  const [toadLevel, setToadLevel] = useState(1)
  const [toadXP, setToadXP] = useState(0)
  const [isFed, setIsFed] = useState(() => { return 100 })
  const [isHappy, setIsHappy] = useState(() => { return 100 })
  const [isRested, setIsRested] = useState(() => { return 100 })
  const [feedValue, setFeed] = useState(() => { return 10 })
  const [playValue, setPlay] = useState(() => { return 10 })
  const [sleepValue, setSleep] = useState(() => { return 10 })
  
  useEffect(() => {
    setIsLoading(true)
    checkWeb3(setIsWeb3Injected, setIsWalletConnected, setIsLoading)
    .then(() => {checkOwnsToadzgotchis(setOwnsToadzgotchis, setStats)})
    handleAccountsChanged(setIsWalletConnected, checkOwnsToadzgotchis, setOwnsToadzgotchis, setShowModal)
  }, [])

  //runs no matter what on page hard reload
  useEffect(() => {
    console.log('one of 4 variables changed, running useeffect')
    checkOwnsToadzgotchis(setOwnsToadzgotchis, setStats)
  }, [isFed, isHappy, isRested, account])

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
        //await readToadStats()
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
      //await readToadStats()
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
      //await readToadStats()
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
      //await readToadStats()
      updateIsRested()
    }
  }
  async function tryMint() {
    if (isWalletConnected) {
      const contract = new ethers.Contract(toadzgotchiPetsAddress, ToadzgotchiPets.abi, signer)
      const transaction = await contract.tryMint([4,5,6,7,8,9,10], { value: ethers.utils.parseEther("0.35") })
      //await transaction.wait()
    } 
  }
  async function tryFlipMint() {
    if (isWalletConnected) {
      const contract = new ethers.Contract(toadzgotchiPetsAddress, ToadzgotchiPets.abi, signer)
      const transaction = await contract.flipMintState()
      await transaction.wait()
    } 
  }
  async function tryFlipPrivateSale() {
    if (isWalletConnected) {
      const contract = new ethers.Contract(toadzgotchiPetsAddress, ToadzgotchiPets.abi, signer)
      const transaction = await contract.flipPrivateSale()
      await transaction.wait()
    } 
  }
  async function toadzgotchisOwned() {
    if (isWalletConnected) {
      const contract = new ethers.Contract(toadzgotchiPetsAddress, ToadzgotchiPets.abi, signer)
      const owned = await contract.toadzgotchisOwned(account)
      //const transactions = await contract.balanceOf('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
      //const acc = await contract.ownerOf(4368)
      console.log(owned)
    } 
  }
  async function tryTransfer() {
    if (isWalletConnected) {
      const contract = new ethers.Contract(toadzgotchiPetsAddress, ToadzgotchiPets.abi, signer)
      const transaction = await contract["safeTransferFrom(address,address,uint256)"]('0x70997970C51812dc3A010C7d01b50e0d17dc79C8','0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', 3)
      await transaction.wait()
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
            <Modal
              show={showModal}
              ownsToadzgotchis={ownsToadzgotchis}
              stats={stats}
              onClose={ () => { setShowModal(false) } }>
                Hello!
            </Modal>

            {isWalletConnected &&

            (<Button
              text='MY TOADZ'
              display=''
              flex=''
              color='#332020'
              backgroundColor='#b0a28d'
              margin='10px'
              padding='0px'
              border='2px solid #673c37'
              borderRadius='0px'
              onClick={() => {setShowModal(true)}}
            />)}

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
                    width=''
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
                    width=''
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
                  width=''
                  padding='0px'
                  border=' 2px solid #673c37'
                  borderRadius='0px'
                  progressValue={isRested}
                  progressMaxValue={100}
                />
                </div>
              </section>)}

              {/* <button onClick={ () => {readToadStats(ownsToadzgotchis)} }>Read Toad Stats</button> */}

              {(!isVibing || !isWalletConnected) &&

              (<Button
                text={ !isWeb3Injected ? ("INSTALL METAMASK") : (!isWalletConnected ? ("CONNECT METAMASK") : ("START VIBIN'")) }
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
            margin-left:10%;

          }
          img {
            width: 125%;
            height: 175%;
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
