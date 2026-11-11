import { addUser, chekFunc, dltUser, editUser } from '@/redux/users'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ReduxSync = () => {
    const {data} = useSelector((store) => store.userSlice)
    const dispatch = useDispatch()
      const modal = useRef()
        const [form , setForm] = useState({id:null , name:null , job:null})

        const handleSubmit = (e) => {
            e.preventDefault()
            let user = {
                id:form.id?form.id : Date.now() ,
                name : e.target.name.value ,
                job : e.target.job.value ,
                status :false
            }
           form.id ? dispatch(editUser(user)) :  dispatch(addUser(user))
            modal.current.close()
            e.target.reset()
        }
        const handleEdit = (elem) =>{
        setForm(elem)
        modal.current.showModal()
        }
  return (
    <div>
          <div className='w-full flex flex-col items-end my-15 gap-5'>
        <button className='p-2 border-2 rounded-xl w-20' onClick={()=>modal.current.showModal()}>Add</button>
      
        <div className='w-full flex my-15 flex-wrap gap-5'>
            {
                data.map((elem)=> {
                    return <div key={elem.id} className='w-[32%] flex flex-col items-center gap-5 border-2 p-5 rounded-xl'>
                        <h1 className='w-full flex items-center justify-between'>Name : <span>{elem.name}</span></h1>
                        <h1 className='w-full flex items-center justify-between'>Job : <span>{elem.job}</span></h1>
                        <h1 className='w-full flex items-center justify-between'>Status : <div className='flex items-center gap-3'>
                            <input onClick={()=>dispatch(chekFunc(elem.id))} checked={elem.status}  type="checkbox" />
                            <span>{elem.status ? 'online' : 'offline'}</span>
                            </div>
                            </h1>
                            <div className='w-full flex items-center justify-between'>
                                <div className='border-2 p-2 rounded-xl w-[32%] text-center' onClick={()=>dispatch(dltUser(elem.id))} >delete</div>
                                <div className='border-2 p-2 rounded-xl w-[32%] text-center' onClick={()=>handleEdit(elem)}>edit</div>
                                <div className='border-2 p-2 rounded-xl w-[32%] text-center'>info</div>
                            </div>
                    </div>
                })
            }
        </div>
      </div>


          <dialog className='m-auto' ref={modal}>
        <form onSubmit={handleSubmit} action="">
            <h1>{form.id ? "edit" : 'add'}</h1>
            <input defaultValue={form.name} type="text " placeholder='name...' name='name'/>
            <input defaultValue={form.job} type="text " placeholder='job...' name='job'/>
            <button type='submit'>{form.id ? "edit" : 'add'}</button>
        </form>
      </dialog>


    </div>
  )
}

export default ReduxSync
