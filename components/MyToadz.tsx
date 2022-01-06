import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

type Props = {
  children: string;
  ownsToadzgotchis: boolean;
  show: boolean;
  imageURL: any;
  propSelectedToad: any;
  onClose: () => void
};

const MyToadz = ({ children, ownsToadzgotchis, propSelectedToad, imageURL, show, onClose }: Props) => {
  const [isBrowser, setIsBrowser] = useState(false)
  const listItems = imageURL.map((image) =>
    <div key={image} style={{display:'flex', width:'auto', height:'40%', border:'2px solid #673c37' }}>
      <img onClick={ () => { propSelectedToad(image) } } src={image}/>
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

export default MyToadz;