
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import AddInvoice from "./pages/AddInvoice"
import Invoice from "./pages/Invoice"
import Inventory from "./pages/Inventory"

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addinvoice" element={<AddInvoice />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
