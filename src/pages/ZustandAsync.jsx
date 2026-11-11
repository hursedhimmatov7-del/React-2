import useUserStore from '@/store/store'
import React, { useEffect, useRef, useState } from 'react'

const ZustandAsync = () => {
    const {getUser , usersAsync , dltUserAsync , addUserAsync , editUserAsync , chekFuncAsync} = useUserStore()

    const modal = useRef()
    const [form , setform] = useState({id:null , name:null , role:null})

    useEffect(()=>{
        getUser()
    }, [getUser])

     const handleSubmit = (e) =>{
         e.preventDefault()
         let user = {
            id:form.id ? form.id : Date.now(),
            name : e.target.name.value ,
            role : e.target.role.value ,
         }
        form.id? editUserAsync(form.id , user): addUserAsync(user)
         modal.current.close()
         e.target.close()
     }

     const handleEdit = (elem) =>{
         setform(elem)
     modal.current.showModal()
     }


  return (
    <div>
     <div className='w-full flex flex-col items-end my-15 gap-5'>
        <button className='p-2 border-2 rounded-xl w-20' onClick={()=>modal.current.showModal()}>Add</button>
       
        <div className='w-full flex my-15 flex-wrap gap-5'>
            {
                usersAsync.map((elem)=> {
                    return <div key={elem.id} className='w-[32%] flex flex-col items-center gap-5 border-2 p-5 rounded-xl'>
                        <h1 className='w-full flex items-center justify-between'>Name : <span>{elem.name}</span></h1>
                        <h1 className='w-full flex items-center justify-between'>Role : <span>{elem.role}</span></h1>
                        <h1 className='w-full flex items-center justify-between'>Status : <div className='flex items-center gap-3'>
                            <input checked={elem.status} onClick={()=>chekFuncAsync(elem.id)}  type="checkbox" />
                            <span>{elem.status ? 'online' : 'offline'}</span>
                            </div>
                            </h1>
                            <div className='w-full flex items-center justify-between'>
                                <div className='border-2 p-2 rounded-xl w-[32%] text-center' onClick={()=>dltUserAsync(elem.id)} >delete</div>
                                <div className='border-2 p-2 rounded-xl w-[32%] text-center' onClick={()=>handleEdit(elem)} >edit</div>
                                <div className='border-2 p-2 rounded-xl w-[32%] text-center'>info</div>
                            </div>
                    </div>
                })
            }
        </div>
      </div>


         <dialog className='m-auto' ref={modal}>
        <form onSubmit={handleSubmit}   action="">
            <h1>{form.id ? 'edit' : 'add'}</h1>
            <input defaultValue={form.name}  type="text " placeholder='name...' name='name'/>
            <input  defaultValue={form.role} type="text " placeholder='role...' name='role'/>
            <button type='submit'>{form.id ? 'edit' : 'add'}</button>
        </form>
      </dialog>


    </div>
  )
}

export default ZustandAsync
