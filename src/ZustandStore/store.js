import { data } from "@/api";
import { create } from "zustand";

const useUserStore = create((set , get) => ({
    data : data
     dltUser : id => set((state) => state.data )
}))
export default useUserStore