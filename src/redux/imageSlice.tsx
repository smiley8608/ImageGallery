
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState:UpdatedImagetype={
    Image:null
}


const ImageSlice=createSlice({
    name:'Image',
    initialState:initialState,
    reducers:{
        setImageState:(state:UpdatedImagetype,action:PayloadAction<Imagetype[]>)=>{
            
            state.Image=action.payload
            console.log(state);
        }
    }
})

export const {setImageState} = ImageSlice.actions

export default ImageSlice.reducer