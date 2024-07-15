import React,{ useState } from "react";
import adminAxiosInstance from "../../adminaxiosconfig";
import './CreateUserModel.css';

const CreateUserModel = ({ isOpen, onClose, onUserCreated }) => {
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
          onUserCreated();
          onClose();
        } catch (error) {
          console.error('Failed to create user:', error);
        }
      };

      if (!isOpen) return null;


      return (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create New User</h2>
            <form onSubmit={handleSubmit}>
              <input name="first_name" value={userData.first_name} onChange={handleChange} placeholder="First Name" required />
              <input name="last_name" value={userData.last_name} onChange={handleChange} placeholder="Last Name" required />
              <input name="username" value={userData.username} onChange={handleChange} placeholder="Username" required />
              <input name="email" value={userData.email} onChange={handleChange} placeholder="Email" required type="email" />
              <input name="phone_number" value={userData.phone_number} onChange={handleChange} placeholder="Phone Number" />
              <input name="password" value={userData.password} onChange={handleChange} placeholder="Password" required type="password" />
              <button type="submit">Create User</button>
            </form>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      );

}

export default CreateUserModel;