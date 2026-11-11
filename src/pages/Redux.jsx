import { dltUser } from '@/Redux/userSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Redux = () => {
const {data} = useSelector((store) => store.userSlice)
const dispatch = useDispatch()
  return (
    <div>
      <h1 className='text-center text-3xl font-semibold'>ToDo with Redux</h1>
      <div className='w-325 m-auto flex flex-col items-start gap-7'>
    <button className='border-2 p-2 rounded-xl w-30' >Add</button>
    <input type="search" placeholder='search...'  />
    <select  name="" id="">
      <option value="all">all</option>
      <option value="true">online</option>
      <option value="false">offline</option>
    </select>
     <div className='w-325 m-auto my-15 flex flex-wrap gap-5'>
      {
        data.map((elem) => {
         return <div className='w-[32%] flex flex-col gap-5 border-2 rounded-xl p-5'>
            <h1 className='flex w-full items-center justify-between'>Name : <span>{elem.name}</span></h1>
            <h1 className='flex w-full items-center justify-between'>Job : <span>{elem.job}</span></h1>
            <h1 className='flex w-full items-center justify-between'>Status : <div className='flex items-center gap-3'>
               <input  type="checkbox" /><span>{elem.status?'online' :'offline'}</span></div></h1>
            <div className='w-full flex items-center justify-between'>
              <button className='w-[32%] p-2 border-2 rounded-xl' onClick={() => dispatch(dltUser(elem.id))} >delete</button>
              <button className='w-[32%] p-2 border-2 rounded-xl' >edit</button>
              <button className='w-[32%] p-2 border-2 rounded-xl' >info</button>
            </div>
          </div>
        })
      }
   </div>
  </div>
    </div>
  )
}

export default Redux
