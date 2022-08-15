import { FETCH_DB_POSTS, REMOVE_DB_POSTS, REMOVE_DB_PROFILE, SET_DB_PROFILE } from "../constants/const"

export const set_db_profile = (profile:any) => {
    return {
      type: SET_DB_PROFILE,
      payload: profile
    }
  }
  
  export const remove_db_profile = () => {
    return {
      type: REMOVE_DB_PROFILE
    }
  }
  
  export const set_db_posts = (posts:any) => {
    return {
      type: FETCH_DB_POSTS,
      payload: posts
    }
  }
  
  export const remove_db_posts = () => {
    return {
      type: REMOVE_DB_POSTS
    }
  }