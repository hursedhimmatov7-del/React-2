import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name : "data",
    initialState : {
        data:[
        {
            id:1 ,
            name : 'Ahmad' ,
            job : 'student' ,
            status : true
        },
              {
            id:2 ,
            name : 'Jaga' ,
            job : 'Bekor' ,
            status : false
        },
              {
            id:3 ,
            name : 'Loko' ,
            job : 'bankir' ,
            status : true
        },
    ] 
    },
    reducers  : {
        dltUser : (state , {payload}) => {
            state.data = state.data.filter((elem)=> elem.id !== payload)
        } ,
        addUser : (state , {payload}) => {
            state.data = [...state.data ,  payload]
        },
        editUser : (state , {payload}) => {
            state.data = state.data.map((elem)=> elem.id == payload.id ? payload : elem)
        } ,
        chekFunc: (state , {payload}) => {
            let user = state.data.find((elem) => elem.id === payload)
            if (user) {
                user.status = !user.status
            }
        },
    }

})

export  const {dltUser , addUser , editUser , chekFunc  } = dataSlice.actions

export default dataSlice.reducer