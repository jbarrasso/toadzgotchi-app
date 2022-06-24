import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Button from "./Button"

type Props = {
  show: boolean;
  ToadData: any;
  UpdateStats: any;
  Account: string;
  OwnsToadz: boolean;
  SetToadId: any;
  SetToadDisplayState: any;
  ToadIdsOwned: any;
  SetIsVibing: any;
  onClose: () => void
};

const MyToadz = ({ UpdateStats, Account, OwnsToadz, SetToadId, SetToadDisplayState, ToadData, ToadIdsOwned, SetIsVibing, show, onClose }: Props) => {
  const [isBrowser, setIsBrowser] = useState(false)
  const [previewToadId, setPreviewToadId] = useState(0)
  let selectedToad = ToadIdsOwned[0]

  const listItems = ToadIdsOwned.map((image: number) =>
    <div key={image} style={{display:'flex', justifyContent:'space-around', width:'100%', height:'35%', alignItems:'center', border:'2px solid #673c37' }}>
      <img onClick={ () => { selectedToad = image
      console.log(selectedToad)
      setPreviewToadId(image)
      console.log(previewToadId) } } src={'/img/' + image + '.gif'} style={{cursor:'pointer',height:'100%'}}/>
      <div style={{display:'flex', flexDirection: 'column', alignItems:'center', justifyContent:'space-around', height:'100%'}}>
        <span style={{height:'auto', width:'100%', fontSize:'.75vw'}}>Overall Health</span>
        <progress max={10} value={ToadData[image-1].overall} style={{border: 'solid 2px black', width:'100%'}}></progress>
      </div>
    </div>);

  useEffect(() => {
    setIsBrowser(true)
  }, []);

  useEffect(() => {

  }, [])
  
  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalWidth = 500;

  const modalContent = show ? (
    <div style={{position: 'absolute', top: '16%', left: '.5%', height: '68%', width: '99%', zIndex:2}}>
      <img style={{height:'100%', width: '100%'}} src='/img/menu.png'/>
      <a href="#" style={{ position: 'absolute', top:'-1%', right: '3%', fontSize:'20px'}} onClick={handleCloseClick}>x</a>
      <div className='toadContainer' style={{overflow: 'scroll',position:'absolute', top: '11%', display:'flex', flexWrap: 'wrap', flexDirection:'row', alignContent: 'flex-start', left: '2.5%', width: '45%',height:'85%'}}>
        { OwnsToadz ? {listItems}.listItems : 
        <div style={{position:'absolute', top:'30%', left:'30%', fontSize:'1.5vmin', border: '', width:'1000px'}}> 
          You don't own any eligible NFTs for play!
        </div>}
      </div>
      {previewToadId >= 1 && (
      <div className='toadPreview' style={{position:'absolute', flexDirection:'row', alignItems: 'flex-start', flexWrap:'wrap', alignContent: 'flex-start', top:'11%', left:'50%', display:'flex', width:'45%', height:'85%'}}>
            <img src={'/img/' + previewToadId + '.gif'} style={{width:'35%', height: '35%'}} />
            <p style={{width:'60%', fontSize: '.75vw', textAlign: 'center'}}>CrypToadz ID# {ToadData[previewToadId-1].toadId}</p>
            { (ToadData[previewToadId-1].vibing == true) ?
            <div style={{width: '100%', height: '65%',textAlign: 'center', overflow:'scroll', padding:'1px'}}>
              {ToadData[previewToadId-1].toadName != '' && (
              <p style={{width:'', fontSize:'.5vw'}}>Toad Name: {ToadData[previewToadId-1].toadName}</p>
              )}
              <p style={{fontSize:'.75vw', margin:'0px'}}>Overall Health</p> 
              <progress max={10} value={ToadData[previewToadId-1].overall} style={{border: 'solid 2px black'}}></progress>
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
                  SetToadId(previewToadId.toString())
                  
                  if (ToadData[previewToadId-1].overall >= 8) {
                    SetToadDisplayState('/img/' + previewToadId + '-happy.gif')
                    document.getElementById('tombstone').classList.add('hidden')
                    document.getElementById('toad').classList.remove('hidden')
                  } else if (ToadData[previewToadId-1].happiness <= 2) {
                    SetToadDisplayState('/img/' + previewToadId + '-sad.gif')
                    document.getElementById('tombstone').classList.add('hidden')
                    document.getElementById('toad').classList.remove('hidden')
                  } else {
                    SetToadDisplayState('/img/' + previewToadId + '.gif')
                    document.getElementById('tombstone').classList.add('hidden')
                    document.getElementById('toad').classList.remove('hidden')
                  }

                  //change to each stat &&
                  if (ToadData[previewToadId-1].overall == 0) {
                    document.getElementById('toad').classList.add('hidden')
                    document.getElementById('tombstone').classList.remove('hidden')
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
                SetToadId(previewToadId.toString())

                if (ToadData[previewToadId-1].overall >= 8) {
                  SetToadDisplayState('/img/' + previewToadId + '-happy.gif')
                  document.getElementById('tombstone').classList.add('hidden')
                  document.getElementById('toad').classList.remove('hidden')
                } else if (ToadData[previewToadId-1].happiness <= 2) {
                  SetToadDisplayState('/img/' + previewToadId + '-sad.gif')
                  document.getElementById('tombstone').classList.add('hidden')
                  document.getElementById('toad').classList.remove('hidden')
                } else {
                  SetToadDisplayState('/img/' + previewToadId + '.gif')
                  document.getElementById('tombstone').classList.add('hidden')
                  document.getElementById('toad').classList.remove('hidden')
                }

                //change to each stat &&
                if (ToadData[previewToadId-1].overall == 0) {
                  document.getElementById('toad').classList.add('hidden')
                  document.getElementById('tombstone').classList.remove('hidden')
                }
                console.log(selectedToad)
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
                onClose() }}/>
            }
      </div>)}
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