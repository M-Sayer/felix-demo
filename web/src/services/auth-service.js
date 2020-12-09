import config from '../config';

// config.API_ENDPOINT = http://localhost:8000/api
const AuthService = {
  async postNewUser(newUser) {   
    const settings = {
      'method': 'POST',
      'headers': {
        'Content-Type' : 'application/json'
      },
      'body': JSON.stringify(newUser)
    }

    // http://localhost:8000/api/users/register
    const response = await fetch(`${config.API_ENDPOINT}/users/register`, settings);

    if(!response.ok) {
      const error = await response.json();
      return Promise.reject(error);
    }

    return response.json(); //returns {authToken: 'JWTString'}
  },

  async postOldUser(oldUser) {
    const settings = {
      'method': 'POST',
      'headers': {
        'Content-Type' : 'application/json'
      },
      'body': JSON.stringify(oldUser)
    }

    // http://localhost:8000/api/users/login
    const response = await fetch(`${config.API_ENDPOINT}/users/login`, settings);

    if(!response.ok) {
      const error = await response.json();
      return Promise.reject(error);
    }

    return response.json();
  }
}

export default AuthService;