import React, { Component } from 'react';
import TokenService from '../services/token-service';

const UserContext = React.createContext({
  user: {},
  isUserLoggedIn: '',
  setUser: () => {},
});

export default UserContext;

export class UserProvider extends Component {
  state = {
    user: {},
    isUserLoggedIn: '',
    error: null,
  }

  setUser = (user) => {
    this.setState({user});
  }

  setIsUserLoggedIn = (isUserLoggedIn) => {
    this.setState({isUserLoggedIn});
  }
  
  handleUserLog = (token = undefined) => {
    if(token) {
      this.setIsUserLoggedIn(true);
      TokenService.saveAuthToken(token);
    } 
    else {
      this.setIsUserLoggedIn(false);
      TokenService.clearAuthToken();
    }    
  }

  setError = (error) => {
    this.setState({error});
  }

  render() {
    return (
      <UserContext.Provider 
        value={{ 
          user: this.state.user,
          isUserLoggedIn: this.state.isUserLoggedIn,

          setUser: this.setUser,
          setIsUserLoggedIn: this.setIsUserLoggedIn,
          handleUserLog: this.handleUserLog,

          setError: this.setError,
        }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
