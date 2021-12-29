import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Button from "./Button"
import selectedToad from "../pages/index"
import setSelectedToad from "../pages/index"

type Props = {
  children: string;
  ownsToadzgotchis: boolean;
  show: boolean;
  imageURL: any;
  propSelectedToad;
  onClose: () => void
};
const callme = () => {
  
} 

const Modal = ({ children, ownsToadzgotchis, propSelectedToad, imageURL, show, onClose }: Props) => {
  const [isBrowser, setIsBrowser] = useState(false)
  const listItems = imageURL.map((image) =>
    <div key={image} style={{display:'flex', width:'auto',height:'30%', border:'2px solid #673c37' }}>
      <img onClick={ () => { propSelectedToad(image) } } src={image}/>
      {/* <Button
        text='SELECT'
        display=''
        flex=''
        color='#332020'
        backgroundColor='#b0a28d'
        margin='10px'
        padding='10px'
        border=' 2px solid #673c37'
        borderRadius='0px'
        onClick={()=>{}}
      /> */}
    </div>);

  useEffect(() => {
    setIsBrowser(true)
  }, []);
  
  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalWidth = 500;
  const windowWidth = (typeof window).innerWidth

  const modalContent = show ? (
    <div style={{
      position: 'absolute',
      width: `${modalWidth}px`,
      height: '300px',
      border: '2px solid #673c37',
      backgroundColor: '#b0a28d',
      zIndex: 1,
      top: '100px',
      left: `400px`
      }}>
      <a href="#" style={{border: '2px solid #673c37'}} onClick={handleCloseClick}>x</a>
      <div className='toadContainer' style={{display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start', marginLeft: '20px',height:'100%'}}>
        {ownsToadzgotchis? {listItems}.listItems : <div></div>}
      </div>
      {children}
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent, 
        document.getElementById("modal-root")
    );
  } else {
    return null;
  }    
}

export default Modal;