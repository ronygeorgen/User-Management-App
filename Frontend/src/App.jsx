import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom"
import Login from "./components/login/Login"
import Signup from "./components/signup/Signup"
import Home from "./components/home/Home.jsx"
import AdminLogin from "./components/admin/AdminLogin"
import AdminDashboard from "./components/admin/AdminDashboard"
import UserProfile from "./components/home/UserProfile"

function App() {

  return (
    <>
    <BrowserRouter>
    {/* <nav>
      
      <Link to="/signup">Signup</Link><br />
      <Link to="/admin/login">Admin Login</Link><br />
      <Link to="/user-profile">User Profile</Link>
    </nav> */}
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/user-profile" element={<UserProfile />} />
  </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
