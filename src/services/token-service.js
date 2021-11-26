import config from '../config';

const TokenService = {
  makeAuthToken(user_name, password) {
    return window.btoa(`${user_name}:${password}`);
  },

  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY);
  },

  hasAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY) ? true : false;
  },

  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token);
  },

  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY);
    window.localStorage.removeItem('username');
  },
}

export default TokenService;