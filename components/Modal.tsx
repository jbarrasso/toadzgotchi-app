import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
//import styled from "styled-components";

type Props = {
    children: string;
    ownsToadzgotchis: boolean;
    show: boolean;
    onClose: () => void
  };

const Modal = ({ children, ownsToadzgotchis, show, onClose }: Props) => {
    const [isBrowser, setIsBrowser] = useState(false);
  
    useEffect(() => {
      setIsBrowser(true);
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
            <div className='toadContainer' style={{display: 'flex',height:'100%'}}>
            {ownsToadzgotchis && 
                (
                <div style={{display:'flex', width:'30%',height:'30%', border:'2px solid #673c37' }}>
                <img src='/img/bruce.png'/>
                </div>)}
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