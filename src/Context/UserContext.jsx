import React, { createContext, useReducer } from 'react'
import Usercard from '../compos/Usercard'

export const Userscontext = createContext()

const initialstate = {
  data: [
    { id: 1, name: 'Ahmad', age: 18, status: true },
    { id: 2, name: 'Ali', age: 20, status: false },
  ],
}

const usersreducer = (state, action) => {
  if (action.type === 'delete') {
    return { ...state, data: state.data.filter((elem) => elem.id !== action.value) }
  }
  if (action.type === 'add') {
    return { ...state, data: [...state.data, action.value] }
  }
  if (action.type === 'edit') {
    return { ...state, data: state.data.map((elem) => elem.id === action.value.id ? action.value : elem) }
  }
  if (action.type === 'checkbox') {
    return { ...state, data: state.data.map((elem) => elem.id === action.value ? { ...elem, status: !elem.status } : elem) }
  }
  return state
}

const UserContext = () => {
  const [state, dispatch] = useReducer(usersreducer, initialstate)

  return (
    <Userscontext.Provider value={{ state, dispatch }}>
      <Usercard />
    </Userscontext.Provider>
  )
}

export default UserContext