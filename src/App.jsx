import AdminLogin from './AdminLogin';
import LoginPage from './LoginPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLogin from './UserLogin';
import AdminDashboard from './AdminDashboard';


function App() {
  

  return (
    <>
     
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route path='/AdminDashboard' element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
