import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const ChatScreen = () => {
  const socket = io("http://localhost:5000/")
  
 
  socket.on('message', message  => {
    console.log(message)
  })
  
    

  return <div>ChatScreen</div>;
};

export default ChatScreen;
