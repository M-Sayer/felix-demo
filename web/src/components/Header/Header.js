import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import TokenService from '../../services/token-service';

import './Header.css';

const Header = () => {
  const { isUserLoggedIn, handleUserLog } = useContext(UserContext);

  // Set user to null or redundant?

  // Render logged in state
  // When isUserLoggedIn in UserContext is true
  const renderLoggedInNav = () => {
    return (
      <nav className='headerNav'>
        <Link
          to='/about'
        >
          About
        </Link>
        <Link
          to='/'
        >
          Dashboard
        </Link>
        <Link to='/alerts'>
          Alerts
        </Link>
        <Link
          onClick={() => {
            handleUserLog();
          }}
          to='/' // Goes to register page from dash/Temp
        >
          Log Out
        </Link>
      </nav>
    )
  }

  // Render logged out state
  // When isUserLoggedIn in UserContext is false
  const renderLoggedOutNav = () => {
    return (
      <nav className='headerNav'>
        <Link
          to='/about'
        >
          About
        </Link>
        <Link
          to='/login'
        >
          Log In
        </Link>
        <Link
          to='/register'
        >
          Signup
        </Link>
      </nav>
    )
  }

  return (
    <>
      <header className='headerMain'>
        <h1 className='mainTitle'>felix</h1>
        <h2 className='mainSubtitle'>Personal Finance Assistant</h2>
        {
          (isUserLoggedIn || TokenService.hasAuthToken())
            ? renderLoggedInNav()
            : renderLoggedOutNav()
        }
      </header>
    </>
  );
}

export default Header;