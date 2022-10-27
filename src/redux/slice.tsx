
import  { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState:UpdatedInitialProps ={
    User:null,
    Auth:true
}

const UserSlice= createSlice({
    name:'User',
    initialState:initialState,
    reducers:{
        setInitialState:(state:UpdatedInitialProps,action:PayloadAction<UpdatedInitialProps>)=>{
            state.User=action.payload.User
            state.Auth=action.payload.Auth
        }
    }
    
})
export const {setInitialState}=UserSlice.actions

export default UserSlice.reducer