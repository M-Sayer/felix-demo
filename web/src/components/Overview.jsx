import React, { useContext } from 'react';
import { Financials } from './Financials';
import TransactionsOverview from './Overview/TransactionsOverview';
import Alerts from './Alerts/Alerts';
import AlertsContext from '../contexts/AlertsContext';
import { Grid, Paper, Typography, Box } from '@material-ui/core';
import { Goals } from './Goals';
import UserContext from '../contexts/UserContext';

export const Overview = (props) => {
  const alertsContext = useContext(AlertsContext);
  const User = useContext(UserContext);

  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='center'
      spacing={2}
    >
      {alertsContext.dashboardAlerts.length > 0 &&  
        <Grid item xs={10}>
          <Paper>
            <Alerts />
          </Paper>
        </Grid>
      }
      <Grid item xs={10}>
        <Paper>
          <Financials />
        </Paper>
      </Grid>
      <Grid item xs={10}>
        <Paper>
          <Typography>
            <Box ml={2} color='tertiary.main'>Goals</Box>
          </Typography>
          <Typography variant='h3'>
            <Box ml={2} mb={2} fontFamily='Roboto Slab'>${User.user.total_saved}</Box>
          </Typography>
          <Goals id='overview' />
        </Paper>
      </Grid>
      <Grid item xs={10}>
        <Paper>
        <TransactionsOverview {...props} />
        </Paper>
      </Grid>
    </Grid>
  );
}