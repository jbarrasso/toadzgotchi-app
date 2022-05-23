import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
    show: boolean;
    ToadId: string;
    ToadData: any;
    UpdateStats: any;
    Account: string;
    SetGlobalMessage: any;
    SetToadDisplayState: any;
    onClose: () => void;
};

const RestMenu = ({ show, ToadId, ToadData, UpdateStats, Account, SetGlobalMessage, onClose }: Props) => {
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
        <div className='firstRest' style={{ display: 'flex', justifyContent:'space-around', alignItems:'center', width: '100%', height:'20%'}}>
          <div style={{display: 'flex', alignItems:'center'}} onClick={()=>{
            UpdateStats(['sleep', Account], ToadId)
            SetGlobalMessage('')
            document.getElementById('typewriterText').classList.remove('typewriterEffect')
            document.getElementById('typewriterText').classList.add('hidden')
            onClose()
            } }>
            <img src='/img/bedicon.png' style={{fontSize:'40px'}}/>
          </div>
          <p>Sleep</p>
          <p></p>
        </div>
        <div className='secondRest' style={{ display: 'flex', justifyContent:'space-around', alignItems:'center', width: '100%', height:'20%'}}>
          {/* <div style={{display: 'flex', alignItems:'center'}} onClick={()=>{
            UpdateStats(['sleep', Account], ToadId)
            SetGlobalMessage('')
            document.getElementById('typewriterText').classList.remove('typewriterEffect')
            document.getElementById('typewriterText').classList.add('hidden')
            onClose()
            } }>
            <FontAwesomeIcon icon='bed' style={{fontSize:'40px'}}/>
          </div>
          <p>Power Nap</p> */}
        </div>
        <div className='thirdRest' style={{display: 'flex', justifyContent:'space-around', alignItems:'center', width: '100%', height:'20%'}}>
          {/* <FontAwesomeIcon icon='bed' style={{fontSize:'40px'}}/>
          <p>Hibernate</p> */}
        </div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent, 
        document.getElementById("restMenuRoot")
    );
  } else {
    return null;
  }    
}

export default RestMenu;