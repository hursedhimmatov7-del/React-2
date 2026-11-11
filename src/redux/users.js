import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
 name:'user' ,
 initialState : {
    data : [
        {
                id:1,
                name : "Alex" ,
                job : 'Teacher' ,
                status : true
            },
            {
                id:2,
                name : "John" ,
                job : 'Racer' ,
                status : false
            },
            {
                id:3,
                name : "Will" ,
                job : 'Coder' ,
                status : true
            },
    ]
},
 reducers : {
    dltUser : (state , {payload}) => {
        state.data = state.data.filter((elem) => elem.id !== payload)
    },
    addUser : (state , {payload} )=> {
        state.data = [...state.data , payload]
    },
    editUser : (state ,{payload}) => {
        state.data = state.data.map((elem) => elem.id == payload.id ? payload : elem)
    } ,
    chekFunc : (state , {payload}) => {
        const user = state.data.find((elem) => elem.id == payload)
        if(user){
            user.status = !user.status
        }
    }
    
 }
})
export const {dltUser , addUser , editUser , chekFunc} = userSlice.actions
export default userSlice.reducer