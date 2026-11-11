import useUserStore from '@/store/store'
import React, { useRef, useState } from 'react'

const ZustandSync = () => {
    const {users , dltUser , addUser , editUser , chekFunc} = useUserStore()
    const modal = useRef()
    const [form , setForm] = useState({id:null , name:null , job:null})

    const [search , setsearch] = useState('')
    const [sort , setsort] = useState('all')

    const handleSubmit = (e) => {
      e.preventDefault()
      let user = {
        id:form.id ? form.id : Date.now() ,
        name : e.target.name.value ,
        job : e.target.job.value ,
        status : false
      }
      form.id ? editUser(form.id , user):addUser(user)
      modal.current.close()
      e.target.reset()
    }

    const handleEdit = (elem) => {
         setForm(elem)
         modal.current.showModal()
    }

   const filtered = users
    .filter((elem) => elem.name.toLowerCase().includes(search.toLowerCase().trim()))
    .filter((elem) => {
        if (sort === 'true') return elem.status === true
        else if (sort=== 'false') return elem.status === false
        return true
    })

  return (
    <div>
      <div className='w-full flex flex-col items-end my-15 gap-5'>
        <button className='p-2 border-2 rounded-xl w-20'onClick={()=>modal.current.showModal()}>Add</button>
        <input type="search" placeholder='search...'  value={search} onChange={(e)=>setsearch(e.target.value)}/>
        <select value={sort} onChange={(e)=>setsort(e.target.value)} name="" id="">
            <option value="all">all</option>
            <option value="true">online</option>
            <option value="false">offline</option>
        </select>
        <div className='w-full flex my-15 flex-wrap gap-5'>
            {
                filtered.map((elem)=> {
                    return <div key={elem.id} className='w-[32%] flex flex-col items-center gap-5 border-2 p-5 rounded-xl'>
                        <h1 className='w-full flex items-center justify-between'>Name : <span>{elem.name}</span></h1>
                        <h1 className='w-full flex items-center justify-between'>Job : <span>{elem.job}</span></h1>
                        <h1 className='w-full flex items-center justify-between'>Status : <div className='flex items-center gap-3'>
                            <input onClick={()=>chekFunc(elem.id)} type="checkbox" />
                            <span>{elem.status ? 'online' : 'offline'}</span>
                            </div>
                            </h1>
                            <div className='w-full flex items-center justify-between'>
                                <div className='border-2 p-2 rounded-xl w-[32%] text-center' onClick={()=>dltUser(elem.id)}>delete</div>
                                <div className='border-2 p-2 rounded-xl w-[32%] text-center' onClick={()=>handleEdit(elem)}>edit</div>
                                <div className='border-2 p-2 rounded-xl w-[32%] text-center'>info</div>
                            </div>
                    </div>
                })
            }
        </div>
      </div>


      <dialog className='m-auto' ref={modal}>
        <form onSubmit={handleSubmit}  action="">
            <h1>{form.id ? "edit" : 'add'}</h1>
            <input defaultValue={form.name} type="text " placeholder='name...' name='name'/>
            <input defaultValue={form.job} type="text " placeholder='job...' name='job'/>
            <button type='submit'>{form.id ? "edit" : 'add'}</button>
        </form>
      </dialog>


    </div>
  )
}

export default ZustandSync
