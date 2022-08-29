import  socketClient  from 'socket.io-client';
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk , PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';


const URL_SOCKET = 'http://localhost:5000/'
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
        setUpSocket(state) {
          let socket = socketClient(URL_SOCKET) ;
          socket.on('connection', () => {
            console.log(`I am connected to the backend`)
          })
          state.socket = socket ;
        },
        updateParticipants(state:ChatState,id:any) {
          // id here is action, will rename when nesscessary
          console.log("id ",id.payload)
          let channel = state.channels!.find(c => {
            return c.id === id.payload ; 
          })
          console.log(channel)
          state.selectedChannel = channel ; 
          state.socket.emit('channel-join',id, (_ack: any) => {

          });
        }
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

export const {setUpSocket, updateParticipants} = socketSlice.actions ;
export default socketSlice.reducer;
