import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let api = 'https://6aaa5efdff4dd5698b4e7685.mockapi.io/panel'

export const getData = createAsyncThunk ('userAsync/getData' , async () => {
    const {data} = await axios.get(api)
    return data
})


export const dltData = createAsyncThunk('userAsync/dltData' , async(id , {dispatch}) => {
    await axios.delete(`${api}/${id}`)
  dispatch(getData())
})

export const addData = createAsyncThunk('userAsync/addData' , async(user , {dispatch}) => {
    await axios.post(api , user)
  dispatch(getData())
})

export const editData = createAsyncThunk('userAsync/addData' , async(user , {dispatch}) => {
    await axios.put(`${api}/${user.id}` , user)
  dispatch(getData())
})

export const chekData = createAsyncThunk('userAsync/chekData' , async (id ,{dispatch}) => {
    let {data} = await axios.get(`${api}/${id}`)
    if(data){
        await axios.put(`${api}/${id}` , {
        ...data    ,
        status : !data.status
    })
    }
  dispatch(getData())
    
}) 


const userAsyncSlice = createSlice({
    name :'userAsync',
    initialState : {
        data : [] ,
        isLoading : false ,
    } ,
    reducers :{},
    extraReducers : (builder) => {
        builder

        .addCase(getData.pending , (state) =>{
            state.isLoading = true
        })
        .addCase(getData.fulfilled , (state , {payload}) => {
            state.isLoading = false
            state.data = payload
        })
    }

})
export default userAsyncSlice.reducer