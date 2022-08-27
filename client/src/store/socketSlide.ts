

import { createSlice } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';
import { isReturnStatement } from 'typescript';
export interface ISocketReduxState {
     
    messages: string[]  | any | []

}

 const initialState : ISocketReduxState = {
    
    messages: [] ,
}



const socketSlice = createSlice({
    name: "socket",
    initialState , 
    reducers : {
        updateMesseage(state, action) {
            state.messages.push(action.payload)
        },
        takeAllMess(state) {
            return {...state}
        }
    }
})

export const {updateMesseage, takeAllMess} = socketSlice.actions ;
export default socketSlice.reducer;
