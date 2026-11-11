import { atom } from "jotai";
import axios from "axios";

const api = 'https://6aaa5efdff4dd5698b4e7685.mockapi.io/panel'

export const dataAtom = atom([])

export const getUsersAtom = atom(null, async (get, set) => {
    try {
        const { data } = await axios.get(api)
        set(dataAtom, data)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
})

export const addUserAtom = atom(null, async (get, set, user) => {
    try {
       await axios.post(api, user)
        await set(getUsersAtom)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
})

export const deleteUserAtom = atom(null, async (get, set, id) => {
    try {
        await axios.delete(`${api}/${id}`)
         await set(getUsersAtom)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
})

export const editUserAtom = atom(null, async (get, set, user) => {
    try {
        await axios.put(`${api}/${user.id}`, user)
  await set(getUsersAtom)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
})

// CHECKBOX
export const checkUserAtom = atom(null, async (get, set, id) => {
    try {
        const user = get(dataAtom).find((elem) => elem.id === id)

        if (user) {
            await axios.put(`${api}/${id}`, {
                status: !user.status
            })
        }

        await set(getUsersAtom)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
})