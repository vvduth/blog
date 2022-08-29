

import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk , PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

export interface Channel  {
    name: string,
    participant: number ,
    id: number , 
    socket: any | [] | any[] ,
}

export interface ChatState {
    channels : Channel[] | null | []; 
    socket: any| []| any[]  ,
    selectedChannel : Channel | null  | any;
}

 const initialState : ChatState = {
    channels: null ,
    socket : null ,
    selectedChannel: null,

}   

export const getAllChannels = createAsyncThunk(
    "messeage/fetchAllChannels",
    async (_k,{ getState }) => {
      const state: any = getState();
      const userInfo = state.user.user;
      console.log(userInfo)
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      try {
        const response = await axios.get(`http://localhost:5000/api/chat/allChannels` ,config);
        console.log(response.data);
        //const likes = response.data.likes
        return response.data.channels
      } catch (e: any) {
        console.log("catch some error", e);
        return e.response.data;
      }
    }
  );


const socketSlice = createSlice({
    name: "socket",
    initialState , 
    reducers : {
        
    },
    extraReducers(builder) {
        builder.addCase(
          getAllChannels.fulfilled,
          (state, action: PayloadAction<Channel[]>) => {
            state.channels = action.payload 
          }
        )
      },
})

export const {} = socketSlice.actions ;
export default socketSlice.reducer;
