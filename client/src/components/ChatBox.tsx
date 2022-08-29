import React, { useEffect, useState } from "react";
import ChatChannelList from "./ChatChannelList";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import axios from "axios";
import MessagePanel from "./MessagePanel";
import { getAllChannels } from "../store/socketSlide";
import socketClient from "socket.io-client";
const ChatBox = () => {
 const dispatch = useAppDispatch() ;
 
  useEffect(()=> {
    dispatch(getAllChannels()) ;
  })
  

  

  
  return (
    <>
      <div className="container mx-auto">
        <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
          <ChatChannelList />
          <MessagePanel />
        </div>
      </div>
    </>
  );
};

export default ChatBox;
