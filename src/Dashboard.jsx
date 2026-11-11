import React from 'react'
import { Link, Outlet } from 'react-router'

const Dashboard = () => {
  return (
    <div className='w-325 m-auto'>
      <header className='w-full m-auto py-5 flex items-center justify-between'>
        <nav className='w-full flex items-center justify-between uppercase font-semibold'>
            <Link className='p-[6px_14px] border-3 border-black rounded-xl transition duration-300 hover:bg-black hover:text-white' to={"/"}>Zustand/Sync</Link>
            <Link className='p-[6px_14px] border-3 border-black rounded-xl transition duration-300 hover:bg-black hover:text-white' to={"/ZustandAsync"}>Zustand/Async</Link>
            <Link className='p-[6px_14px] border-3 border-black rounded-xl transition duration-300 hover:bg-black hover:text-white' to={"/ReduxSync"}>Redux/Sync</Link>
            <Link className='p-[6px_14px] border-3 border-black rounded-xl transition duration-300 hover:bg-black hover:text-white' to={"/ReduxAsync"}>Redux/Async</Link>
            <Link className='p-[6px_14px] border-3 border-black rounded-xl transition duration-300 hover:bg-black hover:text-white' to={"/AtomSync"}>Atom/Sync</Link>
            <Link className='p-[6px_14px] border-3 border-black rounded-xl transition duration-300 hover:bg-black hover:text-white' to={"/AtomAsync"}>Atom/Async</Link>


        </nav>
      </header>
      <Outlet/>
    </div>
  )
}

export default Dashboard
