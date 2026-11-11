import React from 'react'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Dashboard from './Dashboard';
import ZustandAsync from './pages/ZustandAsync';
import AtomAsync from './pages/AtomAsync';

const App = () => {
    const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard/>,
    children:[
        {
            index:true ,
            element:<ZustandAsync/>
        },
        {
            path:'AtomAsync' ,
            element:<AtomAsync/>
        },
    ]
  },
]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
