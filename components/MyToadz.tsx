import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Button from "./Button"

type Props = {
  ownsToadzgotchis: boolean;
  show: boolean;
  imageURL: any;
  propSelectedToad: any;
  onClose: () => void
};

const MyToadz = ({ ownsToadzgotchis, propSelectedToad, imageURL, show, onClose }: Props) => {
  const [isBrowser, setIsBrowser] = useState(false)
  const [previewToad, setPreviewToad] = useState('')

  const listItems = imageURL.map((image) =>
    <div key={image} style={{display:'flex', width:'100%', height:'100px', alignItems:'center', border:'2px solid #673c37' }}>
      <img onClick={ () => { setPreviewToad(image) } } src={image} style={{cursor:'pointer',height:'100%'}}/>
      <p>Toad Name</p>
      <progress></progress>
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
        {previewToad != '' && (
          <div>
          <img src={previewToad} style={{width:'30%', height: '50%'}} />
          <progress></progress>
          <p>Toad Level</p>
          <p>Toad Name</p>
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