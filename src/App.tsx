import { Navbar } from '@/components/blocks/navbar'
import { BrowserRouter, Route, Routes } from "react-router";
import { Sergey } from './pages/sergey';
import { Mateusz } from './pages/mateusz';
import { Kuba } from '@/pages/kuba';
import { Policies } from '@/pages/policies';
import PWABadge from '@/PWABadge';
import { PolicyDetails } from '@/pages/policyDetails';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <PWABadge />
        <Routes>
          <Route path="/" element={<Policies />} />
          <Route path="/policy-details/:policyId" element={<PolicyDetails />} />
          <Route path="/sergey" element={<Sergey />} />
          <Route path="/mateusz" element={<Mateusz />} />
          <Route path="/kuba" element={<Kuba />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
