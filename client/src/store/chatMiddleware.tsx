import { Middleware  } from "redux";
import socketClient,{ io } from "socket.io-client";
import {socketActions} from "./socketSlide";

const URL_SOCKET = "http://localhost:5000/";

const chatMiddleware: Middleware = store => next => action => {
    const socket = socketClient(URL_SOCKET) ;

}