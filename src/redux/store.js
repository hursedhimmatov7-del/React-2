import { configureStore } from "@reduxjs/toolkit";
import userSlicereducer from "../redux/users"
import userAsyncSlicereducer from '../redux/userAsync'

const store = configureStore({
   reducer : {
    userSlice : userSlicereducer ,
    userAsyncSlice  : userAsyncSlicereducer
   }
})
export default store