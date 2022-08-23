import { configureStore, createSlice } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import postReducer from "./postSlice"
import commentReducer from "./commentSlice"
export const store = configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,
        comment: commentReducer
    },
})

 // Infer the `RootState` and `AppDispatch` types from the store itself
 export type RootState = ReturnType<typeof store.getState>
 // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
 export type AppDispatch = typeof store.dispatch