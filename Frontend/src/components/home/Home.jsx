import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearAuthData } from '../../redux/auth/authSlice'
function Home() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearAuthData());
    navigate('/login')
  }

  return (
    <div>
      <h1>Welcome {user ? user.first_name : 'Guest'}! </h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home
