import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, chekFunc, dltUser, editUser } from './redux/data'

const App = () => {
    const {data} = useSelector((store)=>store.dataSlice)
    const dispatch = useDispatch()
    const [form , setform] = useState({id:null , img:null, name : null , job : null})
    const modal = useRef()

    const handldeSubmit = (e)=>{
        e.preventDefault()
        let user = {
            id:form.id ? form.id : Date.now() ,
            img : form.img,
            name : e.target.name.value ,
            job : e.target.job.value ,
            statue : false
        }
        form.id?dispatch(editUser(user)) :dispatch(addUser(user))
        modal.current.close()
        e.target.reset()
    }
     const handleEdit = (elem) => {
       setform(elem)
       modal.current.showModal()
     }



    
  return (
    <div>
         <div className='w-325 m-auto my-15 flex flex-col items-end gap-5'>
            <button className=' border-2 rounded-xl p-2' onClick={()=>modal.current.showModal()} >Add User</button>
              <div className='flex w-full flex-wrap gap-5'>
                {
                    data.length == 0 ? 'No Users Left' :''
                }
                    {
data.map((elem)=>{
    return <div key={elem.id} className='w-[32%] border-2 p-1 gap-5 rounded-2xl flex flex-col'>
            <img src={elem.img} className='w-full h-50 rounded-2xl' alt="" />
       <div className='w-full p-5 gap-5 flex flex-col'>
         <h1 className='w-full flex items-center justify-between'>Name : <span>{elem.name}</span></h1>
         <h1 className='w-full flex items-center justify-between'>Job : <span>{elem.job}</span></h1>
         <h1 className='w-full flex items-center justify-between'>Statue : <div className='flex items-center gap-4'><input onClick={()=>dispatch(chekFunc(elem.id))} type="checkbox" /><span>{elem.status ? 'online' : 'offline'}</span></div></h1>
       </div>
       <div className='w-full flex items-center p-5 justify-between'>
        <div className='w-[32%] border-2 rounded-xl p-2 text-center' onClick={()=>dispatch(dltUser(elem.id))}>delete</div>
        <div className='w-[32%] border-2 rounded-xl p-2 text-center' onClick={()=>handleEdit(elem)}>edit</div>
        <div className='w-[32%] border-2 rounded-xl p-2 text-center'>info</div>
       </div>
    </div>
})
      }
              </div>
         </div>

         <dialog className='m-auto' ref={modal} >
            <form onSubmit={handldeSubmit} action="">
                <h1>{form.id ? 'edit' : 'add'}</h1>
                <input defaultValue={form.name} type="text" placeholder='name ... ' name='name' />
                <input defaultValue={form.job} type="text" placeholder='job ... ' name='job' />
                <button type='submit'>{form.id ? 'edit' : 'add'}</button>
            </form>
         </dialog>
    </div>
  )
}

export default App
