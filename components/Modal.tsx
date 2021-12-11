import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Button from "./Button"

type Props = {
  children: string;
  ownsToadzgotchis: boolean;
  show: boolean;
  stats: any;
  onClose: () => void
};

const Modal = ({ children, ownsToadzgotchis, stats, show, onClose }: Props) => {
  const [isBrowser, setIsBrowser] = useState(false)
  const listItems = stats.map((d) => 
    <div key={d} style={{display:'flex', width:'30%',height:'30%', border:'2px solid #673c37' }}>
      <img src={d}/>
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

  const modalContent = show ? (
    <div style={{
      position: 'absolute',
      width: '500px',
      height: '300px',
      border: '2px solid #673c37',
      backgroundColor: '#b0a28d',
      top: '0px',
      left: '0px'
      }}>
      <a href="#" style={{border: '2px solid #673c37'}} onClick={handleCloseClick}>x</a>
      <div className='toadContainer' style={{display: 'flex', height:'100%'}}>
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