import { data } from "@/api";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user' ,
    initialState: {
        data:data
    } , 
    reducers : {
        dltUser : (state , {payload}) => state.data = state.data.filter((elem) => elem.id !== payload)
    }
    
})
export const {dltUser} = userSlice.actions
export default userSlice.reducer