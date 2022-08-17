import React, { useState, useEffect } from 'react'
import UserService from '../services/user-service'
import TokenService from '../services/token-service'

export const UserContext = React.createContext({
  user: {},
  setUser: () => {},
  loggedIn: false,
  setLoggedIn: () => {},
});

export const UserProvider = props => {
  const [user, setUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)

  const getUser = async () => {
    try {
      const res = await UserService.getUser()
      console.log(res)
      setUser(res)
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    TokenService.hasAuthToken() && getUser()
  }, [])
  
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        getUser,
        loggedIn,
        setLoggedIn,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}