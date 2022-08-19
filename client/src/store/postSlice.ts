import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


interface Post {
    pid: number, 
    author: string, 
    title: string,
    body: string, 
    user_id: number,
    date_created: string, 
    like_user_id?: number[] | null ,
    likes?: number 
}
export interface PostState {
    post: Post | null | any
}

const initialState : PostState = {
    post: null
}

export const getOnePost = createAsyncThunk(
    "post/getOnePost",
    async(k: any) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/posts/${k}`) ;
            return response.data
        } catch(e:any) {
            return e.response.data
        }
    }
)

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
      resetState(state) {
        state.post = {}
      }
    },
    extraReducers(builder) {
      builder.addCase(
        getOnePost.fulfilled,
        (state, action: PayloadAction<Post>) => {
          state.post = action.payload;
          console.log("action is fulfullied")
          console.log(action.payload)
          console.log("state post", state.post)
        }
      )
    },
  });

  export const {resetState} = postSlice.actions ;
  export default postSlice.reducer