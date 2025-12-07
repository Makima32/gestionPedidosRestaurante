import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvierCookie } from './hook/auth/authcontext.jsx'
createRoot(document.getElementById('root')).render(

  <AuthProvierCookie><StrictMode>
    <App />
  </StrictMode>
  </AuthProvierCookie>
  
)
