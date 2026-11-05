import {  useContext } from 'react'
import CntContext from '../Context/CntContext'

const Counter = () => {
    const {data , setdata} = useContext(CntContext)
  return (
    <div className='w-325 m-auto my-10 flex items-center justify-center flex-col gap-3 text-3xl font-semibold'>
      <h1>{data}</h1>
     <div className='flex items-center gap-2'>
         <button className='border-2 p-2 rounded-xl' onClick={()=>setdata((prev)=>prev+1)}>Inc</button>
         <button className='border-2 p-2 rounded-xl' onClick={()=>setdata((prev)=>Math.max(0 , prev -1))}>Inc</button>

     </div>
    </div>
  )
}

export default Counter
