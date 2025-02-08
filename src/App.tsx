import { Navbar } from '@/components/blocks/navbar'
import { BrowserRouter, Route, Routes } from "react-router";
import { Sergey } from './pages/sergey';
import { Mateusz } from './pages/mateusz';
import { Kuba } from '@/pages/kuba';
import { Clients } from '@/pages/clients';
import { Insurances } from '@/pages/insurances';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Clients />} />
          <Route path="/polisy" element={<Insurances />} />
          <Route path="/sergey" element={<Sergey />} />
          <Route path="/mateusz" element={<Mateusz />} />
          <Route path="/kuba" element={<Kuba />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
