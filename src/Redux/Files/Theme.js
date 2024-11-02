import { createSlice } from "@reduxjs/toolkit";

const initialState = ({
    Theme: "light"
})

export const themeSlice = createSlice({
    name: "Theme",
    initialState,
    reducers: ({
        darkTheme: ()=>{},
        lightTheme: () =>{}
    })
})

export const {darkTheme , lightTheme} = themeSlice.actions;

export default themeSlice.reducer