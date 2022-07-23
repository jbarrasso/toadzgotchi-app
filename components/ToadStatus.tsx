import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Button from "./Button"
import _, { findWhere, sample, pluck, sortBy } from 'underscore'
import useSound from "use-sound";
import actionSelectSound from '../public/sounds/menuPingForward.mp3'
import closeMenuSound from '../public/sounds/menuPing4.mp3'

type Props = {
  show: boolean;
  Account: string;
  UpdateStats: any;
  ToadData: any;
  Details: any;
  SetToadId: any;
  SetToadDisplayState: any;
  ToadDead: any;
  SetToadDead: any;
  vibingToadz: [{}];
  PreviewToad: string;
  place: any;
  SetIsVibing: any;
  SetPreviewToadVibe: any;
  propSelectedToad: any;
  onBack: () => void;
  onClose: () => void
};

const ToadStatus = ({ show, Account, UpdateStats, Details, SetToadId, SetToadDisplayState, ToadDead, SetToadDead, ToadData, vibingToadz, PreviewToad, place, SetIsVibing, SetPreviewToadVibe, onBack, onClose }: Props) => {
  const [isBrowser, setIsBrowser] = useState(false)
  const [playActionSelect] = useSound(actionSelectSound)
  const [playCloseMenu] = useSound(closeMenuSound)
  let addy: any
  console.log(Details)

  useEffect(() => {
    setIsBrowser(true)
  }, []);
  
  const handleBackClick = (e) => {
    playCloseMenu()
    e.preventDefault();
    onBack();
  };

  const handleCloseClick = (e) => {
    playCloseMenu()
    e.preventDefault();
    onClose();
  };

  if (PreviewToad != '') {
    addy = _.findWhere(ToadData, {'toadId': parseInt(PreviewToad)}).userId
  } else {
    addy = ''
  }

  const renderDetails = (param, id) => {
    switch(param) {
      case 'Level':
        return (<div>
        <p style={{margin: '0 2vw', fontSize: '.65vw'}}>Toad Level: {_.findWhere(ToadData, {'toadId': parseInt(PreviewToad)}).level}</p>
        <p style={{margin: '0 2vw'}}>Toad Id: #{_.findWhere(ToadData, {'toadId': parseInt(PreviewToad)}).toadId}</p>
        <p style={{margin: '0 2vw', width: '120%'}}>Toad Name: unknown, for now...</p>
        <p style={{margin: '0 2vw'}}>Owned by: {addy.substring(0,5)+'...'+addy.substring(addy.length-5,addy.length)}</p>
        </div>
        )
      case 'Longest Vibing':
        return (
        <div style={{}}>
        <p style={{margin: '0 2vw',fontSize: '0.65vw'}}>Vibing Since: {_.findWhere(ToadData, {'toadId': parseInt(PreviewToad)}).vibeStart.substring(0, _.findWhere(ToadData, {'toadId': parseInt(PreviewToad)}).vibeStart.indexOf('T'))}</p>
        <p style={{margin: '0 2vw'}}>Toad Id: #{_.findWhere(ToadData, {'toadId': parseInt(PreviewToad)}).toadId}</p>
        <p style={{margin: '0 2vw', fontSize: '.65vw'}}>Toad Level: {_.findWhere(ToadData, {'toadId': parseInt(PreviewToad)}).level}</p>
        <p style={{margin: '0 2vw', width: '120%'}}>Toad Name: unknown, for now...</p>
        <p style={{margin: '0 2vw'}}>Owned by: {addy.substring(0,5)+'...'+addy.substring(addy.length-5,addy.length)}</p>
        </div>)
      case 'My NFTs':
        return (<div style={{display:'inline-block', alignContent:'', flexDirection:'column', flexWrap:'wrap', width:'100%', alignItems:"center"}}>
          <p style={{margin: '0 2vw', fontSize: '.5vw', textAlign:'center'}}>Toad Id: #{_.findWhere(ToadData, {'toadId': parseInt(PreviewToad)}).toadId}</p>

          {_.findWhere(ToadData, {'toadId': parseInt(PreviewToad)}).vibing == true ?
            <div style={{alignItems: 'center'}}>
              <p style={{margin: '0 2vw', fontSize: '.5vw', textAlign:'center'}}>Toad Level: {_.findWhere(ToadData, {'toadId': parseInt(PreviewToad)}).level}</p>
              <p style={{margin: '0 2vw', width: '100%', fontSize:'.5vw', textAlign:'center'}}>Toad Name: unknown, for now...</p>
              <span style={{margin: '0 0 0 2vw', fontSize: '.5vw', width:'28%', display: 'inline-block'}}>Fed:</span> 
              <progress max={100} value={_.findWhere(ToadData, {'toadId': parseInt(PreviewToad)}).fed} style={{ border: 'solid 2px black', width:'10vw', height:'1.25vh', margin:'0vh'}}></progress>
              <span style={{margin: '0 0 0 2vw', fontSize: '.5vw', width:'28%', display:'inline-block'}}>Energy:</span> 
              <progress max={100} value={_.findWhere(ToadData, {'toadId': parseInt(PreviewToad)}).energy} style={{ border: 'solid 2px black', width:'10vw', height:'1.5vh', margin:'0vh'}}></progress>
              <span style={{margin: '0 0 0 2vw', fontSize: '.5vw', width:'28%', display:'inline-block'}}>Happiness:</span> 
              <progress max={100} value={_.findWhere(ToadData, {'toadId': parseInt(PreviewToad)}).happiness} style={{ border: 'solid 2px black', width:'10vw', height:'1.5vh', margin:'0vh'}}></progress>
              <span style={{margin: '0 0 0 2vw', fontSize: '.5vw', width:'28%', display:'inline-block'}}>Health:</span> 
              <progress max={100} value={_.findWhere(ToadData, {'toadId': parseInt(PreviewToad)}).health} style={{ border: 'solid 2px black', width:'10vw', height:'1.5vh', margin:'0vh'}}></progress>
            </div> : 
            <div style={{textAlign: 'center'}}>
              <p style={{margin: '0 0 0 0', fontSize: '.5vw'}}>Toad Level: N/A</p>
              <p style={{margin: '0 0 0 0', width: '100%', fontSize:'.5vw'}}>Toad Name: unknown, for now...</p>
              <p style={{margin: '0 0 0 0', fontSize: '.5vw', width:'', display: ''}}>Fed: N/A</p> 
              <p style={{margin: '0 0 0 0', fontSize: '.5vw', width:'', display:''}}>Energy: N/A</p> 
              <p style={{margin: '0 0 0 0', fontSize: '.5vw', width:'', display:''}}>Happiness: N/A</p> 
              <p style={{margin: '0 0 0 0', fontSize: '.5vw', width:'', display:''}}>Health:N/A</p> 
            </div>
            }
          </div>)
    }
  }
  const renderButton = (id) => {
    switch(_.findWhere(ToadData, {'toadId': parseInt(PreviewToad)}).vibing == true) {
      case true:
        return (
          <Button
          text=''
          img='/img/select.png'
          position='absolute'
          display='block'
          alignItems='center'
          flex=''
          fontfamily=''
          color='#332020'
          backgroundColor='#b0a28d'
          top='80%'
          left='55%'
          textAlign=''
          height='10%'
          width='10%'
          zIndex={1}
          marginLeft=''
          marginRight=''
          margin=''
          padding=''
          border=''
          borderRadius=''
          cursor= 'pointer'
          onClick={() => {
            playActionSelect()
            SetToadId(PreviewToad)
            
            if (ToadData[parseInt(PreviewToad)-1].overall >= 80) {
              SetToadDisplayState('/img/' + PreviewToad.toString() + '-happy.gif')
              document.getElementById('tombstone').classList.add('hidden')
              document.getElementById('toad').classList.remove('hidden')
            } else if (ToadData[parseInt(PreviewToad)-1].happiness <= 20) {
              SetToadDisplayState('/img/' + PreviewToad.toString() + '-sad.gif')
              document.getElementById('tombstone').classList.add('hidden')
              document.getElementById('toad').classList.remove('hidden')
            } else {
              SetToadDisplayState('/img/' + PreviewToad.toString() + '.gif')
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
        )
      case false:
        return (
          <Button
          text=''
          img='/img/vibe.png'
          position='absolute'
          display='block'
          alignItems=''
          flex=''
          fontfamily=''
          color='#332020'
          backgroundColor='#b0a28d'
          top='70%'
          textAlign=""
          left='54.5%'
          height='10%'
          width='10%'
          zIndex={1}
          marginLeft=''
          marginRight='' 
          margin=''
          padding=''
          border=''
          borderRadius=''
          cursor= 'pointer'
          onClick={() => {
            playActionSelect()
            SetToadId(PreviewToad)
            SetToadDisplayState('/img/' + PreviewToad + '.gif')
            ToadData[parseInt(PreviewToad)-1].vibing = true

            // if ((ToadData[previewToadId-1].fed == 0)&&(ToadData[previewToadId-1].energy == 0) && (ToadData[previewToadId-1].happiness == 0) && (ToadData[previewToadId-1].health == 0)) {
            //   document.getElementById('toad').classList.add('hidden')
            //   document.getElementById('tombstone').classList.remove('hidden')
            // }
            console.log(Account, PreviewToad)
            UpdateStats(['vibe', Account, PreviewToad])
            let elems = document.querySelectorAll("#test");
            let index = 0
            let length = elems.length;
            for ( ; index < length; index++) {
                elems[index].classList.add('disabled')
            }
            document.getElementById('toad').classList.remove('hidden')
            document.getElementById('tombstone').classList.add('hidden')
            SetIsVibing(true)
            SetPreviewToadVibe(true)
            onClose()
          }}/> )
    }
  }

  const modalContent = show ? (
    <div style={{position: 'absolute', top: '0%', left: '0%', height: '100%', width: '100%', zIndex:2}}>
      <img style={{height:'100%', width: '100%'}} src='/img/menu.png'/>
      <a href="#" style={{ position: 'absolute', top:'-1%', right: '3%', fontSize:'1.5vw', zIndex:1}} onClick={handleCloseClick}>x</a>
      {(Details == 'My NFTs') && renderButton(PreviewToad) } 
      <a href="#" style={{ position: 'absolute', top:'-11%', left: '5%', fontSize:'2.5vw', zIndex:1}} onClick={handleBackClick}>{`<`}</a>
      <div className='toadStatusContainer' style={{position:'absolute', overflow: 'auto', top: '10%', display:'flex', flexWrap: 'wrap', flexDirection:'row', alignContent: 'center', left: '2%', width: '95.5%',height:'78%', backgroundColor:''}}>
      {PreviewToad != '' && (
        <div className='toadPreview' style={{overflow: 'visible', marginLeft:'1vw', fontSize:'.65vw', alignItems: 'flex-start', flexWrap:'wrap', top:'11%', left:'50%', display:'flex', flexDirection:'column', width:'45%', height:'85%'}}>
            <img src={'/img/' + PreviewToad + '.gif'} onError={({ currentTarget }) => {
                currentTarget.onerror = null
                currentTarget.src="/img/unknown.png"}} style={{width:'80%', height: ''}}/>
            {(Details != 'My NFTs') ? <p style={{width:'120%', fontSize:'1vw', textAlign:'center', marginBottom: '.5vw', marginTop: '0'}}>#{place+1}</p> : null}
            {renderDetails(Details, PreviewToad)}
        </div>)}
    </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent, 
        document.getElementById("toadStatusRoot")
    );
  } else {
    return null;
  }    
}

export default ToadStatus;