import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Import hooks from Redux
import { logout } from '../store/authSlice'; // Import the logout action

const Header = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth); // Access login state from Redux
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
  };

  return (
    <div>
      <Link to="/">
        <div className="overlay top-left"
          style={{ color: 'white', transition: 'color 0.2s ease', cursor: 'pointer' }}
          onMouseOver={(e) => e.currentTarget.style.color = '#9479f4'}
          onMouseOut={(e) => e.currentTarget.style.color = 'white'}
        >
          <h2><b>EQUAVIS</b></h2>
        </div>
      </Link>

      {isLoggedIn ? (
        <div className="overlay top-right"
          style={{ color: 'white', transition: 'color 0.2s ease', cursor: 'pointer' }}
          onMouseOver={(e) => e.currentTarget.style.color = '#9479f4'}
          onMouseOut={(e) => e.currentTarget.style.color = 'white'}
        >
          <b><h3>Welcome, {user.name}</h3></b>
          <button onClick={handleLogout} style={{ backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      ) : (
        <Link to="/login">
          <div className="overlay top-right"
            style={{ color: 'white', transition: 'color 0.2s ease', cursor: 'pointer' }}
            onMouseOver={(e) => e.currentTarget.style.color = '#9479f4'}
            onMouseOut={(e) => e.currentTarget.style.color = 'white'}
          >
            <img src="./src/assets/account.svg" alt="Logo" style={{ width: '50px', height: '35px' }} />
            <b><h3>USER</h3></b>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Header;
