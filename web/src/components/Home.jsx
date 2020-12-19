import { Container, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegistrationForm } from './RegistrationForm';

export const Home = () => {
  const [register, setRegister] = useState(false);

  return (
    <Container>
      <Typography variant='h1'>amina</Typography>
      {register ? <RegistrationForm register={setRegister} /> : <LoginForm register={setRegister} />}
    </Container>
  )
}