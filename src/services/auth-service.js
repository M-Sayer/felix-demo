import config from '../config';

const AuthService = {
  async postNewUser(newUser) {   
    const settings = {
      'method': 'POST',
      'headers': {
        'Content-Type' : 'application/json'
      },
      'body': JSON.stringify(newUser)
    }

    const response = await fetch(`${config.API_ENDPOINT}/users/register`, settings);

    if(!response.ok) {
      const error = await response.json();
      return Promise.reject(error);
    }

    return
  },

  async postOldUser(oldUser) {
    const settings = {
      'method': 'POST',
      'headers': {
        'Content-Type' : 'application/json'
      },
      'body': JSON.stringify(oldUser)
    }

    const response = await fetch(`${config.API_ENDPOINT}/users/login`, settings);

    if(!response.ok) {
      const error = await response.json();
      return Promise.reject(error);
    }

    return response.json();
  },

  async emailLogin(email) {
    const response = await fetch(`${config.API_ENDPOINT}/users/login`, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify(email)
    })

    if(!response.ok) {
      return Promise.reject(await response.json());
    }

    return;
  },

  async verifyEmailToken(token){
    const response = await fetch(`${config.API_ENDPOINT}/users/login/token`, {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({ token: token })
    })

    if(!response.ok) {
      return Promise.reject(await response.json());
    }

    return await response.json();
  }
}

export default AuthService;