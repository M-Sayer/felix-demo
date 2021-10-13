import React from 'react';
import { TextField } from '@material-ui/core';


export const FormField = ({formik, name, ...other}) => {
  const { values, touched, errors, handleChange } = formik
  console.log(values)
  return (
    <TextField
      value={values[name]}
      onChange={handleChange}
      error={touched[name] && !!errors[name]}
      helperText={touched[name] && errors[name]}
      inputProps={{ style: { textAlign: 'center' } }}
      name={name}
      id={name}
      {...other}
    />
  ) 
}