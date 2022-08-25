

import { createSlice } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';
export interface ISocketReduxState {
    socket: Socket | undefined ; 
    uid: string ; 
    users: any ; 

}

 const initialState : ISocketReduxState = {
    socket: undefined , 
    uid: '' ,
    users: [] 
}

export type TSocketContextPayload = string | string[] | Socket;

export interface ISocketContextActions {
    
    payload: TSocketContextPayload;
}

export type TSocketPayload =   string | string [] | Socket ;

const socketSlice = createSlice({
    name: "socket",
    initialState , 
    reducers : {
        updateSocket(state, action : ISocketContextActions) {
            return { ...state, socket: action.payload as Socket };
        },
        updateUserId(state,action) {
            return { ...state, uid: action.payload as string };
        },
        updateUsers(state, action) {
            return { ...state, users: action.payload as string[] };
        },
        removeUser(state, action) {
            return { ...state, users: state.users.filter((uid:any) => uid !== (action.payload as string)) };
        } 
         
    }
})

export const {updateSocket, updateUserId, updateUsers, removeUser} = socketSlice.actions ;
export default socketSlice.reducer;
