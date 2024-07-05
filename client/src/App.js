import './App.css';
import QRCode from "react-qr-code";
import { useState , useEffect } from 'react';
import { io } from 'socket.io-client';

function App() {
    const [qrcode, setQrcode] = useState('');
    const [msg, setMsg] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [socket, setSocket] = useState(null);

    const initializeSocket = () => {
      const newSocket = io('http://localhost:4000');
      setSocket(newSocket);
  };

  useEffect(() => {
    if (socket) {
        socket.on('qrCodeEvent', (data) => {
            console.log(data);
            const {msg , qr} = data;
            setQrcode(qr);
            setMsg(msg);
            setLoaded(true);
        });

        socket.on('ready', (ready) => {
            console.log(ready);
        });

        return () => {
            socket.disconnect();
        };
    }
}, [socket]);

const handleButtonClick = () => {
  console.log('Send the WebSocket Connection...');
  setLoaded(false);
  if (socket) {
      socket.disconnect();
  }
  initializeSocket();
};

  return (
    <div className="App">
         {  loaded === false  ? (
            <button className='btn' onClick={handleButtonClick}>Get Qr Code</button>
           ) : (
                 <p>Loading...</p>
          )}
        
       { qrcode && 
          <div> 
                <h1>{msg}</h1>
                <QRCode value={qrcode}/>
          </div>
      }
    </div>
  );
}

export default App;