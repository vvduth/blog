import socketClient from "socket.io-client";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { useSocket } from "../hooks/useSocket";

const URL_SOCKET = "http://localhost:5000/";
export interface Channel {
  name: string;
  participants: number;
  id: number;
  socket: any | [] | any[];
  messages?: any | [] | string[] | any[] | null;
}

export interface ChatState {
  channels: Channel[] | null | [];
  socket: any | [] | any[];
  selectedChannel: Channel | null | any;
}

const initialState: ChatState = {
  channels: null,
  socket: null,
  selectedChannel: null,
};

export const getAllChannels = createAsyncThunk(
  "message/fetchAllChannels",
  async (_k, { getState }) => {
    const state: any = getState();
    const userInfo = state.user.user;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      const response = await axios.get(
        `http://localhost:5000/api/chat/allChannels`,
        config
      );

      return response.data.channels;
    } catch (e: any) {
      console.log("catch some error", e);
      return e.response.data;
    }
  }
);

export const setUpAndUpdateSocket = createAsyncThunk(
  "message/setupAndUpdateSocket",
  (k) => {
    return k;
  }
);



export const updateParticipants = createAsyncThunk(
  "message/updateParticipants",
  (id: any, { getState }) => {
    const state: any = getState();

    let channel = state.message.channels.find((c: any) => {
      return c.id === id;
    });
    
    console.log("after finding",  channel )

    return channel;
  }
);



export const sendMessage = createAsyncThunk(
  "message/sendMesseage",
  (k: any, { getState }) => {
    return k;
  }
);

export const updateAllChannelsThroghtSocket2  = createAsyncThunk(
  "messeage/updateParticipantInSocket",
  (channel:any, {getState}) => {
    return channel
  }
)

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    updateAllChannelsThroghtSocket(state, action) {
      console.log(action.payload)
      return {...state, channels: action.payload}
    }
  },
  extraReducers(builder) {
    builder.addCase(
      getAllChannels.fulfilled,
      (state, action: PayloadAction<Channel[]>) => {
        state.channels = action.payload;
      }
    );
    builder.addCase(
      setUpAndUpdateSocket.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.socket = action.payload;
      }
    );
    builder.addCase(
      updateParticipants.fulfilled,
      (state, action: PayloadAction<any>) => {
        
        state.selectedChannel = action.payload;
        
      }
    );
    builder.addCase(
      updateAllChannelsThroghtSocket2.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.channels.forEach ((c:Channel) => {
          if (c.id === action.payload.id) {
            c.participants = action.payload.participants;
        }
        })
        
      }
    );
    builder.addCase(
      sendMessage.fulfilled,
      (state, action: PayloadAction<any>) => {
        
        state.channels?.forEach((c: any) => {
          if (c.id === action.payload.channel_id) {
            if (!c.messages) {
              c.messages = [action.payload];
            } else {
              c.messages.push(action.payload);
            }
          }
        });
      }
    );
  },
});

export const  {updateAllChannelsThroghtSocket} = socketSlice.actions;
export default socketSlice.reducer;
