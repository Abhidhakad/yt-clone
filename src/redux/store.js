import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import constantReducer from "./slices/constantSlice";


export const store = configureStore({
    reducer:{
        user:userReducer,
        constant: constantReducer,
    }
});
