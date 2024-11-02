import { configureStore } from "@reduxjs/toolkit";
import themeReducer from '../Files/Theme'
import employeeCountReducer from "../Files/Dashboard";

export const Store = configureStore({
    reducer:{
        Theme: themeReducer,
        Count: employeeCountReducer
    }
})