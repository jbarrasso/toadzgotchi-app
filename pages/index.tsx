import CrypToadz from '../artifacts/contracts/CrypToadz.sol/CrypToadz.json'
import { useRouter } from "next/router"
import Button from "../components/Button"
import Sound from "react-sound"
import MyToadz from "../components/MyToadz"
import { useState, useEffect, useRef } from 'react'
import { ethers } from 'ethers'
import FoodMenu from '../components/FoodMenu'
import RestMenu from '../components/RestMenu'
import PlayMenu from '../components/PlayMenu'
import Leaderboard from '../components/Leaderboard'
import { prisma } from '../lib/prisma'

export const cryptoadzAddress = '0x1CB1A5e65610AEFF2551A50f76a87a7d3fB649C6'
export let provider: ethers.providers.Web3Provider;
export let signer: ethers.providers.JsonRpcSigner;
export let account: string;
export let dynamicBG: string;
export let currentToad: string;
export let songPlaylist = ['/img/a-fly.mp3','/img/no-worries.mp3','/img/city-over-clouds.mp3','/img/big-helmet.mp3','/img/ninja-toad.mp3']
export let welcomeMessages = ['Welcome back to the swamp!',
                              'Sit a while and relax...',
                              '*Croak* ... *Ribbit*...']

//Runs on the server, not client
export async function getServerSideProps() {
  const allToadz = await prisma.toadz.findMany()
  const allOwners = await prisma.user.findMany()
  
  return {
    props: {
      toadData: allToadz,
      ownerData: allOwners
    }
  }
}

//Anonymous function expression to return a global object of Ethereum injection.
//provider, signer, address returns undefined unless called inside functions
export const ethereum = () => {
  return (window as any).ethereum
}
export const checkWeb3 = async(setIsWeb3Injected, setIsWalletConnected, setIsLoading, setNetwork) => {
  console.log('Running useEffect checkweb3')
  if (ethereum() == undefined || null) {
    console.log('Web3 is not injected')
    return
  } else {
    setIsWeb3Injected(true)
    console.log('Web3 is injected')
    try {
      console.log('fetching wallet data')
      const tryProvider = new ethers.providers.Web3Provider(ethereum())
      provider=tryProvider
      const tryNetwork = (await tryProvider.getNetwork()).chainId
      setNetwork(tryNetwork)
      const trySigner = tryProvider.getSigner()
      signer = trySigner
      const tryAccount = await trySigner.getAddress()
      //ask for a sign here?
      account = tryAccount
      //wallet with no toadz
      //account = '0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8'
      //wallet with multiple toadz
      // account = '0xF6E1A43EB08120b2e0eDfADDdD53E1d5B71e86e8'
      // account = '0xC385cAee082Bb0E900bCcbBec8bB2Fe650369ECB'
      setIsWalletConnected(true)
      console.log('Wallect is connected')
      console.log(account)
    } catch (err) {
      console.log("Wallet is not connected. Cannot instantiate provider or get signer", err)
    }
  }
}
export const handleAccountsChanged = async(setIsWalletConnected, checkOwnsToadz, setOwnsToadz, setShowMyToadz) => {
  console.log('running handleAccountsChanged')
  if (ethereum() != undefined || null) {
    ethereum().on("accountsChanged", (accounts) => {
      //Length of accounts is always 1, no matter how many wallets connected to site.
      //if n>2, when disconnecting from n to n-1 accounts, the last connected acc
      //before the nth will be = to accounts[0]

      // setShowMyToadz(false)
      // if (accounts.length > 0){
      //   account = accounts[0]
      //   setIsWalletConnected(false) //quick n dirty way to re-render Account when toggling between wallets
      //   setIsWalletConnected(true)
      //   console.log('wallet accounts changed')
      // } else {
      //   account = ''
      //   setIsWalletConnected(false)
      //   console.log('wallet disconnected')
      // }
      try {
        window.location.reload()
      } catch(err) {
        console.log(err)
      }
    });
  }
}
export const handleChainChanged = async(setNetwork) => {
  console.log('running handleChainChanged')
  if (ethereum() != undefined || null) {
    ethereum().on('chainChanged', (chainId) => {

      //Has no effect because page reloads anyway
      // console.log(chainId)
      // if (chainId == 0x1) {
      //   setNetwork(1)
      // } else if (chainId == 0x4) {
      //   setNetwork(4)
      // } else if (chainId == 0x539) {
      //   setNetwork(1337)
      // } else if (chainId == 0x3) {
      //   setNetwork(3)
      // } else if (chainId == 0x42) {
      //   setNetwork(42)
      // }
      try {
        window.location.reload()
      } catch(err) {
        console.log(err)
      }
    })
  }
}
export const requestAccount = async() => {
  try {
    await ethereum().request({ method: 'eth_requestAccounts' });
  } catch(err) {
    console.log(err)
  }
}

