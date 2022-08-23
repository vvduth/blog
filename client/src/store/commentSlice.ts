import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { CommentSingle, CommentProps } from "../components/CommentSection";

export interface CommentState {
  comments: CommentSingle[] | null | [];
}

const initialState: CommentState = {
  comments: null,
};

export const getAllComments = createAsyncThunk(
  "post/getAllComment",
  async (k: any) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/posts/${k}/comments`
      );
      return response.data;
    } catch (e: any) {
      return e.response.data;
    }
  }
);

export const postComment = createAsyncThunk(
  "post/postComment",
  async (k: any, { getState }) => {
    const state: any = getState();
    const { postId, comment } = k;
    const userInfo = state.user.user;
    console.log(comment);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/${postId}/comments`,
        { comment },
        config
      );
      //console.log(response.data);

      return response.data;
    } catch (e: any) {
      console.log("catch some error", e);
      return e.response.data;
    }
  }
);

const commentSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetState(state) {
      state.comments = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getAllComments.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.comments = action.payload;
      }
    );
    builder.addCase(
      postComment.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.comments.push(action.payload);
      }
    );
  },
});

export const { resetState } = commentSlice.actions;
export default commentSlice.reducer;
