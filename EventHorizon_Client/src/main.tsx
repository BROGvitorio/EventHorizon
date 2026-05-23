import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'

import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Auth/>}></Route>
          <Route path="/auth" element={<Auth/>}></Route>

          <Route 
            path="dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
