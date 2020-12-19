import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { 
  AppBar, 
  Tabs, 
  Tab, 
  Box, 
  useTheme, 
  makeStyles, 
  Container, 
  Paper, 
  Typography, 
  Fab,
  Zoom,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import DonutLarge from '@material-ui/icons/DonutLarge';
import AttachMoney from '@material-ui/icons/AttachMoney'
import MoneyOff from '@material-ui/icons/MoneyOff'
import Notifications from '@material-ui/icons/Notifications'
import Settings from '@material-ui/icons/Settings'

import { Overview } from './Overview';
import Alerts from './Alerts/Alerts';
import { GoalsContext } from '../contexts/GoalsContext';
import { TransactionsContext } from '../contexts/TransactionsContext';
import { Transaction } from './Transaction';
import { GoalForm } from './GoalForm';
import GoalsService from '../services/goals-service';
import { GoalAccordionList } from './GoalAccordionList';
import { SettingsTab } from './SettingsTab';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>{children}</Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  tab: {
    fontSize: '8px',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabGoal: {
    backgroundColor: theme.palette.tertiary.main
  }
}));

export const TabBar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const GoalCtx = useContext(GoalsContext);
  const TransactionCtx = useContext(TransactionsContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      className: `${classes.fab} ${classes.fabGoal}`,
      name: 'goal',
    },
    {
      color: 'secondary',
      className: classes.fab,
      name: 'transaction',
    }
  ]

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="nav tabs"
        >
          <Tab className={classes.tab} icon={<DonutLarge />} label={ value === 0 ? 'Overview' : '' } {...a11yProps(0)} />
          <Tab className={classes.tab} icon={<AttachMoney />} label={ value === 1 ? 'Goals' : '' } {...a11yProps(1)} />
          <Tab className={classes.tab} icon={<MoneyOff />} label={ value === 2 ? 'Transactions' : '' } {...a11yProps(2)} />
          <Tab className={classes.tab} icon={<Notifications />} label={ value === 3 ? 'Alerts' : '' } {...a11yProps(3)} />
          <Tab className={classes.tab} icon={<Settings />} label={ value === 4 ? 'Settings' : '' } {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Overview setValue={setValue} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {GoalCtx.editGoal || GoalCtx.createGoal
            ? null
            : <>
                <Box color='tertiary.main'>
                  <Typography variant='h3'>Goals</Typography>
                </Box>
                <Container>
                  <GoalAccordionList goals={GoalCtx.goals} />
                </Container>
             </>
          }
          {GoalCtx.editGoal 
            ? <GoalForm 
              goal={GoalCtx.goal}
              submitGoal={GoalsService.createUpdateGoal}
              editGoal={GoalCtx.setEditGoal}
              /> : null}
          {GoalCtx.createGoal 
            ? <GoalForm 
              createGoal={GoalCtx.setCreateGoal}
              submitGoal={GoalsService.createUpdateGoal}
            /> : null}
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Box color='secondary.main'>
              <Typography variant='h3'>Transactions</Typography>
            </Box>
            <Container>
              {TransactionCtx.transactions.map(trx => (
                <Paper key={trx.id}>
                  <Box m={1} p={2}>
                    <Transaction trx={trx} />
                  </Box>
                </Paper>
              ))}
            </Container>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          Alerts
          <Alerts />
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          <SettingsTab />
        </TabPanel>
      </SwipeableViews>
      {fabs.map((fab, index) => (
        <Zoom
          key={index}
          in={value === index + 1}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${value === index + 1 ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab 
            onClick={() => {
              if (fab.name === 'goal') {
                GoalCtx.setCreateGoal(true);
              } 
            }} 
            aria-label='Add' className={fab.className} 
            color={fab.color}
            >
            <AddIcon />
          </Fab>
        </Zoom>
      ))}
    </div>
  );
}
