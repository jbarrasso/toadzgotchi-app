import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
    show: boolean;
    propSetGlobalMessage: any;
    onClose: () => void;
};

const FoodMenu = ({ show, propSetGlobalMessage, onClose }: Props) => {
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
            <div className='firstFood' style={{ display: 'flex', justifyContent:'space-around', alignItems:'center', width: '100%', height:'20%'}}>
                <div style={{display: 'flex', alignItems:'center'}} onClick={()=>{
                    propSetGlobalMessage('')
                    document.getElementById('typewriterText').classList.remove('typewriterEffect')
                    document.getElementById('typewriterText').classList.add('hidden')
                    setTimeout(() => {
                        propSetGlobalMessage(`Mmmm toad loves carrots...`)
                        document.getElementById('globalMessageContainer').classList.remove('hidden')
                        document.getElementById('typewriterText').classList.add('typewriterEffect')
                        document.getElementById('typewriterText').classList.remove('hidden')
                    }, 100);
                    onClose()
                    } }>
                    <FontAwesomeIcon icon='carrot' style={{fontSize:'40px'}}/>
                </div>
                <p>Carrot</p>
                <p>20+</p>
            </div>
            <div className='secondFood' style={{ display: 'flex', justifyContent:'space-around', alignItems:'center', width: '100%', height:'20%'}}>
                <FontAwesomeIcon icon='ice-cream' style={{fontSize:'40px'}}/>
                <p>Ice Cream</p>
                <p>15+</p>
            </div>
            <div className='thirdFood' style={{ display: 'flex', justifyContent:'space-around', alignItems:'center', width: '100%', height:'20%'}}>
                <FontAwesomeIcon icon='hotdog' style={{fontSize:'40px'}}/>
                <p>Hot Dog</p>
                <p>35+</p>
            </div>
            <div className='fourthFood' style={{display: 'flex', justifyContent:'space-around', alignItems:'center', width: '100%', height:'20%'}}>
                <FontAwesomeIcon icon='pepper-hot' style={{fontSize:'40px'}}/>
                <p>Pepper</p>
                <p>25+</p>
            </div>
            <div className='fifthFood' style={{ display: 'flex', justifyContent:'space-around', alignItems:'center', width: '100%', height:'20%'}}>
                <FontAwesomeIcon icon='candy-cane' style={{fontSize:'40px'}}/>
                <p>Candy Cane</p>
                <p>10+</p>
            </div>
        </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent, 
        document.getElementById("foodMenuRoot")
    );
  } else {
    return null;
  }    
}

export default FoodMenu;