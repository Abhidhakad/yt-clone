import { createSlice } from "@reduxjs/toolkit";

const constantSlice = createSlice({
  name: "constant", 
  initialState: {
    leftsidebar: false,
    rightsidebar: false,
  },
  reducers: {
    setLeftsidebar: (state, action) => {
      state.leftsidebar = action.payload;
    },
    setRightsidebar: (state, action) => {
      state.rightsidebar = action.payload; // ✅ Fix: Removed extra `'`
    },
  },
});


export const { setLeftsidebar, setRightsidebar } = constantSlice.actions;

export default constantSlice.reducer;
