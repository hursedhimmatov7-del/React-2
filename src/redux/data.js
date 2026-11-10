import { createSlice } from "@reduxjs/toolkit";
import { ChessKing } from "lucide-react";

const dataSlice = createSlice({
    name : 'data' ,
    initialState : {
        data : [
            {
                id:1 ,
                img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK8Zt8b7FoQGK105hQIKQfk6uJiKr6c-FqvmseRILWGA&s=10' ,
                name : "Kratos" ,
                job : "Ghost of Sparta" ,
                status : true
            } ,
              {
                id:2 ,
                img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTW7dpJG61ab1UP8_s5AvZv7uFG6uoOFeCa_iug3YrUQ&s=10",
                name : "Venom" ,
                job : "Simbiyote" ,
                status : false
            } ,
              {
                id:3 ,
                img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8jGcmuz-vDt5y-sq-44r-mo-ZDIUvWXrvGDxjbx2wAA&s=10' ,
                name : "Lego" ,
                job : "Council of Zambia" ,
                status : true
            } ,
        ]
    },
    reducers : {
        dltUser : (state , {payload}) => {
            state.data = state.data.filter((elem)=>elem.id !== payload)
        },
        addUser : (state , {payload}) => {
            state.data = [...state.data , payload]
        },
        editUser  : (state , {payload}) => {
            state.data = state.data.map((elem)=> elem.id == payload.id ? payload : elem)
        },
        chekFunc : (state , {payload}) => {
          let user = state.data.find((elem)=>elem.id == payload)
          if(user){
            user.status = !user.status
          }
        }
    }
})


export const {dltUser ,addUser , editUser , chekFunc} = dataSlice.actions
export default dataSlice.reducer