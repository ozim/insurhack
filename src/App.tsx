import './App.css'
import { Navbar } from '@/components/blocks/navbar'
import { BrowserRouter, Route, Routes } from "react-router";
import { Sergey } from './pages/sergey';
import { Mateusz } from './pages/mateusz';
import { Kuba } from '@/pages/kuba';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/sergey" element={<Sergey />} />
          <Route path="/mateusz" element={<Mateusz />} />
          <Route path="/kuba" element={<Kuba />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
