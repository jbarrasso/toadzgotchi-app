import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Button from "./Button"
import useSound from "use-sound";
import actionSelectSound from '../public/sounds/menuPingForward.mp3'
import closeMenuSound from '../public/sounds/menuPing4.mp3'
import ToadStatus from './ToadStatus'

type Props = {
  show: boolean;
  ToadData: any;
  vibingToadz: [{}];
  UpdateStats: any;
  Account: string;
  OwnsToadz: boolean;
  SetToadId: any;
  SetToadDisplayState: any;
  ToadIdsOwned: any;
  ToadDead: any;
  SetToadDead: any;
  SetShowMyToadz: any;
  IsVibing: any;
  SetIsVibing: any;
  onClose: () => void
};

const MyToadz = ({ UpdateStats, Account, OwnsToadz, SetToadId, SetToadDisplayState, SetShowMyToadz, ToadData, ToadIdsOwned, vibingToadz, ToadDead, SetToadDead, IsVibing, SetIsVibing, show, onClose }: Props) => {
  const [isBrowser, setIsBrowser] = useState(false)
  const [previewToadId, setPreviewToadId] = useState(0)
  const [showToadStatus, setShowToadStatus] = useState(false)
  const [place, setPlace] = useState(null)
  const [previewToad, setPreviewToad] = useState('')
  const [previewToadVibe, setPreviewToadVibe] = useState(false)
  const [playActionSelect] = useSound(actionSelectSound)
  const [playCloseMenu] = useSound(closeMenuSound)
  const [property, setProperty] = useState('CrypToadz')
  const [index, setIndex] = useState(0)
  let nineToadzShown: any[][] = []
  let count = 0
  
  // const listItems = ToadIdsOwned.map((image: number) =>
  //   <div key={image} style={{display:'flex', justifyContent:'space-around', width:'100%', height:'35%', alignItems:'center', border:'2px solid #673c37' }}>
  //     <img onClick={ () => {
  //       setShowToadStatus(true)
  //     playActionSelect()
  //     setPreviewToadId(image)
  //     if (ToadData[image-1].vibing == true) {
  //       setPreviewToadVibe(true)
  //     } else {
  //       setPreviewToadVibe(false)
  //     }
  //     if ((ToadData[image-1].fed == 0)&&(ToadData[image-1].energy == 0) && (ToadData[image-1].happiness == 0) && (ToadData[image-1].health == 0)) {
  //       SetToadDead(true)
  //       console.log('true')
  //     } else {
  //       SetToadDead(false)
  //       console.log('false')

  //     }
  //     console.log(image, ToadData[image-1].vibing , previewToadId) } } src={'/img/' + image + '.gif'} style={{cursor:'pointer',height:'100%'}}/>
  //     <div style={{display:'flex', flexDirection: 'column', alignItems:'center', justifyContent:'space-around', height:'100%'}}>
  //       <span style={{height:'auto', width:'100%', fontSize:'.75vw'}}>Overall Health</span>
  //       <progress max={100} value={ToadData[image-1].overall} style={{border: 'solid 2px black', width:'100%'}}></progress>
  //     </div>
  //   </div>);

  function renderToadz() {
    for (let i=0; i<(Math.ceil(ToadIdsOwned.length/9)); i++) {
      nineToadzShown[i] = []
      let k = 9
      if ((i+1) == Math.ceil(ToadIdsOwned.length/9)) {
        if (Math.ceil(ToadIdsOwned.length) % 9 == 0) {
          k=9
        } else {
          k= Math.ceil(ToadIdsOwned.length) % 9
        }
      }
      for (let j=0; j<k; j++) {
        nineToadzShown[i].push(ToadData[ToadIdsOwned[count]-1])
        count++
      }
    }
    return (nineToadzShown[index].map((id, indexs) =>
      <div key={id.toadId} style={{display:'flex',  flexDirection:'column', flexWrap: 'nowrap', justifyContent: 'flex-start', alignContent:'center', width:'33%', height:'33%', alignItems:'center', border:'', backgroundColor: ''}}>
        <img onClick={ () => {
          playActionSelect()
          setPreviewToad(id.toadId.toString())
          setPlace(9*index + indexs)
          console.log(id)
          setShowToadStatus(true)} }
          src={'/img/' + id.toadId.toString() +'.gif'} onError={({ currentTarget }) => {
          currentTarget.onerror = null
          currentTarget.src="/img/unknown.png"
        }} style={{cursor:'pointer',height:'50%'}}/>
        <progress max={10} value={id.overall} style={{border: 'solid 1px black', width:'100px', height:'auto'}}></progress>
      </div>))
  }
  useEffect(() => {
    setIsBrowser(true)
  }, []);
  
  const handleCloseClick = (e) => {
    playCloseMenu()
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div style={{position: 'absolute', top: '16%', left: '.5%', height: '68%', width: '99%', zIndex:2}}>
      <img style={{height:'100%', width: '100%'}} src='/img/menu.png'/>
      <a href="#" style={{ position: 'absolute', top:'-1%', right: '3%', fontSize:'20px'}} onClick={handleCloseClick}>x</a>
      <p style={{ position: 'absolute', top:'-1%', left: '5%', fontSize:'1vw', cursor:'pointer'}} onClick={()=>{
        }}>Collection: {property}</p>
      <div className='toadContainer' style={{position:'absolute', overflow: 'auto', top: '20%', display:'flex', flexWrap: 'wrap', flexDirection:'row', alignContent: 'flex-start', left: '2%', width: '95.5%',height:'78%', backgroundColor:''}}>
        { OwnsToadz ? renderToadz() : 
        <div style={{position:'absolute', top:'30%', left:'30%', fontSize:'1.5vmin', border: '', width:'1000px'}}> 
          You don't own any eligible NFTs for play!
        </div>}
      </div>
      <div id='toadStatusRoot'>
          <ToadStatus
            show={showToadStatus}
            vibingToadz={vibingToadz}
            PreviewToad={previewToad}
            place={place}
            onBack={() => {
              setShowToadStatus(false)
            }} 
            onClose={() => {
              setShowToadStatus(false)
              SetShowMyToadz(false)}}>
          </ToadStatus>
      </div>
      {/* {previewToadId >= 1 && (
      <div className='toadPreview' style={{position:'absolute', flexDirection:'row', alignItems: 'flex-start', flexWrap:'wrap', alignContent: 'flex-start', top:'11%', left:'50%', display:'flex', width:'45%', height:'85%'}}>
            <img src={'/img/' + previewToadId + '.gif'} style={{width:'35%', height: '35%'}} />
            <p style={{width:'60%', fontSize: '.75vw', textAlign: 'center'}}>CrypToadz ID: #{ToadData[previewToadId-1].toadId}</p>
            { //pass isvibing from index in here and check instead of toadData 
            // (ToadData[previewToadId-1].vibing == true) ?
            (previewToadVibe == true) ?
            <div style={{width: '100%', height: '65%',textAlign: 'center', overflow:'scroll', padding:'1px'}}>
              {ToadData[previewToadId-1].toadName != '' && (
              <p style={{width:'', fontSize:'.5vw'}}>Toad Name: {ToadData[previewToadId-1].toadName}</p>
              )}
              <p style={{fontSize:'.75vw', margin:'0px'}}>Overall Health</p> 
              <progress max={100} value={ToadData[previewToadId-1].overall} style={{border: 'solid 2px black'}}></progress>
              <p style={{fontSize: '.75vw', marginTop:'0px', marginBottom:'0px'}}>Toad Level: {ToadData[previewToadId-1].level}</p>
              <Button
                text=''
                img='/img/select.png'
                position='relative'
                display='block'
                alignItems=''
                flex=''
                fontfamily=''
                color='#332020'
                backgroundColor='#b0a28d'
                top=''
                left='25%'
                height='35%'
                width='50%'
                zIndex={1}
                marginLeft=''
                marginRight=''
                margin=''
                padding='0px'
                border=''
                borderRadius=''
                cursor= 'pointer'
                onClick={() => {
                  playActionSelect()
                  SetToadId(previewToadId.toString())
                  
                  if (ToadData[previewToadId-1].overall >= 80) {
                    SetToadDisplayState('/img/' + previewToadId + '-happy.gif')
                    document.getElementById('tombstone').classList.add('hidden')
                    document.getElementById('toad').classList.remove('hidden')
                  } else if (ToadData[previewToadId-1].happiness <= 20) {
                    SetToadDisplayState('/img/' + previewToadId + '-sad.gif')
                    document.getElementById('tombstone').classList.add('hidden')
                    document.getElementById('toad').classList.remove('hidden')
                  } else {
                    SetToadDisplayState('/img/' + previewToadId + '.gif')
                    document.getElementById('tombstone').classList.add('hidden')
                    document.getElementById('toad').classList.remove('hidden')
                  }

                  //change to each stat &&
                  if (ToadDead == true){
                  // if ((ToadData[previewToadId-1].fed == 0)&&(ToadData[previewToadId-1].energy == 0) && (ToadData[previewToadId-1].happiness == 0) && (ToadData[previewToadId-1].health == 0)) {
                    document.getElementById('toad').classList.add('hidden')
                    document.getElementById('tombstone').classList.remove('hidden')
                    SetToadDead(true)
                    console.log('asdfsa')
                  } else {
                    SetToadDead(false)
                    console.log('aaaaaaaa')
                  }
                  onClose() }}/>
            </div>
            :
            <Button
              text='Vibe'
              img='/img/vibe.png'
              position='relative'
              display='block'
              alignItems=''
              flex=''
              fontfamily=''
              color='#332020'
              backgroundColor='#b0a28d'
              top=''
              left='25%'
              height='35%'
              width='50%'
              zIndex={1}
              marginLeft=''
              marginRight=''
              margin=''
              padding='0px'
              border=''
              borderRadius=''
              cursor= 'pointer'
              onClick={() => {
                playActionSelect()
                SetToadId(previewToadId.toString())
                SetToadDisplayState('/img/' + previewToadId + '.gif')
                ToadData[previewToadId-1].vibing = true

                // if (ToadData[previewToadId-1].overall >= 80) {
                //   SetToadDisplayState('/img/' + previewToadId + '-happy.gif')
                //   document.getElementById('tombstone').classList.add('hidden')
                //   document.getElementById('toad').classList.remove('hidden')
                // } else if (ToadData[previewToadId-1].happiness <= 20) {
                //   SetToadDisplayState('/img/' + previewToadId + '-sad.gif')
                //   document.getElementById('tombstone').classList.add('hidden')
                //   document.getElementById('toad').classList.remove('hidden')
                // } else {
                //   SetToadDisplayState('/img/' + previewToadId + '.gif')
                //   document.getElementById('tombstone').classList.add('hidden')
                //   document.getElementById('toad').classList.remove('hidden')
                // }

                // if ((ToadData[previewToadId-1].fed == 0)&&(ToadData[previewToadId-1].energy == 0) && (ToadData[previewToadId-1].happiness == 0) && (ToadData[previewToadId-1].health == 0)) {
                //   document.getElementById('toad').classList.add('hidden')
                //   document.getElementById('tombstone').classList.remove('hidden')
                // }
                console.log(Account, previewToadId.toString())
                UpdateStats(['vibe', Account, previewToadId.toString()])
                let elems = document.querySelectorAll("#test");
                let index = 0
                let length = elems.length;
                for ( ; index < length; index++) {
                    elems[index].classList.add('disabled')
                }
                document.getElementById('toad').classList.remove('hidden')
                document.getElementById('tombstone').classList.add('hidden')
                SetIsVibing(true)
                setPreviewToadVibe(true)
                onClose()
              }}/>
            }
      </div>
      )} */}
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent, 
        document.getElementById("myToadzRoot")
    );
  } else {
    return null;
  }    
}

export default MyToadz;