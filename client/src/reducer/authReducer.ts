import { ADD_PROFILE, LOGIN_FAILURE, LOGIN_SUCCESS, REMOVE_DB_PROFILE, REMOVE_PROFILE, SET_DB_PROFILE } from "../constants/const"

export const initialState = {
    is_authenticated: false,
    db_profile: null,
    profile: null,
  }
  
  export const AuthReducer = (state = initialState, action:any) => {
      switch(action.type) {
        case LOGIN_SUCCESS:
          return {
            ...state,
            is_authenticated: true
          }
        case LOGIN_FAILURE:
          return {
            ...state,
            is_authenticated: false
          }
          case ADD_PROFILE:
            return {
              ...state,
              profile: action.payload
            }
          case REMOVE_PROFILE:
            return {
              ...state,
              profile: null
            }
          case SET_DB_PROFILE:
            return {
              ...state,
              db_profile: action.payload
            }
          case REMOVE_DB_PROFILE:
            return {
              ...state,
              db_profile: null
            }
        default:
          return state
      }
  }