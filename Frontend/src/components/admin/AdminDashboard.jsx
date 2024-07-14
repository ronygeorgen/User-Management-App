import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthData } from '../../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import adminAxiosInstance from '../../adminaxiosconfig';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [activeUsers, setActiveUsers] = useState([]);
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await adminAxiosInstance.get('/admin/dashboard/');
      setActiveUsers(response.data.active_users);
      setInactiveUsers(response.data.inactive_users);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      if (error.response && error.response.status === 401) {
        navigate('/admin/login');
      }
    }
  };

  const handleLogout = () => {
    dispatch(clearAuthData());
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      await adminAxiosInstance.post(`/admin/users/${userId}/toggle-status/`);
      fetchDashboardData(); // Refetch all data to update both lists
    } catch (error) {
      console.error('Failed to toggle user status:', error);
    }
  };

  const UserTable = ({ users, tableTitle }) => (
    <>
      <h3>{tableTitle}</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => toggleUserStatus(user.id, user.is_active)}>
                  {user.is_active ? 'Block' : 'Unblock'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h5>{message}</h5>
      <h5>Welcome {user ? user.first_name : 'Admin'}! </h5>
      <button onClick={handleLogout}>Logout</button>

      <UserTable users={activeUsers} tableTitle="Active Users" />
      <UserTable users={inactiveUsers} tableTitle="Inactive Users" />
    </div>
  );
};

export default AdminDashboard;