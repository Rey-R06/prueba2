import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { enrutador } from './router/enrutador'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={createBrowserRouter(enrutador)} />
  </StrictMode>,
)
