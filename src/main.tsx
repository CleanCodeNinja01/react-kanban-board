import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LoginForm from './components/LoginForm.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoginForm/>
  </StrictMode>,
)
