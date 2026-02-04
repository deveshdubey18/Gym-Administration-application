import AdminDashboard from "./AdminDashboard"
import AdminLogin from "./AdminLogin"
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  

  return (
    <>
     
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
