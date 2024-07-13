import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosconfig';
import { setAuthData } from '../../redux/auth/authSlice';

const Login = ()=> {
    const [email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/login/',{email, password});
            dispatch(setAuthData(response.data));
            navigate('/home')
        } catch (error){
            console.error('Login Failed:', error)
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <input 
            type="email" 
            value= {email}
            onChange={(e)=> setEmail(e.target.value)}
            placeholder='Email'
            required
            />
            <input 
            type="password" 
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            placeholder="Password"
            required
            />
            <button type='submit'>Login</button>
        </form>
    )
};

export default Login;