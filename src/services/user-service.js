import config from '../config';
import TokenService from './token-service';

// User service object strictly for getting user information
// Not for user authentication and signup!
// config.API_ENDPOINT = http://localhost:8000/api

const UserService = {
  async getUser() {
    const settings = {
      'method': 'GET',
      'headers': {
        'Authorization': `Bearer ${TokenService.getAuthToken(config.TOKEN_KEY)}`,
        'Content-Type' : 'application/json'
      },
    }

    // Prior to making this call
    // There is no way I am getting user id in advance
    // Possible solutions:
    // (1) Send user id with authToken? <---- solution I went with -CJLS
    // (2) Have token parsed to get user id from payload on client side
    const response = await fetch(`${config.API_ENDPOINT}/users`, settings);

    if(!response.ok) {
      const error = await response.json();
      return Promise.reject(error);
    }

    return response.json();
  }
}

export default UserService;