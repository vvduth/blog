import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import socketClient from "socket.io-client";
import { useSocket } from "../hooks/useSocket";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setUpAndUpdateSocket } from "../store/socketSlide";
import ChatBox from "../components/ChatBox";
import ChatBoxChilderDemo from "../components/ChatBoxChilderDemo";

import SocketContextComponent from "../context/SocketContextComponent";

const ChatScreen = () => {
  const dispatch = useAppDispatch() ; 
  
  
  
  return <>
    <SocketContextComponent>
      <ChatBox />
    </SocketContextComponent> 
    
  </>;
};

export default ChatScreen;
