import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateUsers, updateUserId, updateSocket, removeUser } from "../store/socketSlide";
export interface SocketProps extends PropsWithChildren {}
const SocketComponent: FC<SocketProps> = (props: SocketProps) => {
  const { children } = props;
  const [loading, setIsLoading] = useState(true);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch() ; 

  const socket = useSocket('ws://localhost:5000', {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        autoConnect: false
    });

    useEffect(()=> {
        // connect to the web socket
        socket.connect() ; 

        // save to redux 
        dispatch(updateSocket(socket)) ;

        // start the event listener
        startListener() ;
        // send th e handshake

        startHandShake() ;
    },[])

    const startListener = () => {
        // Reconnect event
        socket.io.on('reconnect', (attemp) => {
            console.info("Reconnected on attemp ", + attemp) ;
        })

        // Reconnection attempt event
        socket.io.on('reconnect_attempt', (attemp) => {
            console.info("Reconnection on attemp ", + attemp) ;
        })

        // error of reconnection
        socket.io.on('reconnect_error', (error) => {
            console.info("Reconnection error ", + error) ;
        })

        // fail of reconnection
        socket.io.on('reconnect_failed', () => {
            console.info("Reconnection failed, can not connect to websocket ") ;
            alert("We can not connect, so sorry")
        })
    }
    const startHandShake = () => {
            console.info("sending handsahke to the server")
            socket.emit('handshake', (uid: string, users: any[]) => {
                console.log("user handshake callback messeage received") ;
                dispatch(updateUserId(uid)) ;
                dispatch(updateUsers(users)) ;
                
                setIsLoading(false) ;
            })
    }

  if (loading) return <p>... loading Socket IO ....</p>;
  return <div>{children}</div>;
};

export default SocketComponent;
