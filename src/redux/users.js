import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


let api = 'https://6aaa5efdff4dd5698b4e7685.mockapi.io/panel'

export const getData = createAsyncThunk('users/getData' , async () => {
    try {
        const {data} = await 
    } catch (error) {
        console.log(error)
    }
})

const usersSlice = createSlice({
    name : 'users' ,
    initialState : {
        data : []
    },
    reducers : {}
})

// export const {} = userSlice.actions

export default usersSlice.reducer