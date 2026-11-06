import React, { useContext } from 'react'
import CntContext from '../Context/CntContext'

const CounterView = () => {
    const {data, setdata} = useContext(CntContext)
  return (
    <div>
      <h1>Your Number is {data}</h1>
      <button onClick={()=>setdata((prev) => prev +1)}>+1</button>
    </div>
  )
}

export default CounterView
