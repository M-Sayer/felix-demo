import { Typography, Grid, Container, Box, useMediaQuery } from '@material-ui/core';
import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export const Financials = () => {
  const UserCtx = useContext(UserContext)
  const user = UserCtx.user

  const renderOverview = () => {
    const data = {
      // Allowance: [user.allowance, 'primary.dark'],
      Balance: [user.balance, 'primary.main'],
    }

    let fields = []

    for (const key in data) {
      fields.push(
        <Box spacing={2}>
          <Box color={data[key][1] || ''}>
            <Typography variant='h5'>{key}</Typography>
          </Box>
          <Box textAlign="right">
            <Typography variant='h3' fontFamily='Roboto'>${data[key][0]}</Typography>
          </Box>
        </Box>
      )
    }

    return fields
  }

  return (
    <Container>
      <Box py={2}>
        {renderOverview()}
      </Box>
    </Container>
  );
};