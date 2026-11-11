import { data } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user' ,
    initialState: {
        data:data
    } , 
    reducers : {
        dltUser : (state , {payload}) => {state.data = state.data.filter((elem) => elem.id !== payload)} ,
        addUser : (state , {payload}) => {state.data = [...state.data , payload]},
        chekFunc : (state , {payload}) => {state.data = state.data.map((elem) => elem.id == payload? {...elem , status : !elem.status} : elem)}
    }
    
})
export const {dltUser , addUser , chekFunc} = userSlice.actions
export default userSlice.reducer