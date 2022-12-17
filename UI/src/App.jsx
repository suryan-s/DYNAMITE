import { useState } from 'react'
import Landing from "./components/composites/Landing"
import Home from "./components/composites/Home"

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Landing />}/>
      <Route path='/home' element={<Home/>}/>
      </>
  )
);



function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
