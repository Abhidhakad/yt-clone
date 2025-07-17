import { createSlice } from "@reduxjs/toolkit";

const constantSlice = createSlice({
  name: "constant", 
  initialState: {
    leftsidebar: false,
    rightsidebar: false,
    serachQuery:"",
  },
  reducers: {
    setLeftsidebar: (state, action) => {
      state.leftsidebar = action.payload;
    },
    setRightsidebar: (state, action) => {
      state.rightsidebar = action.payload;
    },
    setSearchQuery: (state,action) => {
      state.serachQuery = action.payload;
    }
  },
});


export const { setLeftsidebar, setRightsidebar, setSearchQuery } = constantSlice.actions;

export default constantSlice.reducer;
