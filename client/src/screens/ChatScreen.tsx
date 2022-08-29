import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import socketClient from "socket.io-client";
import { useSocket } from "../hooks/useSocket";
import { useAppSelector, useAppDispatch } from "../store/hooks";

import ChatBox from "../components/ChatBox";

const ChatScreen = () => {
  
  
  var SOCKET = socketClient("http://localhost:5000/")
  SOCKET.on('connection', () => {
    console.log(`I am connected to the back ende bro`)
  })
  
  return <>
    <ChatBox />
  </>;
};

export default ChatScreen;
