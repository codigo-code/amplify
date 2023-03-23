import logo from './logo.svg';
import './App.css';
import axios, { Axios } from 'axios';
import QRCode from 'react-qr-code';
import React,{ useEffect, useState } from 'react';

function App() {

  const [merchant, setMerchant] = useState(0);  
  const [parm, setParm] = useState(0);  
  const [back, setBack] = useState('#FFFFFF');
  const [fore, setFore] = useState('#000000');
  const [size, setSize] = useState(256);
  const [props, setProps] = useState(0);

useEffect(()=>{
  const queryParams = new URLSearchParams(window.location.search)
      const order = queryParams.get("order")
      const name = queryParams.get("name")
      const status = queryParams.get("status")
      const obj ={
        order: order,
        status:status
      }
      setParm(obj)

},[])

const generateQR =()=>{
   
  axios.get("https://r2pdpapf8k.execute-api.us-east-1.amazonaws.com/prod/beeper").then(data =>{
    const i =  Math.floor(Math.random() * data.data.length);
    
    

    const mer = data.data[i];
    console.log(mer);
   
    console.log(parm);

    console.log(`http://beeper-bucket-website.s3-website-us-east-1.amazonaws.com/?order=${mer.order}&name=${mer.name}&status=${mer.status}`);
    
    setMerchant(`http://beeper-bucket-website.s3-website-us-east-1.amazonaws.com/?order=${mer.id}`);
  })
}

  return (
    <div className="App">
      <header className="App-header">
      <button onClick={generateQR}> Generate qr</button> <br/>

      {merchant && (
        <QRCode
          title="GeeksForGeeks"
          value={merchant}
          bgColor={back}
          fgColor={fore}
          size={size === '' ? 0 : size}
        />
      )}
      </header>
    </div>
  );
}

export default App;
