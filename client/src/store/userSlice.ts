import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface UserLoginInput {
  email: string;
  password: string;
}

export interface UserRegisterInput {
  email: string;
  username: string ;
  password: string;

}
export interface User {
  email: string;
  username: string;
  token: string;
  role: boolean;
  id: number |string;
}

export interface UserState {
  user: User | null | {};
}

const initialState: UserState = {
  user: null,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (k: UserLoginInput) => {
    let email = k.email ;
    let password = k.password ;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        `http://localhost:5000/api/users/login`,
        {email , password },
        config
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data
    } catch (e: any) {
      console.log("catched some eror",e.response.data);
      return e.response.data;
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (k: UserRegisterInput) => {
    let email = k.email ;
    let password = k.password ;
    let username = k.username ;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        `http://localhost:5000/api/users/register`,
        {username,email  , password },
        config
      );
      //console.log(response.data)
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data
    } catch (e: any) {
      console.log("cathed some error",e);
      return e.message;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = {} ;
      localStorage.removeItem('user') ;
    },
    autoLogin(state) {
      const userLogin = localStorage.getItem("user") as any ;
      const userLoginJson =  JSON.parse(userLogin)
      if (userLoginJson) {
        state.user = userLoginJson
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      }
    )
    builder.addCase(
      loginUser.rejected,
      (state, action: PayloadAction<any>) => {
        
        console.log(action)
      }
    )
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        //console.log(action.payload)
      }
    )
  },
});

export const {logoutUser, autoLogin} = userSlice.actions ;
export default userSlice.reducer;
