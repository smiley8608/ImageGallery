import {configureStore} from "@reduxjs/toolkit";

import UserSlice from './slice'

const store =configureStore({
    reducer:{
        User:UserSlice
    }
})

export type RootSelector =ReturnType <typeof store.getState>
export type RootDispatch= typeof store.dispatch
export default store