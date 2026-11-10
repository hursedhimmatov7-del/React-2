import { configureStore } from "@reduxjs/toolkit";
import usersSlicereducer from "../redux/users"

const store = configureStore({
   reducer : {
     usersSlice : usersSlicereducer
   }
})

export default store