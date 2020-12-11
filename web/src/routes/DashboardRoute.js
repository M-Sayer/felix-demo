import React, { useContext } from 'react';
import UserOverview from '../components/Overview/UserOverview';
import GoalsOverview from '../components/Overview/GoalsOverview';
import TransactionsOverview from '../components/Overview/TransactionsOverview';
import Alerts from '../components/Alerts/Alerts';
import AlertsContext from '../contexts/AlertsContext';
import { Grid, Paper } from '@material-ui/core';

const DashboardRoute = (props) => {
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
          <UserOverview />
        </Paper>
      </Grid>
      <Grid item xs={10}>
        <Paper>
          <GoalsOverview {...props}/>
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

export default DashboardRoute;