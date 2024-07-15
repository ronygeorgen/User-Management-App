import React,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setAuthData,clearAuthData } from '../../redux/auth/authSlice';
import './Home.css';

function Home() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (!user) {
      const storedUserData = localStorage.getItem('user');
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        dispatch(setAuthData({ user: parsedUserData }));
      } else {
        navigate('/login');
      }
    }
  }, [dispatch, navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch(clearAuthData());
    navigate('/login');
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="navbar-brand">PERSONO.care</div>
        <div className="navbar-menu">
          <Link to="/user-profile" className="navbar-item">User Profile</Link>
          <button onClick={handleLogout} className="navbar-item logout-btn">Logout</button>
        </div>
      </nav>
      <main className="main-content">
        <h1>Welcome, {user ? user.first_name : 'Guest'}!</h1>
        <p>This is your personalized home page. Explore and enjoy!</p>
      </main>
    </div>
  );
}

export default Home;