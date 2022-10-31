import {configureStore} from "@reduxjs/toolkit";
import ImageSlice from "./imageSlice";

import UserSlice from './slice'

const store =configureStore({
    reducer:{
        User:UserSlice,
        Image:ImageSlice
    }
})

export type RootSelector =ReturnType <typeof store.getState>
export type RootDispatch= typeof store.dispatch
export default store