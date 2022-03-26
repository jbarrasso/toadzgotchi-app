import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Button from "./Button"

type Props = {
  show: boolean;
  ToadData: any;
  UpdateStats: any;
  Account: string;
  ownsToadzgotchis: boolean;
  SetToadId: any;
  SetToadDisplayState: any;
  ToadIdsOwned: any;
  onClose: () => void
};

const MyToadz = ({ UpdateStats, Account, ownsToadzgotchis, SetToadId, SetToadDisplayState, ToadData, ToadIdsOwned, show, onClose }: Props) => {
  const [isBrowser, setIsBrowser] = useState(false)
  const [previewToadId, setPreviewToadId] = useState(0)

  const listItems = ToadIdsOwned.map((image) =>
    <div key={image} style={{display:'flex', justifyContent:'space-around', width:'100%', height:'100px', alignItems:'center', border:'2px solid #673c37' }}>
      <img onClick={ () => { setPreviewToadId(image) } } src={'/img/' + image + '.png'} style={{cursor:'pointer',height:'100%'}}/>
      <div style={{display:'flex', flexDirection: 'column', alignItems:'center', justifyContent:'space-around', height:'100%'}}>
        <span style={{height:'auto', width:'100%', fontSize:'.75vw'}}>Overall Health</span>
        <progress max={10} value={ToadData[image-1].health} style={{border: 'solid 2px black', width:'100%'}}></progress>
      </div>
    </div>);

  useEffect(() => {
    setIsBrowser(true)
  }, []);
  
  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalWidth = 500;

  const modalContent = show ? (
    <div style={{position: 'absolute', top: '16%', left: '.5%', height: '68%', width: '99%', zIndex:2}}>
      <img style={{height:'100%', width: '100%'}} src='/img/menu.png'/>
      <a href="#" style={{ position: 'absolute', top:'-1%', right: '3%', fontSize:'20px'}} onClick={handleCloseClick}>x</a>
      <div className='toadContainer' style={{position:'absolute', overflow: 'auto', top: '11%', display:'flex', flexWrap: 'wrap', flexDirection:'row', alignContent: 'flex-start', left: '2.5%', width: '45%',height:'85%'}}>
        {ownsToadzgotchis? {listItems}.listItems : <div></div>}
      </div>
      <div className='toadPreview' style={{position:'absolute', alignItems: 'center', flexWrap:'wrap', top:'11%', left:'50%', display:'flex', width:'45%', height:'85%'}}>
        {previewToadId >= 1 && (
          <div style={{border:'2px solid black'}}>
            <img src={'/img/' + previewToadId + '.png'} style={{width:'30%', height: '50%'}} />
            <progress max={10} value={ToadData[previewToadId-1].health} style={{border: 'solid 2px black'}}></progress>
            <p>CrypToadz ID# {ToadData[previewToadId-1].toad_id}</p>
            { (ToadData[previewToadId-1].vibing == true) ?
            <div>
              {ToadData[previewToadId-1].toad_name != '' && (
              <p>Toad Name: {ToadData[previewToadId-1].toad_name}</p>
              )}
              <p>Toad Level: {ToadData[previewToadId-1].level}</p>
              <Button
                text='Select Toad'
                img=''
                position='absolute'
                display=''
                flex=''
                fontfamily=''
                color='#332020'
                backgroundColor='#b0a28d'
                top='80%'
                left='50%'
                height=''
                width=''
                margin='10px'
                padding='0px'
                border=' 2px solid #673c37'
                borderRadius=''
                cursor= 'pointer'
                onClick={() => {
                  SetToadId(previewToadId)
                  SetToadDisplayState('/img/' + previewToadId + '.png')
                  onClose() }}/>
            </div>
            :
            <Button
              text='Vibe'
              img=''
              position='relative'
              display=''
              flex=''
              fontfamily=''
              color='#332020'
              backgroundColor='#b0a28d'
              top=''
              left=''
              height='100%'
              width='50%'
              margin='0px'
              padding='0px'
              border=' 2px solid red'
              borderRadius=''
              cursor= 'pointer'
              onClick={() => {
                UpdateStats(['vibe', Account], previewToadId)
                SetToadId(previewToadId)
                SetToadDisplayState('/img/' + previewToadId + '.png')
                onClose() }}/>
            }
          </div> )}
      </div>
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