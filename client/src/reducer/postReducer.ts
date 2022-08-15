import { FETCH_DB_POSTS, REMOVE_DB_POSTS } from "../constants/const"

export const initialState = {
    posts: null,
  }
  
  export const PostsReducer = (state = initialState, action:any) => {
      switch(action.type) {
        case FETCH_DB_POSTS:
          return {
            ...state,
            posts: action.payload
          }
        case REMOVE_DB_POSTS:
          return {
            ...state,
            posts: []
          }
  
        default:
          return state
      }
  }