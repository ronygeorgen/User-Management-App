import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearAuthData } from '../../redux/auth/authSlice'
import axiosInstance from '../../axiosconfig'

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
    <div>
      <h1>User Profile</h1>
      <h2>Welcome {user?.first_name} {user?.last_name}</h2>
      <div style={{ marginBottom: '20px' }}>
        {profile.profile_picture ? (
          <img 
            src={profile.profile_picture} 
            alt="Profile" 
            style={{ 
              width: '150px', 
              height: '150px', 
              borderRadius: '50%', 
              objectFit: 'cover' 
            }} 
          />
        ) : (
          <div 
            style={{ 
              width: '150px', 
              height: '150px', 
              borderRadius: '50%', 
              backgroundColor: '#ccc',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '48px',
              color: '#fff'
            }}
          >
            {user?.first_name[0]}
          </div>
        )}
      </div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <input
            type="file"
            onChange={(e) => setNewProfilePicture(e.target.files[0])}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <p>Username: {profile.username}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;