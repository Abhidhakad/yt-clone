import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import constantReducer from "./slices/constantSlice";
import searchReducer from "./slices/searchSlice";


export const store = configureStore({
    reducer:{
        user:userReducer,
        constant: constantReducer,
        search:searchReducer
    }
});
