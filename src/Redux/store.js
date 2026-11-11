import { configureStore } from "@reduxjs/toolkit";

import userSlicereducer  from "../Redux/userSlice"

const store = configureStore({
   reducer : {
   userSlice : userSlicereducer
   }
})
export default store