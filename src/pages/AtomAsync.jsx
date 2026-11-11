import { useAtom, useSetAtom } from 'jotai'
import { dataAtom, getUsersAtom, addUserAtom, deleteUserAtom, editUserAtom, checkUserAtom } from '@/atomStore/atomAsync'
import React, { useEffect, useRef, useState } from 'react'

const AtomAsync = () => {

    const [data] = useAtom(dataAtom)

    const getUsers = useSetAtom(getUsersAtom)
    const addUser = useSetAtom(addUserAtom)
    const deleteUser = useSetAtom(deleteUserAtom)
    const editUser = useSetAtom(editUserAtom)
    const checkUser = useSetAtom(checkUserAtom)

    const modal = useRef()
    const [form, setForm] = useState({ id: null, name: '', role: '', status: false })

    useEffect(() => {
        getUsers()
    }, [getUsers])

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
        id: form.id,
        name: e.target.name.value,
        role: e.target.role.value,
    }

    form.id ? editUser(user) : addUser(user)

    modal.current.close()
    e.target.reset()
}
const handleEdit = (elem) => {
    setForm(elem)
    modal.current.showModal()
}

    return (
        <div>

            <div className='w-full flex flex-col items-end my-15 gap-5'>

                <button className='p-2 border-2 rounded-xl w-20' onClick={()=>modal.current.showModal()}>
                    Add
                </button>

                <div className='w-full flex my-15 flex-wrap gap-5'>

                    {
                        data.map((elem) => (
                            <div key={elem.id} className='w-[32%] flex flex-col items-center gap-5 border-2 p-5 rounded-xl'>

                                <h1 className='w-full flex items-center justify-between'>
                                    Name : <span>{elem.name}</span>
                                </h1>

                                <h1 className='w-full flex items-center justify-between'>
                                    Role : <span>{elem.role}</span>
                                </h1>

                                <h1 className='w-full flex items-center justify-between'>
                                    Status :
                                    <div className='flex items-center gap-3'>
                                        <input checked={elem.status} onChange={() => checkUser(elem.id)} type="checkbox" />
                                        <span>{elem.status ? 'online' : 'offline'}</span>
                                    </div>
                                </h1>

                                <div className='w-full flex items-center justify-between'>

                                    <button className='border-2 p-2 rounded-xl w-[32%]' onClick={() => deleteUser(elem.id)}>
                                        Delete
                                    </button>

                                    <button className='border-2 p-2 rounded-xl w-[32%]' onClick={() => handleEdit(elem)}>
                                        Edit
                                    </button>

                                    <button className='border-2 p-2 rounded-xl w-[32%]'>
                                        Info
                                    </button>

                                </div>

                            </div>
                        ))
                    }

                </div>
            </div>

            <dialog className='m-auto rounded-xl p-6' ref={modal}>

                <form key={form.id} onSubmit={handleSubmit} className='flex flex-col gap-5 w-[300px]'>

                    <h1 className='text-xl font-bold'>
                        {form.id ? 'Edit User' : 'Add User'}
                    </h1>

                    <input defaultValue={form.name} type="text" placeholder='Name...' name='name' className='border-2 p-2 rounded-xl' required />

                    <input defaultValue={form.role} type="text" placeholder='Job...' name='role' className='border-2 p-2 rounded-xl' required />

                    <button type='submit' className='bg-black text-white p-2 rounded-xl'>
                        {form.id ? 'Edit' : 'Add'}
                    </button>

                    <button type='button' onClick={() => modal.current.close()} className='border-2 p-2 rounded-xl'>
                        Cancel
                    </button>

                </form>

            </dialog>

        </div>
    )
}

export default AtomAsync