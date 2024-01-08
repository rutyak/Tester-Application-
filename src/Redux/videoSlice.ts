import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

type inital ={
    videoInfo: any
}

const initialState: inital ={
    videoInfo: []
}

const vSlice = createSlice({
    name: 'videoSurvey',
    initialState,
    reducers:{ // reducer
        videoSurvey:(state:any, action: PayloadAction<any>)=>{ //action
            if( ! state.videoInfo.includes(action.payload)){

                state.videoInfo.push(action.payload)
            }
        },
        clearSurvey:(state: any)=>{
            state.videoInfo = []
        }
    } 
})

export const {videoSurvey, clearSurvey} = vSlice.actions   
export default vSlice.reducer 