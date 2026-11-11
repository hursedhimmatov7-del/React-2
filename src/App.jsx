import React from 'react'
import useUserStore from './ZustandStore/store'

const App = () => {
  const {data} = useUserStore()
  return (
    <div>
      <h1 className='text-center text-3xl font-semibold my-10'>ToDo with Zustand</h1>
   <div className='w-325 m-auto my-15 flex flex-wrap gap-5'>
      {
        data.map((elem) => {
         return <div className='w-[32%] flex flex-col gap-5 border-2 rounded-xl p-5'>
            <h1 className='flex w-full items-center justify-between'>Name : <span>{elem.name}</span></h1>
            <h1 className='flex w-full items-center justify-between'>Job : <span>{elem.job}</span></h1>
            <h1 className='flex w-full items-center justify-between'>Status : <div className='flex items-center gap-3'> <input type="checkbox" /><span>{elem.status?'online' :'offline'}</span></div></h1>
            <div className='w-full flex items-center justify-between'>
              <button className='w-[32%] p-2 border-2 rounded-xl'>delete</button>
              <button className='w-[32%] p-2 border-2 rounded-xl'>edit</button>
              <button className='w-[32%] p-2 border-2 rounded-xl'>info</button>
            </div>
          </div>
        })
      }
   </div>
    </div>
  )
}

export default App
