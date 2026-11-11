import { dataAtom } from '@/atomStore/atom'
import { useAtom } from 'jotai'
import React, { useRef, useState } from 'react'

const AtomSync = () => {
    const [data, setData] = useAtom(dataAtom)

    const modal = useRef()
    const [form, setForm] = useState({ id: null, name: '', job: '', status: false })

    const handleSubmit = (e) => {
        e.preventDefault()

        const user = {
            id: form.id ? form.id : Date.now(),
            name: e.target.name.value,
            job: e.target.job.value,
        }
        form.id
            ? setData(data.map((elem) => elem.id === form.id ? user : elem))
            : setData([...data, user])

        modal.current.close()
    }

    const handleAdd = () => {
        setForm({ id: null, name: '', job: '', status: true })
        modal.current.showModal()
    }

    const handleEdit = (elem) => {
        setForm(elem)
        modal.current.showModal()
    }

    const dltUser = (id) => {
        setData(data.filter((elem) => elem.id !== id))
    }

    const chekFunc = (id) => {
        setData(data.map((elem) => elem.id === id ? { ...elem, status: !elem.status } : elem))
    }

    return (
        <div>

            <div className='w-full flex flex-col items-end my-15 gap-5'>

                <button className='p-2 border-2 rounded-xl w-20' onClick={handleAdd}>
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
                                    Job : <span>{elem.job}</span>
                                </h1>

                                <h1 className='w-full flex items-center justify-between'>
                                    Status :
                                    <div className='flex items-center gap-3'>
                                        <input checked={elem.status} onChange={() => chekFunc(elem.id)} type="checkbox" />
                                        <span>{elem.status ? 'online' : 'offline'}</span>
                                    </div>
                                </h1>

                                <div className='w-full flex items-center justify-between'>

                                    <button className='border-2 p-2 rounded-xl w-[32%]' onClick={() => dltUser(elem.id)}>
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

                <form key={form.id } onSubmit={handleSubmit} className='flex flex-col gap-5 w-75'>

                    <h1 className='text-xl font-bold'>
                        {form.id ? 'Edit User' : 'Add User'}
                    </h1>

                    <input defaultValue={form.name} type="text" placeholder='Name...' name='name' className='border-2 p-2 rounded-xl' required />

                    <input defaultValue={form.job} type="text" placeholder='Job...' name='job' className='border-2 p-2 rounded-xl' required />

                 

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

export default AtomSync