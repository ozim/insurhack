import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from "react-router";
import { Sergey } from './pages/sergey';
import { Mateusz } from './pages/mateusz';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sergey" element={<Sergey />} />
        <Route path="/mateusz" element={<Mateusz />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
