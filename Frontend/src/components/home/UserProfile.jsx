import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearAuthData } from '../../redux/auth/authSlice'
import axiosInstance from '../../axiosconfig'
import './UserProfile.css'
function UserProfile() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get('user-profile/');
      setProfile(response.data);
      setNewUsername(response.data.username);
      setError(null);
    } catch (error) {
      console.error('Error fetching profile:', error);
      if (error.response && error.response.status === 401) {
        // Unauthorized, token might be expired
        handleLogout();
      } else {
        setError('Failed to fetch profile. Please try again.');
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('username', newUsername);
    if (newProfilePicture) {
      formData.append('profile_picture', newProfilePicture);
    }

    try {
      await axiosInstance.put('user-profile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearAuthData());
    navigate('/login')
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <h1 className="profile-title">User Profile</h1>
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-picture">
            {profile.profile_picture ? (
              <img src={profile.profile_picture} alt="Profile" />
            ) : (
              <div className="profile-initial">{user?.first_name[0]}</div>
            )}
          </div>
          <h2 className="profile-name">
            Welcome {user?.first_name} {user?.last_name}
          </h2>
        </div>
        <div className="profile-body">
          {isEditing ? (
            <div className="edit-form">
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="New username"
              />
              <input
                type="file"
                onChange={(e) => setNewProfilePicture(e.target.files[0])}
                className="file-input"
              />
              <button onClick={handleSave} className="save-btn">
                Save
              </button>
            </div>
          ) : (
            <div className="profile-info">
              <p>Username: {profile.username}</p>
              <div className="profile-actions">
                <button onClick={handleEdit} className="edit-btn">
                  Edit Profile
                </button>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;