export default {
  // Deployment automation script
  API_ENDPOINT: process.env.REACT_APP_ENV === 'development'
    ? 'http://localhost:8000/api' : 'https://felix-assistant.herokuapp.com/api',
  TOKEN_KEY: process.env.REACT_APP_TOKEN_KEY || 'felix-felicis' // Temporary
}

