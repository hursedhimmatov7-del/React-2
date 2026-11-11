import { addData, chekData, dltData, editData, getData } from '@/redux/userAsync'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const ReduxAsync = () => {
    const {data , isLoading} = useSelector((store) => store.userAsyncSlice)
    const dispatch = useDispatch()
     const modal = useRef()
            const [form , setForm] = useState({id:null , name:null , role:null})

    useEffect(()=>{
      dispatch(getData())
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {
            id:form.id ? form.id : Date.now() ,
            name : e.target.name.value ,
            role : e.target.role.value ,
            status : false
        }
    form.id? dispatch(editData( user)) : dispatch(addData(user))
    modal.current.close()
    e.target.reset()
    }

    const handleEdit = (elem) => {
        setForm(elem) 
        modal.current.showModal()
    }
 
 
  return (
    <div >
      <div className='w-full flex flex-col items-end my-15 gap-5'>
              <button className='p-2 border-2 rounded-xl w-20' onClick={()=>modal.current.showModal()}>Add</button>
              {
            isLoading && (
                <div className='w-full flex items-center justify-center text-2xl font-semibold uppercase my-15'>
        <h1>loading...</h1>
    </div>
            )
              }
            
              <div className='w-full flex my-15 flex-wrap gap-5'>
                  {
                      data.map((elem)=> {
                          return <div key={elem.id} className='w-[32%] flex flex-col items-center gap-5 border-2 p-5 rounded-xl'>
                              <h1 className='w-full flex items-center justify-between'>Name : <span>{elem.name}</span></h1>
                              <h1 className='w-full flex items-center justify-between'>Role : <span>{elem.role}</span></h1>
                              <h1 className='w-full flex items-center justify-between'>Status : <div className='flex items-center gap-3'>
                                  <input checked={elem.status} onClick={()=>dispatch(chekData(elem.id))} type="checkbox" />
                                  <span>{elem.status ? 'online' : 'offline'}</span>
                                  </div>
                                  </h1>
                                  <div className='w-full flex items-center justify-between'>
                                      <div className='border-2 p-2 rounded-xl w-[32%] text-center' onClick={()=>dispatch(dltData(elem.id))} >delete</div>
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
            <input defaultValue={form.role} type="text " placeholder='role...' name='role'/>
            <button type='submit'>{form.id ? "edit" : 'add'}</button>
        </form>
      </dialog>


    </div>
  )
}

export default ReduxAsync