function Home({toadData, ownerData}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isNewPlayer, setIsNewPlayer] = useState(true)
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
  const [toadIdsOwned, setToadIdsOwned] = useState([])
  const [ownsToadz, setOwnsToadz] = useState(false)
  const [network, setNetwork] = useState()
  const [toadId, setToadId] = useState('')
  const [toadDisplayState, setToadDisplayState] = useState('')
  const [isVibing, setIsVibing] = useState(false)
  const [points, setPoints] = useState()

  function getTime() {
    //const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    //console.log(timezone)
    if ((new Date().getHours() >= 18) || (new Date().getHours() < 6)) {
      //query last location, set it here
      dynamicBG = '/img/nightswamp.gif'
    } else if (new Date().getHours() == 6 ) {
      dynamicBG = '/img/dawnswamp.gif'
    } else if (new Date().getHours() == 17) {
      dynamicBG = '/img/duskswamp.gif'
    } else {
      dynamicBG = '/img/dayswamp.gif'
    }
  }

  useEffect(() => {
    getTime()
    console.log(new Date())
    console.log(toadId)
    console.log(toadData[3859])
    triggerRefresh()
    checkWeb3(setIsWeb3Injected, setIsWalletConnected, setIsLoading, setNetwork)
    //Below has no effect because ethereum() and network are not set yet
    // .then(() => {
    //   checkOwnsToadz(setOwnsToadz, setToadIdsOwned)
    // })
    handleAccountsChanged(setIsWalletConnected, checkOwnsToadz, setOwnsToadz, setShowMyToadz)
    handleChainChanged(setNetwork)
  }, [])

  useEffect(() => {
    console.log(toadId)
  }, [isVibing])

  useEffect(() => {
    console.log(account)
    //runs no matter what on page hard reload
    //should be waiting until checkweb3 is done to call
    //handleAcc/Chain change with [isWalletConnected] listener
    if (account != undefined) {
      console.log('Account changed, running useEffect checkOwnsToadz')
      checkOwnsToadz(setOwnsToadz, setToadIdsOwned)
    }
  }, [account])
  
  const refreshData = () => {
    router.replace(router.asPath)
    console.log('refreshed db data, will reflect on next state action')
  }

  //call at vibe start, not useeffect []
  //or figure out when the last decay was, then call after
  function triggerRefresh() {
    setInterval(refreshData, 1000*60*60*4)
    console.log('run callme')
  }

  async function updateOwner(account: string) {
    const res = await fetch(`/api/users`, {
      method: 'PUT',
      body: JSON.stringify(account)
    })

    let data = await res.json()
    console.log(data)
    let messageKey = Object.keys(data)[0]
    let message = data[messageKey]

    if (res.status < 300) {
      let newPlayerKey = Object.keys(data)[1]
      let newPlayer = data[newPlayerKey]
      let firstToadKey = Object.keys(data)[2]
      let firstToad = data[firstToadKey]
      let pointsKey = Object.keys(data)[3]
      let points = data[pointsKey]

      // refreshData()
      setToadId(firstToad.toString())
      setIsNewPlayer(newPlayer)
      setPoints(points)

      setTimeout(() => {
        let rand = Math.floor(Math.random() * welcomeMessages.length);
        setGlobalMessage(welcomeMessages[rand])
        document.getElementById('globalMessageContainer').classList.remove('hidden')
        document.getElementById('typewriterText').classList.remove('hidden')
        document.getElementById('typewriterText').classList.add('typewriterEffect')
      }, 1100);

    } else {
      setTimeout(() => {
        setGlobalMessage(`${message}`)
          document.getElementById('globalMessageContainer').classList.remove('hidden')
          document.getElementById('typewriterText').classList.add('typewriterEffect')
          document.getElementById('typewriterText').classList.remove('hidden')
      }, 100);

    }

    setIsLoading(false)
  }

  async function updateStats(properties: string[]) {
    const res = await fetch('/api/toadStats', {
      method: 'PATCH',
      body: JSON.stringify(properties)
    })
    // refreshData()

    let data = await res.json()
    let messageKey = Object.keys(data)[0]
    let message = data[messageKey]
    console.log(data)

    setTimeout(() => {
      setGlobalMessage(`${message}`)
        document.getElementById('globalMessageContainer').classList.remove('hidden')
        document.getElementById('typewriterText').classList.add('typewriterEffect')
        document.getElementById('typewriterText').classList.remove('hidden')
    }, 100);

    if (res.status < 300) {
      let animationKey = Object.keys(data)[1]
      let animation = data[animationKey]
      let pointsKey = Object.keys(data)[2]
      let points = data[pointsKey]
      let overallKey = Object.keys(data)[3]
      let overall = data[overallKey]

      setPoints(points)

      if (animation != '') {
        setToadDisplayState('/img/' + toadId + '-' + animation + '.gif')

        setTimeout(() => {
          if (overall >= 8) {
            setToadDisplayState('/img/' + toadId + '-happy.gif')
          } else if (overall <= 2) {
            setToadDisplayState('/img/' + toadId + '-sad.gif')
          } else {
            console.log(toadId)
            setToadDisplayState('/img/' + toadId + '.gif')
          }
        }, 4500);
      } else {
        setIsVibing(true)
        console.log('sf')
      }
      setTimeout(() => {
        document.getElementById('globalMessageContainer').classList.add('hidden')
      }, 3000);

      setTimeout(() => {
        let elems = document.querySelectorAll("#test");
        let index = 0
        let length = elems.length;
        for ( ; index < length; index++) {
            elems[index].classList.remove('disabled')
        }
      }, 4500);
      //to check if toad is sick, toadData wont update until next state action, so have toadAction be a state variable and run useeffect
    } else {
      setTimeout(() => {
        let elems = document.querySelectorAll("#test");
        let index = 0
        let length = elems.length;
        for ( ; index < length; index++) {
            elems[index].classList.remove('disabled')
        }
        document.getElementById('globalMessageContainer').classList.add('hidden')
      }, 2000);
    }
  }

  async function checkOwnsToadz(setOwnsToadz, setToadIdsOwned) {
    console.log('Running useEffect checkOwnsToadz')
    if ((ethereum() != undefined || null) && (network == 1)) {
      try {
        const contract = new ethers.Contract(cryptoadzAddress, CrypToadz.abi, signer)
        
        //Basic frontend check
        if (await contract.balanceOf(account) > 0) {
          setOwnsToadz(true)
          const numberOfToadzOwned = await contract.balanceOf(account)
          const arrayOfToadIds = []
          for (let i=0; i<numberOfToadzOwned; i++) {
            let id = await contract.tokenOfOwnerByIndex(account, i)
            arrayOfToadIds[i] = id.toNumber()
            //before pushing, authenticate with signature pass in verifiedAccount instead of account or key in localstorage
          }
          updateOwner(account)
          //set states below in updateOwner
          if (toadData[arrayOfToadIds[0].toString()-1].overall >= 8) {
            setToadDisplayState('/img/' + arrayOfToadIds[0].toString() + '-happy.gif')
            document.getElementById('tombstone').classList.add('hidden')
          } else if (toadData[arrayOfToadIds[0].toString()-1].happiness <= 2) {
            setToadDisplayState('/img/' + arrayOfToadIds[0].toString() + '-sad.gif')
            document.getElementById('tombstone').classList.add('hidden')
          } else {
            setToadDisplayState('/img/' + arrayOfToadIds[0].toString() + '.gif')
            document.getElementById('tombstone').classList.add('hidden')
          }

          //change to each stat &&
          if (toadData[arrayOfToadIds[0].toString()-1].overall == 0) {
            document.getElementById('toad').classList.add('hidden')
            document.getElementById('tombstone').classList.remove('hidden')
          }

          console.log(arrayOfToadIds)
          setToadId(arrayOfToadIds[0].toString())
          setIsVibing(toadData[arrayOfToadIds[0].toString()-1].vibing)
          setOwnsToadz(true)
          setToadIdsOwned(arrayOfToadIds)
        } else {
          setIsLoading(false)
          setToadDisplayState('/img/bruce.png')
          let elems = document.querySelectorAll("#test");
          let index = 0
          let length = elems.length;
          for ( ; index < length; index++) {
              elems[index].classList.add('disabled')
          }
          setPoints('N/A')
          setOwnsToadz(false)
          setToadId('')
          setToadIdsOwned([])
        }
      } catch(err) {
        console.log(err)
      }
    }
  }

  // async function getToadData(toadIdsOwned) {
  //   let j=1
  //   for (let i=0; i<toadIdsOwned.length; i++) {
  //     if (toadIdsOwned[i] > 6968) {
  //     }
  //     console.log(toadData[toadIdsOwned[i]-1].toad_id)
  //   }
  // }

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
      <img className='case' src={'/img/common1.png'}/>
      <div className='game'>
        <img className='gameScene' src={dynamicBG} style={{border: '3px solid black'}}/>
        {isLoading ? (<img className='loadingScreen' src={'/img/loadingScreen.gif'} style={{border: '5px solid black'}}/>) : 
        (isNewPlayer == true &&
        <div>
          <Button
            text='enter'
            img='/img/enter.png'
            position='absolute'
            display=''
            flex=''
            fontfamily=''
            color=''
            backgroundColor=''
            top='67%'
            left='41.5%'
            height=''
            width=''
            zIndex={15}
            margin='10px'
            padding='0px'
            border=''
            borderRadius=''
            cursor= 'pointer'
            onClick={() => {
              setIsNewPlayer(false)
              setGlobalMessage('')
              document.getElementById('globalMessageContainer').classList.add('hidden')
              document.getElementById('typewriterText').classList.remove('typewriterEffect')
              document.getElementById('typewriterText').classList.add('hidden')
              setTimeout(() => {
                ownsToadz ? 
          
                setGlobalMessage(welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]) : 
                setGlobalMessage(`Check back soon!`)
                
                document.getElementById('globalMessageContainer').classList.remove('hidden')
                document.getElementById('typewriterText').classList.remove('hidden')
                document.getElementById('typewriterText').classList.add('typewriterEffect')
              }, 1100);
            }}/>
          <img id='welcomeScreen' src={'/img/intro2.gif'} style={{}}/>
        </div>)
        }
        {/* FOR TOADDISPLAYSTATE PATH... PULL TOAD STATE FROM TOADDATA (GETSERVERSIDEPROPS) TO POINT TO PATH */}
        <img src={toadDisplayState} id='toad' style={{display: '', maxHeight: '', maxWidth:'25%', minWidth:'', height:'40%', width:'30%', zIndex:1, position:'absolute', top:'32%', right:'37%'}}/>
        <img src={'/img/' + toadId + '-tombstone.gif'} id='tombstone' style={{display: '', maxHeight: '', maxWidth:'25%', minWidth:'', height:'30%', width:'16%', zIndex:1, position:'absolute', top:'18%', right:'29%'}}/>
        <div className='topActionBarBg'></div>
        <div className='topActionBar'>
          <div id='test' onClick={() => { 
            if (document.getElementById('globalMessageContainer').classList.contains('hidden')) {
              document.getElementById('globalMessageContainer').classList.remove('hidden')
            } else {
              document.getElementById('globalMessageContainer').classList.add('hidden')
            }
          }}>
            <img src='/img/messageIcon.png' style={{cursor: 'pointer', height: '75%'}}/>
          </div>
          {/* <progress max={10} value={ Math.round(((toadData[3859].fed + toadData[3859].energy + toadData[3859].happiness + toadData[3859].health) / 4))} style={{border: 'solid 2px black'}}></progress> */}
          {/* <div id='test' onClick={() => { showFood ? setShowFood(false) : closeAllOtherMenus(setShowFood) } }>
            <img src='/img/meterIcon.png' style={{cursor: 'pointer', height: '75%'}}/>
          </div> */}
          <div id='test' style={{fontSize: '2vh', color: 'beige'}}>
            {(points == undefined) ?
              <p>Loading... </p> :
              <p>{points}</p>
            }
            <p style={{marginLeft:'10%'}}>Points</p>
          </div>
        </div>
        <div className='bottomActionBar'>
          <div id='test' onClick={() => {
            {/*//check if toad transferred checkownstoadzg*/}
              if (isVibing) {
                if ((toadData[toadId-1].fed == 0)  && (toadData[toadId-1].energy == 0) && (toadData[toadId-1].happiness==0) && (toadData[toadId-1].health == 0)) {
                  setGlobalMessage('')
                  document.getElementById('typewriterText').classList.remove('typewriterEffect')
                  document.getElementById('typewriterText').classList.add('hidden')
                  setTimeout(() => {
                    setGlobalMessage(`...It appears toad has... passed away...`)
                      document.getElementById('globalMessageContainer').classList.remove('hidden')
                      document.getElementById('typewriterText').classList.add('typewriterEffect')
                      document.getElementById('typewriterText').classList.remove('hidden')
                  }, 100);
                } else {
                console.log(toadId)
                updateStats(['eat', account, toadId])
                let elems = document.querySelectorAll("#test");
                let index = 0
                let length = elems.length;
                for ( ; index < length; index++) {
                    elems[index].classList.add('disabled')
                }
                setGlobalMessage('')
                document.getElementById('typewriterText').classList.remove('typewriterEffect')
                document.getElementById('typewriterText').classList.add('hidden')
              }
              } else {
                setGlobalMessage('')
                document.getElementById('typewriterText').classList.remove('typewriterEffect')
                document.getElementById('typewriterText').classList.add('hidden')
                setTimeout(() => {
                  setGlobalMessage(`Click on 'My NFTs' below to begin vibing first!`)
                    document.getElementById('globalMessageContainer').classList.remove('hidden')
                    document.getElementById('typewriterText').classList.add('typewriterEffect')
                    document.getElementById('typewriterText').classList.remove('hidden')
                }, 100);
              }
          }}>
            <img src='/img/utensilsIcon.png' className='icon' style={{cursor: 'pointer', height: '75%'}}/>
          </div>
          <div id='test' onClick={() => {
            {/*//check if toad transferred checkownstoadzg*/}
            if (isVibing) {
              if ((toadData[toadId-1].fed == 0)  && (toadData[toadId-1].energy == 0) && (toadData[toadId-1].happiness==0) && (toadData[toadId-1].health == 0)) {
                setGlobalMessage('')
                document.getElementById('typewriterText').classList.remove('typewriterEffect')
                document.getElementById('typewriterText').classList.add('hidden')
                setTimeout(() => {
                  setGlobalMessage(`...It appears toad has... passed away...`)
                    document.getElementById('globalMessageContainer').classList.remove('hidden')
                    document.getElementById('typewriterText').classList.add('typewriterEffect')
                    document.getElementById('typewriterText').classList.remove('hidden')
                }, 100);
              } else {
              updateStats(['sleep', account, toadId])
              let elems = document.querySelectorAll("#test");
              let index = 0
              let length = elems.length;
              for ( ; index < length; index++) {
                  elems[index].classList.add('disabled')
              }
              setGlobalMessage('')
              document.getElementById('typewriterText').classList.remove('typewriterEffect')
              document.getElementById('typewriterText').classList.add('hidden')
            }
            } else {
                setGlobalMessage('')
                document.getElementById('typewriterText').classList.remove('typewriterEffect')
                document.getElementById('typewriterText').classList.add('hidden')
                setTimeout(() => {
                  setGlobalMessage(`Click on 'My NFTs' below to begin vibing first!`)
                    document.getElementById('globalMessageContainer').classList.remove('hidden')
                    document.getElementById('typewriterText').classList.add('typewriterEffect')
                    document.getElementById('typewriterText').classList.remove('hidden')
                }, 100);
            }
          }}>
            <img src='/img/bedIcon.png' style={{cursor: 'pointer', height: '75%'}}/>
          </div>
          <div id='test' onClick={() => {
            {/*//check if toad transferred checkownstoadzg*/}
            if (isVibing) {
              if ((toadData[toadId-1].fed == 0)  && (toadData[toadId-1].energy == 0) && (toadData[toadId-1].happiness==0) && (toadData[toadId-1].health == 0)) {
                setGlobalMessage('')
                document.getElementById('typewriterText').classList.remove('typewriterEffect')
                document.getElementById('typewriterText').classList.add('hidden')
                setTimeout(() => {
                  setGlobalMessage(`...It appears toad has... passed away...`)
                    document.getElementById('globalMessageContainer').classList.remove('hidden')
                    document.getElementById('typewriterText').classList.add('typewriterEffect')
                    document.getElementById('typewriterText').classList.remove('hidden')
                }, 100);
              } else {
              updateStats(['gameboy', account, toadId])
              let elems = document.querySelectorAll("#test");
              let index = 0
              let length = elems.length;
              for ( ; index < length; index++) {
                  elems[index].classList.add('disabled')
              }
              setGlobalMessage('')
              document.getElementById('typewriterText').classList.remove('typewriterEffect')
              document.getElementById('typewriterText').classList.add('hidden')
            }
            } else {
                setGlobalMessage('')
                document.getElementById('typewriterText').classList.remove('typewriterEffect')
                document.getElementById('typewriterText').classList.add('hidden')
                setTimeout(() => {
                  setGlobalMessage(`Click on 'My NFTs' below to begin vibing first!`)
                    document.getElementById('globalMessageContainer').classList.remove('hidden')
                    document.getElementById('typewriterText').classList.add('typewriterEffect')
                    document.getElementById('typewriterText').classList.remove('hidden')
                }, 100);
            }
          }}>
            <img src='/img/joystickIcon.png' style={{cursor: 'pointer', height: '75%'}}/>
          </div>
        </div>
        {/*Place roots as direct children of game screen*/}
        <div id="foodMenuRoot">
          <FoodMenu
            show={showFood}
            ToadId={toadId}
            ToadData={toadData}
            UpdateStats={updateStats}
            Account={account}
            SetGlobalMessage={setGlobalMessage}
            SetToadDisplayState={setToadDisplayState}
            onClose={() => { setShowFood(false) }}
          />
        </div>
        <div id="restMenuRoot">
          <RestMenu
            show={showRest}
            ToadId={toadId}
            ToadData={toadData}
            UpdateStats={updateStats}
            Account={account}
            SetGlobalMessage={setGlobalMessage}
            SetToadDisplayState={setToadDisplayState}
            onClose={() => { setShowRest(false) }}
          />
        </div>
        <div id="playMenuRoot">
          <PlayMenu
            show={showPlay}
            ToadId={toadId}
            ToadData={toadData}
            UpdateStats={updateStats}
            Account={account}
            SetGlobalMessage={setGlobalMessage}
            SetToadDisplayState={setToadDisplayState}
            onClose={() => { setShowPlay(false) }}
          />
        </div>
        <div id="myToadzRoot">
          <MyToadz
            show={showMyToadz}
            ToadData={toadData}
            UpdateStats={updateStats}
            Account={account}
            SetToadDisplayState={setToadDisplayState}
            SetGlobalMessage={setGlobalMessage}
            OwnsToadz={ownsToadz}
            SetToadId={setToadId}
            ToadIdsOwned={toadIdsOwned}
            SetIsVibing={setIsVibing}
            onClose={ () => { setShowMyToadz(false) } }>
          </MyToadz>
        </div>
        <div id='leaderboardRoot'>
          <Leaderboard
            show={showLeaderboard}
            OwnsToadz={ownsToadz}
            imageURL={toadIdsOwned}
            SetToadDisplayState={setToadDisplayState}
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
      <div style={{border:'', position:'absolute', top:'82%', left:'30%', width:'40vw', height: '12vh', display:'flex', justifyContent:'space-between', textAlign:'center'}}>
        <div style={{display:'flex', flexDirection:'column', alignItems: 'center', width: '24%'}}>
          <Button
            text=''
            img='/img/button.png'
            position='relative'
            display=''
            flex=''
            color='#332020'
            backgroundColor=''
            fontfamily='Pixeled'
            top='0%'
            left='0%'
            height='100%'
            width='50%'
            margin='0px'
            padding='0px'
            border=''
            borderRadius=''
            cursor= 'pointer'
            onClick={!isWeb3Injected ? 
            (() => { window.open('https://metamask.io/download','_blank') }) : 
            (!isWalletConnected ? requestAccount : null)}
          />
          <img 
            src={isWalletConnected? '/img/connected.png' : '/img/connect.png'}
            style={{position: 'relative', height: '50%', width: '100%', left: '0%', paddingTop: '1.5vh'}}/>
          <img src='/img/buttonShadow.png' style={{zIndex:-10, position: 'absolute', height: '67%', width: '12%', left: '6%', top:'0%'}}/>
        </div>
        <div style={{display:'flex', flexDirection:'column', alignItems: 'center', width: '24%'}}>
          <Button
            text=''
            img='/img/button.png'
            position='relative'
            display=''
            flex=''
            color='#332020'
            backgroundColor=''
            fontfamily='Pixeled'
            top='0%'
            left='0%'
            height='100%'
            width='50%'
            margin='0px'
            padding='0px'
            border=''
            borderRadius=''
            cursor= 'pointer'
            onClick={isWalletConnected ? 
            (() => { showMyToadz ? setShowMyToadz(false) : setShowMyToadz(true) }) : null }
          />
          <img src='/img/mynfts.png' style={{position: 'relative', height: '50%', width: '100%', left: '0%', paddingTop: '1.5vh'}}/>
          <img src='/img/buttonShadow.png' style={{zIndex:-10, position: 'absolute', height: '60%', width: '12%', left: '44%', top:'0%'}}/>
        </div>
        <div style={{display:'flex', flexDirection:'column', alignItems: 'center', width: '24%'}}>
          <Button
            text=''
            img='/img/button.png' 
            position='relative'
            display=''
            flex=''
            color='#332020'
            backgroundColor=''
            fontfamily='Pixeled'
            top='0%'
            left='0%'
            height='100%'
            width='50%'
            margin='0px'
            padding='0px'
            border=''
            borderRadius=''
            cursor= 'pointer'
            onClick={() => {window.open('https://discord.com/invite/zkgtxQvF3j','_blank')}}
          />
          <img src='/img/discord.png' style={{position: '', height: '50%', width: '100%', left: '0%', paddingTop: '1.5vh'}}/>
          <img src='/img/buttonShadow.png' style={{zIndex:-10, position: 'absolute', height: '67%', width: '12%', left: '82%', top:'0%'}}/>
        </div>
      </div>
      <style jsx>{`
          header {
            font-family: Pixeled;
            text-align: center;
          }
          #mouth {
            height:200px;
            width:200px;
            z-index: 20;
            position: absolute;
            top:20%;
            right:25%;
          }
          #test{
            display: flex;
            align-items: center;
            height: 100%;
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
            width: 40.6vw;
            height: 54.3vh;
            top: 15vh;
            left: 29.75vw;
          }
          .gameScene {
            position: absolute;
            top:15%;
            width: 100%;
            height: 70%;
            z-index:-10;
          }
          .loadingScreen {
            position: absolute;
            top:15%;
            width: 100%;
            height: 70%;
            z-index:10;
          }
          #welcomeScreen {
            position: absolute;
            top:15%;
            width: 100%;
            height: 70%;
            z-index:9;
          }
          .topActionBarBg {
            display: flex;
            align-items: center;
            justify-content: space-around;
            font-size: 50px;
            position: absolute;
            top:0px;
            z-index: -11;
            background-color: red;
            width: 100%;
            height: 15%;
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
          .hidden {
            position: fixed;
            overflow: hidden;
            z-index: -10;
            visibility: hidden;
          }
          .disabled {
            pointer-events: none;
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
            typing 0.25s steps(40, end) forwards;
            position: absolute;
            font-size: 0.75vw;
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