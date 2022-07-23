import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Button from "./Button"
import _, { sample, pluck, sortBy } from 'underscore'
import useSound from "use-sound";
import actionSelectSound from '../public/sounds/menuPingForward.mp3'
import closeMenuSound from '../public/sounds/menuPing4.mp3'
import ToadStatus from "./ToadStatus";

type Props = {
  show: boolean;
  ToadData: any;
  vibingToadz: [{}];
  propSelectedToad: any;
  SetShowLeaderboard: any;
  onClose: () => void
};

const Leaderboard = ({ show, ToadData, vibingToadz, SetShowLeaderboard, onClose }: Props) => {
  const [isBrowser, setIsBrowser] = useState(false)
  const [showToadStatus, setShowToadStatus] = useState(false)
  const [previewToad, setPreviewToad] = useState('')
  const [place, setPlace] = useState(null)
  const [property, setProperty] = useState('Level')
  const [index, setIndex] = useState(0)
  const oldestVibing = _.sortBy(vibingToadz, 'vibeStart')
  const toadzByHighestLevel = _.sortBy(vibingToadz, 'level').reverse()
  const [playActionSelect] = useSound(actionSelectSound)
  const [playCloseMenu] = useSound(closeMenuSound)
  let nineToadzShown: any[][] = []
  let count = 0
 
  useEffect(()=> {
    if (property != undefined) {
      if (property === 'Level') {
        for (let i=0; i<(Math.ceil(vibingToadz.length/9)); i++) {
          nineToadzShown[i] = []
          let k = 9
          if ((i+1) == Math.ceil(vibingToadz.length/9)) {
            if (Math.ceil(vibingToadz.length) % 9 == 0) {
              k=9
            } else {
              k= Math.ceil(vibingToadz.length) % 9
            }
          }
          for (let j=0; j<k; j++) {
            nineToadzShown[i].push(toadzByHighestLevel[count])
            count++
          }
        }
      } else if (property === 'Longest Vibing') {
        for (let i=0; i<(Math.ceil(vibingToadz.length/9)); i++) {
          nineToadzShown[i] = []
          let k = 9
          if ((i+1) == Math.ceil(vibingToadz.length/9)) {
            if (Math.ceil(vibingToadz.length) % 9 == 0) {
              k=9
            } else {
              k= Math.ceil(vibingToadz.length) % 9
            }
          }
          for (let j=0; j<k; j++) {
            nineToadzShown[i].push(oldestVibing[count])
            count++
          }
        }
      }
    } else {
      return
    }
  }, [property])

  const renderSwitch = (param, id) => {
    switch(param) {
      case 'Level':
        return (<p style={{fontSize: '0.5vw'}}>Level: { id.level}</p>)
      case 'Longest Vibing':
        return (
        <div style={{}}>
          {/* <p style={{fontSize: '0.5vw'}}>Vibing Since: </p> */}
        <p style={{fontSize: '0.5vw'}}>{ id.vibeStart.substring(0, id.vibeStart.indexOf('T'))}</p></div>)

    }
  }

  function renderToadz() {
    if (property === 'Level') {
      for (let i=0; i<(Math.ceil(vibingToadz.length/9)); i++) {
        nineToadzShown[i] = []
        let k = 9
        if ((i+1) == Math.ceil(vibingToadz.length/9)) {
          if (Math.ceil(vibingToadz.length) % 9 == 0) {
            k=9
          } else {
            k= Math.ceil(vibingToadz.length) % 9
          }
        }
        for (let j=0; j<k; j++) {
          nineToadzShown[i].push(toadzByHighestLevel[count])
          count++
        }
      }
    } else if (property === 'Longest Vibing') {
      for (let i=0; i<(Math.ceil(vibingToadz.length/9)); i++) {
        nineToadzShown[i] = []
        let k = 9
        if ((i+1) == Math.ceil(vibingToadz.length/9)) {
          if (Math.ceil(vibingToadz.length) % 9 == 0) {
            k=9
          } else {
            k= Math.ceil(vibingToadz.length) % 9
          }
        }
        for (let j=0; j<k; j++) {
          nineToadzShown[i].push(oldestVibing[count])
          count++
        }
      }
    }
    return (nineToadzShown[index].map((id, indexs) =>
      <div key={id.toadId} style={{display:'flex',  flexDirection:'column', flexWrap: 'wrap', justifyContent: 'flex-start', alignContent:'center', width:'33%', height:'33%', alignItems:'center', border:'', backgroundColor: ''}}>
        <img onClick={ () => {
          playActionSelect()
          setPreviewToad(id.toadId.toString())
          setPlace(9*index + indexs)
          console.log(oldestVibing[0])
          setShowToadStatus(true)} } src={'/img/' + id.toadId.toString() +'.gif'} onError={({ currentTarget }) => {
          currentTarget.onerror = null
          currentTarget.src="/img/unknown.png"
        }} style={{cursor:'pointer',height:'100%'}}/>
        <p style={{fontSize: '0.5vw'}}>ID: #{id.toadId}</p>
        {renderSwitch(property, id)}
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
      <a href="#" style={{ position: 'absolute', top:'-1%', right: '3%', fontSize:'1.5vw'}} onClick={handleCloseClick}>x</a>
      <a href="#" style={{ position: 'absolute', top:'3%', right: '15%', fontSize:'1vw'}} onClick={()=>{
        if (index < (Math.ceil(vibingToadz.length/9)-1)) {
          playActionSelect()
          setIndex(index+1)
        } else {
          playActionSelect()
        }}}>{`Next>`}</a>
      <p style={{ position: 'absolute', top:'-1%', left: '5%', fontSize:'1vw', cursor:'pointer'}} onClick={()=>{
        if (property === 'Level') {
          playActionSelect()
          setIndex(0)
          setProperty('Longest Vibing')
        } else {
          playActionSelect()
          setIndex(0)
          setProperty ('Level')
        } 
        }}>Sort By: {property}</p>
      <a href="#" style={{ position: 'absolute', top:'3%', right: '30%', fontSize:'1vw'}} onClick={()=>{
        if (index > 0 ) {
          playActionSelect()
          setIndex(index-1)
        } else{
          playActionSelect()
        }}}>{`<Prev`}</a>
      <div className='toadContainer' style={{position:'absolute', overflow: 'auto', top: '20%', display:'flex', flexWrap: 'wrap', flexDirection:'row', alignContent: 'flex-start', left: '2%', width: '95.5%',height:'78%', backgroundColor:''}}>
        {renderToadz()}
      </div>
      <div id='toadStatusRoot'>
          <ToadStatus
            show={showToadStatus}
            Details={property}
            ToadData={ToadData}
            vibingToadz={vibingToadz}
            PreviewToad={previewToad}
            place={place}
            onBack={() => {
              setShowToadStatus(false)
            }} 
            onClose={() => {
              setShowToadStatus(false)
              SetShowLeaderboard(false)}}>
          </ToadStatus>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent, 
        document.getElementById("leaderboardRoot")
    );
  } else {
    return null;
  }    
}

export default Leaderboard;