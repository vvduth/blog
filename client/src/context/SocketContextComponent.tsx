import React, {
  PropsWithChildren,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useSocket } from "../hooks/useSocket";
import {
  defaultSocketContextState,
  SocketContextProvider,
  SocketReducer,
} from "./Context";
import { getAllChannels, updateAllChannelsThroghtSocket2, updateParticipants } from "../store/socketSlide";

import { useAppDispatch, useAppSelector } from "../store/hooks";
export interface ISocketContextComponentProps extends PropsWithChildren {}

const SocketContextComponent: React.FunctionComponent<
  ISocketContextComponentProps
> = (props) => {
  const { children } = props;

  
  const dispath = useAppDispatch()
  const socket = useSocket("ws://localhost:5000", {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: false,
  });
  

  const [SocketState, SocketDispatch] = useReducer(
    SocketReducer,
    defaultSocketContextState
  );

  const loadAllChannels = async ()  => {
    await dispath(getAllChannels())
  }

  
  useEffect(() => {
    loadAllChannels()
    socket.connect();
    SocketDispatch({ type: "update_socket", payload: socket });
    StartListeners();

    // eslint-disable-next-line
  }, [dispath]);

  const StartListeners = () => {
    /** Messages */

    /** Connection / reconnection listeners */
    socket.io.on("reconnect", (attempt) => {
      console.info("Reconnected on attempt: " + attempt);
    });

    socket.on("channel", (channel: any) => {
      
      dispath(updateAllChannelsThroghtSocket2(channel)) ;
      
    });

    socket.io.on("reconnect_attempt", (attempt) => {
      console.info("Reconnection Attempt: " + attempt);
    });

    socket.io.on("reconnect_error", (error) => {
      console.info("Reconnection error: " + error);
    });

    socket.io.on("reconnect_failed", () => {
      console.info("Reconnection failure.");
      alert(
        "We are unable to connect you to the chat service.  Please make sure your internet connection is stable or try again later."
      );
    });
  };

  return (
    <SocketContextProvider value={{ SocketState, SocketDispatch }}>
      {children}
    </SocketContextProvider>
  );
};

export default SocketContextComponent;
