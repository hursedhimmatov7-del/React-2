import axios from "axios"
import { create } from "zustand"



const api = 'https://6aaa5efdff4dd5698b4e7685.mockapi.io/panel'

const useUserStore = create((set , get)=> (
    {
        users : [
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
        ] ,
        usersAsync : [] ,
        dltUser : id => set(state => ({users : state.users.filter((elem)=>elem.id !== id)})),
        addUser : user =>set(state=>({users: [...state.users , user]})),
        editUser : (id , user) => set(state => ({users : state.users.map((elem)=>elem.id == id ? {...elem , ...user} : elem)})),
        chekFunc : id => set(state => ({users: state.users.map((elem)=> elem.id === id ? {...elem , status : !elem.status} : elem)})) ,

        getUser : async () => {
             try {
                let {data} = await axios.get(api)
                set({usersAsync:data})
             } catch (error) {
                console.log(error)
             }
        } ,
        dltUserAsync : async (id)=>{
            try {
                await axios.delete(`${api}/${id}`)
                get().getUser()
            } catch (error) {
                console.log(error)
            }
        },
        addUserAsync : async(user)=>{
            try {
                await axios.post(api , user)
                get().getUser()
            } catch (error) {
                console.log(error)
            }
        } ,
        editUserAsync : async(id , user) => {
            try {
                await axios.put(`${api}/${id}` , user)
                get().getUser()
            } catch (error) {
                console.log(error)
            }
        },
        chekFuncAsync : async(id)=> {
            try {
                let {data} = await axios.get(`${api}/${id}`)
               if(data) {
                await axios.put(`${api}/${id}` , {
                    ...data,
                    status : !data.status
                })
               }
                get().getUser()
            } catch (error) {
                console.log(error)
            }
        }
    }
))
export default useUserStore