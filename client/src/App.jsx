
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import AddInvoice from "./pages/AddInvoice"
import Invoice from "./pages/Invoice"
import Inventory from "./pages/Inventory"
import SignUp from "./pages/SignUp"
import PrivateRoute from './components/PrivateRoute';
import Profile from "./pages/Profile"
import Sample from "./pages/Sample"
import WholesaleManagement from "./pages/WholesaleManagement"
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/addinvoice" element={<AddInvoice />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/wholesale" element={<WholesaleManagement />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/h" element={<Sample />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
