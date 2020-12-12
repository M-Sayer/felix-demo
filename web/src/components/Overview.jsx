import React, { useContext } from 'react';
import { Financials } from './Financials';
import TransactionsOverview from './Overview/TransactionsOverview';
import Alerts from './Alerts/Alerts';
import AlertsContext from '../contexts/AlertsContext';
import { Grid, Paper } from '@material-ui/core';
import { Goals } from './Goals';

export const Overview = (props) => {
  const alertsContext = useContext(AlertsContext);

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
          <Goals />
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