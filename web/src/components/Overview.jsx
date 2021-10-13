import React, { useContext } from 'react';
import { Financials } from './Financials';
import Alerts from './Alerts/Alerts';
import AlertsContext from '../contexts/AlertsContext';
import { Grid, Paper, Typography, Box, Container, Button } from '@material-ui/core';
import { UserContext } from '../contexts/UserContext';
import { GoalsContext } from '../contexts/GoalsContext';
import { Goal } from './Goal';
import { TransactionsContext } from '../contexts/TransactionsContext';
import { Transaction } from './Transaction';

export const Overview = ({ setTabIndex }) => {
  const alertsContext = useContext(AlertsContext);
  const UserCtx = useContext(UserContext);
  const GoalCtx = useContext(GoalsContext);
  const TransactionCtx = useContext(TransactionsContext);
  const goals = GoalCtx.goals.slice(0, 3);
  const transactions = TransactionCtx.transactions.slice(0, 3);

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
            <Box color='tertiary.main'>
              <Typography>Goals</Typography>
            </Box>
            <Box mb={2}>
              <Typography fontFamily='Roboto Slab' variant='h3'>${UserCtx.user.total_saved}</Typography>
            </Box>
            {goals.map(goal => <Goal key={goal.id} goal={goal} /> )}
            <Box m={2} textAlign='center'>
              <Button onClick={() => setTabIndex(1)}>
                <Typography variant='overline'>See All</Typography>
              </Button>
            </Box>
          </Container>
        </Paper>
      </Grid>
      <Grid item xs={10}>
        <Paper>
            <Container>
              <Box mb={2} color='secondary.main'>
                <Typography>Transactions</Typography>
              </Box>
              {transactions.map((trx, idx) => <Transaction key={idx} trx={trx} /> )}
              <Box m={2} textAlign='center'>
              <Button onClick={() => setTabIndex(2)}>
                <Typography variant='overline'>See All</Typography>
              </Button>
            </Box>
            </Container>
          </Paper>
      </Grid>
    </Grid>
  );
}