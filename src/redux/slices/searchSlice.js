import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {},
  reducers: {
    cacheResults: (state, action) => {
      Object.assign(state, action.payload);

      const maxCacheResults = 100;
      const keys = Object.keys(state); 

      if (keys.length > maxCacheResults) {
        const excessCount = keys.length - maxCacheResults;
        keys.slice(0, excessCount).forEach((key) => delete state[key]);
      }
    },
  },
});

export const { cacheResults } = searchSlice.actions;
export default searchSlice.reducer;
