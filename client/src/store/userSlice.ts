import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface UserLoginInput {
  email: string;
  password: string;
}
export interface User {
  email: string;
  username: string;
  token: string;
  role: boolean;
  id: number;
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
      console.error(e);
      return e.message;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        //console.log(action.payload)
      }
    );
  },
});

export default userSlice.reducer;
