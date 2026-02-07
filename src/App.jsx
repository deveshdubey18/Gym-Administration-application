import AdminLogin from './AdminLogin';
import LoginPage from './LoginPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLogin from './UserLogin';
import AdminDashboard from './AdminDashboard';
import MainPage from './MainPage';


function App() {
  

  return (
    <>
     
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route path='/AdminDashboard' element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
