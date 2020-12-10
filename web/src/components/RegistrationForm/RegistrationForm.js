import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../../services/auth-service';
import UserContext from '../../contexts/UserContext';
import './RegistrationForm.css';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
        <Form>
          <label htmlFor='firstName'>First Name
            <Field name='firstName' type='text' />
          </label>
          <ErrorMessage name='firstName' />
          <label htmlFor='lastName'>Last Name
            <Field name='lastName' type='text' />
          </label>
          <ErrorMessage name='lastName' />
          <label htmlFor='email'>Email
            <Field name='email' type='text' />
          </label>
          <ErrorMessage name='email' />
          <button type='submit'>Submit</button>
        </Form>
      </Formik>
    </>
  )
}
