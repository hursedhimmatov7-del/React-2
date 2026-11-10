import { configureStore } from "@reduxjs/toolkit";
import dataSliceReducer from '../redux/data.js'

const store = configureStore({
    reducer : {
        dataSlice: dataSliceReducer
    }
})
export default store