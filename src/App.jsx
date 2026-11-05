import React, { useState } from 'react'
import CntContext from './Context/CntContext'
import Counter from './Components/Counter'

const App = () => {
  const [data , setdata] = useState(0)
  return (
   <CntContext.Provider value={{data , setdata}}>
        <Counter/>
   </CntContext.Provider>
  )
}

export default App
