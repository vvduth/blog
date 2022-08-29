import socketClient from "socket.io-client";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const URL_SOCKET = "http://localhost:5000/";
export interface Channel {
  name: string;
  participant: number;
  id: number;
  socket: any | [] | any[];
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
  "messeage/fetchAllChannels",
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
  (_k, { getState }) => {
    const state: any = getState();
    let socket = socketClient(URL_SOCKET);

    console.log(state, " from creat thunk");
    socket.on("connection", () => {
      console.log(`I am connected to the backend`);
    });

    socket.on("message", (message: any) => {
      state.channels!.forEach((c: any) => {
        if (c.id === message.channel_id) {
          if (!c.messages) {
            c.messages = [message];
          } else {
            c.messages.push(message);
          }
        }
      });
      // state.channels = channels ;
    });

    return socket;
  }
);

export const updateParticipants = createAsyncThunk(
  "messeage/updateParticipants",
  (id:any, { getState }) => {
    const state: any = getState();
    // id here is action, will rename when nesscessary
    console.log(state);
    
    let channel = state.message.channels!.find((c: any) => {
      return c.id === id;
    });
    console.log("this is seleted chaneel ",channel);
    state.message.socket.emit("channel-join", id, (_ack: any) => { /* TODO document why this arrow function is empty */ });
    return channel ; 
  }
);

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setUpSocket(state) {
      let socket = socketClient(URL_SOCKET);
      socket.on("connection", () => {
        console.log(`I am connected to the backend`);
      });

      state.socket = socket;
    },

    sendMessage(state, action) {
      state.socket.emit("send-message", action.payload);
    },
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
        console.log(action.payload);
        state.socket = action.payload;
      }
    );
    builder.addCase(
      updateParticipants.fulfilled,
      (state, action: PayloadAction<any>) => {
        //console.log(action.payload);
        console.log(action.payload);
        state.selectedChannel = action.payload;
      }
    );
  },
});

export const { setUpSocket, sendMessage } = socketSlice.actions;
export default socketSlice.reducer;
