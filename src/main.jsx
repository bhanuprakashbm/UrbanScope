import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import Home from "./pages/Home/Home.jsx"
import NASAData from "./pages/NASAData/NASAData.jsx"
import About from "./pages/About/About.jsx"
import UrbanVR from "./pages/UrbanVR/UrbanVR.jsx"
import NotFoundPage from "./pages/404 Page/NotfoundPage.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path='/nasa-data' element={<NASAData />} />
      <Route path='/urban-vr' element={<UrbanVR />} />
      <Route path='/about' element={<About />} />
      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>

  </RouterProvider>
)
