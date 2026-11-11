import React, { useRef, useState } from 'react'
import useUserStore from './ZustandStore/store'
import Redux from './pages/Redux'
import Jotai from './pages/Jotai'

const App = () => {
  const {data , dltUser , addData , editData , chekFunc} = useUserStore()
  const modal = useRef()
  const infoModal = useRef()
  const [form , setForm] = useState({id:null , name:null , job:null})
  const [form1 , setForm1] = useState({id:null , name:null , job:null})
  
  const [search , setsearch] = useState('')
  const [sort , setsort] = useState('all')

  const handleSubmit = (e) => {
    e.preventDefault()
    let user = {
      id:form.id ? form.id: Date.now() ,
      name : e.target.name.value ,
      job : e.target.job.value ,
      status : false
    }
    form.id ? editData(form.id , user) :addData(user)
    modal.current.close()
    e.target.reset()
  }


   const handleEdit = (elem) => {
    setForm(elem)
    modal.current.showModal()
   } 

   const handleInfo = (elem) => {
    setForm1(elem)
    infoModal.current.showModal()
   }

   const filtered = data.filter((elem) => elem.name.toLowerCase().includes(search.toLowerCase().trim())).filter((elem) => {
    if(sort == 'true') return elem.status == true
   else if(sort == 'false') return elem.status == false
   return true
   })


  return (
    <div>
      <h1 className='text-center text-3xl font-semibold my-10'>ToDo with Zustand</h1>
  <div className='w-325 m-auto flex flex-col items-start gap-7'>
    <button className='border-2 p-2 rounded-xl w-30' onClick={() => modal.current.showModal()}>Add</button>
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
               <input onClick={()=>chekFunc(elem.id)} type="checkbox" /><span>{elem.status?'online' :'offline'}</span></div></h1>
            <div className='w-full flex items-center justify-between'>
              <button className='w-[32%] p-2 border-2 rounded-xl' onClick={()=> dltUser(elem.id)}>delete</button>
              <button className='w-[32%] p-2 border-2 rounded-xl' onClick={() => handleEdit(elem)}>edit</button>
              <button className='w-[32%] p-2 border-2 rounded-xl' onClick={() => handleInfo(elem)}>info</button>
            </div>
          </div>
        })
      }
   </div>
  </div>

   <Redux/>
   <Jotai/>
     
    <dialog className='m-auto' ref={modal}>
      <form onSubmit={handleSubmit} action="">
         <div className='flex items-center gap-10'>
          <h1>{form.id ? 'Edit' : 'Add'}</h1>
          <h1 onClick={()=>modal.current.close()} className='text-2xl font-semibold'>X</h1>
         </div>
        <input defaultValue={form.name} type="text" placeholder='...name' name='name' />
        <input defaultValue={form.job} type="text" placeholder='...job' name='job' />
        <button type='submit'>{form.id ? 'Edit' : 'Add'}</button>
      </form>
    </dialog>

    <dialog className='m-auto w-100 gap-5 p-10 rounded-xl' ref={infoModal} >
<div className='flex items-center justify-between gap-3'>
        <h1>Info</h1>
        <h1 className='font-semibold text-3xl' onClick={() => infoModal.current.close()}> X</h1>
</div>
      <h1 className='w-full flex items-center justify-between'>Name : <span>{form1.name}</span></h1>
      <h1 className='w-full flex items-center justify-between'>Job : <span>{form1.job}</span></h1>
    </dialog>


    </div>
  )
}

export default App
