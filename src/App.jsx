import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, chekFunc, dltUser, editUser,  } from './redux/data'

const App = () => {
    const {data} = useSelector((store)=>store.dataSlice)
    const dispatch = useDispatch()
    const modal = useRef()
    const [form , setform] = useState({id:null , name:null , job:null})
    const [info, setInfo] = useState(null)
    const handleInfo = (elem) => {
    setInfo(elem)
}



    const handlsubmit = (e) => {
e.preventDefault()
let newUser = {
    id:form.id ? form.id : Date.now() ,
    name : e.target.name.value,
    job : e.target.job.value,
    status : false
}
form.id? dispatch(editUser(newUser)) : dispatch(addUser(newUser))
e.target.reset()
modal.current.close()
setform({id:null , name:null , job:null})
    }


    const handleEdit = (elem) => {
        setform(elem)
         modal.current.showModal()
    }
   
   
      
    

  return (
    <div>
        {info && (
    <div>
        <h1>Name: {info.name}</h1>
        <h1>Job: {info.job}</h1>
        <h1>Status: {info.status ? 'online' : 'offline'}</h1>
    </div>
)}
       <div className='w-325 m-auto my-10 flex flex-col gap-5 items-end'>
          <button className='border-2 p-2 rounded-xl' onClick={()=>modal.current.showModal()}>Add User</button>
    <div className='w-325 m-auto my-15 flex flex-wrap gap-5'>
          {
        data.map((elem)=> {
            return <div key={elem.id} className='w-[32%] flex flex-col gap-5 p-5 border-2 rounded-xl'>
                      <h1 className='w-full flex items-center justify-between'>Name : <span>{elem.name}</span></h1>
                <h1 className='w-full flex items-center justify-between'>Job : <span>{elem.job}</span></h1>
                <h1 className='w-full flex items-center justify-between'>Status : <div className='flex items-center gap-3'> <input onClick={()=> dispatch(chekFunc(elem.id))} type="checkbox" />   <span>{elem.status ? 'online' : 'offline'}</span></div></h1>
                <div className='w-full flex items-center justify-between'>
                    <button className='w-[32%] border-2 rounded-xl p-2' onClick={()=>dispatch(dltUser(elem.id))}>delete</button>
                    <button className='w-[32%] border-2 rounded-xl p-2' onClick={()=>handleEdit(elem)}>edit</button>
                    <button className='w-[32%] border-2 rounded-xl p-2' onClick={()=>handleInfo(elem)}>info</button>
                </div>
            </div>
        })
      }
    </div>
       </div>

       <dialog className='m-auto' ref={modal} >
        <div>
            <h1>
            {form.id ? "edit":"add"}
            </h1>
        </div>
        <form onSubmit={handlsubmit} action="">
            <input defaultValue={form.name} type="text" placeholder='name...' name='name' />
            <input defaultValue={form.job} type="text" placeholder='job...' name='job' />
            <button type='submit'>{form.id?'edit' : 'add'}</button>
        </form>
       </dialog>
    </div>
  )
}

export default App
