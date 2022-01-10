import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
    show: boolean;
    propSetGlobalMessage: any;
    onClose: () => void;
};

const PlayMenu = ({ show, propSetGlobalMessage, onClose }: Props) => {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, []);
  
  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const feed = () => {
    handleCloseClick
  }

  const modalContent = show ? (
    <div style={{position: 'absolute', top: '16%', left: '.5%', height: '68%', width: '40%', zIndex:2}}>
        <img style={{height:'100%', width: '100%'}} src='/img/menu.png'/>
        <a href="#" style={{ position: 'absolute', top:'-1%', right: '3%', fontSize:'20px'}} onClick={handleCloseClick}>x</a>
        <div className='foodSelection' style={{position: 'absolute', top: '12%',display:'flex', flexDirection: 'column',height:'86%', width:'95%',marginLeft:'2.5%'}}>
            <div className='firstPlay' style={{ display: 'flex', justifyContent:'space-around', alignItems:'center', width: '100%', height:'20%'}}>
                <div style={{display: 'flex', alignItems:'center'}} onClick={()=>{
                    propSetGlobalMessage('')
                    document.getElementById('typewriterText').classList.remove('typewriterEffect')
                    document.getElementById('typewriterText').classList.add('hidden')
                    setTimeout(() => {
                        propSetGlobalMessage(`...`)
                        document.getElementById('globalMessageContainer').classList.remove('hidden')
                        document.getElementById('typewriterText').classList.add('typewriterEffect')
                        document.getElementById('typewriterText').classList.remove('hidden')
                    }, 100);
                    onClose()
                    } }>
                    <FontAwesomeIcon icon='laugh-wink' style={{fontSize:'40px'}}/>
                </div>
                <p>Play Gameboy</p>
                <p>20+</p>
            </div>
            <div className='secondPlay' style={{ display: 'flex', justifyContent:'space-around', alignItems:'center', width: '100%', height:'20%'}}>
                <FontAwesomeIcon icon='laugh-wink' style={{fontSize:'40px'}}/>
                <p>Go Camping</p>
                <p>15+</p>
            </div>
            <div className='thirdPlay' style={{ display: 'flex', justifyContent:'space-around', alignItems:'center', width: '100%', height:'20%'}}>
                <FontAwesomeIcon icon='laugh-wink' style={{fontSize:'40px'}}/>
                <p>Play Sport</p>
                <p>35+</p>
            </div>
            <div className='fourthPlay' style={{display: 'flex', justifyContent:'space-around', alignItems:'center', width: '100%', height:'20%'}}>
                <FontAwesomeIcon icon='laugh-wink' style={{fontSize:'40px'}}/>
                <p>Visit A Friend</p>
            </div>
        </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent, 
        document.getElementById("playMenuRoot")
    );
  } else {
    return null;
  }    
}

export default PlayMenu;