import { addUser, chekFunc, dltUser } from '@/Redux/userSlice'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Redux = () => {
const {data} = useSelector((store) => store.userSlice)
const dispatch = useDispatch()
const modal = useRef()
  const [forms , setForms] = useState({id:null , name:null , job:null})

    const [search , setsearch] = useState('')
          const [sort , setsort] = useState('all')

  
  const handleSubmit = (e) => {
    e.preventDefault()
    let user = {
      id:forms.id ? forms.id: Date.now() ,
      name : e.target.name.value ,
      job : e.target.job.value ,
      status : false
    }
    dispatch(addUser(user))
    modal.current.close()
    e.target.reset()
  }

   const handleEdits = (elem) => {
    setForms(elem)
    modal.current.showModal()
   } 
   
    const filtered = data.filter((elem) => elem.name.toLowerCase().includes(search.toLowerCase().trim())).filter((elem) => {
    if(sort == 'true') return elem.status == true
   else if(sort == 'false') return elem.status == false
   return true
   })


  return (
    <div>
      <h1 className='text-center text-3xl font-semibold'>ToDo with Redux</h1>
      <div className='w-325 m-auto flex flex-col items-start gap-7'>
    <button className='border-2 p-2 rounded-xl w-30'onClick={() => modal.current.showModal()} >Add</button>
      <input type="search" placeholder='search...' value={search} onChange={(e) => setsearch(e.target.value)} />
    <select value={sort} onChange={(e) => setsort(e.target.value)} name="" id="">
      <option value="all">all</option>
      <option value="true">online</option>
      <option value="false">offline</option>
    </select>
     <div className='w-325 m-auto my-15 flex flex-wrap gap-5'>
      {
        filtered.map((elem) => {
         return <div className='w-[32%] flex flex-col gap-5 border-2 rounded-xl p-5'>
            <h1 className='flex w-full items-center justify-between'>Name : <span>{elem.name}</span></h1>
            <h1 className='flex w-full items-center justify-between'>Job : <span>{elem.job}</span></h1>
            <h1 className='flex w-full items-center justify-between'>Status : <div className='flex items-center gap-3'>
               <input onChange={() => dispatch(chekFunc(elem.id))}  type="checkbox" /><span>{elem.status?'online' :'offline'}</span></div></h1>
            <div className='w-full flex items-center justify-between'>
              <button className='w-[32%] p-2 border-2 rounded-xl' onClick={() => dispatch(dltUser(elem.id))} >delete</button>
              <button className='w-[32%] p-2 border-2 rounded-xl' onClick={() => handleEdits(elem)} >edit</button>
              <button className='w-[32%] p-2 border-2 rounded-xl' >info</button>
            </div>
          </div>
        })
      }
   </div>
  </div>


   <dialog className='m-auto' ref={modal}>
      <form onSubmit={handleSubmit} action="">
         <div className='flex items-center gap-10'>
          <h1>{forms.id ? 'Edit' : 'Add'}</h1>
          <h1 onClick={()=>modal.current.close()} className='text-2xl font-semibold'>X</h1>
         </div>
        <input defaultValue={forms.name} type="text" placeholder='...name' name='name' />
        <input defaultValue={forms.job} type="text" placeholder='...job' name='job' />
        <button type='submit'>{forms.id ? 'Edit' : 'Add'}</button>
      </form>
    </dialog>


    </div>
  )
}

export default Redux
