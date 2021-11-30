export default {
  // Deployment automation script
  API_ENDPOINT: process.env.REACT_APP_ENV === 'development'
    ? 'http://localhost:8000' : process.env.REACT_APP_API_URL,
  TOKEN_KEY: 'Auth'
}

