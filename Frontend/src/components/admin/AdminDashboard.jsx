import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthData } from '../../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user)

  const handleLogout = () => {
    dispatch(clearAuthData());
    navigate('/admin/login');
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h5>Welcome {user ? user.first_name : 'Admin'}! </h5>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
