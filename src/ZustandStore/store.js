import { data } from "@/api";
import { create } from "zustand";

const useUserStore = create((set , get) => ({
    data : data ,
    dltUser : id => set(state => ({data : state.data.filter((elem)=>elem.id !== id)})),
    addData : user => set(state => ({data : [...state.data , user]})) ,
    editData : (id , user) => set(state => ({data: state.data.map((elem) => elem.id == id ? user : elem)})),
    chekFunc : id => set(state => ({data : state.data.map((elem) => elem.id == id ? {...elem , status : !elem.status} : elem)}))

}))
export default useUserStore