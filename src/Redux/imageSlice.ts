import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

type initial ={
    imageInfo: any
}

const initialState : initial ={
    imageInfo: []
}

const iSurvey = createSlice({
    name: 'imageSurvey',
    initialState,
    reducers: {
        imageSurvey: (state: any, action: PayloadAction<any>)=>{
            state.imageInfo.push(action.payload)
        },
        clearImageSurvey: (state: any)=>{
            state.imageInfo= []
        } 
    }
})

export const {imageSurvey, clearImageSurvey} = iSurvey.actions;
export default iSurvey.reducer;
