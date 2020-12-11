import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../../services/auth-service';
import UserContext from '../../contexts/UserContext';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, useTheme, Box } from '@material-ui/core';

export const RegistrationForm = () => {
  const user = useContext(UserContext);
  const history = useHistory();
  const [error, setError] = useState(null)
  const theme = useTheme();

  return (
    <>
      {error && console.log(error)}
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '' }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(12, 'Must be 12 characters or less')
            .required('Required'),
          lastName: Yup.string()
            .max(12, 'Must be 12 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required()
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const { authToken } = await AuthService.postNewUser(values);
              user.handleUserLog(authToken);
              history.push('/')
            } catch (e) {
              setError(e)
            }
          }}
      >
        {props => (
          <Form>
            <Box display='flex' flexDirection='column' px={25} pb={4}>
              <TextField 
                id='firstName'
                name='firstName'
                placeholder='First Name'
                value={props.values.firstName}
                onChange={props.handleChange}
                error={props.touched.firstName && !!props.errors.firstName}
                helperText={props.touched.firstName && props.errors.firstName}
                inputProps={{ style: { textAlign: 'center' } }}
              />
              <TextField
                id='lastName'
                name='lastName'
                placeholder='Last Name'
                value={props.values.lastName}
                onChange={props.handleChange}
                error={props.touched.lastName && !!props.errors.lastName}
                helperText={props.touched.lastName && props.errors.lastName}
                inputProps={{ style: { textAlign: 'center', marginTop: 10 } }}
              />
              <TextField
                id='email'
                name='email'
                placeholder='Email'
                value={props.values.email}
                onChange={props.handleChange}
                error={props.touched.email && !!props.errors.email}
                helperText={props.touched.email && props.errors.email}
                inputProps={{ style: { textAlign: 'center', marginTop: 10 } }}
              />
            </Box>
            <Button variant='contained' color='primary' type='submit' disabled={props.isSubmitting}>Sign Up</Button>
          </Form>
        )}
      </Formik>
    </>
  )
}
