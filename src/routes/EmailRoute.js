import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import AuthService from '../services/auth-service';
import TokenService from '../services/token-service';
 
export const EmailRoute = () => {
  const history = useHistory();
  const { token } = useParams();
  const UserCtx = useContext(UserContext)

  useEffect(() => {
    async function verifyToken() {
      if (token) {
        try {
          const res = await AuthService.verifyEmailToken(token)
          console.log('email token res', res)
          TokenService.saveAuthToken(res.authToken)
          UserCtx.getUser()
          history.push('/')
        } catch(e) {
          console.log(e)
        }
      }
    }
    verifyToken();
  }, [])
  
  return (
    <p>loading</p>
  )
}