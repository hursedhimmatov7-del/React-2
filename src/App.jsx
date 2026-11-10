import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, chekFunc, dltUser, editUser } from './redux/data'

const App = () => {
    const {data} = useSelector((store) => store.dataSlice)
    const dispatch = useDispatch()
    const modal = useRef()
    const [form , setform] = useState({id:null , name : null , job:null})

    const handleSubmit = (e) => {
     e.preventDefault()
     let newUser = {
        id:form.id?form.id : Date.now(),
        name:e.target.name.value ,
        job:e.target.job.value ,
        status : false
     }
   form.id?dispatch(editUser(newUser)) : dispatch( addUser(newUser))
     modal.current.close()
     e.target.reset()
     setform({id:null , name : null , job:null})
    }
    const handleedit = (elem) => {
        setform(elem)
        modal.current.showModal()
    }
  return (
    <div>
     <div className='w-325 m-auto my-15 flex flex-col items-end gap-5'>
        <button className='border-2 p-2 rounded-xl' onClick={()=>modal.current.showModal()}>Add User</button>
        <div className='w-full flex flex-wrap gap-5'>
             {
        data.map((elem)=> {
            return <div key={elem.id} className='w-[32%] border-2 p-5 flex flex-col gap-5 rounded-xl'>
                <h1 className='w-full flex items-center justify-between'>Name : <span>{elem.name}</span></h1>
                <h1 className='w-full flex items-center justify-between'>Job : <span>{elem.job}</span></h1>
                <h1 className='w-full flex items-center justify-between'>Status : <div className='flex items-center gap-3'><input onClick={()=>dispatch(chekFunc(elem.id))} type="checkbox" /> <span>{elem.status ? 'online' : 'offline'}</span></div></h1>
             <div className='w-full flex items-center justify-between'>
                <button className='w-[32%] border-2 p-2 rounded-xl ' onClick={()=>dispatch(dltUser(elem.id))}>delete</button>
                <button className='w-[32%] border-2 p-2 rounded-xl ' onClick={()=>handleedit(elem)}>edit</button>
                <button className='w-[32%] border-2 p-2 rounded-xl '>info</button>
             </div>
            </div>
        })
      }
        </div>
     </div>

     <dialog className='m-auto' ref={modal}>
        <form onSubmit={handleSubmit} action="">
            <h1>{form.id?'edit':'add'}</h1>
            <input defaultValue={form.name} type="text" placeholder='name...' name='name' />
            <input defaultValue={form.job} type="text" placeholder='job...' name='job' />
            <button type='submit'>{form.id?'edit':'add'}</button>
        </form>
     </dialog>
    </div>
  )
}

export default App
