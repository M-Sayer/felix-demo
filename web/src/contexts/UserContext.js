import React, { useState } from 'react';
import TokenService from '../services/token-service';

export const UserContext = React.createContext({
  user: {},
  isUserLoggedIn: '',
  setUser: () => {},
});

export const UserProvider = props => {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  
  return (
    <UserContext.Provider
      value={{
        user, setUser, loggedIn, setLoggedIn
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}