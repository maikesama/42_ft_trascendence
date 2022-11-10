import React, {useState, useEffect} from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import io from 'socket.io-client';
import {Alert} from '../components/generic/Alert';


export function Test() {
//   const socket = io(`http://${process.env.REACT_APP_HOST_URI}:8002/`, { transports: ['websocket'] });
//   const [isConnected, setIsConnected] = useState(socket.connected);

//   useEffect(() => {
//     socket.on('connect', () => {
//       setIsConnected(true);
//       console.log('connected');
//     });

//     socket.on('disconnect', () => {
//       setIsConnected(false);
//       console.log('disconnected');
//     });
//   }, []);

  return (
    
    <div>
      <Alert />
    </div>
    )
  }
