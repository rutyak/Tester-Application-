import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "./Redux/videoSlice";
import formSlice from "./Redux/formSlice";
import imageSlice from "./Redux/imageSlice";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig ={
    key: "root",
    version: 1,
    storage
}

const reducer = combineReducers({
    video: videoSlice,
    image: imageSlice, // reducer contains address of slide reducer
    form: formSlice
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer
})

export default store