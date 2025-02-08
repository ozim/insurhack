import { Navbar } from '@/components/blocks/navbar'
import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from '@/pages/Home';
import { PolicyBuilder } from '@/pages/PolicyBuilder';
import PWABadge from '@/PWABadge';
import { PolicyDetails } from '@/pages/PolicyDetails';
import { AddPolicy } from '@/pages/AddPolicy';
import { EditPolicy } from '@/pages/EditPolicy';
import { Contact } from '@/pages/Contact';

export const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <PWABadge />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/policies/:policyId" element={<PolicyDetails />} />
        <Route path="/policies/add" element={<AddPolicy />} />
        <Route path="/policies/:policyId/edit" element={<EditPolicy />} />
        <Route path="/builder" element={<PolicyBuilder />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}
