import { configureStore } from "@reduxjs/toolkit";
import dataSlicereducer from "../redux/data"

const store = configureStore({
   reducer : {
 dataSlice :  dataSlicereducer
   }
})
export default store