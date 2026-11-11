import React from 'react'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Dashboard from './Dashboard';
import ZustandSync from './pages/ZustandSync';
import ZustandAsync from './pages/ZustandAsync';
import ReduxSync from './pages/ReduxSync';
import ReduxAsync from './pages/ReduxAsync';
import AtomSync from './pages/AtomSync';
import AtomAsync from './pages/AtomAsync';

const App = () => {
    const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard/>,
    children:[
        {
            index:true ,
            element:<ZustandSync/>
        },
        {
            path:'ZustandAsync' ,
            element:<ZustandAsync/>
        },
          {
            path:'ReduxSync' ,
            element:<ReduxSync/>
        },
          {
            path:'ReduxAsync' ,
            element:<ReduxAsync/>
        },
        {
            path:'AtomSync' ,
            element:<AtomSync/>
        },{
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
