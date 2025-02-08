import {Navbar} from '@/components/blocks/navbar'
import {BrowserRouter, Route, Routes} from "react-router";
import {Home} from '@/pages/Home';
import {PolicyBuilder} from '@/pages/PolicyBuilder';
import PWABadge from '@/PWABadge';
import {PolicyDetails} from '@/pages/PolicyDetails';
import {AddPolicy} from '@/pages/AddPolicy';
import {EditPolicy} from '@/pages/EditPolicy';

function App() {
  return (
      <>
        <BrowserRouter>
          <Navbar/>
          <PWABadge/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/policy-details/:policyId" element={<PolicyDetails/>}/>
            <Route path="/add-policy" element={<AddPolicy/>}/>
            <Route path="/edit-policy/:policyId" element={<EditPolicy/>}/>
            <Route path="/builder" element={<PolicyBuilder/>}/>
          </Routes>
        </BrowserRouter>
      </>
  )
}

export default App
