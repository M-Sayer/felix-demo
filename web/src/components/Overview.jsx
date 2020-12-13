import React, { useContext } from 'react';
import { Financials } from './Financials';
import TransactionsOverview from './Overview/TransactionsOverview';
import Alerts from './Alerts/Alerts';
import AlertsContext from '../contexts/AlertsContext';
import { Grid, Paper, Typography, Box, Container } from '@material-ui/core';
import UserContext from '../contexts/UserContext';
import { GoalsContext } from '../contexts/GoalsContext';
import { Goal } from './Goal';

export const Overview = (props) => {
  const alertsContext = useContext(AlertsContext);
  const UserCtx = useContext(UserContext);
  const GoalCtx = useContext(GoalsContext);
  const goals = GoalCtx.goals.slice(0, 3);

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
          <Container>
            <Typography>
              <Box color='tertiary.main'>Goals</Box>
            </Typography>
            <Typography variant='h3'>
              <Box mb={2} fontFamily='Roboto Slab'>${UserCtx.user.total_saved}</Box>
            </Typography>
            {goals.map(goal => <Goal key={goal.id} goal={goal} /> )}
          </Container>
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