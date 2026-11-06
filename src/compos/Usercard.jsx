import React, { useContext, useState } from 'react'
import { Userscontext } from '../Context/UserContext'

const Usercard = () => {
  const { state, dispatch } = useContext(Userscontext)

  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [infoModal, setInfoModal] = useState(false)

  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [idx, setIdx] = useState(null)

  const addUser = () => {
    dispatch({ type: 'add', value: { id: Date.now(), name, age, status: false } })
    setName('')
    setAge('')
    setAddModal(false)
  }

  const editUser = () => {
    dispatch({ type: 'edit', value: { ...idx, name, age } })
    setEditModal(false)

  }
return (
  <div className="min-h-screen bg-white text-black p-8 md:p-12">
    
    {addModal && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
        <div className="bg-white p-7 rounded-xl w-80 shadow-xl">
          <h1 className="text-xl font-bold mb-6">Add User</h1>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="border border-zinc-300 p-3 rounded-lg w-full mb-3 outline-none focus:border-black" />
          <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" className="border border-zinc-300 p-3 rounded-lg w-full mb-5 outline-none focus:border-black" />
          <div className="flex gap-2">
            <button onClick={addUser} className="bg-black text-white px-4 py-2 rounded-lg">Add</button>
            <button onClick={() => setAddModal(false)} className="border border-zinc-300 px-4 py-2 rounded-lg">Close</button>
          </div>
        </div>
      </div>
    )}

    {editModal && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
        <div className="bg-white p-7 rounded-xl w-80 shadow-xl">
          <h1 className="text-xl font-bold mb-6">Edit User</h1>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="border border-zinc-300 p-3 rounded-lg w-full mb-3 outline-none focus:border-black" />
          <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" className="border border-zinc-300 p-3 rounded-lg w-full mb-5 outline-none focus:border-black" />
          <div className="flex gap-2">
            <button onClick={editUser} className="bg-black text-white px-4 py-2 rounded-lg">Save</button>
            <button onClick={() => setEditModal(false)} className="border border-zinc-300 px-4 py-2 rounded-lg">Close</button>
          </div>
        </div>
      </div>
    )}

    {infoModal && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
        <div className="bg-white p-7 rounded-xl w-80 shadow-xl">
          <h1 className="text-xl font-bold mb-6">User Info</h1>
          <h2 className="text-lg ">{idx.name}</h2>
          <p >Age: {idx.age}</p>
          <p >Status: {idx.status ? 'Online' : 'Offline'}</p>
          <button onClick={() => setInfoModal(false)} className="bg-black text-white px-4 py-2 rounded-lg mt-6">Close</button>
        </div>
      </div>
    )}
    <div className="flex justify-between items-center mb-10">
      <h1 className="text-3xl font-bold">Users</h1>
      <button onClick={() => setAddModal(true)} className="bg-black text-white px-5 py-3 rounded-lg transition">+ Add User</button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {state.data.map((elem) => (
        <div key={elem.id} className="border border-zinc-200 p-6 rounded-xl">
          <h1 className="text-xl font-semibold">{elem.name}</h1>
          <p className="text-zinc-500 mt-2">{elem.age} years</p>

          <div className="flex items-center gap-2 mt-4">
            <input type="checkbox" checked={elem.status} onChange={() => dispatch({ type: 'checkbox', value: elem.id })} className="accent-black w-4 h-4 cursor-pointer" />
            <span className="text-sm text-zinc-600">{elem.status ? 'Online' : 'Offline'}</span>
          </div>

          <div className="flex gap-2 mt-6">
            <button onClick={() => { setIdx(elem); setInfoModal(true) }} className="border border-zinc-300 px-3 py-2 rounded-lg text-sm">Info</button>
            <button onClick={() => { setIdx(elem); setName(elem.name); setAge(elem.age); setEditModal(true) }} className="border border-zinc-300 px-3 py-2 rounded-lg text-sm">Edit</button>
            <button onClick={() => dispatch({ type: 'delete', value: elem.id })} className="bg-black text-white px-3 py-2 rounded-lg text-sm">Delete</button>
          </div>
        </div>
      ))}
    </div>
  </div>
)
}

export default Usercard