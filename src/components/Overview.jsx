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
      justifyContent='center'
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
      {/* <Grid item xs={10}>
        <Paper>
          <Box p={2}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box color='tertiary.main'>
                <Typography variant='h5'>Goals</Typography>
              </Box>
              <Box mb={2}>
                <Typography fontFamily='Roboto Slab' variant='h3'>${UserCtx.user.total_saved}</Typography>
              </Box>
            </Box>
            {goals.length > 0
              ? (
                <Box>
                  <GoalLabels />
                  {goals.map(goal => <Goal key={goal.id} goal={goal} /> )}
                  <Box m={2} textAlign='center'>
                    <Button onClick={() => setTabIndex(1)}>
                      <Typography variant='overline'>See All</Typography>
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box color="#C0C0C0" fontSize={14} textAlign="center">
                  You haven't created any goals yet.
                </Box>
              )
            }
          </Box>
        </Paper>
      </Grid> */}
      <Grid item xs={10}>
        <Paper>
          <Box p={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
            <Box mb={2} color='secondary.main'>
              <Typography variant="h5">Transactions</Typography>
            </Box>
            {transactions.length > 0
              ? (
                <Box>
                  {transactions.map((trx, idx) => <Transaction key={idx} trx={trx} /> )}
                  <Box m={2} textAlign='center'>
                    <Button onClick={() => setTabIndex(1)}>
                      <Typography variant='overline'>See All</Typography>
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box color="#C0C0C0" fontSize={14} textAlign="center">
                  You haven't created any transactions yet.
                </Box>
              )
            }
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}