import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
    show: boolean;
    confirmPromptMessage: string;
    yesMessage: string;
    propSetGlobalMessage: any;
    onClose: () => void;
};

const Confirm = ({ show, confirmPromptMessage, yesMessage, propSetGlobalMessage, onClose }: Props) => {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, []);
  
  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const newMessage = (message: string) => {
    propSetGlobalMessage('')
    document.getElementById('typewriterText').classList.remove('typewriterEffect')
    document.getElementById('typewriterText').classList.add('hidden')
    setTimeout(() => {
        propSetGlobalMessage(message)
        document.getElementById('globalMessageContainer').classList.remove('hidden')
        document.getElementById('typewriterText').classList.add('typewriterEffect')
        document.getElementById('typewriterText').classList.remove('hidden')
    }, 100);
  }

  const modalContent = show ? (
    <div style={{position: 'absolute', fontSize:'12px', top: '15%', left: '70%', height: '68%', width: '100%', zIndex:4}}>
        <img style={{height:'100%', width: '100%'}} src='/img/menu.png'/>
        <a href="#" style={{ position: 'absolute', top:'-1%', right: '3%', fontSize:'20px'}} onClick={handleCloseClick}>x</a>
        <div style={{position: 'absolute', top:'10%'}}>
            {confirmPromptMessage}
            <p onClick={()=>{newMessage(yesMessage); onClose()}}>Yes</p>
            <p onClick={()=>{onClose()}}>No</p>
        </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent, 
        document.getElementById("confirmRoot")
    );
  } else {
    return null;
  }    
}

export default Confirm;