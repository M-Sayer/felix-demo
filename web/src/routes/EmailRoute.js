import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AuthService from '../services/auth-service';
import TokenService from '../services/token-service';
 
export const EmailRoute = () => {
  const history = useHistory();
  const { token } = useParams();
  console.log(token)

  useEffect(() => {
    async function verifyToken() {
      if (token) {
        try {
          const res = await AuthService.verifyEmailToken(token);
          TokenService.saveAuthToken(res.authToken)
          history.push('/')
        } catch(e) {
          console.log(e)
        }
      }
    }
    verifyToken();
  }, [token])
  
  return (
    <h1>email</h1>
  )
}