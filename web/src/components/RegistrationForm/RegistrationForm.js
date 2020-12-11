import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../../services/auth-service';
import UserContext from '../../contexts/UserContext';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@material-ui/core';

export const RegistrationForm = () => {
  const user = useContext(UserContext);
  const history = useHistory();
  const [error, setError] = useState(null)

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
            <TextField 
              id='firstName'
              name='firstName'
              label='First Name'
              value={props.values.firstName}
              onChange={props.handleChange}
              error={props.touched.firstName && !!props.errors.firstName}
              helperText={props.touched.firstName && props.errors.firstName}
            />
            <TextField
              id='lastName'
              name='lastName'
              label='Last Name'
              value={props.values.lastName}
              onChange={props.handleChange}
              error={props.touched.lastName && !!props.errors.lastName}
              helperText={props.touched.lastName && props.errors.lastName}
            />
            <TextField
              id='email'
              name='email'
              label='Email'
              value={props.values.email}
              onChange={props.handleChange}
              error={props.touched.email && !!props.errors.email}
              helperText={props.touched.email && props.errors.email}
            />
            <Button type='submit' disabled={props.isSubmitting}>Submit</Button>
          </Form>
        )}
      </Formik>
    </>
  )
}
