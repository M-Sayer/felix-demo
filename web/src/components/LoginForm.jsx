import React, { useState } from 'react';
import AuthService from '../services/auth-service';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField } from '@material-ui/core';

export const LoginForm = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  return (
    <>
      {success && 
        <p>
          We sent you an email
        </p>
      }
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
            <Box m={5}>
              <Button
                variant='contained' 
                color='primary' 
                type='submit' 
                disabled={props.isSubmitting}
              >
                Login
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      {error === 'User does not exist' && 
        <p>
          We couldn't find that email address. Did you want to register?
        </p>
      }
    </>
  )
}