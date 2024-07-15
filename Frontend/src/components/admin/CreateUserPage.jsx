import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import adminAxiosInstance from '../../adminaxiosconfig';
import './CreateUserPage.css'; 

const CreateUserPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone_number: '',
    password: '',
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminAxiosInstance.post('/admin/create-user/', userData);
      navigate('/admin/dashboard'); 
    } catch (error) {
      console.error('Failed to create user:', error);
      
    }
  };

  const handleCancel = () => {
    navigate('/admin/dashboard'); 
  };

  return (
    <div className="create-user-page">
      <h2 className="create-user-title">Create New User</h2>
      <form className="create-user-form" onSubmit={handleSubmit}>
        <input 
          className="create-user-input"
          name="first_name"
          value={userData.first_name}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input 
          className="create-user-input"
          name="last_name"
          value={userData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input 
          className="create-user-input"
          name="username"
          value={userData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input 
          className="create-user-input"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
          required 
          type="email"
        />
        <input 
          className="create-user-input"
          name="phone_number"
          value={userData.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <input 
          className="create-user-input"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Password"
          required 
          type="password"
        />
        <div className="create-user-button-group">
          <button className="create-user-submit" type="submit">Create User</button>
          <button className="create-user-cancel" type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserPage;