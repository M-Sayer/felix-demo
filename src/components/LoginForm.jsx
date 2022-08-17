import React, { useContext, useState } from 'react';
import AuthService from '../services/auth-service';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { 
  Box,
  Button,
  Link,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@material-ui/core';
import TokenService from '../services/token-service';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="down" ref={ref} {...props} />
))

export const LoginForm = props => {
  const history = useHistory()
  const UserCtx = useContext(UserContext)

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { register } = props;

  const [skipDialog, setSkipDialog] = useState(false)
  
  const handleDemoLogin = async () => {
    try {
      const { authToken } = await AuthService.demoLogin()
      
      TokenService.saveAuthToken(authToken)
      
      UserCtx.getUser()
      
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Dialog
        open={skipDialog}
        TransitionComponent={Transition}
        onClose={() => setSkipDialog(false)}
      >
        <DialogTitle>Skip Register/Login?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            I've built a passwordless register/login system for this demo. All you need to do is signup with your email
            and you'll receive an email with a login link (check your spam!) that will automatically authenticate you. Quick and easy.
          </DialogContentText>
          <DialogContentText>
            If you want to skip all that and just take a look at the demo, you can use the skip button below to login to the demo account.
          </DialogContentText>
          <DialogContentText>
            (I hope you give the passwordless login a try!)
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSkipDialog(false)}>Try Passwordless</Button>
          <Button onClick={() => handleDemoLogin()}>Skip</Button>
        </DialogActions>
      </Dialog>
      {success && 
        <p>
          We sent you an email with a login link. You may want to check your Junk/Spam folders.
        </p>
      }
      {!success && 
        <Box>
          <Formik
            initialValues={{ email: '' }}
            validationSchema={Yup.object({
              email: Yup.string().email('Invalid email address').required()
            })}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await AuthService.emailLogin(values);
                setSuccess(true);
              } catch(e) {
                setError(e.error);
              }
            }}
          >
            {props => (
              <Form>
                <Box display='flex' flexDirection='column'>
                  <TextField
                    id='email'
                    name='email'
                    placeholder='Email'
                    value={props.values.email}
                    onChange={props.handleChange}
                    error={props.touched.email && !!props.errors.email}
                    helperText={props.touched.email && props.errors.email}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                </Box>
                <Box my={2} display='flex' flexDirection='column'>
                  <Button
                    variant='contained' 
                    color='primary' 
                    type='submit' 
                    disabled={props.isSubmitting}
                  >
                    Login
                  </Button>
                </Box>
                  <Box display='flex' flexDirection='column'>
                    <Button color='primary' variant='outlined' onClick={() => register(true)}>Sign Up</Button>
                  </Box>
              </Form>
            )}
          </Formik>
          <Box mt={2} textAlign="center">
            <Link color="textPrimary" onClick={() => setSkipDialog(true)} style={{ cursor: 'pointer' }}>Skip the login/register step</Link>
          </Box>
        </Box>
      }
      {error === 'User does not exist' && 
        <p>
          We couldn't find that email address. Did you want to register?
        </p>
      }
    </>
  )
}