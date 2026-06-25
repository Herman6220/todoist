import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './context/AuthContext.tsx'
import { SidebarProvider } from './components/Sidebar.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SidebarProvider> 
          <App />
        </SidebarProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
