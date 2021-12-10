import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { readToadStats } from "../pages/index"
//import styled from "styled-components";
//const data = readToadStats(true)
//console.log(data)

type Props = {
    children: string;
    ownsToadzgotchis: boolean;
    toadzgotchisOwned: () => any;
    show: boolean;
    stats:any;
    onClose: () => void
  };

const Modal = ({ children, ownsToadzgotchis, toadzgotchisOwned, stats, show, onClose }: Props) => {
  const [isBrowser, setIsBrowser] = useState(false);
  //const [data, setData] = useState([])
  //const data =[{"name":"test1"},{"name":"test2"}];

  const listItems = stats.map((d) => 
    <div key={d} style={{display:'flex', width:'30%',height:'30%', border:'2px solid #673c37' }}>
      {d}
      <img src='/img/bruce.png'/>
    </div>);
  console.log(listItems)

  // function retrievestats() {
  //   readToadStats(true).then((result) => {
  //     setData(result)
  //   }).catch((err) => {
  //     console.log(err);
  //   });
  // } 

  useEffect(() => {
    setIsBrowser(true)
    //retrievestats()
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
        {ownsToadzgotchis? {listItems}.listItems : <div></div>}
        {/* {ownsToadzgotchis && 
        (
          //{listItems}
            // <div style={{display:'flex', width:'30%',height:'30%', border:'2px solid #673c37' }}>
            // <img src='/img/bruce.png'/>
            // </div>
          
        )
        } */}
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