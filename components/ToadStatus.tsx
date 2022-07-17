import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Button from "./Button"
import _, { sample, pluck, sortBy } from 'underscore'
import useSound from "use-sound";
import actionSelectSound from '../public/sounds/menuPingForward.mp3'
import closeMenuSound from '../public/sounds/menuPing4.mp3'

type Props = {
  show: boolean;
  vibingToadz: [{}];
  propSelectedToad: any;
  onClose: () => void
};

const ToadStatus = ({ show, vibingToadz, onClose }: Props) => {
  const [isBrowser, setIsBrowser] = useState(false)
  const [previewToad, setPreviewToad] = useState('')
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
        console.log('you')
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
    return (nineToadzShown[index].map((id, index) =>
      <div key={id.toadId} style={{display:'flex',  flexDirection:'column', flexWrap: 'wrap', justifyContent: 'flex-start', alignContent:'center', width:'33%', height:'33%', alignItems:'center', border:'', backgroundColor: ''}}>
        <img onClick={ () => {console.log(nineToadzShown)} } src={'/img/' + id.toadId.toString() +'.gif'} onError={({ currentTarget }) => {
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
      <div className='toadContainer' style={{position:'absolute', overflow: 'auto', top: '20%', display:'flex', flexWrap: 'wrap', flexDirection:'row', alignContent: 'flex-start', left: '2%', width: '95.5%',height:'78%', backgroundColor:'white'}}>
      </div>
      {/* <div className='toadPreview' style={{position:'absolute', alignItems: 'center', flexWrap:'wrap', top:'11%', left:'50%', display:'flex', width:'45%', height:'85%'}}>
        {previewToad != '' && (
          <div>
          <img src={previewToad} style={{width:'30%', height: '50%'}} />
          <progress></progress>
          <p>asdlfkj</p>  
          <Button
            text='Select Toad' 
            position=''
            display=''
            flex=''
            color='#332020'
            backgroundColor='#b0a28d'
            top='80%'
            left='50%'
            height=''
            width=''
            margin='10px'
            padding='0px'
            border=' 2px solid #673c37'
            borderRadius='5%'
            cursor= 'pointer'
            onClick={() => {
              propSelectedToad(previewToad)
              onClose() }}
          />
          </div> )}
      </div> */}
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