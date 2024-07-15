import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../axiosconfig";
import { setAuthData } from "../../redux/auth/authSlice";
import adminAxiosInstance from "../../adminaxiosconfig";
import './AdminLogin.css'
const AdminLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await adminAxiosInstance.post('/admin/token/', {email, password});
            localStorage.setItem('adminToken', response.data.admin_token);
            localStorage.setItem('adminData', JSON.stringify(response.data));
            dispatch(setAuthData(response.data));
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Admin login failed:', error)
        }
    };

    return (
        <div className="admin-login-container">
          <div className="admin-login-form">
            <h2 className="admin-login-title">Admin Login</h2>
            <form onSubmit={handleAdminLogin}>
              <div className="input-container">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="input-container">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
              <button type="submit" className="admin-login-button">LOGIN</button>
            </form>
            <div className="admin-login-links">
                <div className="redirect">

              <p>Switch to User? <Link to="/login">User-Login</Link></p>
                </div>
            </div>
          </div>
        </div>
      );
}

export default AdminLogin;