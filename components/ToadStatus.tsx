import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Button from "./Button"
import _, { findWhere, sample, pluck, sortBy } from 'underscore'
import useSound from "use-sound";
import actionSelectSound from '../public/sounds/menuPingForward.mp3'
import closeMenuSound from '../public/sounds/menuPing4.mp3'

type Props = {
  show: boolean;
  vibingToadz: [{}];
  PreviewToad: string;
  place: number;
  propSelectedToad: any;
  onBack: () => void;
  onClose: () => void
};

const ToadStatus = ({ show, vibingToadz, PreviewToad, place, onBack, onClose }: Props) => {
  const [isBrowser, setIsBrowser] = useState(false)
  const [playActionSelect] = useSound(actionSelectSound)
  const [playCloseMenu] = useSound(closeMenuSound)
  let addy: any

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
    addy = _.findWhere(vibingToadz, {'toadId': parseInt(PreviewToad)}).userId
  } else {
    addy = ''
  }

  const modalContent = show ? (
    <div style={{position: 'absolute', top: '0%', left: '0%', height: '100%', width: '100%', zIndex:2}}>
      <img style={{height:'100%', width: '100%'}} src='/img/menu.png'/>
      <a href="#" style={{ position: 'absolute', top:'-1%', right: '3%', fontSize:'1.5vw'}} onClick={handleCloseClick}>x</a>
      <a href="#" style={{ position: 'absolute', top:'-11%', left: '5%', fontSize:'2.5vw'}} onClick={handleBackClick}>{`<`}</a>
      <div className='toadStatusContainer' style={{position:'absolute', overflow: 'auto', top: '20%', display:'flex', flexWrap: 'wrap', flexDirection:'row', alignContent: 'center', left: '2%', width: '95.5%',height:'78%', backgroundColor:''}}>
      {PreviewToad != '' && (
        <div className='toadPreview' style={{marginLeft:'1vw', fontSize:'.65vw', alignItems: 'flex-start', flexWrap:'wrap', top:'11%', left:'50%', display:'flex', flexDirection:'column', width:'45%', height:'85%'}}>
            <img src={'/img/' + PreviewToad + '.gif'} onError={({ currentTarget }) => {
                currentTarget.onerror = null
                currentTarget.src="/img/unknown.png"}} style={{width:'80%', height: ''}}/>
            <p style={{width:'120%', fontSize:'1vw', textAlign:'center', marginBottom: '.5vw', marginTop: '0'}}>#{place+1}</p>
            <p style={{margin: '0 2vw'}}>Toad Id: #{_.findWhere(vibingToadz, {'toadId': parseInt(PreviewToad)}).toadId}</p>
            <p style={{margin: '0 2vw'}}>Toad Level: {_.findWhere(vibingToadz, {'toadId': parseInt(PreviewToad)}).level}</p>
            <p style={{margin: '0 2vw', width: '120%'}}>Toad Name: unknown, for now...</p>
            <p style={{margin: '0 2vw'}}>Owned by: {addy.substring(0,5)+'...'+addy.substring(addy.length-5,addy.length)}</p>
            <p></p>
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