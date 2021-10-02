import { Typography, Grid, Box } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import UserService from '../services/user-service';

export const Financials = () => {
  const User = useContext(UserContext);
  const user = User.user;

  useEffect(() => {
    async function getUser() {
      try {
        const res = await UserService.getUser();
        console.log(res)
        User.setUser(res);
      } catch(e) {
        User.setError(e);
      }
    }
    getUser()
  }, []);

  const renderOverview = () => {
    const data = {
      Balance: [user.balance, 'primary.main'],
      Allowance: [user.allowance, 'primary.dark'],
    };

    let fields = [];

    for (const key in data) {
      fields.push(
        <Grid key={key} item xs={12} md={6}>
          <Box ml={2} alignItems='left' color={data[key][1] || ''}>
            <Typography>{key}</Typography>
          </Box>
          <Box ml={2}>
            <Typography variant='h3' fontFamily='Roboto'>${data[key][0]}</Typography>
          </Box>
        </Grid>
      )
    }
    return fields;
  };

  return (
    <Grid
      container
      direction='row'
      justify='center'
      spacing={2}
    >
      {renderOverview()}
    </Grid>
  );
};