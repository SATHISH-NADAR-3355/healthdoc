import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    reloadUser :'true',
  },
  reducers: {
    setUser: (state, action) => {  //fn name=setUser parameters=state&action
      state.user = action.payload; 
    },
    // reloadUserData: (state, action) => { //fn name=reloadUserData parameters=state&action
    //   state.reloadUser = action.payload;
    // } //got a different workaround
  },
});

export const { setUser, reloadUserData } = userSlice.actions;