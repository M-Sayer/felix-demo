import { Typography, Grid } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';
import UserService from '../../services/user-service';

export const Overview = () => {
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

  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='center'
      spacing={2}
    >
      <Grid item xs={12} md={6}>
        <Typography variant='h3'>
          Balance
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant='h3'>
          Allowance
        </Typography>
      </Grid>
    </Grid>
  );
};