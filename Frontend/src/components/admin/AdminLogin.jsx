import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosconfig";
import { setAuthData } from "../../redux/auth/authSlice";
import adminAxiosInstance from "../../adminaxiosconfig";
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
            dispatch(setAuthData(response.data));
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Admin login failed:', error)
        }
    };

    return (
        <form onSubmit={handleAdminLogin}>
            <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            />
            <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            />
            <button type="submit">Admin Login</button>
        </form>
    )
}

export default AdminLogin;