import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Post {
  pid: number;
  author: string;
  title: string;
  body: string;
  user_id: number;
  date_created: string;
  like_user_id?: number[] | null;
  likes?: number;
}
export interface PostState {
  post: Post | null | any;
}

const initialState: PostState = {
  post: null,
};

export const getOnePost = createAsyncThunk(
  "post/getOnePost",
  async (k: any) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/posts/${k}`);
      return response.data;
    } catch (e: any) {
      return e.response.data;
    }
  }
);

export const sendLike = createAsyncThunk(
  "post/sendLike",
  async (k: any, { getState }) => {
    const state: any = getState();
    const userInfo = state.user.user;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      const response = await axios.put(`http://localhost:5000/api/posts/${k}/like`,{} ,config);
      console.log(response.data);
      const likes = response.data.likes
      return {...state.post.post,likes: likes, like_user_id: response.data.like_user_id};
    } catch (e: any) {
      console.log("catch some error", e);
      return e.response.data;
    }
  }
);


const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetState(state) {
      state.post = {};
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getOnePost.fulfilled,
      (state, action: PayloadAction<Post>) => {
        state.post = action.payload;
        console.log("action is fulfullied");
        console.log(action.payload);
        console.log("state post", state.post);
      }
    );
    builder.addCase(sendLike.fulfilled, (state, action: PayloadAction<any>) => {
      //console.log(action.payload);
      console.log(action.payload)
    });
  },
});

export const { resetState } = postSlice.actions;
export default postSlice.reducer;
